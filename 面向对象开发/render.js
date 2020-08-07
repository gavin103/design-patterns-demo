class Render {
  constructor(domList) {
    this.list = [...domList]
  }
  changeItem(key) {
    this.list.forEach(item => {
      if (item.innerText == key) {
        item.className = "active"
      } else {
        item.className = ""
      }
    })
  }
}
export default Render