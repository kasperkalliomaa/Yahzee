import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bfdefa',
        padding: 10,
    },
    diceContainer: {
        width: '100%',
        marginVertical: 20,
    },
    status: {
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: '600',
    },
    throws: {
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        marginVertical: 10,
    },
    pointsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 15,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#ffffff',
        padding:10,
        borderWidth:1,
        borderRadius:5,
        margin:10,
        alignItems:'center'
    },
    endButtons:{
        flexDirection:'row',
        margin:10
    },
    save:{
        marginRight:10,
        padding:10,
        borderWidth:1,
        borderRadius:5,
        margin:10,

    },
    newGame:{
        marginLeft:10,
        padding:10,
        borderWidth:1,
        borderRadius:5,
        margin:10,

    }
});