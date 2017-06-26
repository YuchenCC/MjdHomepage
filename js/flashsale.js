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
            $li = $('<li></li>')
            $div = $('<div></div>')
            $img = $('<img></img>').attr('src', object.url).appendTo($div)
            $div.appendTo($li)
            $pAfter = $('<p><span>￥</span></p>').addClass('priceAfter').text(object.priceAfter).appendTo($li)
            $span = $('<span></span>').text(object.priceBefore)
            $pBefore = $('<p></p>').addClass('priceBefore').append($span).appendTo($li)
            $li.appendTo($killList)
            //console.log($li)        
        })
       let $liLast = $(`<li><a href=""><div class="showall"><span>查看全部</span></div></a></li>`)               
       $liLast.appendTo($killList)
    })
}()

+function(){
    let $killList = $('.showlist>ul')
    $killList.on('touchstart', function (e) {
        e.preventDefault()
        let touchStartX = e.touches[0].pageX
        //console.log(e.touches[0])
        $killList.on('touchmove', function (e) {
            e.preventDefault()
            let touchEndX = e.touches[0].pageX
            let initPosition = 0
            $killList.css('transition', `0.5 all`)
            //let change =  touchEndX - touchStartX
            let kill = $killList.css('transform')
            let regex = new RegExp("matrix\\(\\s*\\d*,\\s*\\d*,\\s*\\d*,\\s*\\d*,\\s*(.+),.*", "g");
            if ((match = regex.exec(kill)) != null) {
                initPosition = match[1]
                //console.log(match[1])

            }
            console.log(`positon is ${initPosition}`)
            console.log(`touchStartX is ${touchStartX}`)
            console.log(`touchEndX is ${touchEndX}`)
            //console.log(typeof parseInt(initPosition) )
            let movePosition = touchEndX - touchStartX
            if (movePosition*movePosition < 100)
            { movePosition = 0 }
            change = movePosition + parseInt(initPosition)
            if (change < -3550) { change = -3550 }
            if (change > 0) { change = 0 }
            //console.log(change1)
            $killList.css('transform', `translateX(${change}px)`)
        })
    })
}()


