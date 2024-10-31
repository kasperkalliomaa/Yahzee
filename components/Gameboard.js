import { Text, View, Pressable } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import styles from '../style/GBstyle';
import { useEffect, useState } from 'react';
import { NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS,
    BONUS_POINTS_LIMIT, 
    SCOREBOARD_KEY} from '../constants/Game';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Container, Row, Col } from 'react-native-flex-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';


let board = [];


export default Gameboard = ({navigation, route}) => {
    

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw dices');
    const [gameEndStatus, setGameEndStatus] = useState(false);
        // Mitkä arpakuutiot on valittu
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
        //arpakuutioiden silmäluvut
    const [diceSpot, setDiceSpot] = useState(new Array(NBR_OF_DICES).fill(0));
        // Mitkä arpakuutioiden silmäluvuista on valittu pisteisiin
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(0));
        //valittujen arpakuutioiden kokonaispistemäärä
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
    const [playerName, setPlayerName] = useState('');
    const [scores, setScores] = useState([]);

    useEffect(()=>{
       if (playerName === '' && route.params?.player) {
        setPlayerName(route.params.player);
       } 
    },[]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        })
    }, [navigation]);

    const getScoreboardData = async() => {
        try{
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if(jsonValue !== null){
                const tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores);
                
                console.log('Gameboard: read succesful');
                console.log('Gameboard: NBR of scores ' + tmpScores.length);
                
            }
        } catch(e){
            console.log('Gameboard: Read error ' + e);
            
        }
    }

    const savePlayerPoints = async () => {

        let points = dicePointsTotal.reduce((sum, points) => sum + points, 0);
        if (points >= BONUS_POINTS_LIMIT) {
            points += BONUS_POINTS;
        }
        const date = new Date();
        const newKey = scores.length + 1;
        const playerPoints = {
            key: newKey,
            name: playerName,
            date: date.toLocaleDateString(), // haetaan päivämäärä
            time: date.toLocaleTimeString(), // haetaan aika
            score: points // Pistemäärä
        }
        try{
            const newScore = [...scores, playerPoints];
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
            console.log('Gameboard: save succesful: ' + jsonValue);
            navigation.navigate('Scoreboard')
            
        }catch(e){
            console.log('gameboard: save error: ' + e);
            
        }
    }

    // tässä luodaan arpakuutiorivi sarakkeittain (Col)
    const dicesRow = [];
    for (let dice = 0; dice < NBR_OF_DICES; dice++){
        dicesRow.push(
            <Col key={'dice' + dice}>
                <Pressable
                key={'row' + dice}
                onPress={() => chooseDice(dice)}>
                    <MaterialCommunityIcons
                        name={board[dice]}
                        key={'dice' + dice}
                        size={50}
                        color={getDiceColor(dice)}
                    >

                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        );
    }
 
    // Tässä luodaan pisterivi sarakkeittain (Col)
    const pointsRow =[];
    for (let spot = 0; spot < MAX_SPOT; spot++){
        pointsRow.push(
            <Col key={'pointsRow' + spot}>
                <Text key={'pointsRow' + spot}>{getSpotTotal(spot)}</Text>
            </Col>
        );
    }

    // Tässä luodaan rivi, joka kertoo onko pisteet jo valittu silmäluvulle
    const pointsToSelectRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
            <Col key={'buttonsRow' + diceButton}>
                <Pressable key={'buttonsRow' + diceButton}
                            onPress={() => chooseDicePoints(diceButton)}>
                    <MaterialCommunityIcons
                        name={'numeric-' + (diceButton + 1) + '-circle'}
                        key={'buttonsRow' + diceButton}
                        color={getDicePointsColor(diceButton)}
                        size={35}>

                    </MaterialCommunityIcons>

                </Pressable>
            </Col>
        );
    }

    const chooseDice = (i) => {
        if(nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    } else {
       setStatus('you have to throw dices first.') 
    }
    }

    const chooseDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0) {
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal];
            if(!selectedPoints[i]) {
                selectedPoints[i] = true;
                let NBR_OF_DICES = diceSpot.reduce((total, x) => (x === (i + 1) ? total + 1: total), 0);
                points[i] = NBR_OF_DICES * (i + 1);

                const gameOver = selectedPoints.every((val) => val);
                if (gameOver) {
                    setStatus("Game over! Save your points.");
                    setGameEndStatus(true);
                } else {
                    // Nollataan heitot uuden kierroksen aloitusta varten
                    setNbrOfThrowsLeft(NBR_OF_THROWS);
                    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
                    setStatus("New round! Throw dice.");
                } 


            }else{
                setStatus('You already selected points for ' + (i + 1));
                return points[i];
            }
            setDicePointsTotal(points);
            setSelectedDicePoints(selectedPoints);
            return points[i];
        }
        else{
            setStatus('Throw ' + nbrOfThrowsLeft + ' times before setting points.');
        }
    }

    function getDiceColor(i) {
        return selectedDices[i] ? 'black' : 'steelblue';
    }


    function getDicePointsColor(i) {
        return (selectedDicePoints[i] && !gameEndStatus) ? 'black' : 'steelblue';
    }

    function getSpotTotal(i){
        return dicePointsTotal[i];
    }

    const throwDice = () => {
        if(nbrOfThrowsLeft > 0 && !gameEndStatus){
        let spots = [...diceSpot]
        for (let i = 0 ; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = 'dice-' + randomNumber;
            spots[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setDiceSpot(spots);
        setStatus('Select and throw dices again');
        }
    };

    const newGame = () => {
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setStatus('Throw dices');
        setGameEndStatus(false);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setDiceSpot(new Array(NBR_OF_DICES).fill(0));
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
    }




    
    return(
        <>
            <Header />
            <View style={styles.container}>
                <View style={styles.diceContainer}>
                    <Container>
                        <Row>{dicesRow}</Row>
                    </Container>
                </View>

                <Text style={styles.throws}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={styles.status}>{status}</Text>
                
                <Pressable
                    onPress={() => throwDice()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Throw dice</Text>
                </Pressable>

                <Text style={styles.totalScore}>Total: {dicePointsTotal.reduce((sum, points) => sum + points, 0)}</Text>
                <Text style={styles.bonusText}>You are {BONUS_POINTS_LIMIT - dicePointsTotal.reduce((sum, points) => sum + points, 0)} points away from bonus</Text>


                <View style={styles.pointsRow}>
                    <Container>
                        <Row>{pointsRow}</Row>
                    </Container>
                </View>

                <View style={styles.pointsRow}>
                    <Container>
                        <Row>{pointsToSelectRow}</Row>
                    </Container>
                </View>

                <Text style={styles.playerName}>player: {playerName}</Text>

                <View style={styles.endButtons}>
                    <Pressable
                        onPress={() => savePlayerPoints()}
                        style={styles.save}
                        >
                        <Text style={styles.buttonText}>SAVE POINTS</Text>
                    </Pressable>

                    <Pressable  onPress={() => newGame()} style={styles.newGame}>
                        <Text style={styles.buttonText}>NEW GAME</Text>
                    </Pressable>
                </View>
            </View>
            <Footer />
        </>
    )
}