import React, { useState } from 'react';
import SearchForm from "./shows/search/Search-form";
import { Show } from './shows/Show';
import ShowList from './shows/ShowList';
import './App.css'
import tvMazeServiceSearch from './shows/TvmazeService';

function App() {
  const initShows: Array<Show> = [];
  initShows.push({ title: 'first show' })
  const [shows, setShows] = useState(initShows);
  const addShow = (text: string) => {
    console.log("TODO: search for show: " + text);
    setShows(shows.concat([{ title: text }]));
  };

  return (
    <div className="App">
      <SearchForm add={addShow} searchProvider={tvMazeServiceSearch}></SearchForm>
      <ShowList shows={shows}></ShowList>
    </div>
  );
}

export default App;
