import * as React from 'react';
import { observer } from "mobx-react";
import { MainText, CardsWrapper, TitleText } from './game.styles';

interface ResponseItemType {
    name: string;
    gender: string;
    mass: string;
    playerOneWins: boolean;
    computerWins: boolean;
}

@observer
class Cards extends React.Component<ResponseItemType> {

    render() {
        const { name, gender, mass, playerOneWins, computerWins } = this.props;

      return (
            <CardsWrapper whoWins={computerWins || playerOneWins}>
                {computerWins && <MainText>Computer Wins</MainText>}
                {playerOneWins && <MainText>PlayerOne Wins</MainText>}
                    
                <TitleText>{name}</TitleText>
                <TitleText>gender: {gender}</TitleText>
                <TitleText>mass: {mass}</TitleText>
            </CardsWrapper>
       );
   }
}

export default Cards;