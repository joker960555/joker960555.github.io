import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

const RandomChar = (props) => {

    const [char, setChar] = useState({});

    const {loading, error, getCharacterById, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, []);

    useEffect(() => {
        updateChar()
    }, [props.characterID]);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        
        getCharacterById(id)
            .then(onCharLoaded)
            .catch(e =>{})
    }

    const toggleCharacterOnClick = () => {
        clearError();
        updateChar();
    }
    
    let statusError = error ? ErrorMessage : null;
    let statusLoading = loading ? Spinner : null;
    let currentStatus = statusError || statusLoading || onLoaded;

    return (
        <div className="randomchar">
            {currentStatus(char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    className="button button__main"
                    onClick={toggleCharacterOnClick}
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const onLoaded = ({name, description, thumbnail, homepage, wiki, thumbnailCoverStatus}) => {
    let imgClassName = `randomchar__img${thumbnailCoverStatus}`
    return (
        <div className="randomchar__block">
            <img src={thumbnail}  alt="Random character" className={imgClassName}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;