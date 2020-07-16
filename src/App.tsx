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

  const handleSubmit = (searchName: string) => {
    fetch(`https://api.tvmaze.com/singlesearch/shows?q=${searchName}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          // this.setState({
          //   isLoaded: true,
          //   tasks: [...this.state.tasks, result.name],
          // });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // this.setState({
          //   isLoaded: true,
          //   error,
          // });
        }
      );
    // this.setState({ tasks: [...this.state.tasks, task] });
  };
  return (
    <div className="App">
      <SearchForm shows={shows} addShows={addShows} setShows={setShows}></SearchForm>
      <ShowList shows={shows}></ShowList>
    </div>
  );
}

export default App;
