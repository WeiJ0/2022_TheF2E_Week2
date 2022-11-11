import * as actions from '../action/file';

const initState = {
    targetFile: {
        name: '',
        base64Data: ''
    },
}

const fileReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_FILE:
            return {
                ...state,
                targetFile: action.payload
            }
        default:
            return state
    }
}

export default fileReducer;