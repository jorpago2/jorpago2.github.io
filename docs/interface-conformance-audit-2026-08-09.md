# Auditoría profunda de conformidad de las ocho interfaces

Fecha: 9 de agosto de 2026

Referencia normativa: [`interface-contract.md`](./interface-contract.md)

Versión local auditada de `@jorpago2/scientific-ui`: `0.5.3`

## Conclusión ejecutiva

Las ocho aplicaciones ya comparten una parte reconocible del lenguaje visual Carbon: barra superior de 48 px, navegación común, tipografía, color base y geometría general. Sin embargo, **todavía no forman una plantilla común completa**.

La causa principal no es un único selector heredado: **ninguna aplicación consume actualmente `ScientificAppShell`**. Cada repositorio recompone por su cuenta el header, la navegación, los paneles, el escenario y la barra de estado. Esto deja que componentes Carbon correctos convivan con layouts y comportamientos locales distintos.

El resultado visible es consistente con la percepción del usuario:

- Hay tres patrones de cierre de panel: icono Carbon, botón textual `Close` y carácter heredado `×`.
- Las barras de estado miden entre 32 y 56 px y algunas están centradas mientras otras tienen márgenes laterales.
- Un elemento de la navegación puede abrir un panel, sustituir el contenido principal o ejecutar una acción, según la aplicación.
- Drift–Diffusion no conserva el modelo de workbench: desplaza el documento completo, estrecha el shell por la barra de scroll y no muestra una barra de estado común.
- Los paneles móviles cubren el lienzo, pero ninguna app proporciona `miniPreview` al shell compartido.
- Persisten controles móviles por debajo de 44 px.

No hay un fallo P0 que impida abrir todas las aplicaciones, pero sí **cinco problemas P1** que impiden declarar conformidad visual y responsive.

## Alcance y método

Se abrieron las ocho aplicaciones en servidores locales independientes y se revisaron como producto, sin utilizar el conocimiento del código para juzgar primero la interfaz.

La comprobación incluyó:

- Estado inicial en anchuras de 320, 375, 414, 768, 1024 y 1440 px.
- Recorrido interactivo de todos los elementos de navegación principal a 375 y 1440 px.
- Apertura y cierre de paneles, Escape y restitución del foco.
- Geometría computada de header, rail, panel, cabecera de panel y barra de estado.
- Overflow global, controles por debajo de 44 px, landmarks, títulos `h1`, nombres accesibles y regiones `aria-live`.
- Contraste posterior con componentes y estilos locales para identificar la causa, no solo el síntoma.

No se evaluó la exactitud numérica de las simulaciones. Tampoco se ejecutaron cálculos largos ni todos los formatos de exportación; esta auditoría se limita a interfaz, navegación, responsive y accesibilidad estructural.

## Lo que sí está uniformizado

| Contrato | Resultado |
|---|---|
| Header Carbon de 48 px | Cumple en las ocho apps. |
| Navegación inferior móvil de 56 px | Cumple en las ocho apps. |
| Rail de escritorio de 256 px a 1440 px | Cumple en las ocho apps. |
| Panel compartido de 384 px en escritorio | Cumple donde se usa o se imita correctamente. |
| Cabecera de panel de 72 px | Cumple en los paneles detectados. |
| Overflow horizontal global | No se detectó en ninguna resolución auditada. |
| Selectores internos `.cds--*` en CSS de las apps | No se encontraron overrides de producción. |
| Nombre accesible de botones visibles | No se encontraron botones visibles sin nombre accesible en el estado inicial. |
| Escape y retorno de foco | Cumple en SpinCoatSim, GDS2GOO, Reflectometry, RF, FDTD y SetupSketch para los paneles recorridos. |

Este avance es real. La discrepancia restante aparece en la **composición y en los adaptadores locales**, no en el aspecto básico del header o del rail compartido.

## Hallazgos P1

### P1.1 — El shell común no es todavía la fuente única de layout

Una búsqueda transversal no encuentra ningún uso de `ScientificAppShell` en las ocho aplicaciones. Se importan `ScientificHeader`, `ScientificToolRail`, `ScientificTaskPanel` o `ScientificStatusBar` de manera independiente y después se reconstruye el grid localmente.

Consecuencias observadas:

- Posiciones e insets de la barra de estado distintos.
- Tratamiento diferente del panel abierto en móvil.
- Scroll global en Drift–Diffusion y scroll interno en el resto.
- Diferencias de ancho de 1 px en algunos shells y de 15–18 px en Drift–Diffusion.
- Reglas responsive duplicadas en cada repositorio.

