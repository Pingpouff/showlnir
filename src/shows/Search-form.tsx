import React, { SFC, useState } from 'react';
import './Search-form.css';
import Button from "@material-ui/core/Button";
import { Show } from './Show';

interface SearchFormProp { shows:Array<Show>, addShows:(name:string) => Show, setShows:(shows:Array<Show>) => void };


const SearchForm: SFC<SearchFormProp> = (props) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(text);
    setText("");
    props.setShows(props.shows.concat( [props.addShows(text)]));
  };
  const [text, setText] = useState("");
  return (
    <div className="Search-form">
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
