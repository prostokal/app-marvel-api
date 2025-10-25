
import MarvelService from '../../services/MarvelService';

import { Component } from 'react';

import imgNotFound from '../../resources/img/imgNotFound.jpeg';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './CharList.scss';


class CharList extends Component {
    state = {
        charList: [],
        activeChar: 0,
        limit: 9,
        codeStatus: {
            load: true,
            error: false,
            content: false
        }
    }
    marverService = new MarvelService();

    onCharListLoaded = (charList) => {
        this.setState({
            charList: charList,
            // content: true,
            // load: false
        })
    }
    // onError = () => {
    //     this.setState({
    //         loading: false,
    //         error: true
    //     })
    // }
    updateCharList = () => {
        this.marverService.getAllCharacters(this.state.limit)
        .then(this.onCharListLoaded)
        // .catch(this.onError);
    }
    componentDidMount() {
        this.updateCharList();
    }

    render() {
        const {charList, activeChar} = this.state;
       
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {
                    charList.map((item) => {
                        return (
                            <li className={activeChar == item.id ? "char__item char__item_active" : 'char__item'} key={item.id}>
                                <img src={item.thumbnail} alt={item.name} onError={(e) => {e.target.src = imgNotFound; e.target.style = 'object-fit: fill'}}/>
                                <div className="char__name">{item.name}</div>
                            </li>
                        )
                    })
                    }
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
export default CharList;