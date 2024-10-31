import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#ffffff', // Light background for readability
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5
    },
    text: {
            fontSize: 20,
            fontWeight: '600',
            color: '#000000',
            fontFamily: 'PlayfairDisplay-Bold'
    },
    scoreText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745',
        marginTop: 5,
    },
    date: {
        fontSize: 14,
        color: '#6c757d', 
        marginTop: 5,
    },
    time:{
        fontSize: 14,
        color: '#6c757d', 
        marginTop: 5,

    },
    scoreboardHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007bff',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    clear:{
      borderWidth:1,
      borderColor:'#000000',
      margin:10,
      width:150,
      padding:10,
      borderRadius:5,
      alignSelf:'center',
      backgroundColor:'red'
    },
    clearText:{
        color:'white',
        alignSelf:'center',
        fontSize:16,
    }

});