import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import AppModal from '../Components/Modal';
import ExitModalButton from '../Components/ExitModalButton';


export default class Auth extends React.Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={styles.outerContainer}>
                <LinearGradient colors={['#121e4d', '#4c6f92']} style={{flex: 1}} >
                    <View style={styles.innerContainer}>
                        <View style={styles.BoxContainer}>
                            <Image
                                style={styles.Logo}
                                source={require('../assets/ReservifyV3.png')}
                            />
                            <Text style={styles.Header}>{this.props.headerText}</Text>

                            {this.props.children}

                            <AppModal modalVisible={this.props.modalVisible} setModalVisible={this.props.setModalVisible} onPressOutside={this.props.closeModal}>
                                <View style={styles.modalView}>
                                    <ExitModalButton onPressClose={this.props.closeModal} />
                                    <Text style={styles.modalHeader}>שגיאה</Text>

                                    <Text style={styles.modalText}>{this.props.errorMessage}</Text>
                                </View>
                            </AppModal>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BoxContainer: {
        height: 500,
        width: 300,
        backgroundColor: "white",
        borderRadius: 12,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 12,  
        elevation: 5,
        alignItems: 'center'
    },
    Logo: {
        height: 100,
        width: 200
    },
    Header: {
        fontFamily: 'heeboLight',
        fontSize: 22,
        color: '#969696'
    },
    modalView: {
        width: 250,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: 'center'
    },
    modalText: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 40,
        fontFamily: 'heeboRegular',
        fontSize: 15,
        textAlign: 'center',
    },
    modalHeader: {
        marginTop: 10,
        fontFamily: 'heeboBold',
        fontSize: 25,
        textAlign: 'center',
    }
})