var zipcodes = require('zipcodes');

class Weather{
    getLatandLong(res,req){
        var zipInfo = zipcodes.lookup(this.props.zipcode);
        return res.send({data:zipInfo});
    }
}
module.exports = Weather;