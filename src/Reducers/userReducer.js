const userReducer = (currentState = [], action) => {
    switch(action.type) {
        case "GET_USER_LIST": {
            const newState = action.payload.map((element, index) => (
                {
                    id: index,
                    _id: element.id,
                    name: element.name,
                    firstname: element.firstname,
                    lastname: element.lastname,
                    userType: userTypes[element.userType], // change to readable strings
                    email: element.email,
                    confirmed: element.confirmed,
                    challenges: element.challenges,
                    coopEndDate: element.coopEndDate ? element.coopEndDate : "N/A",
                    createdAt: element.createdAt.split("T")[0]
                }
              ));
            return newState;
        }
        case "ADD_NEW_USER": {
            const newState = [...currentState,
                {
                    id: currentState.length,
                    _id: action.payload.id,
                    name: action.payload.name,
                    firstname: action.payload.firstname,
                    lastname: action.payload.lastname,
                    userType: userTypes[action.payload.userType],
                    email: action.payload.email,
                    confirmed: action.payload.confirmed,
                    challenges: action.payload.challenges,
                    coopEndDate: action.payload.coopEndDate ? action.payload.coopEndDate : "N/A",
                    createdAt: action.payload.createdAt.split("T")[0]
                }
            ]
            return newState
        }
        case "UPDATE_USER_INFO": {
            const index = currentState.findIndex((element) => element._id === action.payload.id);

            const newState = [...currentState];
            newState[index] = {...newState[index], ...action.payload}
            return [...newState]
        }
        default:
            return currentState
    }
}

export default userReducer;

const userTypes = {
    "SPONSOR": 'Sponsor',
    "CIC_STUDENT": "CIC Student",
    "CIC_STAFF": "CIC Staff",
    "ALUMNI": "Alumni"
};