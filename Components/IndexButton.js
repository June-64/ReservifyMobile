import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';


const AuthButton = (props) => (
        <Pressable onPress={props.handleSubmit} style={({ pressed }) => [styles.submitButton, { transform: pressed ? ([{ scale: 0.92 }]) : ([{ scale: 1 }]) }]} >
            <Text style={styles.submitButtonText}>{ props.text }</Text>
        </Pressable >
    )

const styles = StyleSheet.create({
    submitButton: {
        marginTop: 20,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#467caf',
        borderRadius: 15,
        paddingRight: 15,
        paddingLeft: 15,
    },
    submitButtonText: {
        fontFamily: 'heeboRegular',
        color: 'white',
        fontSize: 14
    }
})

export default AuthButton