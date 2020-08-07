import Render from './render.js'
class RenderWithAlert extends Render {
  constructor(list) {
    super(list)
  }
  changeItem(key) {
    super.changeItem(key)
    alert(key)
  }
}
export default RenderWithAlert