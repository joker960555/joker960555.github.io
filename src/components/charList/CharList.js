import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [charArr, setCharArr] = useState([]);
    const [pages, setPages] = useState(0);
    const [charEnded, setCharEnded] = useState(false);
    const [offset, setOffset] = useState(111);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onLoadingMore(offset);
    }, [offset])

    const onCharListLoaded = (newArray) => {
        let ended = newArray.length < 9 ? true : false;

        setCharArr(charArr => charArr.concat(newArray));
        setCharEnded(charEnded => ended);
    }

    const onLoadingMore = (offset) => {
        setPages(pages => pages + 1);
        getAllCharacters(offset)
            .then(charArr => onCharListLoaded(charArr))
            .catch(e => {})
    }

    const listItemsRefs = useRef([]);

    const isActive = (i) => {
        listItemsRefs.current.forEach(item => {
            item.classList.remove('char__item_selected')
        });
        listItemsRefs.current[i].classList.add('char__item_selected');
        listItemsRefs.current[i].focus();
    }

    const renderCharListItems = (charArr) => {
        const items = charArr.map((item, i) => {
            const {name, thumbnail, thumbnailCoverStatus, id} = item;
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="char__item"
                >
                    <li className="char__item" 
                        ref={el => listItemsRefs.current[i] = el}
                        onClick={() => {
                            props.onCharSelected(id);
                            isActive(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                isActive(i);
                                props.onCharSelected(id);
                            }
                        }}
                        tabIndex={0}
                    >
                        <img className={thumbnailCoverStatus} src={thumbnail} alt={name}/>
                        <div className="char__name">{name}</div>
                    </li>
                </CSSTransition>
            )
        })
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
    
    let statusLoading = loading && pages === 0 ? Spinner : null;
    let statusLoadMore = loading && pages > 0 ? <Spinner/> : null;
    let statusError = error ? ErrorMessage : null;
    let currentStatus = statusError || statusLoading || renderCharListItems
    return (
        <div className="char__list">
            {currentStatus(charArr)}
            {statusLoadMore}
            <button 
                className="button button__main button__long"
                disabled={loading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => setOffset(offset => offset + 9)} 
            >
                    <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;