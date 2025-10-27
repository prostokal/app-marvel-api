
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
    }
    marverService = new MarvelService();
    onCharListLoaded = (charList) => {
        this.setState({
            charList: charList,
            loading: false

        })
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    updateCharList = () => {
        this.marverService.getAllCharacters()
        .then(this.onCharListLoaded)
        .catch(this.onError);
    }
    componentDidMount() {
        this.updateCharList();
    }

    renderChars() {
        const {charList, activeChar} = this.state
        let charItems = []
                charItems = charList.map((item) => {
                    return (
                        <li className={activeChar == item.id ? "char__item char__item_active" : 'char__item'} key={item.id}>
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
        const {loading, error} = this.state;
        
        const items = this.renderChars();

        const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
        const spinner = loading ? <Spinner></Spinner> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {spinner}
                {content}
                {errorMessage}
                {!errorMessage ? <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>: null}
            </div>
        )
    }
}
export default CharList;