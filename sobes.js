const Widget = {
  init(width, height) {
    this.width = width || 50
    this.height = height || 50
    this.$elem = null
  },
  insert($where) {
    if (this.$elem) {
      this.$elem.css({
        width: `${this.width}px`,
        height: `${this.height}px`,
      }).appendTo($where)
    }
  },
}

const Button = Object.create(Widget)

Button.setup = function (width, height, label) {
  // делегированный вызов
  this.init(width, height)
  this.label = label || 'Default'

  // this.$elem = $('<button>').text(this.label)
}
Button.build = function ($where) {
  // делегированный вызов
  this.insert($where)
  this.$elem.click(this.onClick.bind(this))
}
Button.onClick = function (evt) {
  console.log(`Button '${this.label}' clicked!`)
}

// $(document).ready(() => {
// const $body = $(document.body)

const btn1 = Object.create(Button)
btn1.setup(125, 30, 'Hello')
const btn2 = Object.create(Button)
btn2.setup(150, 40, 'World')
console.log(btn1, btn2)

// btn1.build($body)
// btn2.build($body)
// })
