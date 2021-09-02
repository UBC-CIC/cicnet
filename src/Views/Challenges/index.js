import React, { useEffect, useState } from "react";

// materialUI
import { Grid, OutlinedInput, IconButton, InputAdornment, makeStyles, TextField, Typography } from "@material-ui/core";
// amplify
import { API, graphqlOperation } from 'aws-amplify';
import { listChallenges } from '../../graphql/queries';

// icons
import SearchIcon from '@material-ui/icons/Search';

// internal
import OneChallengeCard from "../../Components/Challenges/OneChallenge";
import { NewActionButton } from "../../Components/Buttons"

const useStyles = makeStyles((theme) => ({
    root: {
        // 
    },
    searchBar: {
        marginBottom: "20px",
    },
    content: {
        gap: "35px",
    }
}));


export default function Challenges(props) {
    const classes = useStyles();
    const [challangeList, setChallengeList] = useState([]);

    useEffect(() => {
        document.title = props.title;
        getChallenges();
    }, [])

    const getChallenges = async () => {
        try {
            const challenges = await API.graphql(graphqlOperation(listChallenges))

            setChallengeList(() => {
                return challenges.data.listChallenges.items.map(element => (
                    {
                        id: element.id,
                        title: element.title, 
                        description: element.description
                    }
                ));
            })

            console.log("get challenges", challenges.data.listChallenges.items)

          } catch (err) {
            console.log('error fetching challenges...', err)
          }
    }

    return (
        <Grid container direction={"row"} className={classes.root}>
            <NewActionButton 
                pathname={'/challenges/create'}
                buttonName={"New Challenge"}
            />
            <Grid container direction={"row"} className={classes.content}>
                {
                    challangeList.map(challenge => {
                        return <OneChallengeCard key={challenge.title} {...props} {...challenge}/>
                    })
                }
            </Grid>
        </Grid>
    )
}


function SearchBar() {
    return (
        {/* <Grid container item xs={10}>
            <Grid container item xs={11}>
                <OutlinedInput
                    fullWidth={true}
                    className={classes.input}
                    placeholder="Search"
                    color="default"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton type="submit" aria-label="search-button">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Grid>
        </Grid> */}
    )
}