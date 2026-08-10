# Contrato común de interfaz científica

Estado: normativo. Versión: 2.5. Aplicable a las ocho herramientas científicas publicadas por Jorge Parra.

## Fuente de verdad

La interfaz común se distribuye mediante `@jorpago2/scientific-ui`. Las aplicaciones consumen una versión exacta y mantienen localmente únicamente lógica científica, canvas, gráficos y adaptadores de compatibilidad.

Si un `design.md` local contradice este contrato en tipografía, tema, geometría, estados o responsive, prevalece este documento. Las excepciones locales deben limitarse a significado científico y quedar documentadas.

## Sistema visual

- Carbon Design System `g10` es la única base para el chrome de aplicación.
- IBM Plex Sans se usa en la interfaz e IBM Plex Mono en valores, unidades, coordenadas e identificadores.
- Superficies y controles siguen la geometría cuadrada de Carbon. No se crean sistemas paralelos de radios, sombras, gradientes o píldoras.
- Los colores de interfaz proceden de tokens semánticos `--cds-*`.
- No existe un acento de aplicación por herramienta. El azul Carbon identifica acciones y selección.
- Colores de materiales, dopajes, series, campos y geometrías son excepciones científicas; nunca son el único canal de significado.
- CSS de producto no selecciona clases internas `.cds--*`.

## Arquitectura del workbench

Cada aplicación presenta, según sean necesarios:

1. Cabecera compacta con producto, contexto, estado, acceso al portal y acción principal.
2. Navegación de flujo controlada.
3. Un único panel de tarea abierto simultáneamente.
4. Área científica dominante.
5. Inspector contextual opcional, fuera del flujo de Carbon Grid.
6. Barra inferior concisa con estado científico y metadatos.

Los layouts de página usan Carbon `Grid` y `Column`, con spans explícitos para `sm`, `md` y `lg`. Cada grupo lógico independiente utiliza su propio Grid.

### Rail común de herramientas

La navegación de flujo se implementa con `ScientificToolRail` de `@jorpago2/scientific-ui` 0.5.0 o posterior. En escritorio compone `SideNav`, `SideNavItems` y `SideNavLink` de Carbon; sus dimensiones y estados no se recrean localmente:

- 256 px de ancho en escritorio y 56 px de alto como barra inferior.
- Filas de 32 px en navegación lateral, padding e iconos de 16 px, etiqueta de 14 px semibold e indicador activo de 4 px.
- Toda la fila es el objetivo de clic; icono y etiqueta no son objetivos independientes.
- La selección activa combina posición, superficie e indicador, no solo color.
- `ArrowUp`/`ArrowDown` y `Home`/`End` desplazan el foco; `Escape` cierra los paneles colapsables y devuelve el foco al trigger.
- Un solo panel de tarea puede estar abierto. Los paneles utilizan el ancho común de 384 px cuando hay espacio y pasan a overlay o sheet antes de comprimir el resultado.
- Cada adaptador local conserva únicamente el mapeo entre herramientas, paneles y eventos científicos heredados.

La barra inferior por debajo de `lg` es una excepción explícita al comportamiento responsive del UI Shell de Carbon. Conserva el landmark, la lista, los botones, los nombres accesibles y los estados de `SideNav`; solo cambia su presentación y el tamaño táctil. No autoriza otras sustituciones de componentes Carbon.

La cabecera compartida se implementa con `ScientificHeader` y compone `Header`, `HeaderName` y `HeaderGlobalBar`. El producto ocupa 256 px, el contexto se centra geométricamente en el viewport y la altura es siempre 48 px. Las aplicaciones no recrean estas columnas ni conservan CSS local para el header o el rail: solo aportan contenido y adaptadores de eventos. La hoja de `scientific-ui` se carga después de los estilos de producto y es la autoridad final del chrome.

El panel de tarea se implementa con `ScientificTaskPanel` sobre un `Layer` Carbon. Su cabecera mide 72 px, usa 16 px de separación, y el cuerpo es el único contenedor con scroll. En escritorio ocupa entre 360 y 384 px; en tablet o móvil utiliza el ancho disponible. Las aplicaciones solo declaran su posición y contenido, sin redefinir superficie, tipografía, padding, borde o scroll. El lienzo o resultado principal usa `scientific-stage`; una barra heredada que todavía no pueda adoptar `ScientificStatusBar` usa `scientific-status-surface` para compartir superficie y geometría.

