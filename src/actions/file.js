export const SET_FILE = 'SET_FILE';

export const setFile = (file) => ({
    type: SET_FILE,
    payload: {
        targetFile: file.name,
        base64Data: file.base64Data
    }
})


export const setFileName = (name) => ({
    type: SET_FILE,
    payload: {
        targetFile: {
            name: name,
        }
    }
})