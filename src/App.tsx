import React, { useState } from 'react';
import SearchForm from "./shows/Search-form";
import { Show } from './shows/Show';
import ShowList from './shows/ShowList';

function App() {
  const initShows: Array<Show> = [];
  initShows.push( { title: 'first show' })
  const [shows, setShows] = useState(initShows);
  const addShows = (text: string) => {
    console.log("TODO: search for show: " + text);
    // new Show()
    return { title: text };
  };

  return (
    <div className="App">
      <SearchForm shows={shows} addShows={addShows} setShows={setShows}></SearchForm>
      <ShowList shows={shows}></ShowList>
    </div>
  );
}

export default App;
