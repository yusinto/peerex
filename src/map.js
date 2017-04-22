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
import SteppedInput from './components/steppedInput';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const marker = require('../assets/images/map-marker.png');
const selectedMarker = require('../assets/images/map-marker-selected.png');

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
        backgroundColor: '#21BE82',
      },
      titleStyle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '300',
      },
      tintColor: '#FFFFFF',
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
    selectedMarkerIndex: 0,
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
    const selectedMarker = this.markers[index];

    //TODO: this does not work.
    //selectedMarker.image = require('../assets/images/map-marker-selected.png');

    this.setState({selectedMarkerIndex: index});
    selectedMarker.showCallout();
  }

  renderSeparator = () => {
    return <View style={styles.merchantTileSeparator}/>;
  };

  renderMerchantTile(merchant) {
    return (
      <View style={styles.merchantTile}>
        <Text style={styles.merchantTileTitle}>{merchant.title}</Text>
        <Image style={styles.merchantImage}
               source={{uri: merchant.imageUrl}}/>
        <Text style={styles.merchantTileFooter}>100m away</Text>
      </View>
    );
  }

  /**
   * copy marker code from here: https://github.com/airbnb/react-native-maps/issues/725
   *  <MapView.Marker
   key={`marker-${index}`}
   coordinate={{ latitude: Number(latitude), longitude: Number(longitude) }}
   onPress={options.onPress ? () => options.onPress(marker) : false}
   image={icons[marker.type] || icons.default}
   style={styles.marker}
   identifier={marker._id}
   />
   */
  render() {
    const {initialPosition: {longitude, latitude, accuracy}} = this.state;
    const initialRegion = this.regionFrom(latitude, longitude, accuracy);

    return (
      <View style={styles.root}>
        <SteppedInput />
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data);
            console.log(details);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyDbcaY5CwnzdvAjAQvg4QADfFOPEtWbR40',
            language: 'en', // language of the results
            //types: '(cities)', // don't specify types so all types are returned
          }}
          styles={{
              textInputContainer: {
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth:0,
                width: '88%',
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          //predefinedPlaces={[homePlace, workPlace]}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
        <View style={styles.textInputContainer}>
          <TextInput style={styles.locationTextInput} placeholder="location"/>
        </View>
        { longitude !== 0 && latitude !== 0 &&
        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={initialRegion}
        >
          {
            MERCHANTS.map((m, i) => {
                let markerImage = this.state.selectedMarkerIndex === i ? selectedMarker : marker;

                return (
                  <MapView.Marker
                    coordinate={m.latLong}
                    title={m.title}
                    description={m.description}
                    key={`marker-${i}`}
                    ref={ref => this.markers[i] = ref}
                    onPress={(e) => this.onPressMarker(e, i)}
                  >
                    <Image source={markerImage}/>
                  </MapView.Marker>
                );
              }
            )
          }
          <FlatList
            horizontal
            style={styles.merchantTileContainer}
            data={MERCHANTS}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({item}) => this.renderMerchantTile(item)}
          />
        </MapView>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  merchantTileFooter: {
    marginTop: 6,
    marginLeft: 10,
    fontSize: 11,
    color: '#383838',
  },
  merchantImage: {
    height: 80,
    width: 180,
    alignSelf: 'center',
    marginTop: 10,
  },
  merchantTileTitle: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 13,
    color: '#383838',
    fontWeight: '500',
  },
  merchantTileSeparator: {
    width: 15,
  },
  merchantTileContainer: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    height: 150,
    width: '100%',
  },
  merchantTile: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: 200,
    borderTopWidth: 3,
    borderTopColor: '#21BE82',
    borderRadius: 2,
  },
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#21BE82',
    width: '100%',
  },
  textInputContainer: {
    width: '88%',
  },
  amountRequestedTextInput: {
    marginTop: 10,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  locationTextInput: {
    marginTop: 10,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#00A76D',
    borderRadius: 4,
  },
  map: {
    position: 'absolute',
    top: 115,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    height: 14,
    width: 9.5,
  }
});
