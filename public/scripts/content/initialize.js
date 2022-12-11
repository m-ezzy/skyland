Content.prototype.initialize = function() {
    console.log("content")
    this.details = this.element.getElementsByClassName('details')[0]
    console.log(this.details)
    this.di = this.details.getElementsByTagName('img')[0]
    console.log(this.di)
    this.dt = this.details.getElementsByTagName('div')[1]
    console.log(this.dt)
}
