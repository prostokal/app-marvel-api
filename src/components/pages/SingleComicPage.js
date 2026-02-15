import './singleComicPage.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useEffect, useState } from 'react';

import {useParams, Link} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

const SingleComicPage = () => {

    const {loading, error, getComic, clearError} = useMarvelService();

    const [comic, setComic] = useState(null);
    const {comicId} = useParams();

    useEffect(() => {
        updateComic();
    }, [comicId])

    
    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
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
                <p className="single-comic__descr">{comic.pageCount}</p>
                <p className="single-comic__descr">Language: {comic.language}</p>
                <div className="single-comic__price">{comic.price}$</div>
            </div>
            <Link  to="/comics" className="single-comic__back">Back to all</Link>
        </div>
        )
    }
    
    const errorMessage = error ? <> <ErrorMessage/> <div style={{textAlign: 'center', 'marginTop': '10px'}} ><Link style={{fontSize: '21px', fontWeight: 'bold'}} to='/comics'>back to comics</Link></div> </> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(errorMessage || spinner || !comic) ? <View comic={comic}/> : null;
    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
        
    )
}

export default SingleComicPage;