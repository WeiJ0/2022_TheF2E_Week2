const initState = {
    users: [],
    targetFile: {
        name: '',
        base64Data: ''
    },
    isLoading: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOAD_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'SET_TARGET_FILE':
            return {
                ...state,
                targetFile: action.payload
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}

export default reducer;