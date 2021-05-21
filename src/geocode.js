
const request = require('request');

const lat_long= (address,callback) =>
{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicnVzaGlrZXNoYiIsImEiOiJja2llZmt0cDExMzVvMnFwZWs3ZHJxdWpzIn0.A3zy-O2avucumV0xhS7O8A';
    
    request({url: url, json: true},(error,response) =>
    {
     if(error)
    {
        callback('Unable to connect',undefined);
    }
     else if (response.body.features.length === 0)
     {
        callback('Enter a valid location',undefined);
     }

     else
     {
        callback(undefined,{
            'latitude':response.body.features[0].center[0],
            'longitude':response.body.features[0].center[1],
            'location': response.body.features[0].place_name
         })
     } 
    })
}

module.exports= lat_long;