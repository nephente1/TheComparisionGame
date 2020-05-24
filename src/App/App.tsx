import * as React from 'react';
import {GameBoard} from './GameBoard/GameBoard';
import {AppBody} from '../../style/mainStyles';

export const App = () => {
    return (
        <AppBody>
            <GameBoard />
        </AppBody>
    )
}
