import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {

    constructor (props) {
        super(props)

        this.state = {
            charArr: [],
            loading: true,
            error: false,
            pages: 0,
            charEnded: false
        }
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
    }

    onCharListLoaded = (newArray) => {
        let ended = newArray.length < 9 ? true : false;

        this.setState(({charArr}) => ({
            charArr: charArr.concat(newArray),
            loading: false,
            error: false,
            charEnded: ended
        }))
    }
    
    updateCharList = () => {
        this.marvelService
            .getAllCharacters()
            .then(charArr => this.onCharListLoaded(charArr))
            .catch(e => this.setState({loading: false, error: true}))
    }

    onLoadingMore = () => {
        this.setState({
            loading: true,
            error: false,
            pages: this.state.pages + 1
        })
        this.marvelService
            .getMoreCharacters()
            .then(charArr => this.onCharListLoaded(charArr))
            .catch(e => this.setState({loading: false, error: true}))
    }

    listItemsRefs = [];
    setItemRef = (ref) => {
        this.listItemsRefs.push(ref);
    }

    isActive = (i) => {
        this.listItemsRefs.forEach(item => {
            item.classList.remove('char__item_selected')
        });
        this.listItemsRefs[i].classList.add('char__item_selected');
        this.listItemsRefs[i].focus();
    }

    renderCharListItems = (charArr) => {
        const items = charArr.map((item, i) => {
            const {name, thumbnail, thumbnailCoverStatus, id} = item;
            return (
                <li className="char__item" 
                    key={id}
                    ref={this.setItemRef}
                    onClick={() => {
                        this.props.onCharSelected(id);
                        this.isActive(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            this.isActive(i);
                            this.props.onCharSelected(id);
                        }
                    }}
                    tabIndex={0}
                >
                    <img className={thumbnailCoverStatus} src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    
    render = () => {
        const {charArr, loading, error, pages, charEnded} = this.state;
        let statusLoading = loading && pages === 0 ? Spinner : null;
        let statusLoadMore = loading && pages > 0 ? <Spinner/> : null;
        let statusError = error ? ErrorMessage : null;
        let currentStatus = statusError || statusLoading || this.renderCharListItems
        return (
            <div className="char__list">
                {currentStatus(charArr)}
                {statusLoadMore}
                <button 
                    className="button button__main button__long"
                    disabled={loading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={this.onLoadingMore} 
                >
                        <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;

/* <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li> */