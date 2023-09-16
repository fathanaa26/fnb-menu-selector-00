const express = require('express');
const expressHandlebars = require('express-handlebars')
const app = express();
const port = process.env.PORT | 3000;
const path = require('path')
const h = require('./lib/handlers.js')
const weatherMid = require('./lib/middlewares/weather.js')

const hbsEngine = expressHandlebars.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    // 1.4 deklarasi path untuk partials secara manual
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        section: 
            function (name, options){
                if(!this._sections) this._sections = {} 
                this._sections[name] = options.fn(this) 
                return null
            }
    }
})

app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', hbsEngine.engine)
app.set('view engine', 'handlebars')

// 1.5 mengubah urutan middleware dibawah view engine
app.use(weatherMid.weatherMiddleware)

app.get("/", h.home)

app.get("/about", h.about)

app.get("/head",h.header)

app.use(h.notFound)

app.use(h.intError)

if(require.main == module){
    app.listen(port, () => {
        console.log(`HTTP Listening on http://localhost:${port}`)
    })
}else{
    module.exports = app
}

