import { Component } from 'react';

import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './CharContent.scss';

class  CharContent extends Component {
    
    state = {
        charId: null
    } 
    
    

    onCharSelected = (id) => {
            this.setState({
                charId: id
            })
    }



    render() {
        const {charId} = this.state
        return (
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={this.onCharSelected}>
                    </CharList>
                </ErrorBoundary>

                <ErrorBoundary>
                    <CharInfo charId={charId}></CharInfo>
                </ErrorBoundary>
                
            </div>
        )
    }
}

export default CharContent