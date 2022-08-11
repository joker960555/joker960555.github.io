import { Component } from "react/cjs/react.production.min";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        characterID: null
    }

    onCharSelected = (id) => {
        this.setState({characterID: id})
    }

    render = () => {
        const {characterID} = this.state;
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                    <ErrorBoundary>
                        <CharList
                            onCharSelected={this.onCharSelected}
                        />
                    </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo
                                characterID={characterID}    
                            />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;