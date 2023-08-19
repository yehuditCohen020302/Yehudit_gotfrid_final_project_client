import { actions } from '../action'
const currentUser = JSON.parse(localStorage.getItem('user-details'))
let a = new Date();
export const today = `${a.getDate()}/${a.getMonth() + 1}/${a.getFullYear()}`;

export const getAllFoods = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_ALL_FOODS') {
        return fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&limit=4633')
            .then((response) => response.json())
            .then((data) => {
                dispatch(actions.setAllFoods(data.result.records))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return next(action)
}

export const getDiaryByUser = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_DIARY_BY_USER') {
        let id = action.payload;
        return fetch(`http://localhost:8000/diary/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data?.message === "diary by user") {
                    dispatch(actions.setIsDiary(true))
                    dispatch(actions.setDiaryByUser(data?.data))
                } else {
                    if (data?.message === "not found") {
                        dispatch(actions.setIsDiary(false))
                        
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return next(action)
}


export const addNewFood = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_NEW_FOOD') {
        debugger
        const currentUser1 = JSON.parse(localStorage.getItem('user-details'))

        let foodToAdd ={
            userId: currentUser1?._id,
            date: today,
            currentFood:action.payload
        } 
        return fetch('http://localhost:8000/diary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foodToAdd)
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
