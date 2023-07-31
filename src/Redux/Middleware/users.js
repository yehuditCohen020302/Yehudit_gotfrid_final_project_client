import { actions } from '../action'

let a = new Date();
export const today = `${a.getDate()}/${a.getMonth() + 1}/${a.getFullYear()}`;

export const createNewUser = ({ dispatch, getState }) => next => action => {
    if (action.type === 'CREATE_NEW_USER') {
        let user = action.payload;
        return fetch('http://localhost:8000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((response) => response.json())
            .then((data) => {

            })
            .catch((err) => {
                console.log(err)
            })

    }
    return next(action)
}


export const loginUser = ({ dispatch, getState }) => next => action => {
    if (action.type === 'LOGIN_USER') {
        let email = action.payload.email
        let password = action.payload.password
        return fetch(`http://localhost:8000/user/${email}/${password}`)
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('user-details', JSON.stringify(data.data));
                dispatch(actions.setCurrentUserDetails(data.data))
                return data;
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return next(action)

}

export const getAllUsers = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_ALL_USERS') {
        return fetch('http://localhost:8000/user/getAll')
            .then((response) => response.json())
            .then((data) => {
                console.log("data", data);
                dispatch(actions.setAllUsers(data.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return next(action)
}
export const getMessagesManager = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_MESSAGES_MANAGER') {
        return fetch('http://localhost:8000/managerMessages')
            .then((response) => response.json())
            .then((data) => {
                dispatch(actions.setAllContactManager(data?.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return next(action)
}


export const deleteUser = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DELETE_USER') {
        let _id = action.payload;
        return fetch(`http://localhost:8000/user/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
            })
            .catch((err) => {
                console.log(err)
            })

    }
    return next(action)
}
export const sendMessageToUser = ({ dispatch, getState }) => next => action => {
    if (action.type === 'SEND_MESSAGE_TO_USER') {
        let contact = action.payload;
        return fetch('http://localhost:8000/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
            .then((response) => response.json())
            .then((data) => {

            })
            .catch((err) => {
                console.log(err)
            })

    }
    return next(action)
}

export const getMessagesByUser = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_MESSAGES_BY_USER') {
        let id = action.payload;
        return fetch(`http://localhost:8000/message/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data?.message === "messages by user") {
                    dispatch(actions.setIsMessages(true))
                    dispatch(actions.setMessagesByUser(data?.data))
                } else {
                    if (data?.message === "not found") {
                        dispatch(actions.setIsMessages(false))
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return next(action)
}
export const contactToManager = ({ dispatch, getState }) => next => action => {
    if (action.type === 'CONTACT_TO_MANAGER') {
        let contact = action.payload;
        return fetch('http://localhost:8000/managerMessages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
            .then((response) => response.json())
            .then((data) => {
            })
            .catch((err) => {
                console.log(err)
            })

    }
    return next(action)
}
export const removeUserContact = ({ dispatch, getState }) => next => action => {
    if (action.type === 'REMOVE_USER_CONTACT') {
        let id = action.payload;
        return fetch(`http://localhost:8000/managerMessages/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        
        })
            .then((response) => response.json())
            .then(() => {
            })
            .catch((err) => {
                console.log(err)
            })

    }
    return next(action)
}