import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

// Ship the actual notices supplied by installed packages, including transitive
// dependencies, rather than summarising their license terms ourselves.
const notices = ['COMMUNITY SOFTWARE LICENSE NOTICES\nSee sources.html and SOURCES.md for attribution and geographic data sources.\n'];
async function visitModules(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
    const folder = path.join(directory, entry.name);
    if (entry.name.startsWith('@')) { await visitModules(folder); continue; }
    let metadata;
    try { metadata = JSON.parse(await readFile(path.join(folder, 'package.json'), 'utf8')); }
    catch { continue; }
    const files = (await readdir(folder)).filter(name => /^(licen[sc]e|copying|notice)(\.|$)/i.test(name));
    for (const file of files) {
      try {
        const text = await readFile(path.join(folder, file), 'utf8');
        notices.push(`\n--- ${metadata.name} ${metadata.version} / ${file} ---\n${text}`);
      } catch { /* Some packages use a license directory instead of a file. */ }
    }
    const nested = path.join(folder, 'node_modules');
    try { await access(nested); } catch { continue; }
    await visitModules(nested);
  }
}
await visitModules('node_modules');
await writeFile('public/community-licenses.txt', notices.join('\n'));
console.log('Dependency license notices prepared.');
