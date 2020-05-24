import {observable} from 'mobx';

interface ResponseItemType {
    name: string,
    gender: string,
    mass: string
}

export class GameState {
    @observable results: Array<ResponseItemType> = [];
    @observable isLoading: boolean | undefined = true;
    @observable chosenCards: Array<ResponseItemType> = [];
    @observable playerOnePoint: number = 0;
    @observable computerPoint: number = 0;
    @observable attemptsTaken: number = 0;

    constructor(){}

    loadData = async () => {
        const response = await fetch(`https://swapi.dev/api/people/`);
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
}