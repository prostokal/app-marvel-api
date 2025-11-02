
import MarvelService from '../../services/MarvelService';

import { Component } from 'react';

import imgNotFound from '../../resources/img/imgNotFound.jpeg';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './CharList.scss';
import Spinner from '../spinner/Spinner';


class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        offset: 0,
        charEnded: false,
        newItemsLoading: false
    }

    marverService = new MarvelService();
    
    componentDidMount() {
        this.onRequest();
    }


    onRequest = (offset) => {
        this.onCharListLoading();
        this.marverService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError);
    }
    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }
    onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }
        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            offset: offset + 9,
            charEnded: ended,
            newItemsLoading: false
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderChars() {
        const {charList} = this.state;
        const {changeActiveChar, charId} = this.props;

                let charItems = charList.map((item) => {
                    return (
                        <li onClick={() => changeActiveChar(item.id)} className={charId === item.id ? "char__item char__item_selected" : 'char__item'} key={item.id}>
                            <img src={item.thumbnail} alt={item.name} onError={(e) => {e.target.src = imgNotFound; e.target.style = 'object-fit: fill'}}/>
                            <div className="char__name">{item.name}</div>
                        </li>
                    )
                })
        return (
            <ul className="char__grid">
                {
                    charItems
                }
            </ul>
        )
    }
    render() {
        const {loading, error, charEnded,offset, newItemsLoading} = this.state;
        
        const items = this.renderChars();

        const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
        const spinner = loading ? <Spinner></Spinner> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {spinner}
                {content}
                {errorMessage}
                {!errorMessage ? <button 
                onClick={() => this.onRequest(offset)} 
                className="button button__main button__long"
                style={{'display': `${charEnded ? 'none' : 'block'}`}}
                disabled={newItemsLoading}
                >
                    <div className="inner">load more</div>
                </button>: null}
            </div>
        )
    }
}
export default CharList;