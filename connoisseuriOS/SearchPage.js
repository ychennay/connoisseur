import React from 'react';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import SearchResults from './SearchResults';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component,
  AlertIOS
} from 'react-native';

var styles = StyleSheet.create({
  description: {
    fontFamily: 'Cochin',
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#275B8A'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Cochin'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#275B8A',
    borderColor: '#275B8A',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 5,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#275B8A',
    borderRadius: 8,
    color: '#275B8A',
    fontFamily: 'Cochin'
  },
  image: {
    width: 217,
    height: 138
  }
});

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
    country: 'uk',
    pretty: '1',
    encoding: 'json',
    listing_type: 'buy',
    action: 'search_listings',
    page: pageNumber
  };

  data[key] = value;

  var querystring = Object.keys(data)
  .map(key => key + '=' + encodeURIComponent(data[key]))
  .join('&');

  var q = 'name' + '=' + value;

  return 'http://localhost:3000/search?' + q;// + querystring;
}

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isLoading: false,
      message: ''
    };
  }

  onSearchTextChanged(event) {
    this.setState({
      searchString: event.nativeEvent.text
    });
  }

  _executeQuery(query) {
    console.log(query);
    this.setState( {isLoading: true} );

    fetch(query, {method: "GET"})
        .then((response) => response.json())
        .then((json) => this._handleResponse(json))
        .catch(error =>
            this.setState({
              isLoading: false,
              message: 'Something bad happened ' + error
            }));

    /*
    fetch(query, {method: "GET}"})
    .then(response => response.json())
    .then(responseData => this._handleResponse(responseData))
    .catch(error =>
      this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
      }));
      */
  }

  _handleResponse(response) {
    this.setState({
      isLoading: false,
      message: ''
    });

    if (response.length > 0) {
      this.props.navigator.push({
        title: 'Results',
        component: SearchResults,
        passProps: {listings: response}
      });
    } else {
      this.setState({
        message: 'Location not recognized; please try again.'
      });
    }

  }

  onSearchPressed() {
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  render() {
    var spinner = this.state.isLoading ?
        ( <ActivityIndicatorIOS size='large'/> ) : ( <View/> );

    return (
      <View style={styles.container}>
        <Image source={require('./Resources/restaurant_1.jpg')} style={styles.image}/>
        <Text style={styles.description}>
          Search for the best dining locations in Santa Monica!
        </Text>
        <Text style={styles.description}>
          Search by restaurant name.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Search via name or postcode'/>
          <TouchableHighlight style={styles.button}
              onPress={this.onSearchPressed.bind(this)}
              underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

module.exports = SearchPage;
