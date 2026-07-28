const simulators = [
  {
    number: "01",
    title: "Electromagnetic Wave Simulator",
    field: "2D FDTD · Electromagnetics & photonics",
    description:
      "Explore wave propagation, interference, resonators, waveguides, and advanced optical materials through more than 100 interactive scenes.",
    detail: "JavaScript · WebAssembly",
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
    detail: "JavaScript · Scharfetter–Gummel",
    href: "https://jorpago2.github.io/drift-difussion-simulator/",
    repository: "https://github.com/jorpago2/drift-difussion-simulator",
    theme: "drift",
  },
] as const;

export default function Home() {
  return (
    <main>
      <header>
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
        <p className="eyebrow">ENGINEERING · PHYSICS · EDUCATION</p>
        <h1>Learn engineering and physics interactively.</h1>
        <p className="lead">
          Explore electromagnetic waves and semiconductor devices with visual,
          browser-based numerical models.
        </p>
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
        <article className="simulator soon">
          <div className="simulator-heading">
            <span className="number">03</span>
            <span className="field">More simulations &amp; tools</span>
          </div>
          <div className="simulator-copy">
            <h2>Coming soon</h2>
            <p>
              New educational simulators and engineering tools are currently in
              development.
            </p>
          </div>
          <div className="simulator-footer">
            <span className="detail">Research · Teaching · Open source</span>
            <span className="status">In development</span>
          </div>
        </article>
      </section>

      <section className="research-tools" aria-labelledby="research-tools-title">
        <div className="research-heading">
          <p className="eyebrow">RESEARCH</p>
          <h2 id="research-tools-title">
            Tools for fabrication and experimental workflows.
          </h2>
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
              <span className="detail">JavaScript · Local processing</span>
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
              <span className="detail">TypeScript · Local processing</span>
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
        </div>
      </section>

      <footer>
        <span>Research and teaching software</span>
        <span>Valencia, Spain · 2026</span>
      </footer>
    </main>
  );
}
