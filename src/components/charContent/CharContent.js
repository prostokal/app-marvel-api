import { Component } from 'react';

import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './CharContent.scss';

class  CharContent extends Component {
    
    state = {
        charId: null
    }
    
    changeActiveCharState = (id) => {
        this.setState({
            charId: id
        })
    }



    render() {

        return (
            <div className="char__content">
                <ErrorBoundary>
                    <CharList charId={this.state.charId} changeActiveChar={this.changeActiveCharState}></CharList>
                </ErrorBoundary>

                <ErrorBoundary>
                    <CharInfo charId={this.state.charId}></CharInfo>
                </ErrorBoundary>
                
            </div>
        )
    }
}

export default CharContent