import Button from './button.js'
class DarkButton extends Button {
  constructor() {
    super()
    this.btn = document.querySelector('.content a')
    this.changeBtn()
  }
  changeBtn() {
    this.btn.className = "btn dark-btn"
  }
}
export default DarkButton