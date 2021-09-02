import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from "react";
import _ from 'lodash';

import { 
    FormControl, 
    FormHelperText,
    InputLabel, 
    Select,
    TextField, 
    makeStyles, 
    withStyles, 
    IconButton,

    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

    Button,
} from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
// amplify
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../../../graphql/queries';

// icons
import CircularProgress from '@material-ui/core/CircularProgress';
import ClearIcon from '@material-ui/icons/Clear';

// internal
import NewMemberDialog from "./NewMemberDialog";
import { MenuItem } from "@material-ui/core";


const CustomFormControl = withStyles((theme) => ({
    root: {
        '& .MuiFormLabel-root': {
            transform: 'translate(0px, -20px)',
        },
        '&.MuiFormControl-root': {
            margin: theme.spacing(0.5,0)
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: 0,
            },
        },
    },
}))(FormControl);


// other helper component functions
export const CustomMultipleSelectionInput = forwardRef((props, ref) => {
    // imports from props
    const { id } = props;
    const { onHandleDropdown, ...inputProps } = props;
    const filter = createFilterOptions();

    // for Autocomplete
    const [optionList, setOptionList] = useState([]);
    const [options, setOptions] = useState([]);
    const [newOptions, setNewOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState((options.length+optionList.length) === 0);

    // for NewMemberDialog
    const [openDialogue, handleDialogueOpen] = useState(false);
    const [dialogValue, setDialogValue] = useState({
        name: '',
        email: '',
    });

    const handleDialogueClose = () => {
        setDialogValue({
            name: '',
            email: '',
        });
        handleDialogueOpen(false);
    };

    const handleDialogueSubmit = (event) => {
        event.preventDefault();
        // all options selected in current view, 
        // including ones already existing in db and ones that are newly created
        setOptions([...options, {
            name: dialogValue.name,
            email: dialogValue.email,
        }]);

        // array for only newly created options
        // for updating in database when submitted
        setNewOptions([...newOptions, {
            name: dialogValue.name,
            email: dialogValue.email,
        }]);

        handleDialogueClose();
    };

    // expose info to be used in parent component
    useImperativeHandle(ref, () => ({
        newOptions: newOptions
    }));

    useEffect(() => {
        let active = true;
        const userType = id === 'sponsors' ? 'SPONSOR' : 'CIC_' + id.toUpperCase().replace(/[\w]$/, '');

        if (!loading) {
            return undefined;
        }

        (async () => {
            try {
                const list = await API.graphql(graphqlOperation(
                    listUsers, {
                        filter: 
                            id === "students" 
                            ? 
                            {
                                or: [
                                    { userType: { eq : "ALUMNI" } },
                                    { userType: { eq : "CIC_STUDENT" } }
                                ]
                            }
                            :
                            { userType: { eq : userType } }
                    }
                ))
    
                if (active) {
                    setOptionList(
                        list.data.listUsers.items.map(element => {
                            return { 
                                name: element.name,
                                userType: element.userType
                            }
                        })
                    )
                    setLoading(false)
                }

            } catch (err) {
                console.log(`error fetching ${userType.toLowerCase()}...`, err)
            }

        })();

        return () => {
            active = false;
        };
    }, [open, loading]);

    useEffect(() => {
        // update form
        onHandleDropdown(options);
    }, [options])

    return (
        <Fragment>
        <Autocomplete
            fullWidth
            id={id}
            name={id}
            size="small"
            value={options}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            loading={loading}
            onChange={(event, newOption) => {
                const lastSelected = newOption.slice(-1).pop();
                if (typeof lastSelected === 'string') {
                    // Value selected with enter, right from the input
                    // timeout to avoid instant validation of the dialog's form.
                    setTimeout(() => {
                        handleDialogueOpen(true);
                        setDialogValue({
                            name: lastSelected,
                            email: '',
                        });
                    });
                } else if (lastSelected && lastSelected.inputValue) {
                    // Create a new value from the user input
                    handleDialogueOpen(true);
                    setDialogValue({
                        name: lastSelected.inputValue,
                        email: '',
                    });
                } else {
                    // Regular option
                    setOptions(newOption);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={optionList}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.name;
            }}
            renderOption={(option) => option.name}
            multiple
            filterSelectedOptions
            renderInput={(params) => (
                <FormInput 
                    {...inputProps} 
                    {...params} 
                    // required= {options.length === 0}
                    // Attributes applied to the input element
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                    // Props applied to the materialUI Input element
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                        <React.Fragment>
                            {open && loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                        ),
                    }}
                />
            )}
        />
        <NewMemberDialog 
            id={id.replace(/[\w]$/, '')}
            dialogValue={dialogValue}
            setDialogValue={setDialogValue}
            handleSubmit={handleDialogueSubmit}
            handleClose={handleDialogueClose}
            openDialogue={openDialogue}
        />
        </Fragment>
    );
})


