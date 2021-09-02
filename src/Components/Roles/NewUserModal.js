import React, { useEffect, useState } from "react";

import { 
    makeStyles, 

    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

    Button
} from '@material-ui/core';
import { FormInput, FormSelect } from "../Challenges/NewChallenge/InputFields";
import { createMemberInChallenge } from "../../Views/UserProfile/Admin/roles";
import { useDispatch } from "react-redux";
import { LoadingButton } from "../Buttons";
import { addNewUser } from "../../Actions/userActions";


const useStyles = makeStyles((theme)=> ({
    root: {
        '& .MuiDialog-paperWidthSm': {
            width: "100%"
        }
    },
    actionPanel: {
        '&.MuiDialogActions-root': {
            padding: theme.spacing(1, 3)
        }
    }
}))

export default function NewUserModal(props) {
    const {openDialogue, handleDialogueClose} = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const initialDialogValue = {
        userType: '',
        name: '',
        firstname: '',
        lastname: '',
        email: '',
        coopEndDate: ''
    };
    const [dialogValue, setDialogValue] = useState(initialDialogValue);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        handleDialogueClose();
        setDialogValue(initialDialogValue);
    };

    const handleDialogueSubmit = async (event) => {
        event.preventDefault();
        const name = dialogValue.userType === "SPONSOR" ? dialogValue.name : `${dialogValue.firstname} ${dialogValue.lastname}`

        const userInfo = {
            name: name, 
            email: dialogValue.email, 
            userType: dialogValue.userType,
            coopEndDate: dialogValue.coopEndDate
        }

        setLoading(true)
        const createdUser = await createMemberInChallenge(userInfo);
        dispatch(addNewUser(createdUser))
        handleClose();
        setLoading(false)
    };

    return (
        <Dialog className={classes.root} open={openDialogue} aria-labelledby="add-new-user">
            <DialogTitle id="add-new-user-title">Add New User</DialogTitle>
            <DialogContent>
                <form 
                    id="new-user" 
                    style={{ display: "flex", flexDirection: "column", width: 'inherit' }} 
                    onSubmit={handleDialogueSubmit}
                >
                    <FormSelect
                        id="usertype"
                        inputLabel="User Type"
                        required={true}
                        options={["Alumni", "CIC Student", "CIC Staff", "Sponsor"]}
                        onChange={(event)=> setDialogValue({
                            ...initialDialogValue,
                            userType: event.target.value.toUpperCase().replace(/\s+/g, '_'),
                        })}
                        autoFocus
                    />
                    {
                        (!!dialogValue.userType) && (dialogValue.userType !== "SPONSOR") &&
                        <FormInput
                            id="firstname"
                            inputLabel="First Name"
                            required={true}
                            value={dialogValue.firstname}
                            onChange={(event) => setDialogValue({ ...dialogValue, firstname: event.target.value })}
                        />
                    }
                    {
                        (!!dialogValue.userType) && (dialogValue.userType !== "SPONSOR") &&
                        <FormInput
                            id="lastname"
                            inputLabel="Last Name"
                            required={true}
                            value={dialogValue.lastname}
                            onChange={(event) => setDialogValue({ ...dialogValue, lastname: event.target.value })}
                        />
                    }
                    {
                        (dialogValue.userType === "CIC_STUDENT") && 
                        <FormInput
                            id="coopEndDate"
                            inputLabel="Co-op/Work Term End Date"
                            type="date"
                            required={true}
                            value={dialogValue.coopEndDate}
                            onChange={(event) => setDialogValue({ ...dialogValue, coopEndDate: event.target.value })}
                        />
                    }
                    {
                        (dialogValue.userType === "SPONSOR") && 
                        <FormInput
                            id="name"
                            inputLabel="Organization/Company Name"
                            required={true}
                            value={dialogValue.name}
                            onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
                        />
                    }
                    {
                        !!dialogValue.userType && // if userType is selected
                        <FormInput
                            id="email"
                            inputLabel="Email"
                            required={false}
                            value={dialogValue.email}
                            onChange={(event) => setDialogValue({ ...dialogValue, email: event.target.value })}
                        />
                    }
                </form>
            </DialogContent>
            <DialogActions className={classes.actionPanel}>
                <Button onClick={handleClose} disabled={!!loading} color="primary">
                    Cancel
                </Button>
                <LoadingButton 
                    loading={loading} 
                    defaultName={"Add"}
                    loadingName={"Adding"}
                    type="submit" 
                    color="primary" 
                    form="new-user"
                />
            </DialogActions>
        </Dialog>
    )
}