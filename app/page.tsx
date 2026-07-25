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
          <a className="header-link" href="https://jorpago2.blogs.uv.es">
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
      </section>

      <footer>
        <span>Research and teaching software</span>
        <span>Valencia, Spain · 2026</span>
      </footer>
    </main>
  );
}
