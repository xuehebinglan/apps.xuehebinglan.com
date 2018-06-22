export default {
  GetToday () {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth()
    let day = today.getDate()
    return {
      CNtoday: year + '年' + this.addFirstZeroForDate(month + 1) + '月' + this.addFirstZeroForDate(day) + '日',
      date: '' + year + this.addFirstZeroForDate(month + 1) + this.addFirstZeroForDate(day),
      year,
      month,
      day
    }
  },
  addFirstZeroForDate (num) {
    if (num < 10) {
      return '0' + num
    }
    return num + ''
  }
}
