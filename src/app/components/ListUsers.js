import React, { Component } from 'react'
import {View,TouchableOpacity, StyleSheet} from 'react-native'
import {Text} from 'native-base'
import {withNavigation} from 'react-navigation'

class ListUsers extends Component {
    touchable = () => {
        // Pindah ke screen Detail dengan membawa object users nya
        // object users berada di this.props.data.item
        this.props.navigation.navigate('DetailUsers', {data_users:this.props.data.item})
    }

    render() {
        return(
            <TouchableOpacity onPress={this.touchable}>
                <View style={styles.list}>
                    <Text>{this.props.data.item.nama}</Text>
                    <Text>{this.props.data.item.usia}</Text>
                    <Text>{this.props.data.item.jabatan}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'grey',
        padding : 30,
        marginVertical: 10
    }
})

export default withNavigation(ListUsers)

