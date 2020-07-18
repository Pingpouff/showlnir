import { Show, Episode } from "./Show";
import { SFC, useState } from "react";
import { Card, CardContent, Typography, CardActions, IconButton, Collapse, Grid, Divider, ListItemText, ListItem, List, CardMedia, CardActionArea } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import React from "react";
import { tvMazeFetchEpisodesFrom } from "./TvmazeService";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);
interface ShowItemProps {
    show: Show
}
const ShowItem: SFC<ShowItemProps> = (props) => {

    const classes = useStyles();
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
    // TODO extract in the components
    const seasonGroupedEpisodesTsx = Array.from(seasonGroupedEpisodes.entries()).reverse().map((season) => {
        const episodesTsx = season[1].reverse().map((ep, index) => {
            const epLabel = `S${season[0]}E${ep.number}: ${ep.name}`
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
                <CardActionArea onClick={fetchEpisodesAndExpand} >
                    <CardMedia
                        className={classes.media}
                        image={props.show.image.medium.toString()}
                    />
                    <Typography variant="h5" component="h2">
                        {props.show.name}
                    </Typography>
                </CardActionArea>
                <CardActions>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
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