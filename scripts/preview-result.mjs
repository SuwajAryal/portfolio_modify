// A local preview of the built portfolio. It serves only dist/ on this computer.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.geojson':'application/geo+json','.png':'image/png','.gif':'image/gif','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.md':'text/plain; charset=utf-8','.pdf':'application/pdf','.woff2':'font/woff2'};
const server=http.createServer(async(request,response)=>{
  try {
    const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
    const target=resolve(root,`.${pathname==='/'?'/index.html':pathname}`);
    const within=relative(root,target);
    if(within.startsWith('..')||within.includes(':')) {response.writeHead(403).end();return;}
    const data=await readFile(target);
    response.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','X-Content-Type-Options':'nosniff'}).end(data);
  } catch {response.writeHead(404).end('File not found. Build the portfolio first with npm run build.');}
});
server.listen(0,'127.0.0.1',()=>{
  const url=`http://127.0.0.1:${server.address().port}/`;
  console.log(`Portfolio preview: ${url}\nKeep this window open while viewing. Press Ctrl+C to stop.`);
  if(process.argv.includes('--open')&&process.platform==='win32')execFile('rundll32.exe',['url.dll,FileProtocolHandler',url],()=>{});
});
