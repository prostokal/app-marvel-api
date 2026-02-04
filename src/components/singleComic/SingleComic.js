import './singleComic.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';

const SingleComic = (props) => {

    const {loading, error,getComic, clearError} = useMarvelService();

    const [comic, setComic] = useState(false);

    useEffect(() => {
        updateComic();
    }, [props.comicId])

    
    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        const {comicId} = props;
        if (!comicId) {
            return;
        }

        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }
    
    const View = ({comic}) => {
        
        return (
        <div className="single-comic">
            <img src={comic.thumbnail} alt={comic.title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comic.title}</h2>
                <p className="single-comic__descr">{comic.description}</p>
                <p className="single-comic__descr">{comic.pageCount} pages</p>
                <p className="single-comic__descr">Language: {comic.language}</p>
                <div className="single-comic__price">{comic.price}$</div>
            </div>
            <a href="#" onClick={props.resetActiveComic} className="single-comic__back">Back to all</a>
        </div>
        )
    }
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(errorMessage || spinner || !comic) ? <View comic={comic}/> : null;
    return (
        <>
        {content}
        {errorMessage}
        {spinner}
        </>
        
    )
}

export default SingleComic;