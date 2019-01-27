var monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

Date.prototype.customString = function() {
    let day = this.getDate()
    let month = monthNames[this.getMonth()]
    let year = this.getUTCFullYear()
    return `${day} ${month} ${year}`
}