**Criterio de corrección:** las ocho apps deben montar header, rail, panel, stage, inspector y status mediante `ScientificAppShell`. Los canvas y la lógica científica siguen siendo locales.

### P1.2 — Drift–Diffusion rompe el modelo responsive del workbench

Es la aplicación con peor conformidad estructural.

| Viewport | Overflow vertical adicional aproximado | Ancho del header |
|---:|---:|---:|
| 320 px | 926 px | 302 px |
| 375 px | 770 px | 358 px |
| 414 px | 669 px | 395 px |
| 768 px | 625 px | 752 px |
| 1024 px | 758 px | 1006 px |
| 1440 px | 139 px | 1422 px |

La barra vertical del documento reduce el ancho disponible y hace que header y navegación dejen de ocupar el viewport completo. En móvil, `Configure` y `Results` se comportan como dos páginas largas; no como panel y escenario del workbench. La configuración no presenta cierre en la cabecera y no existe barra de estado inferior común.

Además, `PnLab.tsx` y `BjtLab.tsx` siguen renderizando numerosos `input`, `select`, `checkbox` y `button` HTML con estilos propios. Visualmente son la mayor fuente de divergencia respecto a Carbon. Existe también un texto con mojibake visible al cancelar el NPN: `Cancellingâ€¦`.

**Criterio de corrección:** usar `ScientificAppShell`, limitar el scroll al cuerpo del panel o del stage, migrar campos científicos a Carbon/`ScientificNumberField`, añadir `ScientificStatusBar` y corregir el texto mal codificado.

### P1.3 — Existen cuatro implementaciones funcionales de panel

| Implementación | Apps | Cierre medido | Observación |
|---|---|---|---|
| `ScientificTaskPanel` | SpinCoatSim, GDS2GOO, Reflectometry, SetupSketch | Icono Carbon, 48×48 px | Patrón de referencia. |
| Clon local con clases compartidas | Waveguide | Icono Carbon local, 44×44 px | La estructura y acciones se mantienen en `App.tsx`. |
| Panel React local | RF Simulator | `Close`, 67×44 px móvil y 67×32 px escritorio | Visualmente distinto y demasiado pequeño en escritorio respecto al patrón táctil. |
| Drawer HTML heredado | FDTD | Carácter `×`, 44×44 px | No utiliza Carbon IconButton. |

Drift–Diffusion añade un quinto caso práctico: usa `ScientificTaskPanel` sin `onClose` y depende exclusivamente de la navegación `Results` para ocultarlo.

Las alturas exteriores coinciden porque se han aplicado clases compartidas, pero el usuario sigue viendo controles y respuestas distintas.

**Criterio de corrección:** toda cabecera dismissible debe venir de `ScientificTaskPanel`, con `Close` de Carbon Icons, 48×48 px, nombre contextual opcional y el mismo tratamiento de Escape/foco. Si un panel es persistente, la excepción debe declararse mediante una prop del componente, no omitiendo piezas localmente.

### P1.4 — No se utiliza el mini-preview móvil previsto por el sistema

`scientific-ui` ya expone la prop `miniPreview` y estilos para reservar el área correspondiente. Ninguna de las ocho aplicaciones pasa esa prop.

Cuando se abre un panel a 320–1024 px, este ocupa todo el ancho disponible. En GDS2GOO, RF, FDTD y SetupSketch se pierde la referencia espacial del lienzo; en Waveguide se pierde la relación entre parámetros y sección transversal.

SetupSketch y RF ya tienen minimapa de React Flow, pero no está conectado al modo `miniPreview` del shell.

**Criterio de corrección:** proporcionar un preview de 120–160 px en las apps con lienzo o visualización espacial. En apps sin lienzo, la prop puede omitirse justificadamente.

### P1.5 — Persisten objetivos táctiles inferiores a 44 px

Se detectaron controles visibles pequeños en móvil:

- SpinCoatSim: `Load example`, 40 px de alto.
- GDS2GOO: `Full screen` y algunos selects, 32 px.
- Reflectometry: menú de exportación, 32×32 px.
- FDTD: acceso a la guía, aproximadamente 22×24 px.
- SetupSketch: campo de título del header, 32 px de alto.
- RF: campo de proyecto y menú de acciones del header, 32 px de alto.

Los items de navegación inferior sí cumplen, con aproximadamente 55–56 px de alto.

**Criterio de corrección:** aplicar densidad `lg` o un wrapper de hit-area de 44 px en móvil. El tamaño visual puede seguir siendo compacto si el área interactiva cumple.

## Hallazgos P2 transversales

### P2.1 — La barra de estado no tiene una geometría común

Alturas medidas en estado inicial:

