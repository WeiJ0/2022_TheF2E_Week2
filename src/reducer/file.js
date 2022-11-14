import * as actions from '../actions/file';

const initState = {
    targetFile: {
        name: '',
        base64Data: ''
    },
}

const fileReducer = (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case actions.SET_FILE:
            return {
                ...state,
                targetFile: action.payload.targetFile
            }
        default:
            return state
    }
}

export default fileReducer;