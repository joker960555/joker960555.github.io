import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import ComicPage from '../../services/ComicPageService'
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleComicPage.scss';

const SingleComicPage = () => {

    const [comic, setComic] = useState({});
    const {getComicById, clearError, process, setProcess} = useMarvelService();
    const {comicId} = useParams();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    

    const updateComic = () => {
        clearError();
        getComicById(comicId)
        .then(resp => onComicLoaded(resp))
        .then(() => setProcess('confirmed'))
        .catch(e => {});
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const linkRenderItem = <Link to={'../comics'} className="single-comic__back">Back to all</Link>;

    return (
        <>
            {setContent(process, () => ComicPage(comic, linkRenderItem))}
        </>
    )
}

export default SingleComicPage;