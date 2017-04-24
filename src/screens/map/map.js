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

const marker = require('../../../assets/images/map-marker.png');
const selectedMarker = require('../../../assets/images/map-marker-selected.png');

const MERCHANTS = [
  {
    key: 'Wink Hostel',
    title: 'Wink Hostel',
    description: '8A Mosque St , Chinatown, Singapore 059488',
    latLong: {
      latitude: 1.2840546,
      longitude: 103.8441844,
    },
    imageUrl: 'https://www.hotelsharbor.com/photos/Texas/Dallas/texas_dallas_hyatt_summerfield_suites_dallas_lincoln_park/hyatt_summerfield_suites_dallas_lincoln_park_dallas_1.jpg',
  },
  {
    key: 'Fernloft Chinatown',
    title: 'Fernloft Chinatown',
    description: '5 Banda St, Singapore 050005',
    latLong: {
      latitude: 1.2812237,
      longitude: 103.8433654,
    },
    imageUrl: 'https://tex.org/wp-content/uploads/2013/06/Comfort-Inn-Near-SeaWorld.jpg',
  },
  {
    key: 'Backpackers\' Inn',
    title: 'Backpackers\' Inn',
    description: '27 Mosque Street, Singapore  059505',
    latLong: {
      latitude: 1.2834953,
      longitude: 103.8455346,
    },
    imageUrl: 'https://images.trvl-media.com/hotels/7000000/6200000/6196500/6196500/6196500_382_z.jpg',
  },
  {
    key: 'Beds and Dreams Inn@ChinaTown',
    title: 'Beds and Dreams Inn@ChinaTown',
    description: '52 Temple St, Singapore 058597',
    latLong: {
      latitude: 1.2833648,
      longitude: 103.8436216,
    },
    imageUrl: 'https://s-media-cache-ak0.pinimg.com/236x/8a/8e/55/8a8e5530bfa905af20bab0d63d98ab46.jpg',
  },
  {
    key: 'Maple Lodge',
    title: 'Maple Lodge',
    description: '66 Pagoda St, Singapore 059225',
    latLong: {
      latitude: 1.283754,
      longitude: 103.8439911,
    },
    imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-o/0a/c7/34/99/this-hotels-reflects.jpg',
  },
];
export default class Map extends Component {
  //http://stackoverflow.com/questions/42261011/react-navigation-switching-background-colors-and-styling-stacknavigator
  static navigationOptions = {
    title: 'How much do you need?',
    header: {
      visible: true,
      //left: null,  // TODO: replace this with hamburger slider menu
      style: {
        backgroundColor: colors.primary,
      },
      titleStyle: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '300',
      },
      tintColor: colors.white,
    }
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
      latitude: 1.282940, // hardcode to Tiong Bahru chicken rice
      longitude: 103.843417,
      accuracy: 5,
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

  onPressMarker(e, index) {
    console.log(`marker pressed! ${e}, markerIndex: ${index}`);
    this.setState({selectedMerchantIndex: index});
    this.flatList.scrollToIndex({viewPosition: 0.5, index});

    // maintain an array of all markers so we can get a reference to it
    //const selectedMarker = this.markers[index];
    //selectedMarker.showCallout();
  }

  renderSeparator = () => {
    return <View style={styles.merchantTileSeparator}/>;
  };

  renderMerchantTile(merchant) {
    const selectedMerchant = MERCHANTS[this.state.selectedMerchantIndex];

    return (
      <MerchantTile
        merchant={merchant}
        isSelected={selectedMerchant.key === merchant.key}/>
    );
  }

  render() {
    const {initialPosition: {longitude, latitude, accuracy}} = this.state;
    const initialRegion = this.regionFrom(latitude, longitude, accuracy);

    return (
      <View style={styles.root}>
        <SteppedInput />
        <GooglePlaces />
        {
          longitude !== 0 && latitude !== 0 &&
          <MapView style={styles.map}
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
              renderItem={({item}) => this.renderMerchantTile(item)}
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
    top: 190,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    height: 14,
    width: 9.5,
  }
});