| App | 375 px | 1440 px | Composición |
|---|---:|---:|---|
| SpinCoatSim | 40 px | 56 px | `ScientificStatusBar` |
| GDS2GOO | 56 px | 48 px | Adaptador local |
| Reflectometry | 49 px | 49 px | `.status-row` local |
| Drift–Diffusion | Ausente | Ausente | Sin barra común |
| Waveguide | 40 px | 40 px | `ScientificStatusBar` con overrides |
| RF Simulator | 40 px | 40 px | `ScientificStatusBar` con insets locales |
| FDTD | 40 px | 40 px | Superficie local con 16 px de margen |
| SetupSketch | 32 px | 32 px | `.stage-meta` transparente y con 16 px de margen |

No es solo una diferencia estética: metadatos, estado, progreso y acciones cambian de posición entre herramientas.

**Criterio de corrección:** definir una sola densidad responsive en `ScientificStatusBar` y migrar GDS, Reflectometry, FDTD y SetupSketch. Las apps podrán variar el contenido, no el contenedor.

### P2.2 — La navegación mezcla paneles, vistas y acciones

- Reflectometry incluye `Help` junto a paneles científicos; al pulsarlo no cambia el item activo, que continúa siendo `Data`.
- Waveguide usa `Configure` como panel lateral, pero `Materials`, `Sweeps`, `Analysis` y `Validation` sustituyen el contenido central. El mismo rail ofrece dos modelos mentales.
- GDS2GOO inicia con `Input` abierto; al pulsar el item activo se cierra. SpinCoatSim inicia sin panel y el primer click lo abre.
- FDTD alterna paneles heredados cuyo estado inicial no es uniforme entre `Scene`, `Simulate`, `Results` y `Numerics`.

**Criterio de corrección:** `WorkflowNavigation` debe representar siempre destinos del mismo nivel. Ayuda y acciones globales deben vivir en el header. Todos los items deben declarar de forma explícita si controlan panel o vista; idealmente no mezclar ambos en un mismo rail.

### P2.3 — La identidad accesible principal no es uniforme

En el estado inicial móvil se encontró un `h1` visible en SpinCoatSim, GDS2GOO, Reflectometry, Drift–Diffusion y SetupSketch. Waveguide, RF Simulator y FDTD no exponen un `h1` visible en su vista inicial.

Las ocho apps sí tienen un landmark `main` y la navegación principal tiene nombre accesible. No se encontraron botones visibles sin nombre accesible.

**Criterio de corrección:** cada workspace debe tener un único `h1` descriptivo —visible o visualmente oculto según el diseño— y un enlace de salto que apunte a un destino existente.

### P2.4 — El contenido del header no sigue un contrato de densidad

El contenedor común funciona, pero el slot central cambia mucho:

- Texto de contexto en SpinCoatSim, GDS2GOO, Reflectometry, Waveguide y FDTD.
- Navegación PN/NPN en Drift–Diffusion.
- Campo editable y menú de proyecto en RF.
- Campo editable y acción de importación en SetupSketch.

A 320 px, RF presenta un input de 159×32 px más un botón de 40×32 px y ayuda; SetupSketch presenta un input de 193×32 px más una acción de 48 px. GDS2GOO trunca fuertemente el nombre de archivo sin un affordance común para recuperar el texto completo.

**Criterio de corrección:** documentar tres variantes admitidas del contexto (`text`, `switcher`, `editable`) con anchuras, truncado, tooltip y tamaño táctil definidos en `ScientificHeader`.

### P2.5 — Los estados iniciales no son equivalentes

- SpinCoatSim: sin panel abierto y empty state claro.
- GDS2GOO: panel `Input` abierto de inicio.
- Reflectometry: escenario inicial con `Data` como destino activo, pero sin panel.
- Drift–Diffusion: configuración/resultados como documento largo.
- Waveguide: configuración abierta de inicio.
- RF, FDTD y SetupSketch: escenario inicial sin panel.

Esto cambia la cantidad de área científica visible y hace que las apps parezcan plantillas distintas antes de cualquier interacción.

**Criterio de corrección:** usar una política común: escenario visible al entrar, panel cerrado en móvil y panel inicial configurable —pero documentado— solo en escritorio.

## Evaluación por aplicación

