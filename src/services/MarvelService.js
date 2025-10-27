


class MarvelService {
    _apiBase = 'https://marvel-server-zeta.vercel.app/';
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';


     getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, ${res.status}`)
        }

        return await res.json(); 
    }

    getAllCharacters = async (limit=9) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=${limit}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (character) => {
        return {
            name: character.name,
            description: character.description ? `${character.description.length > 150 ? character.description.slice(0,150) + '...' : character.description}` : 'There is currently no description for this character ;(',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            id: character.id
        }
    }
}

export default MarvelService