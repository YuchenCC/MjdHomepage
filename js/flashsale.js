+function(){
let $time = $('#flashSale>.title>.time')
let $countdown = $('#flashSale>.title>.countdown')
setInterval(function(){countdown($time, $countdown)}, 1000)
}()

function countdown($time, $countdown) {
    let now = new Date()
    let minites = 59 - now.getMinutes()
    let seconds = 59 - now.getSeconds()
    if (minites < 10) {
        minites = `0${minites}`
    }
    if (seconds < 10 ) {
        seconds = `0${seconds}`
    }
   
    $time.text(`${now.getHours()}点场`)
    $countdown.children().eq(1).text(`${minites}`)
    $countdown.children().eq(2).text(`${seconds}`)
}









let $time = $('#flashSale>.title>.time')
let $countdown = $('#flashSale>.title>.countdown')