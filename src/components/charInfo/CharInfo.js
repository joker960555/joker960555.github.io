import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            char: null,
            loading: false,
            error: false
        }
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.characterID !== prevProps.characterID) {
            this.updateChar();
            // this.setState({loading: true, error: false});
        }
    }

    updateChar = () => {
        const {characterID} = this.props;
        if (!characterID) {
            return;
        }
        this.setState({loading: true, error: false});
        this.marvelService
            .getCharacterById(characterID)
            .then(char =>{this.setState({char: char, loading: false, error: false})})
            .catch(e => this.setState({error: true, loading: false}))
    }

    View = ({name, description, thumbnail, homepage, wiki, thumbnailCoverStatus, comics}) => {
        comics.splice(10);
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
                    {item.name}
                </li>
            ))}
        </ul>
        </>
        )
    }

    render = () => {
        const {char, loading, error} = this.state;
        let statusSkeleton = char === null && !loading ? Skeleton : null;
        let statusLoading = loading ? Spinner : null;
        let statusError = error ? ErrorMessage : null;
        let currentStatus = statusError || statusSkeleton || statusLoading ||
            this.View;

        return (
            <div className="char__info">
                {currentStatus(char)}
            </div>
        )
    }
    
}

CharInfo.propTypes = {
    characterID: PropTypes.number
}

export default CharInfo;