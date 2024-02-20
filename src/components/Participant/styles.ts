import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
    participantItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1f1e25',
        justifyContent: 'space-between',
        marginBottom: 5
        
        
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
        backgroundColor: '#B22222',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
})