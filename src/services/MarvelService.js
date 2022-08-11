
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=bd35b0eefb6ce288f155f735ed56a8d6';
    _apiOffsetValue = '111';

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${this._apiOffsetValue}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getMoreCharacters = async () => {
        this._apiOffsetValue = (+this._apiOffsetValue + 9).toString();
        return await this.getAllCharacters();
    }

    getCharacterById = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = ({name, description, thumbnail, urls, id, comics}) => {
        const onEmptyMessage = 'Sorry, description for this character was not added yet';
        let checkDescription = !description ? onEmptyMessage : `${description.slice(0, 211)}…`;
        let thumbnailCoverStatus = thumbnail.path.includes('image_not_available') ?
            ' _not-found' : '';

        return {
            name: name,
            description: checkDescription,
            thumbnail: `${thumbnail.path}.${thumbnail.extension} `,
            homepage: urls[0].url,
            wiki: urls[1].url,
            thumbnailCoverStatus: thumbnailCoverStatus, 
            id: id,
            comics: comics.items.slice(0, 10)
        }
    }
}

export default MarvelService;