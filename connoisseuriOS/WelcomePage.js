'use strict';

var React = require('react-native');
var SearchPage = require('./SearchPage');

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
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  description: {
    fontFamily: 'Hiragino Sans',
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F26C68'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Helvetica Neue'
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
  }
});

class WelcomePage extends Component {
  onSearchPressed() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./Resources/sweet-icon.png')} style={styles.image}/>
        <Text style={styles.description}>
          Welcome to Connoisseur
        </Text>
        <Text style={styles.description}>
          Where We Match Your Taste
        </Text>
        <Text style={styles.description}>
          Cheers!
        </Text>
        <TouchableHighlight style={styles.button}
            //onPress={this.onSearchPressed.bind(this)}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = WelcomePage;
