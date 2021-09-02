
import { API, graphqlOperation } from "aws-amplify";
import { updateUser } from "../graphql/mutations";
import { listUsers } from "../graphql/queries";


// ===================================---CHANGE USER STATES---=======================================
// Get all user info
export const getUserList = () => async (dispatch) => {

    await API.graphql(
        graphqlOperation(
          listUsers
          // , {filter:{userType:{eq:type}}}
        )
      )
      .then(list => {
        // if successful, update the user list
        dispatch({
            type: 'GET_USER_LIST',
            payload: list.data.listUsers.items
        });
      })
      .catch(error => {
        console.log('Error in fetching user\'s info', error);
    });

}


// Updates the user info by staffs & admins
export const addNewUser = (payload) => async (dispatch) => {
    dispatch({
      type: 'ADD_NEW_USER',
      payload: payload.data.createUser
    });
}


// Updates the user info by staffs & admins
export const updateUserStatus = (userId, decision) => async (dispatch) => {
    const updateDetails = {
        id: userId,
        confirmed: decision
    };

    await API.graphql(graphqlOperation(updateUser, { input: updateDetails }))
      .then(data => {
        // if successful, update the room list
        dispatch({
            type: 'UPDATE_USER_STATUS',
            payload: updateDetails
        });
      })
      .catch(error => {
        console.log('Error in updating user\'s info', error);
    });

}