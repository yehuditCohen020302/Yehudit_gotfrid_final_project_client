import { actions } from '../action'

export const createNewRequest = ({ dispatch, getState }) => next => action => {
    if (action.type === 'CREATE_NEW_REQUEST') {
        let newRequest = action.payload;
        return fetch(`http://localhost:8000/requests/`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRequest)
        }).then((response) => response.json())
            .then((data) => {
            })
            .catch((err) => {
                console.log(err)
            })

    }
    return next(action)
}
export const getAllRequests = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_ALL_REQUESTS') {
        return fetch(`http://localhost:8000/requests/`)
            .then((response) => response.json())
            .then((data) => {
                dispatch(actions.setAllRequests(data.requests))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return next(action)
}

