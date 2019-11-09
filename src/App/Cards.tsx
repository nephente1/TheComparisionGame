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
      return (
            <>
                <CardsWrapper whoWins={this.props.computerWins || this.props.playerOneWins}>
                    {this.props.computerWins && <MainText>Computer Wins</MainText>}
                    {this.props.playerOneWins && <MainText>PlayerOne Wins</MainText>}
                        
                    <TitleText>{this.props.name}</TitleText>
                    <TitleText>{this.props.gender}</TitleText>
                    <TitleText>{this.props.mass}</TitleText>
                </CardsWrapper>
            </>
       );
   }
}

export default Cards;