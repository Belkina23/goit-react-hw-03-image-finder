import { Component } from 'react';
import { api } from 'API';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    bigImage: '',
    page: api.pageToFetch,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  searchImage = ({ search }) => {
    const searchResoult = search !== api.searchToFetch;
    if (!searchResoult) return;
    api.searchToFetch = search;
    api.pageToFetch = 1;
    this.setState({ items: [] });
  
  };

  async fetchImages() {
    try {
      this.setState({ loading: true });

      const {
        data: { hits, totalHits },
      } = await api.fetch();

      this.setState(({ items }) => ({
        items: [...items, ...hits],
        totalHits: totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }


  render() {
    const { items, loading, error } = this.state;
    const { searchImage } = this;

    return (
      <>
        <Searchbar onSubmit={searchImage} />
        <ImageGallery items={items} />
      </>
    );
  }
}

export default App;
