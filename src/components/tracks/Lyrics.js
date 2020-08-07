import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { Link } from 'react-router-dom';
import { Context } from '../../context/GlobalContext';

// API
const apiURL = 'https://api.lyrics.ovh';

export const Lyrics = () => {
  const [state, setState] = useState({
    lyrics: {},
  });
  const location = useParams();
  const { artist, songTitle, id } = location;
  const value = useContext(Context);

  const findValue = value.track_list.find((item) => item.id == id);
  console.log(findValue);

  useEffect(() => {
    async function getLyrics() {
      const res = await axios.get(`${apiURL}/v1/${artist}/${songTitle}`);
      const data = res.data;

      const dataReplace = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

      const lyricsData = dataReplace
        .split('<br>')
        .map((item, i) => <p key={i}>{item}</p>);

      setState({
        lyrics: lyricsData,
      });
    }

    getLyrics();
  }, [artist, songTitle]);

  // Conditional Rendering (IF/Else)
  if (
    state.lyrics === undefined ||
    Object.keys(state.lyrics).length === 0 ||
    findValue === undefined
  ) {
    return <Spinner />;
  } else {
    return (
      <>
        <Link to='/' className='btn btn-dark btn-sm mb-4 ml-3'>
          <i className='fas fa-chevron-left'></i> Go back
        </Link>
        <div className='container'>
          <div className='row mb-5'>
            <div className='col-md-4 mb-4'>
              <div className='card'>
                <div className='position-relative'>
                  <img
                    src={findValue.album.cover_big}
                    alt={findValue.album.title}
                    className='img-album'
                  />
                  <img
                    className='card-img-top'
                    src={findValue.artist.picture_big}
                    alt={findValue.artist.name}
                  />
                </div>
                <div className='card-body'>
                  <p className='card-text'>
                    <h6>
                      <strong>
                        <i className='fas fa-compact-disc'></i> Album:{' '}
                      </strong>{' '}
                      {findValue.album.title}
                    </h6>
                    <h6>
                      <strong>
                        <i className='fas fa-play'> </i> Artist:{' '}
                      </strong>{' '}
                      {findValue.artist.name}
                    </h6>
                    <h6>
                      <strong>
                        <i class='fas fa-id-badge'></i> Id:
                      </strong>{' '}
                      {findValue.id}
                    </h6>
                  </p>
                </div>
                <div className='card-footer'>
                  <audio controls loop>
                    <source src={findValue.preview} type='audio/ogg' />
                    <source src={findValue.preview} type='audio/mpeg' />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>
            <div className='col-md-8'>
              <div className='card'>
                <h5 className='card-header'>
                  {songTitle} by{' '}
                  <span className='text-secondary'>{artist}</span>
                </h5>
                <div className='card-body'>
                  <p className='card-text'>{state.lyrics}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
