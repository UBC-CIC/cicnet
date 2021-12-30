import React, { useEffect, useMemo, useState } from "react";

import { 
    Grid, 
    makeStyles, 
} from '@material-ui/core';
// amplify
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createPost } from '../../graphql/mutations';
import { listChallenges } from "../../graphql/queries";

// icons

// internal
import { SelectionInput, FormInput } from '../../Components/Update/InputFields';
import { LoadingButton } from "../../Components/Buttons";

const useStyles = makeStyles((theme) => ({
    formContainer: {
        margin: theme.spacing(3, 0)
    },
    progress: {
        padding: theme.spacing(0, 1)
    },
    center: {
        display: "flex",
        alignItems: "center",
    }
}))


export default function NewUpdate(props) {
    const classes = useStyles();
    const [formInfo, setFormInfo] = useState({
        title: '',
        content: '',
        challenge: '',
        postType: 'UPDATE',
    });
    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        document.title = props.title;
        getChallenge();

        // (async () => {
        //     // get current user
        //     let user = await Auth.currentAuthenticatedUser();
        //     // setFormInfo({...formInfo, sponsor: user.username});
        //     // console.log("the current user is", user.attributes.family_name, user.attributes.given_name);
        // })();
    }, []);

    const getChallenge = () => {
        !!props.location.state && setFormInfo({...formInfo, 'challenge': props.location.state.challengeName});
    }

    const handleChange = (event) => {
        if (event.target.role === 'option') {
            // selecting a challenge
            setFormInfo({...formInfo, 'challenge': event.target.textContent});
        } else {
            // entering other inputs
            setFormInfo({...formInfo, [event.target.name]: event.target.value});
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (formInfo.challenge.length === 0) {
                // sometimes pressing "enter" will accidently trigger the onsubmit function on <form>
                // add this check to prevent submitting the form before finish editing
                alert("Invalid challenge input.");
                throw new Error("Invalid challenge input");
            }

            setLoading(true);
            await createPostFunction();
            event.target.reset()
            setLoading(false);
            // console.log(`/challenges/${formInfo.challenge.replace(/\s+/g, '-')}`)
            // props.history.push(`/challenges/${formInfo.challenge.replace(/\s+/g, '-')}`);
            props.history.push('/challenges');

        } catch (e) {
            setLoading(false);
            const errorMsg = e.message;
            console.log(errorMsg)
        }
    }

    const createPostFunction = async () => {
        try {
            const challenge = await API.graphql(graphqlOperation(listChallenges, {filter: {title: {eq: formInfo.challenge}}}))
            await API.graphql(graphqlOperation(createPost, {input: {
                title: formInfo.title,
                content: formInfo.content,
                challengeID: challenge.data.listChallenges.items[0].id,
                postType: formInfo.postType,
            }}));
            console.log('Update posted!')
        } catch(err) {
            console.log("Error posting update", err);
        }
    }

    return (
        <>
        <Grid container className={classes.formContainer}>
            <form 
                id="new-update"
                style={{ display: "flex", flexDirection: "column", width: 'inherit' }} 
                onSubmit={handleSubmit}
            >
                <FormInput 
                    id={"title"} 
                    inputLabel={"Title"} 
                    required={true}
                    onChange={handleChange}
                /> 
                <SelectionInput 
                    id={"challenge"} 
                    inputLabel={"Challenge Name"} 
                    required={true}
                    handleChange={handleChange}
                    defaultValue={formInfo.challenge}
                />
                <FormInput 
                    id={"content"} 
                    inputLabel={"Description"} 
                    required={true}
                    multiline
                    rows={6}
                    onChange={handleChange}
                />
                <div style={{display: 'block'}}>
                    <LoadingButton
                        loading={loading} 
                        defaultName={"Post Update"}
                        loadingName={"Posting Update"}
                        type="submit" 
                        color="default"
                        form="new-update"
                    />
                </div>
            </form>
        </Grid>
        </>
      );
}