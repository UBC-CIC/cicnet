import React, { Fragment, useEffect, useState } from "react";
import { 
    FormControl, 
    InputLabel, 
    TextField, 
    makeStyles, 
    withStyles, 
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
// amplify
import { API, graphqlOperation } from 'aws-amplify';
import { listChallenges } from "../../graphql/queries";

// icons
import CircularProgress from '@material-ui/core/CircularProgress';

// internal


const CustomFormControl = withStyles((theme) => ({
    root: {
        '& .MuiFormLabel-root': {
            transform: 'translate(0px, -20px)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: 0,
            },
            margin: theme.spacing(1,0) 
        },
    },
}))(FormControl);


// other helper component functions
export function SelectionInput (props) {
    // imports from props
    const { id } = props;
    const { handleChange, defaultValue, ...inputProps } = props;

    // for Autocomplete
    const [optionList, setOptionList] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState((optionList.length) === 0);
    
    useEffect(() => {
        (async () => {
            try {
                // trying to list challenge names
                const challenges = await API.graphql(graphqlOperation(listChallenges))
    
                setOptionList(
                    challenges.data.listChallenges.items.map(element => {
                        return element.title
                    })
                )
                setLoading(false)

            } catch (err) {
                console.log(`error fetching challenges...`, err)
            }

        })();
    }, []);

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])


    return (
        <Fragment>
        <Autocomplete
            fullWidth
            id={id}
            size="small"
            value={value}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            loading={loading}
            onChange={(event) => {
                setValue(event.target.textContent);
                handleChange(event);
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={optionList}
            renderInput={(params) => (
                <FormInput 
                    {...inputProps} 
                    {...params}
                    // Attributes applied to the input element
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                    // Props applied to the materialUI Input element
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                        <Fragment>
                            {open && loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </Fragment>
                        ),
                    }}
                />
            )}
        />
        </Fragment>
    );
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
