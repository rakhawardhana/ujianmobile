
import React, { Component } from 'react'
import {Container, Button, Text, Form, Item, Input, Label} from 'native-base'
import {View, StyleSheet, ImageBackground} from 'react-native'
//import {Container, Button, Text, Form, Item, Input, Label} from 'native-base'
import fire from '../firebase/index'
import {connect} from 'react-redux'
import {onLogin} from '../store/actions/index'

class AuthScreen extends Component {

    state = {
        email: '',
        password: '',
        confirm: '',
        fullName: '',
        nickName: '',
        age: '',
        login: true,

    }


    onSwitch = () => {
        this.setState({login: !this.state.login})
    }

    componentDidMount(){
        // Cek apakah ada user yang sedang login
        fire.auth().onAuthStateChanged((user) => {
            // jika user ditemukan
            if(user){
                // login ke redux
                this.props.onLoginUser(
                    user.uid, user.email
                )

                // Pindah ke halaman utama
                this.props.navigation.navigate('Kesini')
            }
        })
    }

    // Function yang akan di jalanakna ketika klik button register
    authRegister = async () => {
        let email = this.state.email
        let password = this.state.password
        let confirm = this.state.confirm

        if(this.state.login){
            // LOGIN

            try {
                // Login di firebase
                let res = await fire.auth().signInWithEmailAndPassword(email, password)
                
                // Login di app
                this.props.onLoginUser(
                    res.user.uid, res.user.email
                )

                // Pindah ke halaman utama
                this.props.navigation.navigate('Kesini')
            } catch (error) {
                // jika terjadi error pada block kode 'try', akan kita munculkan pesan errornya
                alert(error.message)
            }
        } else {
            if(password.length < 6){
                alert('Password harus minimal 6 karakter')
            } else {
                if (password == confirm) {
                    let res = await fire.auth()
                            .createUserWithEmailAndPassword(email, password)
                    let user = res.user
                        // Create data user di Database
                        // Menggunakan 'set' agar tidak memili id seperti 'push'


                        //SEMENTARA DIMATIIN DULS
                        //SEMENTARA DIMATIIN
                        // await fire.database().ref(`users/${user.uid}`)
                        // .set({
                        //       fullName: this.state.fullName,
                        //       nickName: this.state.nickName,
                        //       age: this.state.age
                        //     })
                        //SEMENTARA DIMATIIN



                    // console.log(res.user.email)
                    // console.log(res.user.uid)
                    // this.props.onLoginUser(
                    //     res.user.uid,
                    //     res.user.email
                    // )
                    this.props.onLoginUser(
                        user.uid,
                        user.email
                    )
                    this.props.navigation.navigate('Kesini')
                } else {
                    alert('Password dan Confirm harus sama')
                }
               
            }
        }
        
    }
    

    render() {
        let titleTopButton, form

        if(!this.state.login){
            // RENDER REGISTER
            titleTopButton = 'Switch to Login'
            titleBotBottom = 'Register'
            form = (
                <Form>
                    {/* style: stackedLabel */}
                    <Item stackedLabel>
                        <Label>Full Name</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({fullName: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Nick Name</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({nickName: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Age</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({age: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Password</Label>
                        <Input 
                            // Agar yang kita ketik akan di hide
                            secureTextEntry
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Confirm Password</Label>
                        <Input 
                            // Agar yang kita ketik akan di hide
                            secureTextEntry
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({confirm: text})}
                        />
                    </Item>
                </Form>
            )
        } else {
            // RENDER LOGIN
            titleTopButton = 'Switch to Register'
            titleBotBottom = 'Login'
            form = (
                <Form>
                    {/* style: stackedLabel */}
                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Password</Label>
                        <Input 
                            // Agar yang kita ketik akan di hide
                            secureTextEntry
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </Item>
                </Form>
            )
            
        }

        return (
            <Container>
                <Text>Authentication Screen</Text>
                
                <Button onPress={this.onSwitch}>
                    <Text>{titleTopButton}</Text>
                </Button>

                {form}
            
                <Button onPress={this.authRegister}>
                    <Text>{titleBotBottom}</Text>
                </Button>
            </Container>
    )
    }
}

//export default AuthScreen

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 15
    },
    title : {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    }
})


const mapDispatchToProps = dispatch => {
    return {
        onLoginUser: (uid, email) => {dispatch(onLogin(uid, email))}
    }
}

export default connect(null, mapDispatchToProps)(AuthScreen)