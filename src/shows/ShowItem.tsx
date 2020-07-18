import { Show, Episode } from "./Show";
import { SFC, useState } from "react";
import { Card, CardContent, Typography, CardActions, IconButton, Collapse, Grid, Divider, ListItemText, ListItem, List } from "@material-ui/core";
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
        if (!expanded) {
            tvMazeFetchEpisodesFrom(props.show).then((loadedEpisodes) => {
                setEpisodes(loadedEpisodes);
                setExpanded(true);
            })
        } else {
            setExpanded(false);
        }
    };
    type SeasonGrouped = { season: number, episode: Episode };
    const seasonGroupedEpisodes = episodes.reduce((accu: Map<number, Episode[]>, currentValue: Episode) => {
        const season = currentValue.season;
        const episodesBySeason = accu.get(season);
        if (episodesBySeason !== undefined) {
            episodesBySeason.push(currentValue);
        } else {
            accu.set(season, [currentValue]);
        }
        return accu;
    }, new Map());

    const seasonGroupedEpisodesTsx = Array.from(seasonGroupedEpisodes.entries()).reverse().map((season) => {
        const episodesTsx = season[1].reverse().map((ep, index) => {
        const epLabel = `s${season[0]}e${ep.number}: ${ep.name}`
            return (
                // <Grid key={index} ep>
                <Card> <CardContent>{epLabel}</CardContent></Card>
                // </Grid>
            );
        });
        const label = `Season ${season[0]}`
        return (
            <List component="nav">
                <ListItem button>
                    <ListItemText primary={label} />
                </ListItem>
                <Grid container >
                    {episodesTsx}
                </Grid>
            </List>);
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
                    {seasonGroupedEpisodesTsx}
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default ShowItem;