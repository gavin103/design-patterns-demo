import Render from './render.js'

export default class RenderWithAlert extends Render {
  constructor(list) {
    super(list)
  }
  changeItem(key) {
    super.changeItem(key)
    alert(key)
  }
}

export const factory4RenderWithAlert = () => RenderWithAlert 
