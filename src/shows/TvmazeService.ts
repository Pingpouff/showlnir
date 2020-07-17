const tvMazeServiceSearch = (searchText: string) => {
    return fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`)
      .then((res) => res.json());
}

export default tvMazeServiceSearch;