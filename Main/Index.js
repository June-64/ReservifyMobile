import React from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Modal, FlatList, Platform  } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons'; 
import IndexButton from '../Components/IndexButton';
import { login } from '../api'
import AppModal from '../Components/Modal';

const DATA = [
    {
      key: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      key: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      key: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },

  ];

export default class Index extends React.Component {
    state = {
        selectSportRes: 'כדורסל'
    }

    handleSportSelectRes = (sport) => {
        this.setState({selectSportRes: sport})
    }

    renderItemRes = ({ item }) => {


        return (
            <View style={styles.courtRow}>
                <Text style={styles.courtRowText}>asda</Text>
                
                <View style={{ flex: 1, alignItems: 'center' }}>

                        <Pressable style={styles.courtRowButton} elevation={5}>
                            <Text style={styles.courtRowButtonText}>הזמנה</Text>
                        </Pressable>

                </View>
               
            </View>
        )
    }

    render() {


        return (
            <View style={{flex: 1, padding: 8}}>
                <Text style={styles.nameHeader}>בוקר טוב, שלף.</Text>

                <View style={styles.Wrapper}><IndexButton text="להזמנת מגרש" handleSubmit={''} /></View>
                <View style={styles.Wrapper}><IndexButton text="להצטרפות למגרש" handleSubmit={''} /></View>

                <Text style={styles.indexText}>אספנו בשבילך מגרשים פנויים בשעה הקרובה:</Text>

                <View style={[styles.Wrapper, {marginTop: 20}]}>
                    <View style={styles.sportSelectContainter}>
                        <View style={styles.sportSelectCapsule}>
                            <Pressable style={[styles.sportSelect, styles.leftSportSelect, this.state.selectSportRes === 'כדורגל' ? styles.selectedSport : '']} onPress={() => (this.handleSportSelectRes('כדורגל'))}>
                                <Text style={[styles.sportSelectText, this.state.selectSportRes === 'כדורגל' ? {color: 'white'} : '']}>כדורגל</Text>
                            </Pressable>
                            <Pressable style={[styles.sportSelect, this.state.selectSportRes === 'טניס' ? styles.selectedSport : '']} onPress={() => (this.handleSportSelectRes('טניס'))}>
                                <Text style={[styles.sportSelectText, this.state.selectSportRes === 'טניס' ? {color: 'white'} : '']}>טניס</Text>
                            </Pressable>
                            <Pressable style={[styles.sportSelect, styles.rightSportSelect, this.state.selectSportRes === 'כדורסל' ? styles.selectedSport : '']} onPress={() => (this.handleSportSelectRes('כדורסל'))}>
                                <Text style={[styles.sportSelectText, this.state.selectSportRes === 'כדורסל' ? {color: 'white'} : '']}>כדורסל</Text>
                            </Pressable>                            
                        </View>
                    </View>
                </View>

                <View style={[styles.Wrapper, {maxHeight: 125}]}>
                    <FlatList
                        data={DATA}
                        renderItem={this.renderItemRes}
                        keyExtractor={(item) => item.key}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nameHeader: {
        fontFamily: 'heeboLight',
        fontSize: 25,
        marginTop: 30,
        textAlign: 'right',
        marginRight: 30,
        paddingBottom: 10
    },
    Wrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    indexText: {
        textAlign: 'right',
        marginRight: 50,
        marginTop: 40,
        fontFamily: 'heeboLight',
        fontSize: 15
    },
    sportSelectContainter: {
        width: 300,
        height: 60,
        backgroundColor: '#014f86',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sportSelectCapsule: {
        width: '80%',
        height: '60%',
        flexDirection: 'row',
        borderWidth: 0,
        
    },  
    sportSelect: {
        flex: 1,
        borderColor: '#467caf',
        borderWidth: 3,
        borderRightWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',

    },
    leftSportSelect: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    rightSportSelect: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderRightWidth: 3
    },
    sportSelectText: {
        color: 'rgb(162, 184, 231)',
        fontFamily: 'heeboBold',
        fontSize: 16
    },
    selectedSport: {
        backgroundColor: '#467caf',
    },
    courtRow: {
        width: 300,
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#999',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center'
    },
    courtRowText: {
        flex: 1,
        fontFamily: 'heeboRegular',
        fontSize: 13,
        textAlign: 'center',
    },
    courtRowButton: {

        width: 90,
        height: 35,
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },
    courtRowButtonText: {
        fontFamily: 'heeboRegular',
        fontSize: 13,
        textAlign: 'center',
        shadowColor: "#fff",
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0
          }
    }
})