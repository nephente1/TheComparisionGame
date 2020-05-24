import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { MainText, CardsWrapper, TitleText } from './gameBoard.styles';

interface ResponseItemType {
    name: string;
    gender: string;
    mass: string;
    playerOneWins: boolean;
    computerWins: boolean;
}

export const Cards = observer(({name, gender, mass, playerOneWins, computerWins}: ResponseItemType) => {
    return (
        <CardsWrapper whoWins={computerWins || playerOneWins}>
            {computerWins && <MainText>Computer Wins</MainText>}
            {playerOneWins && <MainText>PlayerOne Wins</MainText>}
                
            <TitleText>{name}</TitleText>
            <TitleText>gender: {gender}</TitleText>
            <TitleText>mass: {mass}</TitleText>
        </CardsWrapper>
    );
});