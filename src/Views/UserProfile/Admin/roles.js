// react
import React, { useCallback, useEffect, useState } from "react";

// materialUI
import { makeStyles } from "@material-ui/core/styles";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { DataGrid } from "@material-ui/data-grid";


// amplify
import { API, graphqlOperation } from "aws-amplify";
import { createUser } from "../../../graphql/mutations";

// other imports
import { v4 as uuidv4 } from "uuid";
import { Button, IconButton } from "@material-ui/core";

// icons
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import { connect, useDispatch } from "react-redux";
import { getUserList, updateUserInfo } from "../../../Actions/userActions";
import NewUserModal from "../../../Components/Roles/NewUserModal";

const useStyles = makeStyles(()=> ({
    root: {
        '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
        },
        '& .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none',
        },
        '& .MuiDataGrid-cell:focus': {
            outline: 'none',
            // backgroundColor: 'rgba(63, 81, 181, 0.5)'
        },
        '& .MuiDataGrid-cell:focus-within': {
            outline: 'none',
            // backgroundColor: 'rgba(63, 81, 181, 0.5)'
        },
    },
    flex: {
        display: 'flex'
    },
    button: {
        marginBottom: "20px",
    }
}))

function Roles(props) {
    const { userList } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    // modal
    const [dialogueMode, handleDialogueMode] = useState(null);
    const handleDialogueClose = () => {
        handleDialogueMode(null);
    };

    // datagrid
    const [loading, setLoading] = useState(false);

    const renderConfirmation =  (cellMetadata) => {
        const confirmUser = async (decision) => {
            const user = userList.find((user) => user.id === cellMetadata.id)
            dispatch(updateUserInfo({
                id: user._id, 
                confirmed: decision
            }))
        }
    
        return (
            <div className={classes.flex}>
            { cellMetadata.value === null && 
                <div>
                    <IconButton aria-label="accept" onClick={()=>confirmUser(true)}>
                        <DoneIcon fontSize="small"/>
                    </IconButton>
                    <IconButton aria-label="reject" onClick={()=>confirmUser(false)}>
                        <ClearIcon fontSize="small"/>
                    </IconButton>
                </div>
            }
            { cellMetadata.value === true &&
                <DoneIcon fontSize="small"/>
            }
            { cellMetadata.value === false &&
                <ClearIcon fontSize="small" />
            }
            </div>
        )
    }
    
    const renderEditColumn = (cellMetadata) => {
        return (
            <IconButton
                id={'Edit-' + cellMetadata.id}
                style={{ display: 'none' }}
                onClick={()=>handleDialogueMode({
                    id: cellMetadata.row._id,
                    userType: cellMetadata.row.userType,
                    name: cellMetadata.row.name,
                    firstname: cellMetadata.row.firstname, //cellMetadata.row.name.split(" ")[0] : "",
                    lastname: cellMetadata.row.lastname, //cellMetadata.row.name.split(" ").slice(1).join(" ") : "", // /([^\s])+\s/
                    email: cellMetadata.row.email,
                    coopEndDate: cellMetadata.row.coopEndDate
                })}
            >
                <EditIcon fontSize="small"/>
            </IconButton>
        )
    }
    
    const columns = [
        { field: "", headerName: undefined, width: 60, disableColumnMenu: true, sortable: false, renderCell: renderEditColumn },
        { field: "name", headerName: "Name", width: 250 },
        { field: "confirmed", headerName: "Confirmed?", type: 'boolean', width: 150, renderCell: renderConfirmation },
        { field: "userType", headerName: "User Type", width: 150 },
        { field: "email", headerName: "Email", width: 250 },
        { field: "challenges", headerName: "Challenges Involved", width: 300 },
        { field: "coopEndDate", headerName: "Co-op/Work Term End Date", width: 250 },
        { field: "createdAt", headerName: "User Date Created", type: "date", width: 200 },
    ];

    // when page first loaded
    useEffect(() => {
        document.title = props.title;
        
        setLoading(true)
        dispatch(getUserList())
        setLoading(false)
    }, []);


    return (
        <>
        <div>
            <Button 
                className={classes.button} 
                variant="contained" 
                onClick={()=>handleDialogueMode({})}
            >
                Add User
            </Button>
        </div>
        <div style={{ width: "100%" }}>
            <DataGrid
                className={classes.root}
                rows={userList}
                columns={columns}
                loading={loading}
                autoWidth
                autoHeight
                autoPageSize
                disableColumnSelector // hide or show column
                disableColumnFilter 
                disableColumnMenu
                hideFooterSelectedRowCount

                disableSelectionOnClick
                // onSelectionModelChange={(newSelectionModel) => {
                //     setSelectionModel(newSelectionModel);
                // }}
                // selectionModel={selectionModel}

                onRowEnter={(params) => {
                    const control = document.getElementById('Edit-' + params.id);
                    if (!!control) control.style.display = 'block';
                }}
                onRowLeave={(params) => {
                    const control = document.getElementById('Edit-' + params.id);
                    if (!!control) control.style.display = 'none';
                }}
            />
        </div>
        <NewUserModal
            dialogueMode={dialogueMode}
            handleDialogueClose={handleDialogueClose}
        />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        userList: state.userListState,
    };
};

export default connect(mapStateToProps, null)(Roles);


export const createMemberInChallenge = async (info) => {
    let profile = {
        ...info,
        id: uuidv4(),
    };

    try {
      const user = await API.graphql(graphqlOperation(createUser, { input: profile }));
      return user;
    } catch (err) {
      console.log("Error creating member", err);
    }
};