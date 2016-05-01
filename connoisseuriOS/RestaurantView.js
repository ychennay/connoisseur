/**
 * Created by tygiacalone on 5/1/16.
 */

'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Image,
    View,
    Text,
    Component
    } = React;

var styles = StyleSheet.create({
    container: {
        marginTop: 65
    },
    heading: {
        backgroundColor: '#F8F8F8',
    },
    separator: {
        height: 1,
        backgroundColor: '#DDDDDD'
    },
    image: {
        width: 400,
        height: 300
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5,
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        margin: 5,
        color: '#656565'
    },
    description: {
        fontSize: 18,
        margin: 5,
        color: '#656565'
    }
});

class PropertyView extends Component {

    render () {
        var property = this.props.property;
        var stats = 0;//property.bedroom_number + ' bed ' + property.property_type;

        if (property.bathroom_number) {
            stats += 1;//', ' + property.bathroom_number + ' ' + (property.bathroom_number > 1 ? 'bathrooms' : 'bathroom');
        }

        var price = 0;//property.price_formatted.split(' ')[0];

        return (
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={styles.title}>{property.username}</Text>
                    <View style={styles.separator}/>
                </View>
                <Text style={styles.description}>{stats}</Text>
                <Text style={styles.description}>{property.created_at}</Text>
            </View>
        );
    }
}

module.exports = PropertyView;