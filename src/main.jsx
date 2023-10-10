import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./components/app/App.jsx"
import MarvelServices from "./services/MarvelServices.js";
import './style/style.scss';

const marvelServices = new MarvelServices()

marvelServices.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
