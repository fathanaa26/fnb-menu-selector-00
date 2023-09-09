const express = require('express');
const expressHandlebars = require('express-handlebars')
const app = express();
const port = process.env.PORT | 3000;
const path = require('path')

const getFortune = require('./lib/fortune_generator.js')

const hbsEngine = expressHandlebars.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
})

app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', hbsEngine.engine)
app.set('view engine', 'handlebars')

app.get("/", (req, res) => {
    res.render('home', {
        quote: getFortune.getFortune()
    })
})

app.get("/about",(req, res) => {
    res.render('about')
})

app.use((req, res) => {
    res.render('404')
})

app.use((err,req,res) => {
    console.error(err)
    res.render('500')
})

app.listen(port, () => {
    console.log(`im listening on port ${port}`)
})