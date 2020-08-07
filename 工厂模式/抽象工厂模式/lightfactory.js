import Factory from './factory.js'
import LightLayout from './lightlayout.js'
import LightButton from './lightbutton.js'
class LightFactory extends Factory {
  constructor() {
    super()
    window.theme = 'light'
    this.changeLayout();
    this.changeButton();
  }
  changeLayout() {
    return new LightLayout
  }
  changeButton() {
    return new LightButton
  }
}
export default LightFactory