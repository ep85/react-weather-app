var zipcodes = require('zipcodes');
var request= require('request')
class Weather{
    getLatandLong(req,res){
        var zipInfo = zipcodes.lookup(req.body.zipcode);
        var query=zipInfo.latitude + ','+zipInfo.longitude+'/forecast';
        var options = { method: 'GET',
            url: 'https://api.weather.gov/points/'+query,
            headers: 
            { 'cache-control': 'no-cache',
                Connection: 'keep-alive',
                referer: 'https://api.weather.gov/points/39.7456,-97.0892/forecast',
                'Postman-Token': '2da5d5c4-993a-4e9f-b135-728788eeb8ba,bc0e3c61-a194-4328-a186-21bf65a50296',
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'User-Agent': 'PostmanRuntime/7.15.0' } 
        };

        request(options, function (error, response, body) {
            if (error){
                return res.send({error:'WEATHER API NOT WORKING'});
            } 
            if(body){
                let pbody=JSON.parse(body)
                if(pbody && pbody.properties && pbody.properties.periods && pbody.properties.periods[0]){
                    return res.send({forcast:pbody.properties.periods[0]});
                }else{
                    return res.send({error:'NO WEATHER FOUND'});
                }
            }

        });


    }
}
module.exports = Weather;