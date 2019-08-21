import React, { Component } from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Button, Item, Input, Textarea
} from 'native-base'

import fire from '../firebase'

// Untuk mengambil data dari navigate menggunakan
// navigation.getParam('nama parameternya') / 'data_users'
class DetailUsersScreen extends Component {

    state = {
        objUsers: this.props.navigation.getParam('data_users'),
        edit: false,
        nama: this.props.navigation.getParam('data_users').nama,
        usia: this.props.navigation.getParam('data_users').usia,
        jabatan: this.props.navigation.getParam('data_users').jabatan
    }

    onEditButton = () => {
    
        this.setState({edit: true})
    }

    onSaveButton = () => {
        fire.database().ref(`users/${this.props.uid}/${this.state.objUsers.id}`).update({
            nama: this.state.nama,
            usia: this.state.usia,
            jabatan: this.state.jabatan
        })
    }

    onCancelButton = () => {
        // Mengubah state.edit menjadi true
        this.setState({edit: false})
    }
    
    
    onDeleteButton = async () => {
        // Menghapus data
       await fire.database().ref(`users/${this.props.uid}/${this.state.objUsers.id}`).remove()
        // kembali ke halaman sebelumnya. 
        //this.setState({users:this.props.navigation.getParam('')})
       this.props.navigation.goBack()
    }
    render() {
        // Mengambil data yang di kirim dari navigate
        if(this.state.edit) {
            // Tampilkan mode edit
            var diary = this.state.objUsers
            return (
                <Container>
                        <View style={styles.container}>
                            <Text style={{fontSize: 20}}>EDIT DATA KARYAWAN</Text>
                            <View style={styles.wrapper}>
                                <Item rounded>
                                    <Input
                                         value = {this.state.nama}
                                        placeholder='Title'
                                        onChangeText={(text) => this.setState({nama: text})}
                                    />
                                </Item>
                                <Item rounded>
                                    <Input
                                         value = {this.state.usia}
                                        placeholder='Title'
                                        onChangeText={(text) => this.setState({usia: text})}
                                    />
                                </Item>
                                <Item rounded>
                                    <Input
                                         value = {this.state.jabatan}
                                        placeholder='Title'
                                        onChangeText={(text) => this.setState({jabatan: text})}
                                    />
                                </Item>
                                {/* <Item
                                    value = {this.state.usia}
                                    placeholder = 'Your Story'
                                    bordered
                                    rowSpan = {15}
                                    onChangeText={(text) => this.setState({usia: text})}
                                /> */}
                                <View style={styles.button}>
                                    <Button block onPress={this.onSaveButton}>
                                        <Text>SAVE</Text>
                                    </Button>
                                    <Button block onPress={this.onCancelButton}>
                                        <Text>CANCEL</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                </Container>
            )
       } else {
        var users = this.state.objUsers
        return (
            <Container>
                <Content>
                    <Card>
                        {/* <CardItem>
                            <Text>{users.date}</Text>
                        </CardItem> */}
                        <CardItem header bordered style={styles.row}>
                            <Text>NAMA :</Text>
                            <Text style={styles.headerText}>{users.nama}</Text>
                        </CardItem>
                        <CardItem header bordered style={styles.row}>
                            <Text>USIA :</Text>
                            <Text style={styles.headerText}>{users.usia} </Text>
                        </CardItem>
                        <CardItem header bordered style={styles.row}>
                            <Text>JABATAN :</Text>
                            <Text style={styles.headerText}>{users.jabatan}</Text>
                        </CardItem>
                        <View style={styles.button}>
                            <Button block onPress={this.onEditButton}><Text>Edit</Text></Button>
                            <Button block onPress={this.onDeleteButton}><Text>Delete</Text></Button>
                        </View>
                    </Card>
                </Content>
            </Container>

        )
       }

        

        
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button: {
        height: 100,
        justifyContent: 'space-between',
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    },
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}
export default connect(mapStateToProps)(DetailUsersScreen)

