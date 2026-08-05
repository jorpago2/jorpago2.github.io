# Contrato común de interfaz

Estado: activo. Aplica al Dashboard, la web personal y las herramientas científicas publicadas por Jorge Parra.

## Objetivo

Las aplicaciones conservan un color de acento y recursos gráficos propios, pero comparten una base visual, navegación, semántica, accesibilidad y comportamiento responsive. Este contrato evita una librería de componentes común: cada repositorio lo implementa con CSS local y su stack actual.

## Lenguaje visual común

| Elemento | Regla visual |
| --- | --- |
| Tipografía | Inter, Aptos o la sans-serif del sistema. La tipografía monoespaciada se reserva para datos, unidades y código. |
| Neutros | Tinta `#141713`, texto secundario `#697068`, fondo `#f6f7f3`, superficie blanca y borde `#d8dcd5`. Los lienzos científicos pueden ajustar el fondo para mejorar la lectura. |
| Acento | Cada aplicación conserva un único acento reconocible. Se usa en la acción primaria, el foco, la selección activa y detalles de marca; no sustituye a etiquetas de estado. |
| Geometría | Controles con radio de 8 px, paneles de 14–16 px y píldoras solo para estados o acciones compactas. |
| Cabecera | Superficie clara, borde inferior fino, marca a la izquierda y `All tools`, ayuda y estado/contexto a la derecha. Las herramientas pueden usar una segunda fila para navegación o proyectos densos. |
| Acciones | La primaria usa el acento y peso alto; las secundarias usan superficie blanca y borde neutro. Altura mínima: 36 px en escritorio y 44 px en viewport estrecho. |
| Campos | Fondo blanco, borde neutro, radio de 8 px, etiqueta visible y aro de foco derivado del acento. |
| Elevación | Las sombras se reservan para paneles flotantes, menús y superficies que realmente se superponen. |

### Jerarquía del workspace

| Patrón | Regla visual |
| --- | --- |
| Panel principal | Superficie blanca, borde neutro y radio de 14 px. Los paneles anidados no añaden otra sombra. |
| Métrica | Etiqueta secundaria, valor prominente con cifras tabulares y unidad separada. Un borde superior con el acento identifica la familia sin codificar el estado. |
| Mensaje | Borde izquierdo de 3 px, fondo semántico suave y texto explícito. Éxito, aviso y error comparten significado entre aplicaciones. |
| Toolbar científica | Controles relacionados dentro de una superficie suave con borde único; la opción activa usa el acento. En móvil puede desplazarse horizontalmente sin provocar overflow de página. |
| Vacío o carga | Explica qué falta o está ocurriendo y, cuando proceda, cuál es la siguiente acción. No depende solo de una ilustración o spinner. |

## Reglas obligatorias

| Área | Regla | Comprobación mínima |
| --- | --- | --- |
| Navegación | Toda herramienta incluye un enlace visible a `https://jorpago2.github.io/`. El texto puede ser `All tools` o `Online Simulators & Tools`; no abre una pestaña nueva. | El enlace es visible, accesible con teclado y funciona a 360 px. |
| Semántica | Usar landmarks nativos (`header`, `nav`, `main`, `aside`, `footer`) cuando describan una región. Los botones ejecutan acciones y los enlaces navegan. | El documento tiene un `main` único y un orden de encabezados lógico. |
| Salto al contenido | Las interfaces con cabecera o navegación persistente incluyen un enlace inicial para saltar al workspace principal. | El enlace aparece al recibir foco y mueve el foco al contenido. |
| Etiquetas | Cada campo tiene una etiqueta programática. Los iconos sin texto incluyen un nombre accesible; los decorativos se ocultan a tecnologías de asistencia. | No hay controles sin nombre accesible. |
| Teclado y foco | Todas las funciones esenciales son operables con teclado y muestran un foco claramente visible. Los diálogos devuelven el foco al control que los abrió. | Recorrido completo con `Tab`, `Shift+Tab`, `Enter`, `Space` y `Escape` cuando proceda. |
| Tamaño de controles | Los objetivos táctiles miden al menos 44 px en viewport estrecho. En escritorio pueden reducirse a 36 px si mantienen separación suficiente. | Medición a 360 px y escritorio. |
| Responsive | No se ocultan acciones esenciales ni aparece scroll horizontal de página a 360 px. El contenido se adapta antes de reducir legibilidad. | Revisar 360 px, 768 px y un escritorio de al menos 1280 px. |
| Movimiento | Las animaciones respetan `prefers-reduced-motion`. Ninguna transición es necesaria para comprender un resultado. | Con reducción de movimiento, la interfaz sigue siendo plenamente utilizable. |
| Contraste | Texto, foco, bordes funcionales y estados mantienen contraste legible sobre su fondo. El color nunca es el único indicador de estado. | Inspección de estados normal, foco, error y deshabilitado. |

