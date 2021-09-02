import React from "react";

import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// icons 
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 345,
        maxWidth: 345,
        minHeight: 273,
        maxHeight: 273,
        '& > .MuiButtonBase-root': {
            minWidth: 345,
            maxWidth: 345,
            minHeight: 273,
            maxHeight: 273,
        }
    },
    space: {
        // [theme.breakpoints.up(1020)]: {
        //     '&:nth-child(odd)': {
        //         paddingRight: "42px",
        //     },
        //     '&:nth-child(even)': {
        //         paddingRight: 0,
        //     }
        // },
    }
}));

  

export default function OneChallengeCard(props) {
    const classes = useStyles();

    const url = props.title.trim().replace(/\s+/g, '-');

    return (
        <div className={`challenge-section ${classes.space}`}>
            <Card 
                className={classes.root} 
                onClick={()=>props.history.push({pathname:`/challenges/${url}`,state: {_id: props.id, title: props.title}})}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                        alt="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        { props.title }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { props.description }
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
      );
}