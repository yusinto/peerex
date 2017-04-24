import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GooglePlacesKey} from '../../constants';
import {colors} from '../../styles';

export default GooglePlaces = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Nearby'
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
          key: GooglePlacesKey,
          language: 'en', // language of the results
        }}
      styles={styles}
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      //GoogleReverseGeocodingQuery={{
      //    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      //  }}
      //GooglePlacesSearchQuery={{
      //    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
      //    rankby: 'distance',
      //    types: 'food',
      //  }}
      //filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
  );
};

// GOTCHA: POJO here, not a StyleSheet object because its passed as a prop to googleplaces autocomplete
const styles = {
  container: {
    width: '92.5%',
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 34,
    color: colors.white,
    fontSize: 16,
    backgroundColor: colors.primaryDark,
  },
  predefinedPlacesDescription: {
    color: '#1faadb'
  },
  row: {
  },
  description: {
    color: colors.white,
  },
  separator: {
    color: colors.white,
  }
};
