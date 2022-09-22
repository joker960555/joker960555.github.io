import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, getCharacterById, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [])

    useEffect(() => {
        updateChar();
    }, [props.characterID])

    const updateChar = () => {
        const {characterID} = props;
        if (!characterID) {
            return;
        }

        clearError();
        getCharacterById(characterID)
            .then(char => {
                setChar(char);
            })
            .catch(e => {})
    }

    const View = ({name, description, thumbnail, homepage, wiki, thumbnailCoverStatus, comics}) => {
        comics.splice(10);
        const comicsId = comics.map(item => {
            return item.resourceURI.replace(/^.+comics\//, '');
        });

        return (
        <>
        <div className="char__basics">
            <img className={thumbnailCoverStatus} src={thumbnail} alt={name}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comics.length < 1 ? 'There are no comics about this character yet' 
            : comics.map((item, i) => (
                <li key={i} className="char__comics-item">
                    <Link to={`comics/${comicsId[i]}`}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
        </>
        )
    }

    let statusSkeleton = char === null && !loading ? Skeleton : null;
    let statusLoading = loading ? Spinner : null;
    let statusError = error ? ErrorMessage : null;
    let currentStatus = statusError || statusSkeleton || statusLoading || View;

    return (
        <div className="char__info">
            {currentStatus(char)}
        </div>
    )
    
}

CharInfo.propTypes = {
    characterID: PropTypes.number
}

export default CharInfo;