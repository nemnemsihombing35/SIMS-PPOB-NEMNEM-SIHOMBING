import { createStore } from 'redux';

const initialState = {
  user: { name: 'Kristanto Wibowo', photoUrl: 'src/assets/Profile Photo.png' }
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;
