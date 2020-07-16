import React, { SFC, useState } from 'react';
import './Search-form.css';
// import Button from "@material-ui/core/Button";
import { Show } from './Show';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

interface SearchFormProp { shows: Array<Show>, addShows: (name: string) => Show, setShows: (shows: Array<Show>) => void };


const SearchForm: SFC<SearchFormProp> = (props) => {

  const searchOnTvMaze = (searchText: string) => {
    fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`)
      .then((res) => res.json())
      .then(
        (result) => {
          const newProps = result.map((elt: any) => elt.show.name);
          console.log(newProps);
          setSugestions(newProps);
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
      ).catch(error => {
        console.log("ERROR");
      });
  };

  // const handleSubmit = (e: React.FormEvent) => {

  //   e.preventDefault();
  //   console.log(text);
  //   setText("");
  //   props.setShows(props.shows.concat([props.addShows(text)]));
  // };
  // const [text, setText] = useState("");

  // const WAIT_INTERVAL = 1000;
  // let timerID: number;
  // const handleSearch = (query: string) => {
  // clearTimeout(timerID);
  // timerID = setTimeout(() => {
  //   console.log('some action after delay')
  // }, WAIT_INTERVAL);
  //   console.log("auto");
  // }

  const [value, setValue] = React.useState<string | null>('');
  const [inputValue, setInputValue] = React.useState('');

  const [sugestions, setSugestions] = useState<string[]>([]);
  return (
    <div className="Search-form">
      <Autocomplete
        id="Show-search"
        value={value}
        onChange={(event: any, newValue: string | null) => {
          // setValue(newValue);
          if (newValue) {
            props.setShows(props.shows.concat([props.addShows(newValue)]));
            // setText('');
            setValue(null);
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          searchOnTvMaze(newInputValue);
          setInputValue(newInputValue);
        }}
        // onSearch={handleSearch}
        options={sugestions}
        // getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Show search" variant="outlined" />}

        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
      />
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Enter Item"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button className="Paper">Submit</Button>
      </form> */}

    </div>
  )
};


export default SearchForm;
