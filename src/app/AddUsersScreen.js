import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Container, Text, Textarea, Button, Item, Input} from 'native-base'

import DatePick from './components/DatePick'

import fire from '../firebase'

class AddUsersScreen extends Component {

    state = {
        nama: '',
        usia: '',
        jabatan: '',
        date: new Date()
    }

    // variable tanggal akan di isi tanggal yang dipilih oleh user
    getDate = (tanggal) => {
        this.setState({date: tanggal})
    }

    addUsers = async () => {
        await fire.database().ref(`users/${this.props.uid}`)
        .push({
            nama: this.state.nama,
            usia: this.state.usia,
            jabatan: this.state.jabatan
        })

        // kembali ke halaman sebelumnya
        this.props.navigation.goBack()

    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>CREATE NEW DATA</Text>
                    <View style={styles.wrapper}>
                        <DatePick funDate={this.getDate}/>
                        <Item rounded>
                            <Input
                                placeholder='Title'
                                onChangeText={(text) => this.setState({nama: text})}
                            />
                        </Item>
                        <Item rounded>
                            <Input
                                placeholder='Title'
                                onChangeText={(text) => this.setState({usia: text})}
                            />
                        </Item>
                        <Item rounded>
                            <Input
                                placeholder='Title'
                                onChangeText={(text) => this.setState({jabatan: text})}
                            />
                        </Item>
                        {/* <Textarea
                            placeholder = 'Your Story'
                            bordered
                            rowSpan = {15}
                            onChangeText={(text) => this.setState({usia: text})}
                        /> */}
                        <View style={styles.button}>
                            <Button block onPress={this.addUsers}>
                                <Text>INSERT DATA KARYAWAN</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    },
    button: {
        marginTop: 10
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(AddUsersScreen)

