import { Component } from 'react';
// import { api } from 'API';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    bigImage: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });

      axios({
        url: `https://pixabay.com/api/?`,
        params: {
          q: this.state.searchName,
          page: this.state.page,
          key: '31947460-94dfdb2440a2031458268e436',
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12,
        },
      })
        .then(response => {
          return response.data.hits;
        })
        .then(data => {
          if (data.length > 0) {
            this.setState(prevState => ({
              items: [...prevState.items, ...data],
            }));
            return;
          }
          toast('За вашим запитом нічого не знайдено', { autoClose: 3000 });
        })
        .catch(({ message }) => {
          message = toast('Щось пішло не так, спробуйте ще раз');
          this.setState({
            error: message,
          });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  searchImage = searchName => {
    this.setState({ searchName: searchName, page: 1, items: [] });
  };

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };


  render() {
    const { items } = this.state;
    const { searchImage } = this;

    return (
      <>
        <Searchbar onSubmit={searchImage} />
        <ImageGallery items={items} />

        <ToastContainer />
      </>
    );
  }
}

export default App;