## Controles y jerarquía

- Cada contexto tiene una acción primaria inequívoca; las acciones secundarias no compiten visualmente con ella.
- Las acciones destructivas se separan de las frecuentes, se nombran de forma explícita y piden confirmación cuando la pérdida no es recuperable.
- Un control deshabilitado conserva su etiqueta y comunica la razón cerca del control cuando no sea evidente.
- Toolbars densas pueden agrupar exportaciones o acciones infrecuentes, pero no esconder la ejecución principal, el estado ni la navegación al Dashboard.
- Los valores repetidos de color, espaciado, borde y sombra se definen como variables CSS locales siguiendo el lenguaje visual común.

## Estados de aplicación

Toda operación asíncrona o cálculo distingue, cuando corresponda:

1. `idle`: todavía no existe un resultado.
2. `running`: el cálculo está activo; se evita lanzarlo dos veces y se muestra progreso o actividad textual.
3. `success`: el resultado está disponible y se identifica cuándo o con qué parámetros se obtuvo.
4. `warning`: el resultado existe, pero tiene límites, extrapolaciones o advertencias relevantes.
5. `error`: se explica qué falló y qué acción puede corregirlo sin borrar entradas válidas.

Los cambios de estado se anuncian mediante un elemento de estado nativo o una región `aria-live` adecuada. Un spinner sin texto no es suficiente.

## Reglas para herramientas científicas

- Cada parámetro muestra nombre, unidad y rango válido o recomendado.
- La validación ocurre antes del cálculo y no corrige silenciosamente entradas físicas inválidas.
- Los resultados diferencian valor, unidad, incertidumbre y calidad numérica cuando estén disponibles.
- Las advertencias de convergencia, discretización, extrapolación o validez del modelo permanecen junto al resultado afectado.
- Los gráficos tienen título o nombre accesible, ejes con magnitud y unidad, leyenda cuando sea necesaria y una alternativa exportable o textual para los valores relevantes.
- Las hipótesis del modelo y el alcance se pueden consultar sin abandonar el workspace.
- El procesamiento local se indica cuando sea cierto; no se promete privacidad local si existe transmisión de datos.

## Criterio de finalización

Antes de publicar un cambio de interfaz:

- [ ] El lint, typecheck, tests y build propios del repositorio pasan.
- [ ] No hay errores nuevos en la consola ni recursos locales rotos.
- [ ] El flujo principal funciona con teclado.
- [ ] Se revisan 360 px, 768 px y escritorio sin overflow de página.
- [ ] Foco, estados, errores y controles deshabilitados siguen siendo comprensibles.
- [ ] El enlace al Dashboard permanece visible y operativo.
- [ ] Los cambios científicos conservan unidades, validaciones y advertencias existentes.

## Excepciones

Una excepción es válida cuando la visualización científica o el espacio de trabajo la exige. Debe limitarse al componente afectado y documentarse en el README o en una prueba del repositorio. Una excepción no justifica perder navegación, acceso por teclado, validación física ni comunicación de errores.
