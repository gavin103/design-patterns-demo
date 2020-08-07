import InputManager from './inputmanager.js'
import Render from './render.js'
import RenderWithALert from './renderwithalert.js'

const RENDERWITHALERT = Symbol('render-with-alert')
const RENDER = Symbol('render')

class Factory {
  constructor(type) {
    switch (type) {
      case RENDERWITHALERT:
        return RenderWithALert;
      case RENDER:
      default:
        return Render
    }
  }
}

class Initiator {
  init() {
    const n = Math.random()
    if (n > 0.8) {
      new InputManager(
        new Factory(RENDERWITHALERT)
      )
    } else {
      new InputManager(
        new Factory(RENDER)
      )
    }
  }
}

const i = new Initiator
i.init()