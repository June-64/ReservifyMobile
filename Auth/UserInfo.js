import React from 'react';
import { StyleSheet, View, Text, TextInput, Pressable,   } from 'react-native';
import Auth from "./Auth";
import { Feather } from '@expo/vector-icons'; 
import AuthButton from '../Components/AuthButton';
import { getUserInfo, registerUser } from '../api'
import { NavigationActions } from 'react-navigation';
import DateTimePicker from '@react-native-community/datetimepicker';

import SelectDropdown from 'react-native-select-dropdown'
import { cos } from 'react-native-reanimated';


export default class UserInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            datePickerVisible: true,
            firstName: '',
            lastName: '',
            birthDate: new Date(),
            id_num: '',
            phone_num: '',
            city: '',
            towns_list: ''
        }
    }

    componentDidMount() {
        this.setTownsList();
    }

    setTownsList = async () => {
        try {
            const result = await getUserInfo()
            this.setState({towns_list: result})
        } catch (err) {
            const errMessage = err.message
            this.setState({errorMessage: errMessage, modalVisible: true})
        }
    }

    toggleDatePicker = () => {
        this.setState(prevState => {
            ({datePickerVisible: !prevState.datePickerVisible})
        })
    }

    getHandler = key => val => {
        this.setState({ [key]: val })
    }

    registerUser = async () => {
        try {
            const result = await registerUser(this.state.firstName, this.state.lastName, this.state.city, this.state.birthDate.toLocaleDateString("en-US"), this.state.id_num, this.state.phone_num)
            if (result["status"] === "success")
                this.props.navigation.navigate('Main', {}, NavigationActions.navigate({routeName: 'Index'}))    
                
            else if (result["status"] === "session_error")
                this.props.navigation.navigate('Register', {errMessage: result.message})
            else
                this.setState({ errorMessage: result["message"], modalVisible: true })
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
        var towns_list = this.state.towns_list;

        return (
            <Auth headerText="פרטי משתמש" {...this.state} setModalVisible={this.setModalVisible} closeModal={this.closeModal}>
                <View style={styles.namesWrapper} >
                    <TextInput
                        style={[styles.Input, styles.InputNames]}
                        onChangeText={this.getHandler('firstName')}
                        placeholder="שם פרטי"
                    />
                    <View style={{padding: 10}} ></View>
                    <TextInput
                        style={[styles.Input, styles.InputNames]}
                        onChangeText={this.getHandler('lastName')}
                        placeholder="שם משפחה"
                    />
                </View>

                <View style={styles.birthDateWrapper} >
                    <Text style={styles.birthdateText}>תאריך לידה:</Text>
            
                    <DateTimePicker
                        style={styles.birthdatePressable}
                        value={this.state.birthDate}
                        is24Hour={true}
                        mode='date'
                        display="default"
                        onChange={(event, value) => {
                            this.setState({ birthDate: value })
                        }}
                        format="YYYY-MM-DD"
                        minDate="1900-01-01"

                    />
                </View>

                <View style={styles.birthDateWrapper} >
                    <Text style={styles.birthdateText}>עיר:</Text>

                    <SelectDropdown
                        data={towns_list}
                        onSelect={this.getHandler('city')}
                        buttonStyle={styles.citySelect}
                        buttonTextStyle={styles.citySelectText}
                        defaultButtonText={"בחר עיר"}
                    />

                </View>

                <View style={[styles.namesWrapper, styles.numsWrapper]} >
                    <TextInput
                        style={[styles.Input, styles.InputNames]}
                        onChangeText={this.getHandler('id_num')}
                        placeholder="מס' תעודת זהות"
                        keyboardType = 'numeric'
                    />
                    <View style={{padding: 10}} ></View>
                    <TextInput
                        style={[styles.Input, styles.InputNames]}
                        onChangeText={this.getHandler('phone_num')}
                        placeholder="מס' טלפון"
                        keyboardType = 'numeric'
                    />
                </View>

                <AuthButton text="המשך לאתר" handleSubmit={this.registerUser} />
            </Auth>
        )
    }
}

const styles = StyleSheet.create({
    namesWrapper: {
        paddingBottom: 40,
        width: "80%",
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Input: {
        textAlign: 'right',
        marginTop: 40,
        borderColor: 'rgb(26, 26, 138)',
        borderBottomWidth: 1,
        borderRadius: 4,
        width: 200,
        height: 30,
        fontSize: 14,
        fontFamily: 'heeboRegular'
    },
    InputNames: {
        width: "50%",
    },
    birthDateWrapper: {
        width: "85%",
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingBottom: 20
    },
    birthdateText: {
        fontFamily: 'heeboRegular',
        fontSize: 13,
        paddingLeft: 10
    },
    birthdatePressable: {
        height: 30,
        width: 100,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5
    },
    numsWrapper: {
        paddingBottom: 45,
        height: 20
    },
    citySelect: {
        height: 30,
        width: 100,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    citySelectText: {
        fontFamily: 'heeboRegular',
        fontSize: 15
    }
})