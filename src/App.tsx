import { Column, Grid } from "@carbon/react";
import { DesktopReleaseCard } from "./DesktopReleaseCard";

const simulators = [
  {
    number: "01",
    title: "Electromagnetic Wave Simulator",
    field: "2D FDTD · Electromagnetics & photonics",
    description:
      "Explore wave propagation, interference, resonators, waveguides, and advanced optical materials through more than 100 interactive scenes.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/fdtd-2d-simulator/",
    repository: "https://github.com/jorpago2/fdtd-2d-simulator",
    theme: "fdtd",
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
    theme: "drift",
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
    theme: "rf",
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
    theme: "waveguide",
  },
] as const;

export default function Home() {
  return (
    <>
    <a className="skip-link" href="#main-content">Skip to tools</a>
    <Grid as="main" fullWidth condensed className="site-shell" id="main-content" tabIndex={-1}>
      <Column sm={4} md={8} lg={16} className="site-shell-column">
      <header className="site-header">
        <div className="identity">
          <img
            className="avatar"
            src="https://avatars.githubusercontent.com/u/297438018?v=4"
            alt="Jorge Parra"
            width="56"
            height="56"
          />
          <span className="identity-copy">
            <strong>Jorge Parra</strong>
            <small>Assistant Professor at University of Valencia · Photonics · Electronics</small>
          </span>
        </div>
        <nav className="header-links" aria-label="Profile links">
          <a className="header-link" href="https://github.com/jorpago2">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a className="header-link" href="https://www.uv.es/jorpago2">
            Webpage <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="intro" id="top">
        <div className="section-heading education-heading">
          <p className="eyebrow">ENGINEERING · PHYSICS · EDUCATION</p>
          <h1>Learn engineering and physics interactively.</h1>
          <p className="lead">
            Explore electromagnetic waves, photonic modes, RF networks, and
            semiconductor devices with visual, browser-based numerical models.
          </p>
        </div>
      </section>

      <section className="simulator-list" aria-label="Available simulators">
        {simulators.map((simulator) => (
          <article className={`simulator ${simulator.theme}`} key={simulator.title}>
            <a
              className="simulator-link"
              href={simulator.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${simulator.title} in a new tab`}
            />
            <div className="simulator-heading">
              <span className="number">{simulator.number}</span>
              <span className="field">{simulator.field}</span>
            </div>
            <div className="simulator-copy">
              <h2>{simulator.title}</h2>
              <p>{simulator.description}</p>
            </div>
            <div className="simulator-footer">
              <span className="detail">{simulator.detail}</span>
              <a
                className="source-link"
                href={simulator.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="research-tools" aria-labelledby="research-tools-title">
        <div className="section-heading research-heading">
          <p className="eyebrow">RESEARCH</p>
          <h2 id="research-tools-title">
            Tools for fabrication and optical characterization.
          </h2>
          <p className="lead research-lead">
            Prepare lithography files, model thin-film processing, and fit
            optical spectra with reproducible, browser-based tools.
          </p>
        </div>

        <div className="research-list">
          <article className="simulator research-tool gds2goo">
            <a
              className="simulator-link"
              href="https://jorpago2.github.io/gds2goo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GDS2GOO in a new tab"
            />
            <div className="simulator-heading">
              <span className="number">01</span>
              <span className="field">GDSII → GOO · Photolithography</span>
            </div>
            <div className="simulator-copy">
              <h2>GDS2GOO</h2>
              <p>
                Convert GDSII layouts into validated, single-layer GOO exposure
                files for maskless photolithography with the Elegoo Mars 4 9K.
                All processing stays in the browser.
              </p>
            </div>
            <div className="simulator-footer">
              <span className="detail">React · TypeScript · Vite</span>
              <a
                className="source-link"
                href="https://github.com/jorpago2/gds2goo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <article className="simulator research-tool spincoat">
            <a
              className="simulator-link"
              href="https://jorpago2.github.io/spincoatsim/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open SpinCoatSim in a new tab"
            />
            <div className="simulator-heading">
              <span className="number">02</span>
              <span className="field">Spin coating · Thin-film processing</span>
            </div>
            <div className="simulator-copy">
              <h2>SpinCoatSim</h2>
              <p>
                Model GDSII cross-sections, material stacks, RPM-calibrated film
                thickness, annealing shrinkage, and planarization in the browser.
              </p>
            </div>
            <div className="simulator-footer">
              <span className="detail">React · TypeScript · Vite</span>
              <a
                className="source-link"
                href="https://github.com/jorpago2/spincoatsim"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <article className="simulator research-tool reflectometry">
            <a
              className="simulator-link"
              href="https://jorpago2.github.io/reflectometry/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Reflectometry in a new tab"
            />
            <div className="simulator-heading">
              <span className="number">03</span>
              <span className="field">Thin-film optics · R/T fitting</span>
            </div>
            <div className="simulator-copy">
              <h2>Reflectometry</h2>
              <p>
                Fit calibrated reflectance and transmittance spectra from
                coherent multilayer stacks using flexible optical models.
              </p>
            </div>
            <div className="simulator-footer">
              <span className="detail">React · TypeScript · Vite</span>
              <a
                className="source-link"
                href="https://github.com/jorpago2/reflectometry"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <article className="simulator research-tool setupsketch">
            <a
              className="simulator-link"
              href="https://jorpago2.github.io/setupsketch/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open SetupSketch in a new tab"
            />
            <div className="simulator-heading">
              <span className="number">04</span>
              <span className="field">Scientific diagrams · Experimental setups</span>
            </div>
            <div className="simulator-copy">
              <h2>SetupSketch</h2>
              <p>
                Build optical, photonic, and electronic setup diagrams with
                editable components and export them as SVG, PNG, PDF, or JSON.
              </p>
            </div>
            <div className="simulator-footer">
              <span className="detail">React · TypeScript · Vite</span>
              <a
                className="source-link"
                href="https://github.com/jorpago2/setupsketch"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

        </div>
      </section>

      <section className="desktop-tools" aria-labelledby="desktop-tools-title">
        <div className="section-heading desktop-heading">
          <p className="eyebrow">DESKTOP SOFTWARE</p>
          <h2 id="desktop-tools-title">Laboratory software.</h2>
          <p className="lead desktop-lead">
            Download tools for optical programming, fiber alignment, and
            automated photonic characterization.
          </p>
        </div>

        <div className="desktop-list">
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
            theme="pcmwriter"
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
            theme="picbench"
          />
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-copy">
          <strong>Built for open research and hands-on learning.</strong>
          <p>Browser-based simulators, fabrication tools, and laboratory software.</p>
        </div>
        <div className="footer-meta">
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
            <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
          </nav>
          <p className="footer-location">Jorge Parra · Valencia, Spain · 2026</p>
        </div>
      </footer>
      </Column>
    </Grid>
    </>
  );
}
