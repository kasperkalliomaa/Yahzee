import {useState, useEffect} from 'react';
import { Text, View, Button, FlatList } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { SCOREBOARD_KEY } from '../constants/Game';
import styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                setScores(tmpScores);
                // Opettajan versiossa tässä välissä tehdään lajittelu
                // Laskevassa järjestyksessä (KS. HARJOITUSTYÖN TEHT ANTO)
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
            <View>
                <Text>Scoreboard</Text>

                {scores.length > 0 ? (
                    <FlatList
                        data={scores}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View> 
                                <Text>{item.name}</Text>
                                <Text>Score: {item.score} points</Text>
                                <Text>Date: {item.date}</Text>
                                <Text>Time: {item.time}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text>No scores yet...</Text>
                )}

                <Button title="Clear Scoreboard" onPress={clearScoreboard} />

            </View>
            <Footer />
        </>
    )
}