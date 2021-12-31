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
import { addNewUser, updateUserInfoAll } from "../../Actions/userActions";


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

export default function NewEditUserModal(props) {
    const {dialogueMode, handleDialogueClose} = props;
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
    const [localDialogMode, setLocalDialogMode] = useState(null);

    const handleClose = () => {
        handleDialogueClose();
        setDialogValue(initialDialogValue);
    };

    const handleDialogueSubmit = async (event) => {
        event.preventDefault();
        const userInfo = dialogValue.userType === "Sponsor" ? 
        {
            name: dialogValue.name, 
            email: !dialogValue.email.trim() ? undefined : dialogValue.email.trim(), 
            userType: dialogValue.userType.toUpperCase().replace(/\s+/g, '_'),
        }
        :
        {
            name: `${dialogValue.firstname} ${dialogValue.lastname}`, 
            firstname: dialogValue.firstname,
            lastname: dialogValue.lastname,
            email: !dialogValue.email.trim() ? undefined : dialogValue.email.trim(), 
            userType: dialogValue.userType.toUpperCase().replace(/\s+/g, '_'),
            coopEndDate: !dialogValue.coopEndDate ? undefined : dialogValue.coopEndDate
        }

        setLoading(true)
        if (localDialogMode === "new") {
            const createdUser = await createMemberInChallenge(userInfo);
            dispatch(addNewUser(createdUser))
        } else { // if === 'edit'
            dispatch(updateUserInfoAll({
                ...userInfo,
                id: dialogueMode.id
            }))
        }
        
        handleClose();
        setLoading(false)
    };
    
    useEffect(()=> {
        if (!!dialogueMode) { // if dialogueMode is not null
            if (Object.keys(dialogueMode).length === 0) setLocalDialogMode("new")
            else {
                setLocalDialogMode("edit")
                setDialogValue(dialogueMode)
            }
        }
    }, [dialogueMode])

    return (
        <Dialog className={classes.root} open={!!dialogueMode} aria-labelledby="modify-user">
            <DialogTitle id="modify-user-title">{localDialogMode === "new" ? "Add New User" : "Edit User"}</DialogTitle>
            <DialogContent>
                <form 
                    id="user-form" 
                    style={{ display: "flex", flexDirection: "column", width: 'inherit' }} 
                    onSubmit={handleDialogueSubmit}
                >
                    <FormSelect
                        id="usertype"
                        inputLabel="User Type"
                        required={true}
                        options={["Alumni", "CIC Student", "CIC Staff", "Sponsor"]}
                        value={dialogValue.userType}
                        onChange={(event)=> setDialogValue({
                            ...dialogValue,
                            userType: event.target.value,
                        })}
                        autoFocus
                    />
                    {
                        (!!dialogValue.userType) && (dialogValue.userType !== "Sponsor") &&
                        <FormInput
                            id="firstname"
                            inputLabel="First Name"
                            required={true}
                            value={dialogValue.firstname}
                            onChange={(event) => setDialogValue({ ...dialogValue, firstname: event.target.value })}
                        />
                    }
                    {
                        (!!dialogValue.userType) && (dialogValue.userType !== "Sponsor") &&
                        <FormInput
                            id="lastname"
                            inputLabel="Last Name"
                            required={true}
                            value={dialogValue.lastname}
                            onChange={(event) => setDialogValue({ ...dialogValue, lastname: event.target.value })}
                        />
                    }
                    {
                        (dialogValue.userType === "CIC Student") && 
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
                        (dialogValue.userType === "Sponsor") && 
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
                    defaultName={localDialogMode === "new" ? "Add": "Edit"}
                    loadingName={localDialogMode === "new" ? "Adding" : "Editing"}
                    type="submit" 
                    color="primary" 
                    form="user-form"
                />
            </DialogActions>
        </Dialog>
    )
}