'use strict';

var React = require('react-native');
var SearchResults = require('./SearchResults');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component,
  AlertIOS
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
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
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
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
      searchString: 'Search for a restaurant',
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
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode, or search near your location.
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
        <TouchableHighlight style={styles.button}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
        <Image source={require('./Resources/restaurant.png')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

module.exports = SearchPage;
