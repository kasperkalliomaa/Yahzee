import {useState, useEffect} from 'react';
import { Text, View, Button, FlatList, ScrollView, Pressable } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { SCOREBOARD_KEY } from '../constants/Game';
import styles from '../style/SBstyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../style/style';

export default Scoreboard = ({navigation}) => {
    
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);

    const getScoreboardData = async() => {
        try{
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if(jsonValue !== null){
                const tmpScores = JSON.parse(jsonValue);
                tmpScores.sort((a, b) => b.score - a.score);
                setScores(tmpScores);
                console.log('SCOREBOARD: read succesful');
                console.log('SCOREBOARD: NBR of scores ' + tmpScores.length);
                
            }
        } catch(e){
            console.log('SCOREBOARD: Read error ' + e);
            
        }
    }
    
    const clearScoreboard = async () => {
        try {
            await AsyncStorage.removeItem(SCOREBOARD_KEY);
            setScores([]);
            console.log('SCOREBOARD: cleared succesfully');
            
        }catch(e){
            console.log('Read error ' + e);
        }
    }

    return(
        <>
            <Header />
            <Button title='Clear Scoreboard' onPress={clearScoreboard}/>

            <View style={styles.container}>
                <Text style={styles.text}>Scoreboard</Text>
 
                {scores.length > 0 ? (
                    <FlatList
                        data={scores}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.container}> 
                                <Text>{item.name}</Text>
                                <Text style={styles.scoreText}>Score: {item.score} points</Text>
                                <Text style={styles.date}>Date: {item.date}</Text>
                                <Text style={styles.time}>Time: {item.time}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.scoreboardHeader}>No scores yet...</Text>
                )}


            </View>
          
            <Footer />
        </>
    )
}