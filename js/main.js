requirejs(['jquery.min'], function (jquery) {
    console.log('loading jQuery success')
    requirejs(['banner'], function (banner) {
        console.log('loading banner success')
        requirejs(['flashsale'], function (flashsale) {
            console.log('flashsale success')
            console.log('gulp')
    })
    })
})

