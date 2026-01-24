import './CharInfo.scss';

import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';

import imgNotFound from '../../resources/img/imgNotFound.jpeg';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../../components/skeleton/Skeleton';

const CharInfo = (props) => {

    const [char, setChar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();
    
    useEffect(() => {
        updateChar();
    }, [])

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        onCharLoading();
        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }
    const onCharLoading = () => {
        setLoading(true);
    }
    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }
    
    const onError = () => {
        setLoading(false);
        setError(true);
    }
           
    const skeleton = char || error || loading ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(errorMessage || spinner || !char) ? <View char={char}/> : null;

    return (
        <aside className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </aside> 
    )
}


const View = (props) => {

        const {thumbnail, name, description, homepage,  wiki, comics} = props.char;
        
        return (
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt={name} onError={(e) => {e.target.src = imgNotFound; e.target.style.objectFit = 'fill'}}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                       comics.length > 0 ? comics.map((item, i) => {
                            return (
                                <li key={i} className="char__comics-item">
                                    {item}
                                </li>
                            )
                        }).slice(0, 9) : "Now this character don't have comics"
                    }
                    
                </ul>
            </>
        )
}

export default CharInfo