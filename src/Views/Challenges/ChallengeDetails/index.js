import React, { useEffect, useState } from "react";
// amplify
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { postsByDate } from '../../../graphql/queries';

// materialUI
import { Box, Divider, Grid, makeStyles, withStyles } from '@material-ui/core';

// internal
import { NewActionButton } from "../../../Components/Buttons";



export default function ChallengeDetails(props) {
    const [updateList, setUpdateList] = useState([]);

    useEffect(() => {
        document.title = props.location.state.title;
        (async () => {
            // await Auth.currentAuthenticatedUser()
            //   .then(async (user) => {
            //     console.log(user)
            //   })

            const user = await Auth.currentUserInfo()
            console.log(user)
          })();
        getUpdates();
    },[])

    const getUpdates = async () => {
        try {
            const updates = await API.graphql(graphqlOperation(
                postsByDate, 
                {
                    challengeID: props.location.state._id,
                    filter:{
                        postType: {eq: "UPDATE"}
                    },
                    sortDirection: 'DESC' // sorted newest first
                }
            ));

            setUpdateList(() => {
                return updates.data.postsByDate.items.map(element => (
                    {
                        title: element.title, 
                        content: element.content,
                        // https://stackoverflow.com/questions/47491992/set-grapqql-date-format
                        // also only want the day and date for now
                        createdAt: new Date(element.createdAt).toString().split(' ').slice(0, 4)
                    }
                ));
            })

          } catch (err) {
            console.log('error fetching updates...', err)
          }
    }

    return (
        <div>
            <NewActionButton 
                pathname={'/update'}
                state={{challengeName: props.location.state.title}}
                buttonName={"New Update"}
            />
            {updateList.map((post, index) => {
                return <ChallengeDetailsCard key={index} id={index} {...post}/>
            })}
        </div>
    )
}

function ChallengeDetailsCard(props) {
    const { id, title, content, createdAt } = props;

    const useStyles = makeStyles((theme) => ({
        root: {
            padding: theme.spacing(1, 3)
        },
        boxMargin: {
            margin: theme.spacing(0, 0, 4, 0)
        }
    }));

    const classes = useStyles();

    return(
        <Box borderColor="grey.300" border={1} className={classes.boxMargin}>
            <Grid container direction="column" className={classes.root}>
                {/* <span>UPDATE #{id+1}</span> */}
                <h2>{title}</h2>
                <span></span>
                <span>{`${createdAt[0]}, ${createdAt.slice(1).join(' ')}`}</span>
                <Divider style={{marginTop: "8px"}}/>
                <p style={{whiteSpace: "pre-line"}}>{content}</p>
            </Grid>
        </Box>
    )
}