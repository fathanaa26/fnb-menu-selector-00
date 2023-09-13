const express = require('express');
const expressHandlebars = require('express-handlebars')
const app = express();
const port = process.env.PORT | 3000;
const path = require('path')
const h = require('./lib/handlers.js')

const hbsEngine = expressHandlebars.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
})

app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', hbsEngine.engine)
app.set('view engine', 'handlebars')

app.get("/", h.home)

app.get("/about", h.about)

app.use(h.notFound)

app.use(h.intError)

if(require.main == module){
    app.listen(port, () => {
        console.log(`im listening on port ${port}`)
    })
}else{
    module.exports = app
}

