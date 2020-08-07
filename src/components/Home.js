import React from 'react';
import { Tracks } from '../components/tracks/Tracks';
import { Search } from './tracks/Search';

export const Home = () => {
  return (
    <>
      <Search />
      <Tracks />
    </>
  );
};
