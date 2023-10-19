import './charList.scss';
import ErrorMessage from "../errorMessage/errorMessage.jsx";
import Spinner from "../spinner/Spinner.jsx";
import {Component} from "react";
import MarvelServices from "../../services/MarvelServices.js";
import PropTypes from "prop-types";

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        newItemLoading: false,
        error: false,
        offset: 210,
        charEnded: false,
    }

    marvelService = new MarvelServices();

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        if (this.state.newItemLoading) {
            return; // Не выполнять запрос, если уже идет загрузка
        }

        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
          .then(this.onCharListLoaded)
          .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }

        this.setState(({ offset, charList }) => {
            const mergedCharList = [...charList];
            newCharList.forEach((newChar) => {
                if (!mergedCharList.some((char) => char.id === newChar.id)) {
                    mergedCharList.push(newChar);
                }
            });

            return {
                charList: mergedCharList,
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
            };
        });
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
              <li
                className="char__item"
                key={item.id}
                onClick={() => {this.props.onCharSelected(item.id)}}
              >
                  <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                  <div className="char__name">{item.name}</div>
              </li>
            )
        });
        return (
          <ul className="char__grid">
              {items}
          </ul>
        )
    }

    render() {
        const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? this.renderItems(charList) : null;

        return (
          <div className="char__list">
              {errorMessage}
              {spinner}
              {content}
              <button
                disabled={newItemLoading}
                onClick={() => this.onRequest(offset)}
                className="button button__main button__long"
                style={{'display' : charEnded ? 'none': 'block'}}
              >
                  <div className="inner">load more</div>
              </button>
          </div>
        );
    }
}
CharList.propTypes = {
    onCharSelected: PropTypes.func,
}


export default CharList;