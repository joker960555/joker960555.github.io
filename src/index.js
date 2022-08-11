import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';

import MarvelService from './services/MarvelService';

import './style/style.scss';

// let marvelService = new MarvelService()
//     marvelService.getAllCharacters().then(data => console.log(data));
//     marvelService.getCharacterById(1010996).then(data => console.log(data));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

