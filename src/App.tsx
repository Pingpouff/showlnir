import React, { useState } from 'react';
import SearchForm from "./shows/search/Search-form";
import { Show } from './shows/Show';
import ShowList from './shows/ShowList';
import './App.css'
import tvMazeServiceSearch from './shows/TvmazeService';

function App() {
  const initShows: Array<Show> = [];
  // initShows.push({ name: 'first show' })
  const [shows, setShows] = useState(initShows);
  const addShow = (showToAdd: Show) => {
    console.log("TODO: search for show: " + showToAdd);
    setShows(shows.concat(showToAdd));
  };

  return (
    <div className="App">
      <SearchForm add={addShow} searchProvider={tvMazeServiceSearch}></SearchForm>
      <ShowList shows={shows}></ShowList>
    </div>
  );
}

export default App;
