import React, { useEffect, useRef, useState } from "react";

import { 
    Grid, 
    makeStyles, 
} from '@material-ui/core';
// amplify
import { API, graphqlOperation } from 'aws-amplify';
import { createChallenge } from '../../../graphql/mutations';

// icons

// internal
import { CustomMultipleSelectionInput, FormInput, FormSelect, FormSelectAndInput } from '../../../Components/Challenges/NewChallenge/InputFields';
import { createMemberInChallenge } from '../../UserProfile/Admin/roles'
import { LoadingButton } from "../../../Components/Buttons";

const useStyles = makeStyles((theme) => ({
    formContainer: {
        margin: theme.spacing(3, 0)
    },
}))


export default function NewChallenge(props) {
    const classes = useStyles();
    const [formInfo, setFormInfo] = useState({
        title: '',
        description: '',
        sponsors: [],
        students: [],
        location: "",
        status: "",
        artifacts: []
    })
    const [loading, setLoading] = useState(false)

    const sponsorInputRef = useRef(null);
    const studentInputRef = useRef(null);
    const staffInputRef = useRef(null);

    useEffect(() => {
        document.title = props.title;
    },[props.title])

    const handleChange = (event) => {
        setFormInfo({...formInfo, [event.target.name]: event.target.value})
    }

    const handleSponsorDropdown = (list) => {
        setFormInfo({...formInfo, sponsors: list.map(elem => elem.name)})
    }

    const handleStaffDropdown = (list) => {
        setFormInfo({...formInfo, staffs: list.map(elem => elem.name)})
    }

    const handleStudentDropdown = (list) => {
        setFormInfo({...formInfo, students: list.map(elem => elem.name)})
    }

    const handleArtifactsChange = (list) => {
        setFormInfo({...formInfo, artifacts: list})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const newSponsors = sponsorInputRef.current.newOptions.filter(elem => formInfo.sponsors.includes(elem.name));
        const newStaffs = staffInputRef.current.newOptions.filter(elem => formInfo.staffs.includes(elem.name));
        const newStudents = studentInputRef.current.newOptions.filter(elem => formInfo.students.includes(elem.name));

        try {
            if (formInfo.sponsors.length === 0 || formInfo.students.length === 0 || formInfo.staffs.length === 0) {
                // sometimes pressing "enter" will accidently trigger the onsubmit function on <form>
                // add this check to prevent submitting the form before finish editing
                throw new Error("Empty input");
            }

            setLoading(true);

            await Promise.all(newSponsors.map(async (sponsor) => {
                await createMemberInChallenge(
                    {
                        name: sponsor.name, 
                        email: !sponsor.email.trim() ? undefined: sponsor.email.trim(), 
                        userType: 'SPONSOR'
                    }
                );
            }))
            await Promise.all(newStudents.map(async (student) => {
                await createMemberInChallenge(
                    {
                        name: student.name, 
                        email: !student.email.trim() ? undefined : student.email.trim(), 
                        userType: 'CIC_STUDENT'
                    }
                );
            }))
            await Promise.all(newStaffs.map(async (staff) => {
                await createMemberInChallenge(
                    {
                        name: staff.name, 
                        email: !staff.email.trim() ? undefined : staff.email.trim(), 
                        userType: 'CIC_STAFF'
                    }
                );
            }))

            await createChallengeFunction();

            event.target.reset()
            setLoading(false);
            
            props.history.push('/challenges');

        } catch (e) {
            setLoading(false);

            const errorMsg = e.message;
            console.log(errorMsg)
        }
    }

    const createChallengeFunction = async () => {
        const artifactsJSON = formInfo.artifacts.map((item) => JSON.stringify(item));

        try {
            await API.graphql(graphqlOperation(createChallenge, {input: {
                ...formInfo,
                artifacts: artifactsJSON
            }}));
            console.log('Created Challenge!')
        } catch(err) {
            console.log("Error creating Challenge", err);
        }
    }

    return (
        <>
        <Grid container className={classes.formContainer}>
            <form 
                id="create-challenge"
                style={{ display: "flex", flexDirection: "column", width: 'inherit' }} 
                onSubmit={handleSubmit}
            >
                <FormInput 
                    id={"title"} 
                    inputLabel={"Challenge Name"} 
                    required={true}
                    onChange={handleChange}
                />
                <FormSelect
                    id={"location"} 
                    inputLabel={"CIC Name"} 
                    required={true}
                    options={FormOptions.location}
                    onChange={handleChange}
                /> 
                <FormSelect
                    id={"status"} 
                    inputLabel={"Current Challenge Status"} 
                    required={true}
                    options={FormOptions.status}
                    onChange={handleChange}
                /> 
                <CustomMultipleSelectionInput 
                    id={"sponsors"} 
                    inputLabel={"Sponsor(s)"} 
                    onHandleDropdown={handleSponsorDropdown}
                    ref={sponsorInputRef}
                />
                <CustomMultipleSelectionInput 
                    id={"staffs"} 
                    inputLabel={"Staff(s)"} 
                    onHandleDropdown={handleStaffDropdown}
                    ref={staffInputRef}
                />
                <CustomMultipleSelectionInput 
                    id={"students"} 
                    inputLabel={"Student(s)"} 
                    onHandleDropdown={handleStudentDropdown}
                    ref={studentInputRef}
                />
                <FormInput 
                    id={"description"} 
                    inputLabel={"Description"} 
                    required={false}
                    multiline
                    rows={6}
                    onChange={handleChange}
                />
                <FormSelectAndInput
                    id={"artifacts"} 
                    inputLabel={"Additional Links"} 
                    required={false}
                    options={FormOptions.artifacts}
                    onChange={handleArtifactsChange}
                />
                
                <div style={{display: 'block'}}>
                    <LoadingButton
                        loading={loading} 
                        defaultName={"Create Challenge"}
                        loadingName={"Creating Challenge"}
                        type="submit" 
                        color="default"
                        form="create-challenge"
                    />
                </div>
            </form>
        </Grid>
        </>
    )
}


const FormOptions = {
    location: [
        "",
        "UBC CIC", 
        "Cal Poly DxHub", 
        "ASU CIC",
        "SciencesPo Public Innovation Lab",
        "HM DTLab",
        "UOB CIC",
        "Bahrain Polytechnic CIC",
        "NITI Aayog CIC",
        "Swinburne Data Social Good CIC",
        "RMIT Cyber Ready CIC",
        "Busan CIC"
    ],
    status: ["", "Planning", "Developing", "Completed"],
    artifacts: ["Challenge", "Scope", "PR", "GitHub", "Other"]
}