const projects = [
  {
    title: "2D FDTD Browser Simulator",
    eyebrow: "Simulación electromagnética",
    description:
      "Explora propagación de ondas, guías, resonadores y materiales fotónicos mediante más de 100 escenas interactivas directamente en el navegador.",
    status: "Disponible",
    language: "JavaScript · WebAssembly",
    href: "https://jorpago2.github.io/fdtd-2d-simulator/",
    repository: "https://github.com/jorpago2/fdtd-2d-simulator",
    featured: true,
  },
  {
    title: "PCMWriter",
    eyebrow: "Materiales de cambio de fase",
    description:
      "Programación óptica y caracterización reproducible de materiales de cambio de fase integrados sobre dispositivos fotónicos de silicio.",
    status: "En desarrollo",
    language: "Python · Windows",
    repository: "https://github.com/jorpago2/pcmwriter",
    featured: false,
  },
  {
    title: "PICBench",
    eyebrow: "Caracterización fotónica",
    description:
      "Alineamiento de fibra guiado por cámara y caracterización espectral automatizada de circuitos fotónicos integrados.",
    status: "En desarrollo",
    language: "Python · Instrumentación",
    repository: "https://github.com/jorpago2/picbench",
    featured: false,
  },
] as const;

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span className="brand-mark" aria-hidden="true">
            JP
          </span>
          <span>
            <strong>Jorge Parra</strong>
            <small>Research software</small>
          </span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#proyectos">Proyectos</a>
          <a href="https://github.com/jorpago2">GitHub</a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="kicker">FOTÓNICA · SIMULACIÓN · INSTRUMENTACIÓN</p>
          <h1>
            Herramientas para hacer <em>visible</em> la física.
          </h1>
          <p className="intro">
            Software abierto para explorar ondas electromagnéticas, programar
            materiales fotónicos y automatizar experimentos de laboratorio.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#proyectos">
              Explorar proyectos <span aria-hidden="true">↓</span>
            </a>
            <a className="button secondary" href="https://github.com/jorpago2">
              Ver perfil en GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="signal-panel" aria-label="Áreas de trabajo">
          <div className="signal-grid" aria-hidden="true" />
          <div className="signal-orbit orbit-one" aria-hidden="true" />
          <div className="signal-orbit orbit-two" aria-hidden="true" />
          <div className="signal-core" aria-hidden="true" />
          <p>Research stack</p>
          <ul>
            <li><span>01</span> Electromagnetismo computacional</li>
            <li><span>02</span> Fotónica integrada</li>
            <li><span>03</span> Automatización experimental</li>
          </ul>
        </div>
      </section>

      <section className="project-section" id="proyectos">
        <div className="section-heading">
          <div>
            <p className="kicker">PROYECTOS</p>
            <h2>Software científico, del modelo al laboratorio.</h2>
          </div>
          <div className="summary" aria-label="Resumen de proyectos">
            <span><strong>3</strong> proyectos públicos</span>
            <span><strong>1</strong> web app disponible</span>
          </div>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className={`project-card${project.featured ? " featured" : ""}`}
              key={project.title}
            >
              <div className="card-topline">
                <span className="project-number">0{index + 1}</span>
                <span className={`status${project.featured ? " live" : ""}`}>
                  {project.status}
                </span>
              </div>
              <div>
                <p className="eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p className="description">{project.description}</p>
              </div>
              <div className="card-footer">
                <span className="language">{project.language}</span>
                <div className="project-links">
                  {"href" in project && (
                    <a className="launch" href={project.href}>
                      Abrir app <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  <a href={project.repository}>
                    Código <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>Software para docencia, investigación y prototipado científico.</p>
        <p>València, España · 2026</p>
      </footer>
    </main>
  );
}
