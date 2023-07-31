import produce from 'immer';
import createReducer from "./ReducerUtils";

const initialState = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    height: '',
    weights: '',
    allUsers: [],
    messagesByCurrentUser:{},
    isMessages: false,
    allContactManager:[]
};

const usersReducer = {
    setCurrentUserDetails(state, action) {
        state._id = action.payload._id;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.phoneNumber = action.payload.phoneNumber;
        state.height = action.payload.height;
        state.weights = action.payload.weights;
    },
    setMessagesByUser(state, action) {
        state.messagesByCurrentUser = action.payload;
    },
    setIsMessages(state, action) {
        state.isMessages = action.payload;
    },
    setAllUsers(state, action) {
        state.allUsers = action.payload;
    },
    setAllContactManager(state, action) {
        state.allContactManager = action.payload;
    }
}

export default produce((state, action) => createReducer(state, action, usersReducer), initialState);