# Instrucciones para agentes AI — La_Liga

Propósito: ayudar a agentes asistidos por IA a ser productivos inmediatamente en este repositorio (sitio web estático de una banda).

1) Visión general rápida
- Proyecto: sitio web estático de una sola página (single-page) construido con HTML/CSS/JS. Archivo principal: `index.html`.
- Componentes principales: `header`/`nav`, `#hero`, `#biografia`, `#musica`, `#galeria`, `#contacto`, `footer`.
- Assets: estilos en `style.css`, scripts en `script.js`, imágenes en `images/` y `IMG_3992.JPEG` en la raíz, audios en `audio/`. Formulario envía a `email.php`.

2) Qué cambiar y cómo (patrones concretos)
- Añadir pista de audio: copia el bloque
  <div class="track">\n    <audio controls>\n      <source src="audio/nueva-cancion.mp3" type="audio/mp3">\n    </audio>\n    <p>Nombre de la canción</p>\n  </div>
  y sitúalo dentro de `.music-grid` en `index.html`.
- Añadir imagen a la galería: añade un `<img src="images/nueva-foto.jpg" alt="...">` dentro de `.gallery-grid`.
- Navegación: los `href` del `nav` usan anclas que apuntan a los `id` de las secciones (ej. `href="#musica"` → `section id="musica"`). Mantén esta convención.
- Formulario de contacto: el `<form action="email.php" method="POST">` requiere un servidor con PHP para funcionar. Si editas la lógica de envío, edita `email.php` (no hay otro backend en el repo).

3) Flujo de desarrollo y comandos útiles (macOS / zsh)
- Servidor estático rápido (sin PHP):
  python3 -m http.server 8000
- Servidor con PHP (para probar `email.php`):
  php -S localhost:8000
- Abrir en navegador y usar DevTools (Console / Network) para depurar assets y peticiones.

4) Convenciones y riesgos detectables
- Rutas y mayúsculas: el repo usa `IMG_3992.JPEG` (mayúsculas). Ten cuidado con la sensibilidad de mayúsculas en despliegues Linux.
- Estructura plana: muchos assets referenciados desde la raíz (p. ej. `style.css`, `script.js`) mientras otras están en carpetas (`images/`, `audio/`). Mantén consistencia al mover archivos.
- No hay build system ni package.json; cambios son directos al HTML/CSS/JS.

5) Pautas para PRs y ediciones automáticas
- Mantén la estructura del DOM: evita eliminar los `id` que usa el nav y los anchors.
- Si agregas assets, actualiza sólo las rutas necesarias y comprueba en DevTools que el archivo se sirva (200).
- Para cambios en el formulario, señala en el PR que `email.php` necesita pruebas en entorno con PHP configurado.

6) Qué no asumir
- No hay CI, tests automáticos ni linter configurado en el repositorio.
- No hay integración con servicios externos (APIs) descubiertos en el repo.

7) Archivos clave a revisar
- `index.html` — estructura y ejemplos de uso de audio/galería/form.
- `email.php` — (si existe) lógica del servidor para el formulario; si no está, anotar en PR la falta.
- `style.css`, `script.js` — modifica estilos y comportamiento aquí (no inline salvo casos menores).

Si algo no está claro o quieres que añada ejemplos de PRs/commits concretos, dime qué sección ampliar y lo itero.
