import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';


function showError(message) {
    PNotify.error({
      text: message,
      delay: 3000,
    });
  }
  function showNotice(message) {
    PNotify.notice({
      text: message,
      delay: 3000,
    });
  }
  export { showError, showNotice };