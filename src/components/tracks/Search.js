import React, { useContext, useState } from 'react';
import { Context } from '../../context/GlobalContext';
import axios from 'axios';

// API
const apiURL = 'https://api.lyrics.ovh';

export const Search = () => {
  const value = useContext(Context);
  const { dispatch } = value;

  const [state, setState] = useState({
    trackTitle: '',
  });

  // Event Listeners
  const handleChange = (e) => {
    setState({
      trackTitle: e.target.value,
    });
  };

  const handleClick = (dispatch) => {
    if (state.trackTitle) {
      axios
        .get(`${apiURL}/suggest/${state.trackTitle}`)
        .then((res) => {
          dispatch({
            type: 'SEARCH_TRACKS',
            payload: res.data.data,
            next: res.data.next,
            prev: res.data.prev,
          });
        })
        .catch((err) => console.log(err));
    } else {
      alert('Please insert song !!');
    }
  };
  // Event Listeners End

  return (
    <>
      <div className='card card-body mb-4 p-4'>
        <h1 className='display-4 text-center'>
          <i className='fas fa-music'></i> Search For Song{' '}
          <i className='fas fa-music'></i>
        </h1>
        <p className='lead text-center'>Get the lyric for any song</p>

        <div className='form-group'>
          <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Songs... '
            name='trackTitle'
            value={state.trackTitle}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={() => handleClick(dispatch)}
          className='btn btn-info btn-lg btn-block'
          type='button'
        >
          Get Track Lyrics
        </button>
      </div>
    </>
  );
};
