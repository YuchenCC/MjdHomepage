+function () {
    let $time = $('#flashSale>.title>.time')
    let $countdown = $('#flashSale>.title>.countdown')
    setInterval(function () { countdown($time, $countdown) }, 1000)
}()

function countdown($time, $countdown) {
    let now = new Date()
    let minites = 59 - now.getMinutes()
    let seconds = 59 - now.getSeconds()
    if (minites < 10) {
        minites = `0${minites}`
    }
    if (seconds < 10) {
        seconds = `0${seconds}`
    }

    $time.text(`${now.getHours()}点场`)
    $countdown.children().eq(1).text(`${minites}`)
    $countdown.children().eq(2).text(`${seconds}`)
}
+function () {
    let $killList = $('.showlist>ul')

    $.get('json\\kill.json', function (response, request) {
        response.map((object) => {
            let $li = $('<li></li>')
            let $div = $('<div></div>')
            let $img = $('<img></img>').attr('src', object.url).appendTo($div)
            $div.appendTo($li)
            let $pAfter = $(`<p><span>￥</span>${object.priceAfter}</p>`).addClass('priceAfter').appendTo($li)
            let $span = $('<span></span>').text(object.priceBefore)
            let $pBefore = $('<p></p>').addClass('priceBefore').append($span).appendTo($li)
            $li.appendTo($killList)
            //console.log($li)        
        })
        let $liLast = $(`<li><a href=""><div class="showall"><span>查看全部</span></div></a></li>`)
        $liLast.appendTo($killList)
    }).done(killSlides())
}()

function killSlides() {
    let initPosition = undefined
    let touchStartX = undefined
    let touchEndX = undefined
    let $killList = $('.showlist>ul')
    let touchMaxwidth = undefined
    $killList.on('touchstart', function (e) {
        e.preventDefault()
        let width = $killList.children().eq(0).width()
        let ulWidth = width * 21
        touchMaxwidth = width * -17
        //console.log(ulWidth)
        $killList.width(`${ulWidth}px`)
        //console.log($killList.width())
        touchStartX = e.touches[0].pageX
        //console.log(e)
        let regex = new RegExp("matrix\\(\\s*\\d*,\\s*\\d*,\\s*\\d*,\\s*\\d*,\\s*(.+),.*", "g");
        let kill = $killList.css('transform')
        if ((match = regex.exec(kill)) != null) {
            initPosition = parseInt(match[1])
            console.log(`initPosition is ${initPosition}`)
        }
        console.log(`touchStartX is ${touchStartX}`)
        
    })

    let timeID = setInterval(function(){
        
    $killList.on('touchmove', function (e) {
        initPosition = initPosition || 0
        e.preventDefault()
        touchEndX = e.touches[0].pageX
        //$killList.css('transition', `0.5 all`)
        //let change =  touchEndX - touchStartX
        console.log(`touchStartX is ${touchStartX}`)
        console.log(`touchEndX is ${touchEndX}`)
        //console.log(`touchEndX is ${touchEndX}`)
        //console.log(typeof parseInt(initPosition) )
        let movePosition = (touchEndX - touchStartX) * window.devicePixelRatio
        if (movePosition * movePosition < 144)
        { movePosition = 0 }
        change = movePosition + initPosition
        if (change < touchMaxwidth) { change = touchMaxwidth }
        if (change > 0) { change = 0 }
        console.log(change)
        $killList.css('transform', `translateX(${change}px)`)
        $killList.off( "touchmove")
    })
    },150)


}


