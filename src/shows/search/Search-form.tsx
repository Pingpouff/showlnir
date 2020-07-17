import React, { SFC, useState } from 'react';
import './Search-form.css';
// import Button from "@material-ui/core/Button";
import { Show } from '../Show';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

interface SearchFormProp { add: (name: string) => void, searchProvider: (searchText: string) => Promise<string[]> };

const SearchForm: SFC<SearchFormProp> = (props) => {

  const searchOn = (searchText: string) => {
    props.searchProvider(searchText)
      .then(
        (result) => {
          const newProps = result.map((elt: any) => elt.show.name);
          console.log(newProps);
          setSugestions(newProps);
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

  const [value, setValue] = React.useState<string | null>('');
  const [inputValue, setInputValue] = React.useState('');

  const [sugestions, setSugestions] = useState<string[]>([]);
  return (
    <div className="Search-form">
      <Autocomplete
        id="Show-search"
        value={value}
        onChange={(event: any, newValue: string | null) => {
          if (newValue) {
            props.add(newValue);
            setValue(null);
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          searchOn(newInputValue);
          setInputValue(newInputValue);
        }}
        options={sugestions}
        // getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Show search" variant="outlined" />}
        filterOptions={(options, params) => {
          return options;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
      />
    </div>
  )
};


export default SearchForm;
