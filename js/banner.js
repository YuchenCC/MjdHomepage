//topSlides
+function () {
    var Slides = {
        ID: 'topSlides',
        number: 7,
        liststyle: 'none',
        interval: 6000,
        hoverable: true,
        width: 100,
        start: 0,
        transition: '0.5s',
        button: true
    }

    console.log(Slides)
    let intervalID = setInterval(function () {
        let count = change(Slides.number, Slides.width, Slides.start, Slides.ID, Slides.transition, Slides.button)
        Slides.start = count
    }
        , Slides.interval)

    function change(number, width, start, ID, transition, list) {
        let $slides = $(`#${ID}>.wrapper`)
        let count = start
        let tmp = - width * count

        if (count === number) {
            //console.log(tmp) 
            let $imgEnd = $slides.children().children()
                .eq(0).clone()
            $imgEnd.appendTo($slides.children())
            $slides.css('transform', `translateX(${tmp}%)`)
                .one('transitionend', function () {
                    $slides.css('transition', 'none')
                    $slides.css('transform', `translateX(0%)`)
                    $imgEnd.remove()
                })
            if (list) {
                let $list = $(`#${ID}>.choose`)
                    .children().children().eq(0)
                    .removeClass('defaultBut').addClass('activeBut')
                    .siblings()
                    .removeClass('activeBut').addClass('defaultBut')
            }
            return count = 1
        }
        $slides.css('transition', `all ${transition}`)
        $slides.css('transform', `translateX(${tmp}%)`)
        if (list) {
            let $list = $(`#${ID}>.choose`)
            //console.log($list)
            $list.children().children().eq(count)
                .removeClass('defaultBut').addClass('activeBut')
                .siblings()
                .removeClass('activeBut').addClass('defaultBut')
        }
        return count += 1
    }
}()