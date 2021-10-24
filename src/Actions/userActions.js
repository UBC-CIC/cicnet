
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
export const updateUserInfo = (info) => async (dispatch) => {

    await API.graphql(graphqlOperation(updateUser, { input: info }))
      .then(data => {
        // if successful, update the room list
        dispatch({
            type: 'UPDATE_USER_INFO',
            payload: info
        });
      })
      .catch(error => {
        console.log('Error in updating user\'s info', error);
    });

}