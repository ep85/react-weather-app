import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button,Card } from 'react-native-elements';
import axios from 'axios';

export default class WeatherList extends Component{
  state = { zipcode: '',lat:'',long:'', weather:'',viewSection:false};

  handleSubmit = async () => {
    //call backend
    axios({
        method: 'post',
        url: 'http://localhost:5000/weather',
        data: {
          zipcode: this.state.zipcode
        }
      })
      .then(res => {
        this.setState({ weather: res.data })
    })

  }
  renderCardComponent(){

    if(this.state.weather) {
        var image
        if(!this.state.weather.forcast.isDaytime){
            image=require("../assets/images/night.jpg")
        }else{
            image=require("../assets/images/day.jpg")
        }
        return (
            <View>
            <Card
            title={"Weather in " + this.state.zipcode}
            image={image}>
            
            <View style={{marginBottom: 10}}>
                <Text>Forcast:{this.state.weather.forcast.shortForecast}</Text>
                <Text>Details:{this.state.weather.forcast.detailedForecast}</Text>
                <Text>Temperature:{this.state.weather.forcast.temperature}{' ' +this.state.weather.forcast.temperatureUnit}</Text>
                <Text>Wind Speed:{this.state.weather.forcast.windSpeed}</Text>
                <Text>Wind Direction:{this.state.weather.forcast.windDirection}</Text>
                {/* {this.state.weather} */}
            </View>
            
        </Card>
            </View>
        )
    }
}

  render () {
    return (
      <View >
        <View style={{ marginLeft:20,marginRight:20 }}>
            <View style={{ marginBottom: 10}}>
            <Text>Enter Zipcode</Text>
            <Input
                value={this.state.zicode}
                onChangeText={zipcode => this.setState({ zipcode })}
            />
            </View>

            <Button onPress={this.handleSubmit} title="Submit" />
        </View>
        {this.renderCardComponent()}
      </View>
    );
  }
}

