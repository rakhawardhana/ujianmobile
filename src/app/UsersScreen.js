import React, { Component } from 'react'
import {View, BackHandler, StyleSheet, FlatList, ScrollView} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {connect} from 'react-redux'
import {Button, Text, Container} from 'native-base'
import ListUsers from './components/ListUsers'
import fire from '../firebase'

class UsersScreen extends Component {

    state = {
        snapShot: {}
    }

    onBackButton = () => {
        alert('Tombol back di tekan')
        // Menonaktifkan default function (kembali ke halaman sebelumnya)
        return true
    }

    onAddUsers = () => {
        this.props.navigation.navigate('AddUsers')
    }

    getData = () => {
        // Get data
        fire.database().ref(`users/${this.props.uid}`)
        .once('value', (snapShot) => {
            // Cek apakah data di temukan
            if(snapShot.exists()){
                this.setState({snapShot: snapShot.val()})
            }
        })
    }

    renderList = () => {
        // array of id dari setiap users
        let keysUsers = Object.keys(this.state.snapShot)
        let listUsers = []

        // key : id dari users
        keysUsers.forEach((key) => {
            listUsers.push({
                nama : this.state.snapShot[key].nama,
                usia : this.state.snapShot[key].usia,
                jabatan : this.state.snapShot[key].jabatan,
                id: key
            })
        })


        // [{nama, usia, jabatan}{}{}]
        return <FlatList
                    keyExtractor = {(item) => item.id}
                    style = {styles.flaslist}
                    data={listUsers}
                    renderItem ={(asd)=>{
                        return <ListUsers data={asd} key={asd.id}/>
                    }}
                />
    }

    render() {
        return (
            <Container>
                <NavigationEvents
                    // ComponentDidMount
                    onDidFocus = {() => {
                        // non aktifkan tombol back pada device
                        BackHandler.addEventListener('hardwareBackPress', this.onBackButton)
                        // get semua data milik user
                        this.getData()
                    }}

                    // ComponentWillUnmount
                    onWillBlur = {() => {
                        BackHandler.removeEventListener('hardwareBackPress', this.onBackButton)
                    }}
                />

                <View style={styles.container}>
                    <Text>NAMA              USIA                JABATAN</Text>
                    
                    
                    {this.renderList()}
                    
                    <View style={styles.button}>
                        <Button onPress={this.onAddUsers}>
                            <Text>INSERT DATA KARYAWAN</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginVertical: 20
    },
    flaslist: {
        alignSelf: 'stretch'
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(UsersScreen)