| App | Valoración de interfaz | Problemas prioritarios |
|---|---|---|
| SpinCoatSim | Mejor conformidad global | Objetivo táctil de 40 px, ausencia de mini-preview y estado desktop de 56 px frente a 40 px en otras apps. |
| SetupSketch | Mejor base para interacción de lienzo | Barra inferior local de 32 px, header editable de 32 px móvil y minimapa no conectado a `miniPreview`. |
| GDS2GOO | Buena estructura, panel denso | Estado de 48/56 px, controles de 32 px, panel inicial abierto y falta de mini-preview. |
| Reflectometry | Estructura clara, integración heredada controlada | `Help` mezclado en navegación, status local de 49 px, export de 32 px y ausencia de mini-preview. |
| Waveguide | Visualmente sobria, modelo de navegación inconsistente | `Configure` abre panel pero el resto reemplaza el stage; panel clonado local; status con overrides; falta `h1`. |
| RF Simulator | Buen lienzo y minimapa | Botones `Close` textuales, status con insets, densidad de header y falta de `h1` visible. |
| FDTD | Chrome común sobre una base todavía heredada | `×` HTML, guía 22×24 px, paneles/eventos locales, barra de estado inset, sin mini-preview ni `h1`. |
| Drift–Diffusion | Peor conformidad actual | Scroll global, shell estrechado, sin status bar, controles nativos, patrón móvil distinto y texto mal codificado. |

## Causa por capa

### Paquete compartido

- Los componentes básicos producen dimensiones coherentes cuando se usan directamente.
- `ScientificAppShell` y `miniPreview` existen, pero no están adoptados.
- Falta convertir variantes admitidas del header, status y panel persistente en contratos explícitos y probados.

### Adaptadores de aplicación

- Son la principal fuente de divergencia.
- RF, Waveguide y FDTD reconstruyen el panel aunque reutilicen nombres de clase comunes.
- GDS, Reflectometry, FDTD y SetupSketch mantienen barras de estado locales.
- El estado inicial y la semántica del rail se deciden de forma distinta en cada `App`.

### Estilos heredados

- No se encontraron overrides directos de clases internas `.cds--*` en producción.
- Sí persisten layouts locales completos, como `.app-shell`, `.workbench-grid`, `.workspace`, `.tool-panel-slot`, `.stage-meta`, `.status-row` y el drawer FDTD.
- Mezclar clases locales y clases de `scientific-ui` en el mismo nodo oculta la divergencia de estructura, pero no la elimina.

## Orden de corrección recomendado

1. **Adoptar `ScientificAppShell` en una app de referencia** —SpinCoatSim— sin tocar su lógica científica. Fijar snapshots a seis anchuras.
2. **Migrar SetupSketch** y conectar su minimapa al slot `miniPreview`. Esta pareja valida una app simple y una de lienzo.
3. **Eliminar los tres paneles paralelos** de RF, Waveguide y FDTD, usando adaptadores hacia `ScientificTaskPanel`.
4. **Unificar `ScientificStatusBar`** en las ocho apps y retirar `.stage-meta`, `.status-row` y strips locales como chrome.
5. **Recomponer Drift–Diffusion** con `ScientificAppShell` y Carbon fields antes de cualquier pulido visual menor.
6. **Normalizar navegación e identidad**: sacar Help del rail, decidir panel frente a vista y añadir los `h1` ausentes.
7. **Cerrar el lote táctil** con una prueba automatizada que falle ante cualquier control visible menor de 44 px en móvil.

## Suite de conformidad que falta

El portal debería ejecutar una matriz transversal que mida, no solo capture:

- `header.height === 48` y ancho igual al viewport.
- Rail móvil de 56 px y escritorio de 256 px.
- Panel móvil a ancho completo, desktop de 360–384 px y cabecera de 72 px.
- Un único patrón de cierre: icono Carbon, 48×48 px, nombre accesible y Escape con foco restaurado.
- `documentElement.scrollWidth === innerWidth` y ausencia de scroll global cuando el shell controla el viewport.
- Todos los controles visibles móviles con hit-area mínima de 44×44 px.
- Un `main`, una navegación principal nombrada y un `h1` por workspace.
- Estado `modified`, `running`, `up-to-date`, `failed` y confirmación de exportación mediante texto, no solo color.
- Preview visible cuando un panel móvil oculta un lienzo científico.
- Capturas de header, rail, cabecera de panel y status como regiones estables; canvas dinámico fuera del snapshot principal.

## Criterio de salida

La unificación no debe darse por terminada cuando las ocho barras laterales tengan el mismo color. Debe darse por terminada cuando:

1. Las ocho apps usen `ScientificAppShell`.
2. Exista una sola implementación de panel dismissible y una sola barra de estado.
3. El rail tenga una semántica común.
4. No haya scroll global involuntario ni controles móviles menores de 44 px.
5. Las capturas y métricas de las seis resoluciones pasen en la suite transversal.

Hasta entonces, la interfaz es **visualmente emparentada**, pero no todavía **una plantilla común**.
