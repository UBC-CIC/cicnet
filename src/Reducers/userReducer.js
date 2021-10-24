const userReducer = (currentState = [], action) => {
    switch(action.type) {
        case "GET_USER_LIST": {
            console.log(action.type)
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
                    createdAt: formatDate(new Date(element.createdAt)),
                }
              ));
            return newState;
        }
        case "ADD_NEW_USER": {
            console.log(action.type)
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
                    createdAt: formatDate(new Date(action.payload.createdAt)),
                }
            ]
            return newState
        }
        case "UPDATE_USER_INFO": {
            console.log(action.type)
            const index = currentState.findIndex((element) => element._id === action.payload.id);

            const newState = [...currentState];
            newState[index].confirmed = action.payload.confirmed
            return newState
        }
        default:
            console.log(action.type)
            return currentState
    }
}

export default userReducer;


// helpers
const formatDate = (date) => {
    const stringDate = date.toString().split(" ").slice(1, 4); // [month, date, year]
    const month = months.indexOf(stringDate[0]) + 1;
    return `${stringDate[2]}-${month<10&&'0'}${month}-${stringDate[1]}`
    // return  month+'/'+parseInt(stringDate[1])+'/'+stringDate[2]
};
  
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const userTypes = {
    "SPONSOR": 'Sponsor',
    "CIC_STUDENT": "CIC Student",
    "CIC_STAFF": "CIC Staff",
    "ALUMNI": "Alumni"
};