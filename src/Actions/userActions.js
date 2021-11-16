
import { API, Auth, graphqlOperation } from "aws-amplify";

import { updateUser } from "../graphql/mutations";
import { listUsers } from "../graphql/queries";

import { userTypes } from "../JsonData/userType";


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


// Confirms the status of the user type
export const updateUserInfoConfirmed = (info) => async (dispatch) => {

    await API.graphql(graphqlOperation(updateUser, { input: info }))
      .then(async (res) => {
        if (info.confirmed === true) {
          let apiName = 'AdminQueries';
          let path = '/transferUserToGroup';
          let myInit = {
              body: {
                "username" : res.data.updateUser.id,
                "origGroupname": "General", // original group name
                "newGroupname": userTypes[res.data.updateUser.userType].replace(" ", "") // new group name
              }, 
              headers: {
                'Content-Type' : 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
              } 
          }
          await API.post(apiName, path, myInit);
        }

        // if successful, update the room list
        dispatch(updateUserInfoSuccess(info));
      })
      .catch(error => {
        console.log('Error in updating user\'s info', error);
    });

}

// Updates the user info by staffs & admins using the Edit Modal
export const updateUserInfoAll = (info) => async (dispatch) => {

  await API.graphql(graphqlOperation(updateUser, { input: info }))
    .then(async (data) => {
      // if successful, update the room list
      dispatch(updateUserInfoSuccess(info));
    })
    .catch(error => {
      console.log('Error in updating user\'s info', error);
  });

}

export const updateUserInfoSuccess = (info) => {
  return {
      type: 'UPDATE_USER_INFO',
      payload: info
  }
}