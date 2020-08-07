import React, { useContext } from 'react';
import Spinner from '../../layout/Spinner';
import { Track } from './Track';
import { Context } from '../../context/GlobalContext';
import { Next } from './Next';
import { Prev } from './Previous';

export const Tracks = () => {
  const value = useContext(Context);
  const { track_list, heading, next, prev } = value;

  let result, nextPage, prevPage;

  if (track_list === undefined || track_list.length === 0) {
    result = <Spinner />;
  } else {
    result = (
      <>
        <h3 className='text-center mb-4'>{heading}</h3>
        <div className='row'>
          {track_list.map((item) => {
            return <Track key={item.id} track={item} />;
          })}
        </div>
      </>
    );
  }

  if (next) {
    nextPage = next;
  }
  if (prev) {
    prevPage = prev;
  }

  return (
    <>
      <div className='wrapper m-5'>
        {/* Results from API */}
        {result}
        {/* Next and Prev Button */}
        <div className='row text-center mx-auto d-flex justify-content-around'>
          {prevPage && (
            <div className='col-md-6'>
              <div className='btn w-75'>
                <Prev link={prev} />
              </div>
            </div>
          )}
          {nextPage && (
            <div className='col-md-6'>
              <div className='btn w-75'>
                <Next link={next} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
