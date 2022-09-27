import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {

    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? 
                <>
                    <Component/>
                    <Spinner/>
                </> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {

    const [comicsArr, setComicsArr] = useState([]);
    const [pages, setPages] = useState(0);
    const [charEnded, setCharEnded] = useState(false);
    const [offset, setOffset] = useState(111);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onLoadingMore();
    }, [offset]);

    const onComicsListLoaded = (newArr) => {
        let ended = newArr.length < 8 ? true : false;
        setCharEnded(ended);
        setNewItemLoading(false);

        setComicsArr(comicsArr => comicsArr.concat(newArr));
    }

    const onLoadingMore = () => {
        setPages(pages => pages + 1);
        comicsArr.length > 0 ? setNewItemLoading(true) : setNewItemLoading(false);
        getAllComics(offset)
            .then(res => onComicsListLoaded(res))
            .then(() => setProcess('confirmed'))
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

    return (
        <div className="comics__list">
            {setContent(process, () => renderComicsItems(), newItemLoading)}
            <button 
                disabled={newItemLoading}
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

