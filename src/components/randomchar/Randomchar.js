import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';

import './RandomChar.scss';

import ErrorMessage from '../errorMessage/ErrorMessage';
import mjolnir from "../../resources/img/mjolnir.png"
import Spinner from '../spinner/Spinner';
import imgNotFound from "../../resources/img/imgNotFound.jpeg"


const Randomchar = () => {
    
    const [char, setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService();
    const [thumbnailDestroy, setThumbnailDestroy] = useState(false);


    useEffect(() => {
        updateChar();
    }, [])

    // componentDidMount() {
        // updateChar();
        // this.timerId = setInterval(this.updateChar, 3000)
    // }
    // componentWillUnmount() {
    //     clearInterval(this.timerId);
    // }


    const onCharLoaded = (char) => {
        setChar(char);
        setThumbnailDestroy(false);
    }

   
    const updateChar = () => {
        clearError();
        const id = Math.ceil(Math.random() * 20)
        getCharacter(id)
            .then(onCharLoaded)

    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char} thumbnailDestroy={thumbnailDestroy} setThumbnailDestroy={setThumbnailDestroy}/> : null;

    return (
        <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
        </div>
    )
    
}
const View = ({char, thumbnailDestroy,setThumbnailDestroy }) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    return (
        <div className="randomchar__block" key={name}>
            <img
            src={thumbnailDestroy ? imgNotFound: thumbnail}
            style={{objectFit: `${thumbnailDestroy ? 'fill' : 'cover'}`}}
            alt="Random character"
            className="randomchar__img"
            onError={() => setThumbnailDestroy(true)}
            />
              
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className={"randomchar__descr"}>
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}


export default Randomchar;