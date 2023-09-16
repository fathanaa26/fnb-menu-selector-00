const getFortune = require('./fortune_generator.js')

exports.home = (req, res) => {
    res.render('home', {
        quote: getFortune.getFortune()
    })
}

exports.about = (req,res) => {
    res.render('about')
}

exports.header = (req,res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
.map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
}

exports.notFound = (req, res) => {
    res.render('404')
}

exports.intError = (err, req, res, next) => {
    console.error(err)
    res.render('500')
}