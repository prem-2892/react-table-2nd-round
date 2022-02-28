import {
    SET_DATA_REQUEST,
    SET_DATA_SUCCESS,
    SET_DATA_FAIL,
} from '../constants/dataConstants'

export const setDataReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_DATA_REQUEST:
            return { loading: true }

        case SET_DATA_SUCCESS:
            return { loading: false, data: action.payload }

        case SET_DATA_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
