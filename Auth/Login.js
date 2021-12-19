
import React from 'react';
import { StyleSheet, View, Text, TextInput,   } from 'react-native';
import Auth from "./Auth";
import { Feather } from '@expo/vector-icons'; 
import AuthButton from '../Components/AuthButton';
import { AuthReq } from '../api'
import { NavigationActions } from 'react-navigation';


export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            hidePassword: true,
            eyeName: 'eye-off',
            modalVisible: false,
            errorMessage: ''
        }
    }

    getHandler = key => val => {
        this.setState({[key]: val})
    }

    togglePassword = () => {
        this.setState(prevState => {
            if (prevState.hidePassword) {
                return {
                    hidePassword: !prevState.hidePassword,
                    eyeName: 'eye'
                }
            }
            else {
                return {
                    hidePassword: !prevState.hidePassword,
                    eyeName: 'eye-off'
                }
            }
        })
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    closeModal = () => {
        this.setState({
            modalVisible: false
        })
    }

    loginUser = async () => {
        try {
            const result = await AuthReq(this.state.email, this.state.password, "login")
            if (result["status"] != "success")
                this.setState({ errorMessage: result["message"], modalVisible: true })
            else {
                
                this.props.navigation.navigate('Main', {}, NavigationActions.navigate({ routeName: 'Index' }))
            }
        } catch (err) {
            const errMessage = err.message
            this.setState({errorMessage: errMessage, modalVisible: true})
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    closeModal = () => {
        this.setState({
            modalVisible: false
        })
    }

    render() {
        const { modalVisible } = this.state;

        return (
            <Auth headerText="התחברות" {...this.state} setModalVisible={this.setModalVisible} closeModal={this.closeModal}>
                <TextInput
                    style={styles.Input}
                    onChangeText={this.getHandler('email')}
                    placeholder="אימייל"
                />
                <View style={styles.passwordContainer}>
                    <Feather name={this.state.eyeName} size={24} color="black" onPress={this.togglePassword}/>
                    <TextInput
                        style={[styles.Input, styles.InputPass]}
                        onChangeText={this.getHandler('password')}
                        placeholder="סיסמא"
                        secureTextEntry={this.state.hidePassword}
                    />
                </View>

                <Text style={styles.forgotPass}>שכחתי סיסמא</Text>

                <AuthButton text="התחבר" handleSubmit={this.loginUser} />
                
                <Text style={styles.registerRef} onPress={() => { this.props.navigation.navigate('Register', {errMessage: ''}) }}>אין לך משתמש? לחץ להרשמה</Text>

            </Auth>
        )
    }
}

const styles = StyleSheet.create({
    Input: {
        textAlign:'right',
        marginTop: 40,
        borderColor: 'rgb(26, 26, 138)',
        borderBottomWidth: 1,
        borderRadius: 4,
        width: 200,
        height: 30,
        fontSize: 14,
        fontFamily: 'heeboRegular'
    },
    passwordContainer: {
        flexDirection: 'row',
        marginTop: 40,
        marginRight: 29
    },
    InputPass: {
        marginTop: 0,
        marginLeft: 5
    },
    forgotPass: {
        marginTop: 25,
        marginLeft: 110,
        textAlign: 'right',
        fontFamily: 'heeboBold',
        fontSize: 10
    },
    registerRef: {
        marginTop: 35,
        fontFamily: 'heeboRegular',
        fontSize: 12
    },
    modalView: {
        width: 250,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: 'center'
    },
    modalText: {
        width: '80%',
        marginTop: 10,
        fontFamily: 'heeboRegular',
        fontSize: 15,
        textAlign: 'center',
        paddingBottom: 20,
        
    },
    modalHeader: {
        marginTop: 10,
        fontFamily: 'heeboBold',
        fontSize: 25,
        textAlign: 'center',
    }
})