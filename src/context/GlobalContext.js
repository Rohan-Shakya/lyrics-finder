import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Creating Context
export const Context = React.createContext();

// API
const apiURL = 'https://api.lyrics.ovh';

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results',
        next: action.next,
        prev: action.prev,
      };
    default:
      return state;
  }
};

export const GlobalContext = (props) => {
  const [state, setState] = useState({
    track_list: [],
    next: '',
    prev: '',
    heading: 'Top 15 Tracks',
    dispatch: (action) => setState((state) => reducer(state, action)),
  });

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`${apiURL}/suggest/Ed Sheeran`);

      const data = await res.data;

      setState((prev) => {
        return {
          ...prev,
          track_list: data.data,
          next: data.next,
          prev: data.prev,
        };
      });
    }
    getData();
  }, []);

  return <Context.Provider value={state}>{props.children}</Context.Provider>;
};
