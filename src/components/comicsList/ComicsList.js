
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';


import './comicsList.scss';

const ComicsList = () => {
    

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    
    useEffect(() => {
        onRequest(offset, true);
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true) 
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false
        if (newComicsList.length < 8) {
            ended = true
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setComicsEnded(comicsEnded => ended);
    }

    const renderComics = () => {

        const items = comicsList.map((comic, i) => {
            return (
                <li key={comic.id} onClick={(e) => {e.preventDefault();}} className="comics__item">
                    <Link to={`/comics/${comic.id}`}>
                        <img src={comic.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}$</div>
                    </Link>
                </li>
            )
        })
        return items
    };
    
    const items = renderComics();
    const errorMessage = error ? <ErrorMessage/> : null;
    const spiner = loading && !newItemLoading ? <Spinner/> : null;
    

    return (
        <div className="comics__list">
            <ul style={{display: 'grid'}} className="comics__grid">
                {items}
            </ul>
                {errorMessage}
                {spiner}
            {
             <button
            style={{'display': `${comicsEnded ? 'none' : 'block'}`}}
            className="button button__main button__long" 
            onClick={() => onRequest(offset)}
            disabled={newItemLoading || errorMessage}
            >
                <div className="inner">load more</div>
            </button>
            }
        </div>
    )
}

export default ComicsList;