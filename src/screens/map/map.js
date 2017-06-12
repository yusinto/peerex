import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import Button from 'react-native-button';
import MapView from 'react-native-maps'; // GOTCHA: had to install babel-plugin-module-resolver to solve a bug! https://github.com/airbnb/react-native-maps/issues/795
import SteppedInput from './../../components/steppedInput';
import GooglePlaces from './googlePlaces';
import {colors} from './../../styles';
import MerchantTile from './merchantTile';
import MERCHANTS from '../../data/merchants.json';

const marker = require('../../../assets/images/map-marker.png');
const selectedMarker = require('../../../assets/images/map-marker-selected.png');

export default class Map extends Component {
  //http://stackoverflow.com/questions/42261011/react-navigation-switching-background-colors-and-styling-stacknavigator
  static navigationOptions = {
    title: 'How much do you need?',
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTitleStyle: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '300',
    },
    //headerLeft: TODO: hamburger slide out menu
  };

  constructor(props) {
    super(props);

    this.regionFrom = this.regionFrom.bind(this);
    this.onPressMarker = this.onPressMarker.bind(this);
    this.renderMerchantTile = this.renderMerchantTile.bind(this);
    this.markers = [];
  }

  state = {
    initialPosition: {
      latitude: 1.286288, // HACK: hardcode to Boat Quay so 5footwayinn hostels are centered
      longitude: 103.850218,
      accuracy: 32, // GOTCHA: adjust this to get the correct zoom levels
    },
    lastPosition: {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
    },
    selectedMerchantIndex: 0,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {coords} = position;
        this.setState({
          initialPosition: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
          }
        })
      },
      (error) => alert(JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );

    this.watchID = navigator.geolocation.watchPosition(position => {
      const {coords} = position;
      this.setState({
        lastPosition: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
        }
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  // Ripped from https://github.com/airbnb/react-native-maps/issues/505
  regionFrom(lat, lon, accuracy) {
    const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
    const circumference = (40075 / 360) * 1000;

    const accuracyZoomedOut = accuracy * 40;
    const latDelta = accuracyZoomedOut * (1 / (Math.cos(lat) * circumference));
    const lonDelta = (accuracyZoomedOut / oneDegreeOfLongitudeInMeters);

    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta: Math.max(0, latDelta),
      longitudeDelta: Math.max(0, lonDelta)
    };
  }

  renderSeparator = () => {
    return <View style={styles.merchantTileSeparator}/>;
  };

  renderMerchantTile(merchant, index) {
    const selectedMerchant = MERCHANTS[this.state.selectedMerchantIndex];

    return (
      <MerchantTile
        onPress={this.onPressFlatListItem}
        merchant={merchant}
        merchantIndex={index}
        isSelected={selectedMerchant.key === merchant.key}
      />
    );
  }

  onPressMarker(e, index) {
    this.setState({selectedMerchantIndex: index});
    this.flatList.scrollToIndex({viewPosition: 0.5, index});

    // maintain an array of all markers so we can get a reference to it
    //const selectedMarker = this.markers[index];
    //selectedMarker.showCallout();
  }

  onPressFlatListItem = (index) => {
    // TODO: open merchant details page instead of selecting markers
    this.props.navigation.navigate('Merchant', {index: index});

    //this.setState({selectedMerchantIndex: index});
    //this.flatList.scrollToIndex({viewPosition: 0.5, index});
  };

  render() {
    const {initialPosition: {longitude, latitude, accuracy}} = this.state;
    const initialRegion = this.regionFrom(latitude, longitude, accuracy);

    return (
      <View style={styles.root}>
        <SteppedInput />
        <GooglePlaces />
        {
          longitude !== 0 && latitude !== 0 &&
          <MapView
            ref={ref => this.map = ref}
            style={styles.map}
            showsUserLocation={true}
            initialRegion={initialRegion}>
            {
              MERCHANTS.map((m, i) =>
                <MapView.Marker
                  coordinate={m.latLong}
                  title={m.title}
                  description={m.description}
                  key={`marker-${i}`}
                  ref={ref => this.markers[i] = ref}
                  onPress={(e) => this.onPressMarker(e, i)}
                  image={this.state.selectedMerchantIndex === i ? selectedMarker : marker}
                />
              )
            }
            <FlatList
              horizontal
              style={styles.merchantTilesContainer}
              data={MERCHANTS}
              ItemSeparatorComponent={this.renderSeparator}
              extraData={this.state}
              ref={ref => this.flatList = ref}
              renderItem={({item, index}) => this.renderMerchantTile(item, index)}
            />
          </MapView>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.primary,
    width: '100%',
  },
  merchantTileSeparator: {
    width: 15,
  },
  merchantTilesContainer: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    height: 160,
    width: '100%',
    paddingBottom: 10
  },
  map: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    height: 14,
    width: 9.5,
  }
});
