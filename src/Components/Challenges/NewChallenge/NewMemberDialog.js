import React from "react";
import { 
    TextField, 

    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,

    Button,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    window: {
        '& .MuiDialog-paperWidthSm': {
            width: "100%"
        }
    },
}));


export default function NewMemberDialog (props) {
    const { 
        id, 
        dialogValue, 
        setDialogValue, 
        handleSubmit,
        handleClose,
        openDialogue
    } = props;
    
    const classes = useStyles();

    const userType = id;

    return (
        <Dialog className={classes.window} open={openDialogue} aria-labelledby="form-dialog-title">
            <form id="dialogue">
                <DialogTitle id="form-dialog-title">Add a new {userType} for this challenge</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new {userType} for this challenge, please enter the { userType !== "sponsor" && "full" } name and email.
                    </DialogContentText>
                    <TextField
                        fullWidth
                        required
                        autoFocus
                        margin="dense"
                        value={dialogValue.name}
                        onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
                        label={ userType !== "sponsor" ? "Full Name" : "Name" }
                        type="text"
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        value={dialogValue.email}
                        onChange={(event) => setDialogValue({ ...dialogValue, email: event.target.value })}
                        label="Email"
                        type="email"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" form="dialogue">
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}