Los inspectores modales componen `ComposedModal`, `ModalHeader` y `ModalBody`, y los estados científicos utilizan `IconIndicator`. Los temas se aplican mediante `GlobalTheme` o `Theme`; el CSS compartido no detecta temas mediante clases internas.

## Estados científicos

El vocabulario común es:

| Estado | Significado |
| --- | --- |
| `needs-input` | Falta una entrada o ejemplo explícito. |
| `ready` | Las entradas son válidas y el cálculo puede comenzar. |
| `running` | Existe una operación activa, anunciada mediante `aria-live`. |
| `up-to-date` | El resultado corresponde a los parámetros actuales. |
| `modified` | Existen cambios posteriores al último resultado. |
| `validated` | El resultado superó las comprobaciones aplicables. |
| `warning` | Hay resultado, pero presenta límites o advertencias relevantes. |
| `failed` | La operación falló y se explica una acción de recuperación. |

El estado de guardado del proyecto es independiente del estado del resultado científico.

## Responsive

- Breakpoints Carbon: `sm` 320 px, `md` 672 px, `lg` 1056 px, `xlg` 1312 px y `max` 1584 px.
- Escritorio: navegación lateral, panel de 360–400 px y área científica flexible.
- Tablet: panel a ancho completo o superpuesto antes de comprimir el resultado.
- Móvil: navegación inferior, objetivos táctiles preferentemente de 44 px y una sola capa de trabajo visible. Un panel abierto sustituye temporalmente al canvas; no se crean mini-previews ni minimapas.
- Se comprueba 320, 375, 414, 768, 1024 y 1440 px.
- No se permite overflow horizontal de página, acciones esenciales ocultas ni etiquetas interactivas partidas en dos líneas.
- `html` y `body` usan `overflow-x: clip`; un canvas fijo puede documentar una excepción siempre que no oculte controles alcanzables.

Los diagramas ofrecen `Fit width`, `Fit selection` y `Fit all`, junto con un zoom mínimo legible. No incorporan minimapas ni vistas duplicadas del canvas.

## Interacción y accesibilidad

- Landmarks, orden de encabezados y salto al contenido son obligatorios.
- Se preserva semántica nativa antes de añadir ARIA.
- Todos los controles tienen nombre accesible; los icon-only Carbon reciben su prop de etiqueta.
- `Escape` cierra paneles y devuelve el foco al trigger.
- El foco no queda cubierto por cabeceras, barras o navegación persistente.
- No se usa `tabIndex > 0` ni se elimina el focus ring sin sustituto visible.
- Error, éxito, advertencia y selección incluyen texto, icono, forma o posición además de color.
- El movimiento no esencial desaparece con `prefers-reduced-motion`.

## Entradas, resultados y exportación

- Cada parámetro muestra nombre, unidad, rango y procedencia cuando sea relevante.
- La notación científica se acepta para magnitudes que puedan abarcar varios órdenes de magnitud.
- No se corrigen silenciosamente entradas físicas inválidas.
- Un resultado modificado u obsoleto se distingue del resultado actual.
- Empty states explican qué falta y ofrecen la siguiente acción útil.
- Las exportaciones muestran recibo con nombre de archivo, formato y destino o contexto.
- Los gráficos incluyen magnitud y unidad en ejes, nombre accesible y alternativa exportable o textual.

## Compatibilidad conocida

- Reflectometry conserva montados los controles e IDs consultados por su motor DOM.
- FDTD conserva los eventos `fdtd:*`, IDs y atributos utilizados por su runtime.
- React Flow, Plotly y los canvas científicos siguen siendo implementaciones locales.
- La adopción del paquete no modifica algoritmos, formatos de proyecto ni modelos físicos.

## Criterios de aceptación

- Lint, typecheck, pruebas científicas y build del repositorio pasan.
- No aparecen errores nuevos de consola ni recursos rotos.
- El flujo principal funciona con ratón, táctil y teclado.
- Identidad, contexto, estado y acción principal siguen localizables en todos los anchos objetivo.
- No existe overflow horizontal global.
- Estados vacío, modificado, ejecución, éxito, advertencia, error y exportación son comprensibles.
- La suite transversal del portal pasa contra las aplicaciones desplegadas.

## Publicación y excepciones

Las aplicaciones fijan una versión exacta de `@jorpago2/scientific-ui`. Hasta la primera publicación npm, consumen el tarball versionado incluido en `vendor/`; la referencia se sustituirá por la misma versión npm sin cambiar código de aplicación.

Una excepción necesita: motivo científico o técnico, alcance mínimo, alternativa accesible y prueba que impida su expansión accidental.
