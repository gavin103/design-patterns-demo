import LightFactory from './lightfactory.js'
import DarkFactory from './darkfactory.js'
(function () {
  const domBtn = document.querySelector('.content a');
  domBtn.addEventListener('click', () => {
    switch (window.theme) {
      case 'dark':
        return new LightFactory;
      case 'dark':
      default:
        return new DarkFactory;
    }
  })
})()