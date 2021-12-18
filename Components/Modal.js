import React from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';


const AppModal = (props) => (
        <Modal
            animationType="fade"
            visible={props.modalVisible}
            transparent={true}
            onRequestClose={() => {
                props.setModalVisible(!modalVisible);
            }} 
        >
            <TouchableWithoutFeedback onPress={props.onPressOutside} >
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        {props.children}
                    </TouchableWithoutFeedback>   
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )


const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})

export default AppModal