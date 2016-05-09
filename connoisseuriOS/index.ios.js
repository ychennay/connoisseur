/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

var React = require('react-native');
var WelcomePage = require('./WelcomePage');

var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80,
    fontFamily: 'Arial'
  },
  container: {
    flex: 1
  }
});

class PropertyFinderApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Connoisseur',
          component: WelcomePage,
        }}/>
    );
  }
}

React.AppRegistry.registerComponent('connoisseuriOS', function() { return PropertyFinderApp });
