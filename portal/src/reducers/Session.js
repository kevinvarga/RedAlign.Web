import { BLOCKER_SHOW, BLOCKER_HIDE, MEASUREMENTS_UPDATE } from '../actions/types';

const initialState = {
    blocker: {
        show: false,
        message: "",
    },
    dialog: {
        show: false,
        message: "",
    },
    snackbar: {
        show: false,
        message: "",
    },
    measurements: {
        data: null,
    }
}

export default function (state = initialState, action) {

    switch (action.type) {
        case MEASUREMENTS_UPDATE: {
            return {
                ...state,
                measurements: {
                    data: action.data
                }
            }
        }
        case BLOCKER_HIDE: {
            return {
                ...state,
                blocker: {
                    show: false,
                    message: ""
                }
            }
        }
        case BLOCKER_SHOW: {
            return {
                ...state,
                blocker: {
                    show: true,
                    message: action.message
                }
            }
        }
        default: {
            return state;
        }
    }
}