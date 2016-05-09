/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

var React = require('react-native');
var WelcomePage = require('./WelcomePage');

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
  }
});

class PropertyFinderApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Login or Sign Up',
          component: WelcomePage,
          navigationBarHidden: true
        }}/>
    );
  }
}

React.AppRegistry.registerComponent('connoisseuriOS', function() { return PropertyFinderApp });
