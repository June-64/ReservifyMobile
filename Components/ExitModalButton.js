import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const ExitModalButton = (props) => (<Feather name="x" size={24} color="black" style={styles.Button} onPress={props.onPressClose}/>)

const styles = StyleSheet.create({
    Button: {
        position: 'absolute',
        right: 10,
        marginTop: 10
    }
})

export default ExitModalButton