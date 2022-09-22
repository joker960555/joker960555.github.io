import { useLocation } from 'react-router-dom';

import ComicPage from '../../services/ComicPageService'

import './singleComicPage.scss';

const SingleCharacterPage = () => {
    const location = useLocation();
    const { from } = location.state;
    console.log(from.name, from.description)

    const currentStatus = ComicPage;

    return (
        <>
            {currentStatus(from)}
        </>
    )

}

export default SingleCharacterPage;