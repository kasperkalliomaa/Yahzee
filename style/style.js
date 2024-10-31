import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f1f1'  
  },

  header: {
    marginTop: 10,
    backgroundColor: '#1e0696',
    flexDirection: 'row',
    borderRadius:5,

  },
  footer: {
    backgroundColor: '#1e0696',
    flexDirection: 'row',
    borderRadius:5,
    marginBottom: 10

  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  icon:{
    marginVertical: 20,
    alignSelf: 'center',
  },
  entry:{
    fontSize:16,
    textAlign:'center'
  },
  input:{
    height:40,
    borderColor:'black',
    borderWidth:1,
    borderRadius:5,
    width:'80%',
    marginVertical:10,
    alignSelf:'center'
    
  },
  rules:{
    fontSize:20,
    textAlign:'center',
    fontWeight:'bold'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16,
    marginTop: 20,
    marginBottom:20,
    lineHeight:20,
    margin:20,
    paddingHorizontal:30
  },
  gl:{
    textAlign:'center',
    fontSize:20,
    marginTop:20
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  }
});