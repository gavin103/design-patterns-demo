import Layout from './layout.js'
class LightLayout extends Layout {
  constructor() {
    super()
    this.header = document.querySelector('header')
    this.footer = document.querySelector('footer')
    this.changeTheme()
  }
  changeTheme() {
    this.header.className = "light"
    this.footer.className = "light"
  }
}
export default LightLayout