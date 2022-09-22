import { BLOCKER_SHOW, BLOCKER_HIDE, MEASUREMENTS_UPDATE } from './types';

export const blockerShow = (show, message = "") => (dispatch) => {
    dispatch({
        type: (show) ? BLOCKER_SHOW : BLOCKER_HIDE,
        message: message
    })
}

export const measurementsUpdate = (data) => (dispatch) => {
    dispatch({
        type: MEASUREMENTS_UPDATE,
        data: data
    });
}