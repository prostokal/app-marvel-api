import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './RandomChar.scss';

import mjolnir from "../../resources/img/mjolnir.png"
import imgNotFound from "../../resources/img/imgNotFound.jpeg"


class Randomchar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
        thumbnailDestroy: false
    }
    
    marverService = new MarvelService();
    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 3000)
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false,
            thumbnailDestroy: false,
        })
    }

   
    updateChar = () => {
        const id = Math.ceil(Math.random() * 20)
        this.onCharLoading()
        this.marverService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }
    
    changeImageState = (bool) => {
        this.setState({
            thumbnailDestroy: bool
        })
    }

    render() {
        const {char, loading, error, thumbnailDestroy} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} thumbnailDestroy={thumbnailDestroy} imageChangeState={this.changeImageState}/> : null;

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
                        <button onClick={() => this.updateChar()} className="button button__main">
                            <div className="inner">try it</div>
                        </button>
                        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                    </div>
            </div>
        )
    }
}
const View = ({char, thumbnailDestroy,imageChangeState }) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    return (
        <div className="randomchar__block" key={name}>
            <img
            src={thumbnailDestroy ? imgNotFound: thumbnail}
            style={{objectFit: `${thumbnailDestroy ? 'fill' : 'cover'}`}}
            alt="Random character"
            className="randomchar__img"
            onError={() => imageChangeState(true)}
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