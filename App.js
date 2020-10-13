import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from "react-native-maps";
import * as Permissions from 'expo-permissions';
import RNLocation from 'react-native-location';

import { DestinationButton } from './Components/DestinationButtons'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { region :
      {
        latitude: 46.988302,
        longitude: 3.157983,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }
    }
      this._getRNLocationAsync();
  }

  _getRNLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.RNLOCATION);
      if (status !== 'granted')
        console.log('Permission to acces location was denied.');

    let location = await RNLocation.getCurrentPositionAsync({enabledHighAccuracy: true})
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    }
    this.setState({region: region})
  }

  render()
  {
    return (
      <View style={styles.container}>
        <Text>HomeScreen!</Text>
        <DestinationButton />
        <MapView
        showsTraffic = {true}
        initialRegion = {this.state.region}
        showsUserLocation = {true}
        showsCompass = {true}
        rotateEnabled = {false}
        style = {{flex:1}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
