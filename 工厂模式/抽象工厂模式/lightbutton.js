import Button from './button.js'
class LightButton extends Button {
  constructor() {
    super()
    this.btn = document.querySelector('.content a')
    this.changeBtn()
  }
  changeBtn() {
    this.btn.className = "btn light-btn"
  }
}
export default LightButton