import Layout from './layout.js'
class DarkLayout extends Layout {
  constructor() {
    super()
    this.header = document.querySelector('header')
    this.footer = document.querySelector('footer')
    this.changeTheme()
  }
  changeTheme() {
    this.header.className = "dark"
    this.footer.className = "dark"
  }
}
export default DarkLayout