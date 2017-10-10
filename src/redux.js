import { applyMiddleware, combineReducers, createStore } from 'redux';

import thunk from 'redux-thunk';

// actions.js
export const addRepos = repos => ({
  type: 'ADD_REPOS',
  repos,
});

export const clearRepos = () => ({ type: 'CLEAR_REPOS' });

export const getRepos = username => dispatch =>
  fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then(response => response.json())
    .then(responseBody => dispatch(addRepos(responseBody)))
    .catch(() => dispatch(clearRepos()));

// reducers.js
export const repos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_REPOS':
      return action.repos;
    case 'CLEAR_REPOS':
      return [];
    default:
      return state;
  }
};

export const reducers = combineReducers({ repos });

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState, applyMiddleware(thunk));
  return store;
}

export const store = configureStore();
