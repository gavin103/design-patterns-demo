import Factory from './factory.js'
import DarkLayout from './darklayout.js'
import DarkButton from './darkbutton.js'
class DarkFactory extends Factory {
  constructor() {
    super()
    window.theme = 'dark';
    this.changeLayout();
    this.changeButton();
  }
  changeLayout() {
    return new DarkLayout
  }
  changeButton() {
    return new DarkButton
  }
}
export default DarkFactory