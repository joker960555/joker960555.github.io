import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const [comicsArr, setComicsArr] = useState([]);
    const [pages, setPages] = useState(0);
    const [charEnded, setCharEnded] = useState(false);
    const [offset, setOffset] = useState(111);

    const {loading, error, getAllComics, getComicById} = useMarvelService();

    useEffect(() => {
        onLoadingMore();
    }, [offset]);

    const onComicsListLoaded = (newArr) => {
        let ended = newArr.length < 8 ? true : false;
        setCharEnded(ended);

        setComicsArr(comicsArr => comicsArr.concat(newArr));
    }

    const onLoadingMore = () => {
        setPages(pages => pages + 1);

        getAllComics(offset)
            .then(res => onComicsListLoaded(res))
            .catch(e=>{})
    }

    const renderComicsItems = () => {
        const items = comicsArr.map((item, i) => {
            const {name, price, urls, thumbnail, id} = item;

            return (
                <li 
                    key={i}
                    className="comics__item"
                >
                    <Link to={`${id}`}>
                        <img src={thumbnail} alt={name} className="comics__item-img"/>
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const statusLoading = loading && pages === 0 ? Spinner : null;
    const statusLoadMore = loading && pages > 0 ? <Spinner/> : null;
    const statusError = error ? ErrorMessage : null;
    const currentStatus = statusLoading || statusError || renderComicsItems;

    return (

        <div className="comics__list">
            {currentStatus()}
            {statusLoadMore}
            <button 
                disabled={loading}
                onClick={() => setOffset(offset => offset + 8)}
                style={{'display': charEnded ? 'none' : 'block'}}
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;

