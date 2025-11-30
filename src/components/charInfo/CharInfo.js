import './CharInfo.scss';

import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import imgNotFound from '../../resources/img/imgNotFound.jpeg';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../../components/skeleton/Skeleton';

class CharInfo extends Component {

    state = {
        char: false,
        loading: false,
        error: false
    }
    
    marvelService = new MarvelService();
    
     componentDidMount() {
        this.updateChar()  
    }
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()  
        }
    }
    
    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }
        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }
    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false
            
        })
    }
    
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
   

    render() {
        const {char, error, loading} = this.state;
        
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
}


class View extends Component {

    render() {
        const {thumbnail, name, description, homepage,  wiki, comics} = this.props.char
        
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
}

export default CharInfo