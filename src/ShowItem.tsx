import { Show } from "./Show";
import { SFC } from "react";
import { Card, CardContent, Typography, CardActions, IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import React from "react";

interface ShowItemProps {
    show: Show
}
const ShowItem: SFC<ShowItemProps> = (props) => {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.show.title}
                </Typography>
                <CardActions>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    {/* <IconButton
                        // className={clsx(classes.expand, {
                        //   [classes.expandOpen]: this.state.expanded,
                        // })}
                        onClick={this.toggleExpand}
                        aria-expanded={this.state.expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton> */}
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
        </Card>
    );
}

export default ShowItem;