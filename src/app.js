const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather app",
        name: 'Arthur'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About me",
        name: 'Arthur'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: "Welcome to the help page",
        name: 'Arthur'
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must give a valid address'
        })
    }

    geocode(req.query.search, (error, {latitude, longitude, location} ={})=>{
        //console.log(error)
        if(error){
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                address: req.query.search,
                location,
                forecastdata
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: "404",
        name: 'Arthur',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: "404",
        name: 'Arthur',
        errorMessage: 'Page not found'
    })
})

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})