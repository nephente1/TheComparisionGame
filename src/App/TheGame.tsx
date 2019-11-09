import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Cards from './Cards';
import { TextInHeader, MainText, Button, NamesBox , ResultsWrapper, CardsWrapper, TitleText, NewGame } from './game.styles';

interface ResponseItemType {
    name: string,
    gender: string,
    mass: string
}

@observer
class TheGame extends React.Component<{}> {
    @observable results: Array<ResponseItemType> = [];
    @observable isLoading: boolean | undefined = true;
    @observable chosenCards: Array<ResponseItemType> = [];
    @observable playerOnePoint: number = 0;
    @observable computerPoint: number = 0;
    @observable attemptsTaken: number = 0;
    
    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const response = await fetch(`https://swapi.co/api/people/`);
        const respJson = await response.json();
        this.results = respJson.results;
        this.isLoading = false;
    }

    pickCards = () => {
        this.attemptsTaken += 1;
        this.chosenCards = [];
        let allElements = this.results;
    
        for( let i = 0; i < 2; i++ ) {
            const index = Math.floor(Math.random() * allElements.length);
            const randomNum = allElements[index];
            this.chosenCards.push(randomNum);
    
            allElements = allElements.filter( (el) => el !== randomNum);
        }

        this.countPoints();
    }

    countPoints = () => {
        const massArray = this.chosenCards.map(el => parseFloat(el.mass));
        const maxMass = Math.max.apply(null, massArray);
        let playerPt = this.chosenCards.map( (el, id) => id === 0 && parseFloat(el.mass) === maxMass);
        playerPt[0] ? this.playerOnePoint += 1 : null;
        let compPt = this.chosenCards.map( (el, id) => id === 1 && parseFloat(el.mass) === maxMass);
        compPt[1] ? this.computerPoint += 1 : null;
    }

    resetValues = () => {
        this.playerOnePoint = 0;
        this.computerPoint = 0;
        this.attemptsTaken = 0;
        this.chosenCards = [];
    }

    render() {
        const massArray = this.chosenCards.map(el => parseFloat(el.mass));
        const maxMass = Math.max.apply(null, massArray);

        const renderTitles = () => {
            if( this.chosenCards === null ) {
                return null
                } else {
                    return ( 
                        this.chosenCards.map( 
                            (el, id) => 
                                <Cards 
                                    name={el.name}
                                    gender={el.gender}
                                    mass={el.mass}
                                    key={id}   
                                    playerOneWins={id === 0 && parseFloat(el.mass) === maxMass} 
                                    computerWins={id === 1 && parseFloat(el.mass) === maxMass}          
                                /> 
                            ) 
                        )
                    }
                }

    return (
            <NamesBox>
                <header>
                    <MainText>Choose cards</MainText>
                    <TextInHeader>Attempts taken: {this.attemptsTaken}</TextInHeader>
                    <Button onClick={this.pickCards}>PLAY!</Button>
                </header>

                { this.isLoading && <div className="spinner"></div> }
                <ResultsWrapper>
                    <CardsWrapper>
                        <h2>Player One</h2>
                        <TitleText>Points: {this.playerOnePoint}</TitleText>
                    </CardsWrapper>
                    <CardsWrapper>
                        <h2>Computer</h2>
                        <TitleText>Points: {this.computerPoint}</TitleText>
                    </CardsWrapper>
                </ResultsWrapper>
                <ResultsWrapper>{ renderTitles() } </ResultsWrapper>
                <NewGame onClick={this.resetValues}>New game</NewGame>
            </NamesBox>  
        )
    }
}

export default TheGame;
