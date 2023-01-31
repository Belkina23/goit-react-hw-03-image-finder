import axios from 'axios';

class API {
  #API_KEY = '31947460-94dfdb2440a2031458268e436';
  #BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this._searchToFetch = '';
    this.pageToFetch = 1;
  }

  get API_KEY() {
    return this.#API_KEY;
  }

  get BASE_URL() {
    return this.#BASE_URL;
  }

  resetPage() {
    this.pageToFetch = 1;
  }

  incrementPage() {
    this.pageToFetch += 1;
  }

  get searchToFetch() {
    return this._searchToFetch;
  }

  set searchToFetch(keyword) {
    this._searchToFetch = keyword;
  }

  async fetch() {
    const searchParams = new URLSearchParams({
      q: this.searchToFetch,
      key: this.API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: this.pageToFetch,
    }).toString();

    return await axios.get(`${this.BASE_URL}?${searchParams}`);
  }
}

const api = new API();

export { api };