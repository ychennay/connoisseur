/**
 * Created by tygiacalone on 5/1/16.
 */

'use strict';

var React = require('react-native');
var PropertyView = require('./RestaurantView');

var {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text,
    Component
} = React;

var styles = {
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    }
};

class SearchResults extends Component {

    constructor(props) {
        super(props);

        //console.log('Response: ' + JSON.stringify(this.response.listings));

        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.thumb_url !== r2.thumb_url});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.listings)
        }
    }

    rowPressed(propertyGUID) {
        console.log(propertyGUID);
        var property = this.props.listings.filter(prop => prop.username === propertyGUID)[0];

        this.props.navigator.push({
            title: 'Restaurant',
            component: PropertyView,
            passProps: {property: property}
        });
    }

    renderRow(rowData, sectionID, rowID) {
        var price = 0;//rowData.price_formatted.split(' ')[0];
        console.log(rowData);
        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.username)}
                    underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image source={require('./Resources/restaurant.png')} style={styles.thumb}/>
                        <View  style={styles.textContainer}>
                            <Text style={styles.price}>{price}</Text>
                            <Text style={styles.title}
                                  numberOfLines={1}>{rowData.name}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
      );
    }
}

module.exports = SearchResults;
