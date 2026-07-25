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
        <a className="identity" href="#top" aria-label="Back to top">
          <span className="monogram" aria-hidden="true">JP</span>
          <span>
            <strong>Jorge Parra</strong>
            <small>Scientific simulators</small>
          </span>
        </a>
        <a className="github-link" href="https://github.com/jorpago2">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="intro" id="top">
        <p className="eyebrow">OPEN-SOURCE · BROWSER-BASED</p>
        <h1>Interactive tools for computational physics.</h1>
        <p className="lead">
          Run, inspect, and validate scientific models directly in your browser.
        </p>
      </section>

      <section className="simulator-list" aria-label="Available simulators">
        {simulators.map((simulator) => (
          <article className={`simulator ${simulator.theme}`} key={simulator.title}>
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
              <div className="actions">
                <a className="source-link" href={simulator.repository}>
                  Source <span aria-hidden="true">↗</span>
                </a>
                <a className="open-link" href={simulator.href}>
                  Open simulator <span aria-hidden="true">↗</span>
                </a>
              </div>
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
