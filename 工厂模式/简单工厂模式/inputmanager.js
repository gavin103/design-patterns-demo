const KEYS = "0123456789"

class InputManager {
  constructor(Fn) {
    this.render = new Fn(app.getElementsByTagName('span'))
    this.listen()
  }

  listen() {
    const that = this
    document.addEventListener("keydown", function (event) {
      const { key } = event;
      if (KEYS.includes(key)) {
        that.render.changeItem(key)
      } else {
        return false
      }
    });
  }
}

export default InputManager