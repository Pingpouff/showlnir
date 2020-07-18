import { Show, Episode } from "./Show";
import { SFC, useState } from "react";
import { Card, CardContent, Typography, CardActions, IconButton, Collapse, Grid } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import React from "react";
import { tvMazeFetchEpisodesFrom } from "./TvmazeService";

interface ShowItemProps {
    show: Show
}
const ShowItem: SFC<ShowItemProps> = (props) => {
    // const expanded = false;
    const [expanded, setExpanded] = useState(false);
    const emptyEpisodes: Episode[] = [];
    const [episodes, setEpisodes] = useState(emptyEpisodes);
    // const episodes = props.show._embedded
    const fetchEpisodesAndExpand = () => {
        tvMazeFetchEpisodesFrom(props.show).then((loadedEpisodes) => {
            setEpisodes(loadedEpisodes);
            setExpanded(!expanded);
        })
    };
    // TODO groupby Season
//     <ListItem button>
//     <ListItemText primary="Inbox" />
//   </ListItem>
//   <Divider />
    const episodesTsx = episodes.map((ep, index) => {
        return (
            // <Grid key={index} ep>
            <Card> <CardContent>{ep.name}</CardContent></Card>
            // </Grid>
        );
    });
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.show.name}
                </Typography>
                <CardActions>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        // className={clsx(classes.expand, {
                        //   [classes.expandOpen]: this.state.expanded,
                        // })}
                        onClick={fetchEpisodesAndExpand}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                            // TODO add delete
                            console.log("delete");
                        }}
                    >
                        <DeleteOutlinedIcon />
                    </IconButton>
                </CardActions>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Grid container >
                        {episodesTsx}
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default ShowItem;