import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button, Container, Content, Card, CardItem} from 'native-base'
import {connect} from 'react-redux'
//import {Container} from 'native-base'
import { NavigationEvents } from 'react-navigation'
import {onLogout} from '../store/actions'

import fire from '../firebase'
//import console = require('console');

class ProfileScreen extends Component {

    state = {
        profile: {}
    }

    // componentDidMount() {
    //     this.setState({
    //         fullname: fire.database().ref(`users/${this.props.uid}/J2LKpF1JdQVRLtbfcXDQLToGeY63`).fullname,
    //         nickname: fire.database().ref(`users/${this.props.uid}/J2LKpF1JdQVRLtbfcXDQLToGeY63`).nickname,
    //         age: fire.database().ref(`users/${this.props.uid}/J2LKpF1JdQVRLtbfcXDQLToGeY63`).age
    //     })
    // }

    onPressLogout = async () => {
        // Logout dari firebase
        await fire.auth().signOut()
        // Logout dari redux
        this.props.onLogout()

        // kembali ke halaman auth
        this.props.navigation.navigate('Auth')
    }

    profile = () => {
         fire.database().ref(`users/${this.props.uid}`)
        .once('value', (snapShot) => {

            console.log(snapShot)
            if(snapShot.exists()) {
                this.setState({profile: snapShot.val()})
            }
        })
        //console.log(profile)
    }

    render() {
        let {fullName, nickName, age} = this.state.profile
        console.log(this.props.uid)
        return ( 
            <View>
                <NavigationEvents
                        onDidFocus = {() => {
                            this.profile()
                        }}
                    />
                    <Text>ProfileScreen</Text>
                    <Button onPress ={this.onPressLogout}>
                        <Text>Logout</Text>
                    </Button>

                <Card>
                            
                    <CardItem style={styles.list}>
                        <Text>{fullName}</Text>
                        
                    </CardItem>
                            
                    <CardItem style={styles.list}>
                        
                        <Text>{nickName}</Text>
                        
                    </CardItem>

                    <CardItem style={styles.list}>
                       
                        <Text>{age}</Text>
                    </CardItem>

                    
                </Card>
                    

               {/* <MapView provider={PROVIDER_GOOGLE}
                        style= {style.maps}
                        region= {
                            {
                                latitude
                            }
                        }>


               </MapView> */}

            </View>
            
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
    list: {
        //alignSelf: 'stretch'
        justifyContent: 'space-between'
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps, {onLogout})(ProfileScreen)