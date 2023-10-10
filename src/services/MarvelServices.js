class MarvelServices {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = 'apikey=0b2621362464456e90bec55f69734153'

  getResources = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }

  getAllCharacters = () => {
    return this.getResources(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
  }
  getCharacters = (id) => {
    return this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`)
  }
}

export default MarvelServices