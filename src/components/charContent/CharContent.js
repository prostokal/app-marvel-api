import { useState } from 'react';

import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './CharContent.scss';

const CharContent = () => {
    
    const [charId, setCharId] = useState(null);
    
    

    const onCharSelected = (id) => {
        setCharId(id);
    }

    return (
        <div className="char__content">
            <ErrorBoundary>
                <CharList onCharSelected={onCharSelected}>
                </CharList>
            </ErrorBoundary>

            <ErrorBoundary>
                <CharInfo charId={charId}></CharInfo>
            </ErrorBoundary>
            
        </div>
    )

}

export default CharContent