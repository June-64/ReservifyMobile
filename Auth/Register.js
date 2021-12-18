import React from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import Auth from "./Auth";
import { Feather } from '@expo/vector-icons'; 
import AuthButton from '../Components/AuthButton';
import { AuthReq } from '../api'


function validateEmail (email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
}

function validatePassword(password) {
    return hasUpper(password) && hasLower(password) && hasNumber(password) && password.length >= 8;
}

function hasUpper(str) {
    for (let i = 0; i < str.length; i ++)
    {
        if (!/\d/.test(str[i]) && str[i] == str[i].toUpperCase())
            return true
    }
    return false
}

function hasLower(str) {
    return (/[a-z]/.test(str));
}

function hasNumber(myString) {
    return /\d/.test(myString);
}

export default class Register extends React.Component {
    constructor(props) {
        super(props)

        const errMessage = this.props.route.params["errMessage"];

        this.state = {
            email: '',
            password: '',
            confirm: '',
            errorMessage: errMessage,
            modalVisible: errMessage != ''
        }

    }

    getHandler = key => val => {    
        this.setState({ [key]: val })
    }

    handleSubmit = () => {
        let emailValid = validateEmail(this.state.email);
        let passwordValid = validatePassword(this.state.password);
        let passwordsMatch = this.state.password === this.state.confirm;

        if (!emailValid) {
            this.setState({
                errorMessage: "האימייל שהוזן אינו תקין.",
                modalVisible: true
            })
        }
        else if (!passwordValid) {
            this.setState({
                errorMessage: "הסיסמא שהוזנה אינה תקינה. \n הסיסמא חייבת להיות להכיל לפחות שמונה תווים, אות גדולה באנגלית, אות קטנה באנגלית ומספר.",
                modalVisible: true
            })
        }
        else if (!passwordsMatch) {
            this.setState({
                errorMessage: "הסיסמאות שהוזנו אינן תואמות.",
                modalVisible: true
            })
        }
        else this.registerUser()
    }

    registerUser = async () => {
        try {
            const result = await AuthReq(this.state.email, this.state.password, "register")
            if (result["status"] != "success")
                this.setState({errorMessage: result["message"], modalVisible: true})
            else
                this.props.navigation.navigate('UserInfo')   
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
        return (
            <Auth headerText="הרשמה" {...this.state} setModalVisible={this.setModalVisible} closeModal={this.closeModal}>
                <TextInput
                    style={styles.Input}
                    onChangeText={this.getHandler('email')}
                    placeholder="אימייל"
                />
                <TextInput
                        style={[styles.Input]}
                        onChangeText={this.getHandler('password')}
                        placeholder="סיסמא"
                        secureTextEntry={true}
                />
                
                <TextInput
                        style={[styles.Input]}
                        onChangeText={this.getHandler('confirm')}
                        placeholder="הכנס סיסמא שנית"
                        secureTextEntry={true}
                />

                <AuthButton text="הרשם" handleSubmit={this.handleSubmit} />
                
                <Text style={styles.registerRef} onPress={() => { this.props.navigation.navigate('Login') }}>יש לך משתמש? לחץ להתחברות</Text>
            

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
    }
})