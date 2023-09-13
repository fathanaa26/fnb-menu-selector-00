const getFortune = require('./fortune_generator.js')

exports.home = (req, res) => {
    res.render('home', {
        quote: getFortune.getFortune()
    })
}

exports.about = (req,res) => {
    res.render('about')
}

exports.notFound = (req, res) => {
    res.render('404')
}

exports.intError = (err, req, res, next) => {
    console.error(err)
    res.render('500')
}