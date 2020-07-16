import React, { SFC } from "react";
import Grid from "@material-ui/core/Grid";
import { Show } from "./Show";
import ShowItem from "./ShowItem";

interface ShowListProps {
    shows: Array<Show>
}
const ShowList: SFC<ShowListProps> = (props) => {
    console.log(props.shows.length);
    const todos = props.shows.map((show, index) => {
        return (
          <Grid key={index} item>
              <ShowItem show={show}></ShowItem>
          </Grid>
        );
      });
    return (<Grid container>
        <Grid item xs={12}>
            <Grid container justify="flex-start" spacing={2}>
                {todos}
            </Grid>
        </Grid>
    </Grid>
    );
};

export default ShowList;