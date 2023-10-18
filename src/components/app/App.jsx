import {Component} from "react";

import AppHeader from "../appHeader/AppHeader.jsx";
import RandomChar from "../randomChar/RandomChar.jsx";
import CharList from "../charList/CharList.jsx";
import CharInfo from "../charInfo/CharInfo.jsx";

import decoration from '../../assets/img/vision.png';
import ErrorBoundary from "../errorBoundary/errorBoundary.jsx";


class App extends Component {
  state = {
    selectedChar:null,
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar:id
    })
  }
  render() {
    return (
      <div className="app">
        <AppHeader/>
        <main>
          <ErrorBoundary>
            <RandomChar/>
          </ErrorBoundary>
          <div className="char__content">
            <CharList onCharSelected={this.onCharSelected}/>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar}/>
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
      </div>
    )
  }
}

export default App;