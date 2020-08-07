import React, { useContext } from 'react';
import { Context } from '../../context/GlobalContext';
import axios from 'axios';

export const Next = ({ link }) => {
  const value = useContext(Context);
  const { dispatch } = value;

  // Event Listener
  const handleClick = (dispatch) => {
    axios
      .get(`https://cors-anywhere.herokuapp.com/${link}`)
      .then((res) => {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.data,
          next: res.data.next,
          prev: res.data.prev,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button
        className='btn btn-info font-weight-bold  btn-block'
        onClick={() => handleClick(dispatch)}
      >
        <i className='fas fa-chevron-circle-right'></i> Next
      </button>
    </>
  );
};
