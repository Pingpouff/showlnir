import { Show, Episode } from "./Show";

const tvMazeServiceSearch = (searchText: string) => {
    const typedPromise: Promise<TvMazeSearchResult[]> = fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`) //&embed=episodes
        .then((res) => res.json());
    return typedPromise.then(results => results.map(result => result.show));
}

export const tvMazeFetchEpisodesFrom = (show: Show) => {
    const typedPromise: Promise<Episode[]> = fetch(`${show._links.self.href}/episodes`) //&embed=episodes
        .then((res) => res.json());
    return typedPromise;
}
export type TvMazeSearchResult = {score: number, show: Show}

export default tvMazeServiceSearch;