import api from './api';
import { get, save } from '../localStorageUtil';

const FAVORITES = 'favorites';

const getFavorites = () => get(FAVORITES);
const saveFavorites = data => save(FAVORITES, data);

export const isLikeToggled = eventId => {
  const array = getFavorites();
  return array.findIndex(elem => elem.eventId === eventId) !== -1;
};

export const toggleFavorite = eventId => {
  const array = getFavorites();
  console.log('my favorites:', array);
  if (array.findIndex(elem => elem.eventId === eventId) === -1) {
    api
      .post('/favorites', {
        eventId
      })
      .then(({ data }) => {
        const newArray = [...array, data];
        saveFavorites(newArray);
      });
  } else {
    // REMOVE
    const { id } = array.find(elem => elem.eventId === eventId);
    api.delete(`/favorites/${id}`).then(() => {
      const newArray = array.filter(elem => elem.id !== id);
      saveFavorites(newArray);
    });
  }
};
