import {useHttp} from '../hooks/http.hook';


const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=bd35b0eefb6ce288f155f735ed56a8d6';

    const getAllCharacters = async (offset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic)
    }

    const getCharacterById = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        console.log(res.data.results)
        const checkOnValidName = res.data.results.length === 0 ? 
            [] : [_transformCharacter(res.data.results[0])];
        return checkOnValidName;
        // return res.data.results.length > 0 && _transformCharacter(res.data.results[0]);

    }

    const getComicById = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    const _transformCharacter = ({name, description, thumbnail, urls, id, comics}) => {
        const onEmptyMessage = 'Sorry, description for this character was not added yet';
        const checkDescription = !description ? onEmptyMessage :
            `${description.length > 211 ? description.slice(0, 211) + '…' :description}`
        const thumbnailCoverStatus = thumbnail.path.includes('image_not_available') ?
            ' _not-found' : ''; 

        return {
            name: name,
            description: checkDescription,
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            homepage: urls[0].url,
            wiki: urls[1].url,
            thumbnailCoverStatus: thumbnailCoverStatus, 
            id: id,
            comics: comics.items.slice(0, 10),
            // comicsId: comics.items.resourceURI.replace(/^.+comics\//, '')
        }
    }

    const _transformComic = ({title, prices, urls, thumbnail, id, description, pageCount, textObjects}) => {
        const checkPrice = prices[0].price > 0 ? `${prices[0].price}$` : 'NOT AVAILABLE';
        const onEmptyMessage = 'Sorry, description for this character was not added yet';
        const checkDescription = !description ? onEmptyMessage :
            `${description.length > 811 ? description.slice(0, 811) + '…' : description}`

        return {
            name: title,
            price: checkPrice,
            urls: urls[0].url,
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            id: id,
            description: checkDescription,
            pageCount: pageCount || 'No information about the number of pages',
            language: textObjects.language || 'En-Us'
        }
    }

    return {
        loading, 
        error, 
        getAllCharacters, 
        getCharacterById, 
        getAllComics, 
        getComicById, 
        clearError,
        getCharacterByName,
    };
}

export default useMarvelService ;




