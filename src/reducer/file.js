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
                targetFile: {
                    name: action.payload.targetFile.name || state.targetFile.name,
                    base64Data: action.payload.targetFile.base64Data || state.targetFile.base64Data
                }
            }
        default:
            return state
    }
}

export default fileReducer;