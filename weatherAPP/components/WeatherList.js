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
      .then(function(response){
        this.setState({ weather: response.data })
    });

  }
  renderCardComponent(){
    if(this.state.viewSection) {
        return (
            <View>
                <Card
            title={"Weather in " + this.state.zipcode}
            >
            <Text style={{marginBottom: 10}}>
                {this.state.weather}
            </Text>
            <Button

            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
        </Card>
            </View>
        )
    }
}

  render () {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <Text>Enter Zipcode</Text>
          <Input
            value={this.state.zicode}
            onChangeText={zipcode => this.setState({ zipcode })}
          />
        </View>

        <Button onPress={this.handleSubmit} title="Submit" />

        {this.renderCardComponent()}
      </View>
    );
  }
}

