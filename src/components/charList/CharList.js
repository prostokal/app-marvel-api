
import useMarvelService from '../../services/MarvelService';

import { useState, useEffect, useRef} from 'react';

import imgNotFound from '../../resources/img/imgNotFound.jpeg';
import './CharList.scss';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true) 
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }
    const onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderChars(arr) {
        const {onCharSelected} = props;
        let charItems = arr.map((item, i) => {
            return (
                <li  
                    ref={el => itemRefs.current[i] = el } 
                    onKeyDown={(e) => {if (e.code == 'Space' || e.code == 'Enter') {e.preventDefault(); onCharSelected(item.id); focusOnItem(i)}}} 
                    onClick={() => {onCharSelected(item.id); focusOnItem(i);}}
                    tabIndex='0' 
                    className={'char__item'} 
                    key={item.id}>
                    <img 
                    src={item.thumbnail} 
                    alt={item.name} 
                    onError={(e) => {e.target.src = imgNotFound; e.target.style = 'object-fit: fill'}}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {charItems}
            </ul>
        )
    }
        const items = renderChars(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                {!errorMessage ? <button
                onClick={() => onRequest(offset)} 
                className="button button__main button__long"
                style={{'display': `${charEnded ? 'none' : 'block'}`}}
                disabled={newItemLoading}
                >
                    <div className="inner">load more</div>
                </button> : null}
            </div>
        )
}

export default CharList;