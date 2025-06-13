export function setContent(html, container = document.getElementById('content')) {
  if (container) {
    container.innerHTML = html;
  }
}
