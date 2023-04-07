/* copy JSON

document.getElementById('clipboard-icon').addEventListener('click', () => {
  function listener(e) {
    e.clipboardData.setData(
      'text/html',
      document.getElementById('json-preview-code').innerText
    );
    e.clipboardData.setData(
      'text/plain',
      document.getElementById('json-preview-code').innerText
    );
    e.preventDefault();
  }

  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
});
*/
