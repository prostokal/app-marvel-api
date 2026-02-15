
import {useHttp} from '../hooks/http.hook'; 

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp();
    
    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const _baseOffset = 0;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id=0) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }   

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }
    const getComic = async (id=0) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (character) => {

        return {
            name: character.name,
            description: character.description ? `${character.description.length > 150 ? character.description.slice(0,150) + '...' : character.description}` : 'There is currently no description for character ;(',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
            id: character.id
        }
    }
     const _transformComics = (character) => {
        return {
            title: character.title,
            description: character.description ? `${character.description.length > 150 ? character.description.slice(0,150) + '...' : character.description}` : 'There is currently no description for character ;(',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            price: character.prices[0].price || 'not available',
            pageCount: `${character.pageCount} pages`,
            language: character.textObjects.languages || 'en-us',
            id: character.id
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getAllComics, getComic, clearError}
}

export default useMarvelService;