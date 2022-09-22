import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import ComicPage from '../../services/ComicPageService'
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {

    const [comic, setComic] = useState({});
    const {loading, error, getComicById, clearError} = useMarvelService();
    const {comicId} = useParams();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    

    const updateComic = () => {
        clearError();
        getComicById(comicId)
        .then(resp => onComicLoaded(resp))
        .catch(e => {});
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const linkRenderItem = <Link to={'../comics'} className="single-comic__back">Back to all</Link>;
    const statusLoading = loading ? Spinner : null;
    const statusError = error ? ErrorMessage : null;
    const currentStatus = statusError || statusLoading || ComicPage;

    return (
        <>
            {currentStatus(comic, linkRenderItem)}
        </>
    )
}

// const View = ({title, price, thumbnail, description, pageCount, language}) => {
//     return (
//         <div className="single-comic">
//             <img src={thumbnail} alt="x-men" className="single-comic__img"/>
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{title}</h2>
//                 <p className="single-comic__descr">{description}</p>
//                 <p className="single-comic__descr">{pageCount} pages</p>
//                 <p className="single-comic__descr">Language: {language}</p>
//                 <div className="single-comic__price">{price}</div>
//             </div>
//             <Link to={'../comics'} className="single-comic__back">Back to all</Link>
//         </div>
//     );
// }

export default SingleComicPage;