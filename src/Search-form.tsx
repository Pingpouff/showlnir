import React, { SFC, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from "@material-ui/core/Button";
import { Show } from './Show';
import ShowList from './ShowList';

interface SearchFormProp { shows:Array<Show>, addShows:(name:string) => Show, setShows:(shows:Array<Show>) => void };


const SearchForm: SFC<SearchFormProp> = (props) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(text);
    setText("");
    // props.addShows(text);
    props.setShows(props.shows.concat( [props.addShows(text)]));
    // if (this.state.term === "") return;
    // this.props.onFormSubmit(this.state.term);
    // this.setState({ term: "" });
  };
  const [text, setText] = useState("");
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Enter Item"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button className="Paper">Submit</Button>
      </form>

    </div>
  )
};


export default SearchForm;
