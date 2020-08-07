import InputManager from './inputmanager.js'
import { factory4Render } from './render.js'
import { factory4RenderWithAlert } from './renderwithalert.js'

const RENDERWITHALERT = Symbol('render-with-alert')
const RENDER = Symbol('render')

const config = new Map()
config.set(RENDERWITHALERT, factory4RenderWithAlert)
config.set(RENDER, factory4Render)

class Initiator {
  constructor() {
    this.factory = () => { }
  }
  init() {
    const that = this
    const n = Math.random()
    if (n > 0.8) {
      that.factory = config.get(RENDERWITHALERT)
    } else {
      that.factory = config.get(RENDER)
    }
    new InputManager(
      that.factory()
    )
  }
}

const i = new Initiator
i.init()