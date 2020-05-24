import * as React from 'react';
import {observer} from 'mobx-react-lite';
import {GameState} from './GameState';
import {Cards} from './Cards';
import {TextInHeader, MainText, Button, NamesBox , ResultsWrapper, CardsWrapper, TitleText, NewGame, Spinner} from './gameBoard.styles';

export const GameBoard = observer(() => {
    const [state] = React.useState(() => new GameState());
    
    React.useEffect(() => {
        state.loadData();
    });

    const massArray = state.chosenCards.map(el => parseFloat(el.mass));
    const maxMass = Math.max.apply(null, massArray);

    const renderCards = () => {
        if( state.chosenCards !== null ) {
            return ( 
                state.chosenCards.map( 
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
                <TextInHeader>Player with bigger mass wins</TextInHeader>
                <TextInHeader>Attempts taken: {state.attemptsTaken}</TextInHeader>
                <Button onClick={state.pickCards}>PLAY!</Button>
            </header>

            { state.isLoading && <Spinner /> }
            <ResultsWrapper>
                <CardsWrapper>
                    <h2>Player One</h2>
                    <TitleText>Points: {state.playerOnePoint}</TitleText>
                </CardsWrapper>
                <CardsWrapper>
                    <h2>Computer</h2>
                    <TitleText>Points: {state.computerPoint}</TitleText>
                </CardsWrapper>
            </ResultsWrapper>
            <ResultsWrapper>{renderCards()} </ResultsWrapper>
            <NewGame onClick={state.resetValues}>New game</NewGame>
        </NamesBox>  
    );
});