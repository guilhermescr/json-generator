// copy JSON
const ALERT_MESSAGE_CONTAINER = document.querySelector(
  '.alert-message-container'
);
const ALERT_MESSAGE_ELEMENT = document.querySelector('.alert-message');
const CLIPBOARD_BUTTON = document.getElementById('clipboard-button');
const JSON_PREVIEW_CODE = document.getElementById('json-preview-code');

function handleClipboardButtonClick() {
  ALERT_MESSAGE_CONTAINER.classList.remove('hide');
  ALERT_MESSAGE_CONTAINER.classList.add('alert-animation');

  navigator.clipboard.writeText(JSON_PREVIEW_CODE.innerText);
  navigator.clipboard.readText().then(response => {
    if (response.search(/[a-z]/i) !== -1) {
      ALERT_MESSAGE_ELEMENT.innerHTML = 'JSON copiado com sucesso!';

      setTimeout(() => {
        ALERT_MESSAGE_CONTAINER.classList.remove('alert-animation');
        ALERT_MESSAGE_CONTAINER.classList.add('hide');
        ALERT_MESSAGE_ELEMENT.innerHTML = '';
      }, 1500);
    }
  });
}

CLIPBOARD_BUTTON.addEventListener('click', handleClipboardButtonClick);
