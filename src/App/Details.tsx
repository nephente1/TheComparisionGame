import * as React from 'react';
import { observer } from "mobx-react";
import { observable } from "mobx";

interface ResponseItemType {
    name: string
}

interface DetailsPropsType {
    details: string  | null
}
@observer
class Details extends React.Component<DetailsPropsType> {

    @observable api3: string = `https://pokeapi.co/api/v2/pokemon/` + `${this.props.details}` +`/`;
    @observable results3: Array<ResponseItemType> = [];
    @observable isLoading: boolean | undefined = true;
    @observable imageFront: string = '';
    @observable imageBack: string = '';
    @observable weight: string = '';
    @observable baseEx: string = '';

    async componentDidMount(){
        const response2 = await fetch(this.api3);
        const respJson = await response2.json();
        this.results3 = respJson;
        this.imageFront = respJson.sprites.front_default;
        this.imageBack = respJson.sprites.back_default;
        this.weight = respJson.weight;
        this.baseEx = respJson.base_experience;
        this.isLoading = false;
    }

render() {
    const renderDetails = () => {
        if (this.props.details === null) {
            return null
        } else {
            return (
                <div className="details">
                    <div className="column">
                        <h3>Front</h3>
                        <div className="imgBox"> <img src={this.imageFront}/>
                        </div> 
                        <p>Mass: {this.weight} kg</p>
                    </div>
                    <div className="column">
                        <h3>Back</h3>
                        <div className="imgBox"> <img src={this.imageBack}/></div> 
                        <p>Base experience: {this.baseEx}</p>
                    </div>
                    { this.isLoading && <div className="spinner"></div> }
                </div>      
                )
            }
        }

    return(
        <React.Fragment>
            { renderDetails() }        
        </React.Fragment>
        )
    }
}

export default Details;