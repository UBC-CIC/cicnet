import { useHistory } from "react-router-dom";

//materialUI
import { Button, CircularProgress, Grid, makeStyles, } from "@material-ui/core";
//icons
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: "20px",
    },
    progress: {
        padding: theme.spacing(0, 1)
    },
    center: {
        display: "flex",
        alignItems: "center",
    }
}));

export const NewActionButton = ({pathname, state, buttonName}) => {
    const history = useHistory();
    const classes = useStyles();

    const routeChange = () => { 
        history.push({
            pathname: pathname, 
            state: !!state && state
        });
    }

    return (
        <Grid container item xs={12} className={classes.root}>
            <Grid container item xs>
                <Button
                    variant="contained"
                    color="default"
                    startIcon={<AddOutlinedIcon/>}
                    onClick={routeChange}
                >
                    {buttonName}
                </Button>
            </Grid>
        </Grid>
    )
}


export const LoadingButton = (props) => {
    const { loading, defaultName, loadingName, ...others } = props;
    const classes = useStyles();

    return (
        <Button 
            variant="contained" 
            disabled={!!loading}
            {...others}
        >
            {!loading && <span className={classes.progress}>{ defaultName }</span>}
            {!!loading && 
                <Grid className={classes.center}>
                    <span className={classes.progress}>{ loadingName }</span>
                    <CircularProgress size={15}/>
                </Grid>
            }
        </Button>
    )
}