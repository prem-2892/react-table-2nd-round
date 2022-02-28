import {
    SET_DATA_REQUEST,
    SET_DATA_SUCCESS,
    SET_DATA_FAIL,
} from '../constants/dataConstants'

export const setDataObject = (data) => async (dispatch) => {
    try {
        dispatch({
            type: SET_DATA_REQUEST,
        })

        dispatch({
            type: SET_DATA_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: SET_DATA_FAIL,
            payload: message,
        })
    }
}
