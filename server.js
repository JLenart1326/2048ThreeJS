var express = require("express")
var app = express()
var path = require("path")
var cookieParser = require("cookie-parser");
var hbs = require('express-handlebars');
var context = require("./data/data.json")
const PORT = process.env.PORT || 3000;

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    partialsDir: "views/partials",
    helpers: {
        exampleHelper: function (title) {
            return title.toUpperCase();
        },
    }
}));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');   


app.get('/html', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
})
app.get('/', function (req, res) {
    // res.render('index.hbs');   // nie podajemy ścieżki tylko nazwę pliku
    // res.render('index.hbs', { layout: null });
    // res.render('index02.hbs', { layout: "main.hbs" }); // opcjonalnie podajemy konkretny layout dla tego widoku
    res.render('index.hbs', context);
})


app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

