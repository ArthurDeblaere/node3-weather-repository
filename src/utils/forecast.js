const request = require('request')

const forecast = (lat, long, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=f37fefd18f952e6647e8d8bb73f82352&query=' + lat +',' + long + '&units=m'

    request({ url, json: true }, (error, {body})=>{
        //console.log(error)

        if(error){
            callback('Unable to connect to services')
        }else if(body.error){
            callback('Unable to find location')
        }
        else{
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                windspeed: body.current.wind_speed,
                temperature: body.current.temperature
            })
        }
    })
}

module.exports = forecast

//challenge 37 done