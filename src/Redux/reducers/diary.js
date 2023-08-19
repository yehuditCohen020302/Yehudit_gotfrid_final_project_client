import produce from 'immer';
import createReducer from "./ReducerUtils";

const initialState = {
    allFood: [],
    diaryByCurrentUser:[],
    isDiary: false
};

const diaryReducer = {
    setAllFoods(state, action) {
        state.allFood = action.payload;
    },
    setDiaryByUser(state, action) {
        state.diaryByCurrentUser = action.payload;
    },
    setIsDiary(state, action) {
        state.isDiary = action.payload;
    }
}

export default produce((state, action) => createReducer(state, action, diaryReducer), initialState);