export const FormSelectAndInput = (props) => {
    
    const {id, inputLabel, required, options, onChange, ...others } = props;
    const [selections, setSelections] = useState([]);
    const [dynamicOptions, handleOptions] = useState(options);

    // for DialogModal
    const [openDialogue, handleDialogueOpen] = useState(false);
    const initialDialogValue = {id:'', url: ''};
    const [dialogValue, setDialogValue] = useState(initialDialogValue);
    const [emptyDialog, setEmptyDialog] = useState(false);

    const handleAddSelection = (event) => {
        setDialogValue({ ...dialogValue, id: event.target.value });
    }

    const handleDeleteSelection = (obj) => {
        const currSelections = selections.filter(x => x.id !== obj.id);
        setSelections(currSelections);
        // save to parent form as strings
        onChange(currSelections);
        // reset dialog value
        setDialogValue(initialDialogValue)
    };

    const handleDialogueClose = () => {
        handleDialogueOpen(false);
        setDialogValue(initialDialogValue);
        setEmptyDialog(false);
    };

    const handleDialogueSubmit = (event) => {
        event.preventDefault();
        if (!dialogValue.url.trim()) {
            setEmptyDialog(true);
        } else {
            setEmptyDialog(false);
            // save to parent form as strings
            onChange([
                ...selections, 
                dialogValue
            ])
            // update selections
            setSelections([
                ...selections, 
                dialogValue
            ])
            handleDialogueClose();
        }
    };
    
    useEffect(() => {
        const selectedOptions = _.map(selections, 'id');
        handleOptions(options.filter(x => !selectedOptions.includes(x)))
    }, [selections])
    
  
    const useStyles = makeStyles((theme) => ({
        root: {
            margin: theme.spacing(2,0)
        },
        iconText: {
            display: "flex",
            alignItems: "center"
        },
        emptyDefaultText: {
            color: "grey"
        },
        window: {
            '& .MuiDialog-paperWidthSm': {
                width: "100%"
            }
        },
    }));

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CustomFormControl size="small" fullWidth>
                <InputLabel htmlFor={id}>
                    {inputLabel}
                </InputLabel>
                { selections.map((obj, index) => 
                    <div className={classes.iconText} key={index}>
                        <IconButton 
                            aria-label="delete-link" 
                            onClick={()=>handleDeleteSelection(obj)}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                        <span>{obj.id}: {obj.url}</span>
                    </div>
                )}
                <Select
                    variant="outlined" 
                    required={required}
                    name={id}
                    id={id}
                    displayEmpty={true}
                    defaultValue={""}
                    value={dialogValue.id}
                    onChange={handleAddSelection}
                    {...others}
                >
                    {dynamicOptions.map((option, index) => 
                        <MenuItem 
                            key={`${id}-${index}`} 
                            value={option} 
                            onClick={()=>handleDialogueOpen(true)}
                        >
                            {option}
                        </MenuItem>
                    )}
                </Select>
                <FormHelperText>You can add external links to include in this challenge.</FormHelperText>
            </CustomFormControl>
            <Dialog className={classes.window} open={openDialogue} aria-labelledby="enter-link">
                <DialogTitle id="enter-link-title">Enter the link to {dialogValue.id}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        required={true}
                        autoFocus
                        margin="dense"
                        error={emptyDialog}
                        onChange={(event) => setDialogValue({ ...dialogValue, url: event.target.value })}
                        helperText={emptyDialog && "Please enter a link."}
                        type="text"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogueClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDialogueSubmit} color="primary" form="dialogue">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export const FormSelect = (props) => {
    const {id, inputLabel, required, options, ...others } = props;

    const useStyles = makeStyles((theme) => ({
        root: {
            margin: theme.spacing(2,0)
        },
        emptyDefaultText: {
            color: "grey"
        }
    }));
  
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CustomFormControl size="small" fullWidth>
                <InputLabel htmlFor={id}>
                    {inputLabel}
                </InputLabel>
                <Select
                    variant="outlined" 
                    required={required}
                    name={id}
                    id={id}
                    defaultValue={""}
                    {...others}
                >
                    {options.map((option, index) => 
                        <MenuItem key={`${id}-${index}`} value={option}>
                            {!!option ? option: <em className={classes.emptyDefaultText}>-------Please Select---------</em>}
                        </MenuItem>
                    )}
                </Select>
            </CustomFormControl>
        </div>
    )
}


export function FormInput (props) {
    const {id, inputLabel, required, ...others } = props;

    const useStyles = makeStyles((theme) => ({
        root: {
            margin: theme.spacing(2,0)
        }
    }));

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CustomFormControl fullWidth>
                <InputLabel htmlFor={id}>
                    {inputLabel}
                </InputLabel>
                <TextField 
                    required={required}
                    id={id}
                    name={id}
                    type="text" 
                    variant="outlined"
                    size="small"
                    {...others}
                />
            </CustomFormControl>
        </div>
    )
}
