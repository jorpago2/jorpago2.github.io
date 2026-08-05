import { DesktopReleaseCard } from "./DesktopReleaseCard";
import "./styles.css";

type Tool = {
  number: string;
  title: string;
  field: string;
  description: string;
  detail: string;
  href: string;
  repository: string;
};

const simulators: Tool[] = [
  {
    number: "01",
    title: "Electromagnetic Wave Simulator",
    field: "2D FDTD · Electromagnetics & photonics",
    description:
      "Explore wave propagation, interference, resonators, waveguides, and advanced optical materials through more than 100 interactive scenes.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/fdtd-2d-simulator/",
    repository: "https://github.com/jorpago2/fdtd-2d-simulator",
  },
  {
    number: "02",
    title: "Semiconductor Device Simulator",
    field: "1D Drift–Diffusion · PN junction",
    description:
      "Solve a silicon PN junction self-consistently with Poisson and carrier-continuity equations, then inspect fields, bands, currents, and convergence.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/drift-difussion-simulator/",
    repository: "https://github.com/jorpago2/drift-difussion-simulator",
  },
  {
    number: "03",
    title: "RF Network Simulator",
    field: "Two-port networks · S-parameters",
    description:
      "Build linear RF chains, import Touchstone S2P files, and inspect S-parameters, phase, group delay, mismatch, and internal reflections.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/rf-web-simulator/",
    repository: "https://github.com/jorpago2/rf-web-simulator",
  },
  {
    number: "04",
    title: "Waveguide Mode Solver",
    field: "Full-vector FDM · Integrated photonics",
    description:
      "Calculate hybrid modes of dielectric waveguides, inspect all six electromagnetic field components, and evaluate effective index, confinement, and polarization.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/waveguide-mode-solver/",
    repository: "https://github.com/jorpago2/waveguide-mode-solver",
  },
];

const researchTools: Tool[] = [
  {
    number: "01",
    title: "GDS2GOO",
    field: "GDSII → GOO · Photolithography",
    description:
      "Convert GDSII layouts into validated, single-layer GOO exposure files for maskless photolithography with the Elegoo Mars 4 9K. All processing stays in the browser.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/gds2goo/",
    repository: "https://github.com/jorpago2/gds2goo",
  },
  {
    number: "02",
    title: "SpinCoatSim",
    field: "Spin coating · Thin-film processing",
    description:
      "Model GDSII cross-sections, material stacks, RPM-calibrated film thickness, annealing shrinkage, and planarization in the browser.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/spincoatsim/",
    repository: "https://github.com/jorpago2/spincoatsim",
  },
  {
    number: "03",
    title: "Reflectometry",
    field: "Thin-film optics · R/T fitting",
    description:
      "Fit calibrated reflectance and transmittance spectra from coherent multilayer stacks using flexible optical models.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/reflectometry/",
    repository: "https://github.com/jorpago2/reflectometry",
  },
  {
    number: "04",
    title: "SetupSketch",
    field: "Scientific diagrams · Experimental setups",
    description:
      "Build optical, photonic, and electronic setup diagrams with editable components and export them as SVG, PNG, PDF, or JSON.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/setupsketch/",
    repository: "https://github.com/jorpago2/setupsketch",
  },
];

function ToolRow({ tool }: { tool: Tool }) {
  return (
    <article className="tool-row">
      <span className="tool-number" aria-hidden="true">
        {tool.number}
      </span>
      <div className="tool-core">
        <p className="tool-field">{tool.field}</p>
        <h3>{tool.title}</h3>
        <div className="tool-actions">
          <a
            className="action-link action-link-primary"
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${tool.title} in a new tab`}
          >
            Open tool <span aria-hidden="true">↗</span>
          </a>
          <a
            className="action-link"
            href={tool.repository}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${tool.title} source code in a new tab`}
          >
            Source <span aria-hidden="true">↗</span>
          </a>
        </div>
        <details className="tool-details">
          <summary>About</summary>
          <p>{tool.description}</p>
        </details>
      </div>
      <p className="tool-technology">{tool.detail}</p>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#tool-index">
        Skip to tools
      </a>

      <div className="page-shell">
        <header className="site-header">
          <div className="identity">
            <img
              className="avatar"
              src="https://avatars.githubusercontent.com/u/297438018?v=4"
              alt="Jorge Parra"
              width="48"
              height="48"
            />
            <span className="identity-copy">
              <strong>Jorge Parra</strong>
              <small>
                Assistant Professor at University of Valencia · Photonics ·
                Electronics
              </small>
            </span>
          </div>
          <a className="header-link" href="https://www.uv.es/jorpago2">
            Webpage <span aria-hidden="true">↗</span>
          </a>
        </header>

        <main id="main-content">
          <section className="intro" id="top">
            <h1>Learn engineering and physics interactively.</h1>
            <p>
              Explore electromagnetic waves, photonic modes, RF networks, and
              semiconductor devices with visual, browser-based numerical models.
            </p>
          </section>

          <section
            className="catalog-section"
            id="tool-index"
            tabIndex={-1}
            aria-labelledby="simulators-title"
          >
            <div className="section-heading">
              <h2 id="simulators-title">Interactive simulators</h2>
              <p>Numerical models for teaching and independent exploration.</p>
            </div>
            <div className="tool-list">
              {simulators.map((tool) => (
                <ToolRow tool={tool} key={tool.title} />
              ))}
            </div>
          </section>

          <section
            className="catalog-section research-section"
            aria-labelledby="research-tools-title"
          >
            <div className="section-heading">
              <h2 id="research-tools-title">Research tools</h2>
              <p>
                Prepare lithography files, model thin-film processing, and fit
                optical spectra with reproducible, browser-based tools.
              </p>
            </div>
            <div className="tool-list">
              {researchTools.map((tool) => (
                <ToolRow tool={tool} key={tool.title} />
              ))}
            </div>
          </section>

          <section
            className="catalog-section desktop-section"
            aria-labelledby="desktop-tools-title"
          >
            <div className="section-heading">
              <h2 id="desktop-tools-title">Laboratory software</h2>
              <p>
                Download tools for optical programming, fiber alignment, and
                automated photonic characterization.
              </p>
            </div>
            <div className="tool-list">
              <DesktopReleaseCard
                number="01"
                title="PCMWriter"
                description="Program and characterize phase-change materials on silicon photonic devices through guarded optical and motion workflows."
                technology="Python"
                format="ZIP"
                repository="jorpago2/pcmwriter"
                assetExtension=".zip"
                fallbackVersion="v0.5.0"
                fallbackUrl="https://github.com/jorpago2/pcmwriter/releases/download/v0.5.0/PCMWriter-Windows-x64-v0.5.0.zip"
              />
              <DesktopReleaseCard
                number="02"
                title="PICBench"
                description="Align optical fibers with camera guidance and automate spectral characterization of silicon photonic integrated circuits."
                technology="Python"
                format="EXE"
                repository="jorpago2/picbench"
                assetExtension=".exe"
                fallbackVersion="v0.2.0"
                fallbackUrl="https://github.com/jorpago2/picbench/releases/download/v0.2.0/PICBench.exe"
              />
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <p>Built for open research and hands-on learning.</p>
          <nav className="footer-links" aria-label="Footer links">
            <a
              href="https://github.com/jorpago2"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://www.uv.es/jorpago2"
              target="_blank"
              rel="noopener noreferrer"
            >
              University profile <span aria-hidden="true">↗</span>
            </a>
            <a href="#top">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </nav>
          <p className="footer-location">Jorge Parra · Valencia, Spain · 2026</p>
        </footer>
      </div>
    </>
  );
}
