import * as React from 'react';
import { observer } from "mobx-react";
import { observable, computed } from "mobx";

import Cards from './Cards';

interface ResponseItemType {
    name: string,
    gender: string,
    mass: string
}
@observer
export class App extends React.Component<{}> {
    @observable results: Array<ResponseItemType> = [];
    @observable isLoading: boolean | undefined = true;
    @observable nums: number = 0;
    @observable wylosowaneKarty: Array<ResponseItemType> = [];

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const response = await fetch(`https://swapi.co/api/people/`);
        const respJson = await response.json();
        this.results = respJson.results;
        this.isLoading = false;
    }

    // inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const res = this.results.filter(el => el.name.toLowerCase().match(e.target.value.toLowerCase()));
    //     this.searchResults = res, () => this.loadData();
    //     this.nums = 0;
    // }

    pickCards = () => {
        this.wylosowaneKarty = [];
        let tablica = this.results;
    
        for( let i = 0; i < 2; i++ ) {
            const index = Math.floor(Math.random() * tablica.length);
            const randomNum = tablica[index];
            this.wylosowaneKarty.push(randomNum);
    
            tablica = tablica.filter( (el) => el !== randomNum);
        }

    }

    render() {
        const renderTitles = () => {
            if( this.wylosowaneKarty === null ) {
                return null
                } else {
                    return (
                        this.wylosowaneKarty.map( 
                            (el, id) => 
                                <Cards 
                                    name={el.name}
                                    gender={el.gender}
                                    mass={el.mass}
                                    key={id}                                      
                                /> 
                            ) 
                        )
                    }
            }
        

    return (
        <div className="app">
            <div className="namesBox">

                <header className="header">
                    <div>
                        <h1>Choose cards</h1>
                    </div>
                    <div>
                        <p className="textInHeader">All characters: {this.results.length}</p>
                        <button onClick={this.pickCards}>PLAY!</button>
                    </div>
                </header>

                { this.isLoading && <div className="spinner"></div> }
                { renderTitles() } 
                
            </div>  
        </div>
        )
    }
}


// *** https://pokeapi.co/