const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request= require('request');


const lat_long= require('./geocode');
const forecast= require('./forecast')


const app = express()
const port = process.env.PORT || 4000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rushikesh banchare'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rushikesh banchare'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Rushikesh banchare'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'Adress not provided'
        })
    }

     lat_long(req.query.address,(error,{latitude,longitude,location}={})=>
        {
    
            if(error)
            {
                return res.send({ error:error })
            }
            

                forecast(latitude,longitude,(error2,data)=>
                {    
                    if(error2)
                    {
                        return res.send({ error:error2})
                    }

                       return res.send({
                            Forecast: data,
                            location,
                            address: req.query.address
                        })
                
                }) 
            
             
          }); 
    

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rushikesh banchare',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rushikesh banchare',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up: '+'http://localhost:'+port+'/')
})