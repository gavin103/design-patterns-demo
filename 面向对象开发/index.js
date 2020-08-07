import InputManager from './inputmanager.js'
import Render from './render.js'
import RenderWithALert from './renderwithalert.js'

// 下面两种实现，根据传递的类不同，调用的方法有差别，结果不同，实现了多态
// new InputManager(Render)
new InputManager(RenderWithALert)

