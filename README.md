# Suwaj's portfolio: 3D experiment

An independent copy of [the original portfolio](https://suwajaryal.github.io), exploring a React Three Fiber background. Work here does not update the original website. This repository is not deployed automatically.

## First experiment

The introduction has a stylised Himalayan river valley, flowing particles, subtle pointer movement, and a pause button. The terrain is an artistic illustration, not surveyed geography or a hydraulic simulation.

The scene pauses when the introduction is out of view or the browser tab is hidden. Reduced-motion preferences produce a still scene. A gradient remains if 3D cannot load. The existing biography and project sections remain plain HTML and JavaScript.

## Run it on your computer

Install the current Node.js LTS from https://nodejs.org, then open a terminal in this folder:

```sh
npm install
npm run dev
```

Open the Local address printed by Vite. On Windows, use `npm.cmd` instead of `npm` if PowerShell blocks the npm script.

To check the finished website files:

```sh
npm run build
npm run preview
```

Vite produces a `dist` folder ready for static hosting. Node.js is needed to develop and build; visitors do not need to install it.

## Learn the files

| File | What it does |
| --- | --- |
| `data.js` | Your biography, projects, education, and contact information. Edit this for content changes. |
| `index.html` | Page structure and the empty container where React draws the scene. |
| `style.css` | Colours, layout, overlays, responsive behaviour, and fallback appearance. |
| `src/portfolio.js` | Your original page-populating JavaScript, moved out of the HTML. |
| `src/scene-loader.js` | Downloads the optional 3D feature separately from portfolio content. |
| `src/background.jsx` | React components describing the terrain, river, lights, and animation. |
| `public/Resume_suwaj.pdf` | Resume copied unchanged into the built website. |
| `package.json` | Lists the libraries and development commands. |
| `package-lock.json` | Records exact installed library versions. |
| `vite.config.js` | Configures the tool that prepares source files for browsers. |

## Understand one 3D object

In `src/background.jsx`, a `<mesh>` combines geometry (shape) and material (surface appearance). `<Canvas>` supplies the drawing area and camera. Lights illuminate the scene. `useFrame` runs a function during each rendered frame, moving the river particles. JSX is JavaScript syntax that lets us describe these components using tags.

First experiments to try:

1. Change the river material's `color` value and observe the result.
2. Change the camera's `position` to view the valley from another angle.
3. Change the `0.045` flow-speed multiplier inside `useFrame`.
4. Change a project description in `data.js` and confirm content editing still works independently.

React 19 is paired with React Three Fiber 9. No TypeScript or full React rewrite is required.

## Validation and publishing

The GitHub workflow checks installation and the production build on pushes and pull requests. It does not publish a website. Check desktop and phone layouts, CV download, navigation, pause/resume, reduced motion, and graphics fallback before deployment.

To publish later, use a separate GitHub Pages deployment for this repository and its built `dist` folder. Keep the original portfolio repository unchanged until the experiment is ready.

## References

- [Add React to an existing project](https://react.dev/learn/add-react-to-an-existing-project)
- [React Three Fiber: first scene](https://r3f.docs.pmnd.rs/getting-started/your-first-scene)
- [React Three Fiber: performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [Vite: GitHub Pages deployment](https://vite.dev/guide/static-deploy.html#github-pages)
