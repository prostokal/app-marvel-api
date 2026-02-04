import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import SingleComic from '../singleComic/SingleComic';

import { useState, useEffect} from 'react';

const ComicsList = () => {
    
    const [activeComic, setActiveComic] = useState(null);

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    
    useEffect(() => {
        onRequest(offset);
    }, [])
    
    const onRequest = (offset, initial) => {
        // initial ? setNewItemLoading(false) : setNewItemLoading(true) 
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

    const resetActiveComic = () => {
        setActiveComic(null);
    }

    const renderComics = () => {
        
        if (activeComic) {
            return (
                <SingleComic comicId={activeComic} resetActiveComic={resetActiveComic}></SingleComic>
            )
        }

        const items = comicsList.map((comics, i) => {
            return (
                <li key={comics.id} onClick={(e) => {e.preventDefault(); setActiveComic(comics.id)}} className="comics__item">
                    <a href="#">
                        <img src={comics.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{comics.title}</div>
                        <div className="comics__item-price">{comics.price}$</div>
                    </a>
                </li>
            )
        })
        return items
    };
    
    const items = renderComics();
    const errorMessage = error ? <ErrorMessage/> : null;
    const spiner = loading ? <Spinner/> : null;
    

    return (
        <div className="comics__list">
            <ul style={{display: `${activeComic ? 'block' : 'grid'}`}} className="comics__grid">
                {items}
            </ul>
                {errorMessage}
                {spiner}
            {
            !activeComic ?    
             <button
            style={{'display': `${comicsEnded ? 'none' : 'block'}`}}
            className="button button__main button__long" 
            onClick={() => onRequest(offset)}
            disabled={newItemLoading || errorMessage}
            >
                <div className="inner">load more</div>
            </button> : null
            }
        </div>
    )
}

export default ComicsList;