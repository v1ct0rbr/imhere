import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
    participantItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopEndRadius: 5,
        borderBottomEndRadius: 5,
        justifyContent: 'space-between',
        marginBottom: 5
     
    },
    participantItemNormal: {
        backgroundColor: '#1f1e25',
    },
    ParticipantItemConfirmed:{       
        
        backgroundColor: '#2F4F4F',
     },
    participantName:{       
       paddingLeft: 5,
       color: '#fff',
    },
    
    button: {
        width: 56,
        height: 56,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#A52A2A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
})