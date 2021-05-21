const request = require('request');

const forecast= function(lat,long,callback)
{
    const url= 'http://api.weatherstack.com/current?access_key=095afed65054dfe9cbf6d2daeab7d255&query='+lat+','+long+'&units=f';

    request({ url:url, json: true},(error,response)=>{
    
        if(error)
        {
            callback('Unable to connect',undefined);
        }
        else if (response.body.error)
        {
            callback('Enter a valid location',undefined);
        }
        else
        {
           callback(undefined, ' It is currently ' + response.body.current.temperature +
            ' degress out. There is a ' + response.body.current.precip + '% chance of rain.');
        }
    } )
    
}

module.exports= forecast;