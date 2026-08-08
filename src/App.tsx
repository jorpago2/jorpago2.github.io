import {
  Button,
  Column,
  Content,
  Grid,
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  Link,
  SideNav,
  SideNavItems,
  SkipToContent,
  Tag,
  Tile,
} from "@carbon/react";
import { DesktopReleaseCard } from "./DesktopReleaseCard";

type Tool = {
  title: string;
  field: string;
  description: string;
  detail: string;
  href: string;
  repository: string;
  category: "Simulator" | "Research";
  tagType: "blue" | "green";
};

const simulators: Tool[] = [
  {
    title: "Electromagnetic Wave Simulator",
    field: "2D FDTD · Electromagnetics & photonics",
    description:
      "Explore wave propagation, interference, resonators, waveguides, and advanced optical materials through more than 100 interactive scenes.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/fdtd-2d-simulator/",
    repository: "https://github.com/jorpago2/fdtd-2d-simulator",
    category: "Simulator",
    tagType: "blue",
  },
  {
    title: "Semiconductor Device Simulator",
    field: "1D Drift–Diffusion · PN junction",
    description:
      "Solve a silicon PN junction self-consistently with Poisson and carrier-continuity equations, then inspect fields, bands, currents, and convergence.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/drift-difussion-simulator/",
    repository: "https://github.com/jorpago2/drift-difussion-simulator",
    category: "Simulator",
    tagType: "blue",
  },
  {
    title: "RF Network Simulator",
    field: "Two-port networks · S-parameters",
    description:
      "Build linear RF chains, import Touchstone S2P files, and inspect S-parameters, phase, group delay, mismatch, and internal reflections.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/rf-web-simulator/",
    repository: "https://github.com/jorpago2/rf-web-simulator",
    category: "Simulator",
    tagType: "blue",
  },
  {
    title: "Waveguide Mode Solver",
    field: "Full-vector FDM · Integrated photonics",
    description:
      "Calculate hybrid modes of dielectric waveguides, inspect all six electromagnetic field components, and evaluate effective index, confinement, and polarization.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/waveguide-mode-solver/",
    repository: "https://github.com/jorpago2/waveguide-mode-solver",
    category: "Simulator",
    tagType: "blue",
  },
];

const researchTools: Tool[] = [
  {
    title: "GDS2GOO",
    field: "GDSII → GOO · Photolithography",
    description:
      "Convert GDSII layouts into validated, single-layer GOO exposure files for maskless photolithography with the Elegoo Mars 4 9K. All processing stays in the browser.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/gds2goo/",
    repository: "https://github.com/jorpago2/gds2goo",
    category: "Research",
    tagType: "green",
  },
  {
    title: "SpinCoatSim",
    field: "Spin coating · Thin-film processing",
    description:
      "Model GDSII cross-sections, material stacks, RPM-calibrated film thickness, annealing shrinkage, and planarization in the browser.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/spincoatsim/",
    repository: "https://github.com/jorpago2/spincoatsim",
    category: "Research",
    tagType: "green",
  },
  {
    title: "Reflectometry",
    field: "Thin-film optics · R/T fitting",
    description:
      "Fit calibrated reflectance and transmittance spectra from coherent multilayer stacks using flexible optical models.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/reflectometry/",
    repository: "https://github.com/jorpago2/reflectometry",
    category: "Research",
    tagType: "green",
  },
  {
    title: "SetupSketch",
    field: "Scientific diagrams · Experimental setups",
    description:
      "Build optical, photonic, and electronic setup diagrams with editable components and export them as SVG, PNG, PDF, or JSON.",
    detail: "React · TypeScript · Vite",
    href: "https://jorpago2.github.io/setupsketch/",
    repository: "https://github.com/jorpago2/setupsketch",
    category: "Research",
    tagType: "green",
  },
];

const navigation = [
  { href: "#simulators", label: "Simulators", external: false },
  { href: "#research", label: "Research", external: false },
  { href: "#desktop", label: "Desktop", external: false },
  { href: "https://github.com/jorpago2", label: "GitHub", external: true },
  { href: "https://www.uv.es/jorpago2", label: "UV profile", external: true },
] as const;

function NavigationItems({ onNavigate }: { onNavigate?: () => void }) {
  return navigation.map((item) => (
    <HeaderMenuItem
      href={item.href}
      key={item.href}
      onClick={onNavigate}
      rel={item.external ? "noopener noreferrer" : undefined}
      target={item.external ? "_blank" : undefined}
    >
      {item.label}
    </HeaderMenuItem>
  ));
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="tool-card">
      <Tile className="tool-tile">
        <div className="tool-identity">
          <Tag size="sm" type={tool.tagType}>{tool.category}</Tag>
          <p className="tool-field">{tool.field}</p>
          <h3>{tool.title}</h3>
        </div>
        <div className="tool-summary">
          <p>{tool.description}</p>
          <span className="tool-detail">{tool.detail}</span>
        </div>
        <div className="tool-actions">
          <Button
            className="simulator-link"
            href={tool.href}
            rel="noopener noreferrer"
            size="md"
            target="_blank"
          >
            Open tool
          </Button>
          <Link href={tool.repository} rel="noopener noreferrer" target="_blank">
            View source ↗
          </Link>
        </div>
      </Tile>
    </article>
  );
}

