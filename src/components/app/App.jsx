import {useState} from "react";

import AppHeader from "../appHeader/AppHeader.jsx";
import RandomChar from "../randomChar/RandomChar.jsx";
import CharList from "../charList/CharList.jsx";
import CharInfo from "../charInfo/CharInfo.jsx";

import decoration from '../../assets/img/vision.png';
import ErrorBoundary from "../errorBoundary/errorBoundary.jsx";


const App = () => {
  const [selectedChar,  setChar] = useState(null)

  const onCharSelected = (id) => {
      setChar(id)
  }

  return (
    <div className="app">
      <AppHeader/>
      <main>
        <ErrorBoundary>
          <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
          <CharList onCharSelected={onCharSelected}/>
          <ErrorBoundary>
            <CharInfo charId={selectedChar}/>
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
      </main>
    </div>
  )
}

export default App;