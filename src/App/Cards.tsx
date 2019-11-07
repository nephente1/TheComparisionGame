import * as React from 'react';
import { observer } from "mobx-react";
import { observable } from "mobx";
import styled from '@emotion/styled';

interface CardsWrapperType {
    bigger: boolean
}

const CardsWrapper = styled ('div')<CardsWrapperType>`
    background: ${props => props.bigger ? 'red' : 'none'}
`

const TitleText = styled('h2')`
    font-size: 18px;
    margin-top: 16px;
    margin-bottom: 12px;
    letter-spacing: 1px;
    color: #d5d5d5;
    text-transform: capitalize;
    cursor: pointer;
    color: #d5d5d5;
`

interface ResponseItemType {
    name: string,
    gender: string,
    mass: string,
    bigger: boolean
}

// interface TitlesPropsType {
//     name: string,
//     results: Array<ResponseItemType>
// }

@observer
class Cards extends React.Component<ResponseItemType> {

    // componentDidUpdate(prevProps: ResponseItemType): void {
    //     if (this.props.name !== prevProps.name) {
    //         this.isOpen = false;
    //     }
    //   }

    render() {
        console.log('xx',this.props.mass)
      return (
            <CardsWrapper bigger={this.props.bigger}>
               
                    <TitleText>{this.props.name}</TitleText>
                    <TitleText>{this.props.gender}</TitleText>
                    <TitleText>{this.props.mass}</TitleText>

            </CardsWrapper>
       );
   }
}

export default Cards;