function ToolSection({
  id,
  title,
  description,
  tools,
}: {
  id: string;
  title: string;
  description: string;
  tools: Tool[];
}) {
  return (
    <Grid as="section" fullWidth className="tool-section" id={id} aria-labelledby={`${id}-title`}>
      <Column sm={4} md={2} lg={4} className="section-intro">
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </Column>
      <Column sm={4} md={6} lg={12}>
        <ul className="tool-list">
          {tools.map((tool) => (
            <li key={tool.title}><ToolCard tool={tool} /></li>
          ))}
        </ul>
      </Column>
    </Grid>
  );
}

export default function Home() {
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="Jorge Parra scientific software">
            <SkipToContent href="#main-content">Skip to tools</SkipToContent>
            <HeaderMenuButton
              aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
              aria-expanded={isSideNavExpanded}
              isActive={isSideNavExpanded}
              onClick={onClickSideNavExpand}
            />
            <HeaderName className="site-header-name" href="/" prefix="Jorge Parra"><span className="header-product">Scientific tools</span></HeaderName>
            <HeaderNavigation aria-label="Primary navigation">
              <NavigationItems />
            </HeaderNavigation>
            <SideNav
              aria-label="Mobile navigation"
              className="mobile-side-nav"
              data-expanded={isSideNavExpanded}
              expanded={isSideNavExpanded}
              isPersistent={false}
              onOverlayClick={onClickSideNavExpand}
              onSideNavBlur={onClickSideNavExpand}
            >
              <SideNavItems>
                <HeaderSideNavItems>
                  <NavigationItems onNavigate={onClickSideNavExpand} />
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </Header>

          <Content className="site-main" id="main-content" tabIndex={-1}>
            <Grid as="section" fullWidth className="hero" aria-labelledby="page-title">
              <Column sm={4} md={8} lg={10}>
                <p className="hero-label">Open scientific software</p>
                <h1 id="page-title">Learn engineering and physics interactively.</h1>
                <p className="hero-lead">
                  Browser-based numerical tools for electromagnetics, photonics,
                  semiconductor devices, fabrication, and laboratory automation.
                </p>
                <div className="hero-actions">
                  <Button href="#simulators" size="lg">Explore simulators</Button>
                  <Button href="#research" kind="tertiary" size="lg">Research tools</Button>
                </div>
              </Column>
              <Column sm={4} md={8} lg={6} className="hero-context">
                <dl>
                  <div><dt>Delivery</dt><dd>Browser and Windows</dd></div>
                  <div><dt>Access</dt><dd>Open source</dd></div>
                  <div><dt>Fields</dt><dd>Photonics · Electronics</dd></div>
                </dl>
              </Column>
            </Grid>

            <ToolSection
              id="simulators"
              title="Simulators"
              description="Interactive numerical models for teaching and exploration."
              tools={simulators}
            />

            <ToolSection
              id="research"
              title="Research tools"
              description="Reproducible workflows for fabrication and optical characterization."
              tools={researchTools}
            />

            <Grid as="section" fullWidth className="tool-section" id="desktop" aria-labelledby="desktop-title">
              <Column sm={4} md={2} lg={4} className="section-intro">
                <h2 id="desktop-title">Desktop software</h2>
                <p>Windows applications for optical programming, alignment, and automated characterization.</p>
              </Column>
              <Column sm={4} md={6} lg={12}>
                <ul className="tool-list">
                  <li>
                    <DesktopReleaseCard
                      title="PCMWriter"
                      description="Program and characterize phase-change materials on silicon photonic devices through guarded optical and motion workflows."
                      technology="Python"
                      format="ZIP"
                      repository="jorpago2/pcmwriter"
                      assetExtension=".zip"
                      fallbackVersion="v0.5.0"
                      fallbackUrl="https://github.com/jorpago2/pcmwriter/releases/download/v0.5.0/PCMWriter-Windows-x64-v0.5.0.zip"
                    />
                  </li>
                  <li>
                    <DesktopReleaseCard
                      title="PICBench"
                      description="Align optical fibers with camera guidance and automate spectral characterization of silicon photonic integrated circuits."
                      technology="Python"
                      format="EXE"
                      repository="jorpago2/picbench"
                      assetExtension=".exe"
                      fallbackVersion="v0.2.0"
                      fallbackUrl="https://github.com/jorpago2/picbench/releases/download/v0.2.0/PICBench.exe"
                    />
                  </li>
                </ul>
              </Column>
            </Grid>
          </Content>

          <footer className="site-footer">
            <Grid fullWidth className="footer-grid">
              <Column sm={4} md={5} lg={10}>
                <strong>Built for open research and hands-on learning.</strong>
                <p>Jorge Parra · University of Valencia · Spain</p>
              </Column>
              <Column sm={4} md={3} lg={6} className="footer-links">
                <Link href="https://github.com/jorpago2" rel="noopener noreferrer" target="_blank">GitHub ↗</Link>
                <Link href="https://www.uv.es/jorpago2" rel="noopener noreferrer" target="_blank">University profile ↗</Link>
                <Link href="#main-content">Back to top</Link>
              </Column>
            </Grid>
          </footer>
        </>
      )}
    />
  );
}
