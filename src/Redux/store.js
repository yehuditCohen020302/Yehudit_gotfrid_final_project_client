import { createStore, combineReducers, applyMiddleware } from 'redux';
import usersReducer from './reducers/users'
import diaryReducer from './reducers/diary'
import {
    createNewUser, loginUser, getAllUsers, deleteUser, sendMessageToUser, getMessagesByUser,
    contactToManager, getMessagesManager, removeUserContact
} from './Middleware/users'
import { getAllFoods, getDiaryByUser, addNewFood } from './Middleware/diary'


const reducer = combineReducers({
    usersReducer, diaryReducer
})
const Store = createStore(reducer, applyMiddleware(
    createNewUser, loginUser, getAllFoods, deleteUser, getDiaryByUser,
    getAllUsers, addNewFood, sendMessageToUser, getMessagesByUser, contactToManager,
    getMessagesManager, removeUserContact));
window.store = Store;
export default Store;
