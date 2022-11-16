export const SET_FILE = 'SET_FILE';

export const setFile = (fileObj) => ({
    type: SET_FILE,
    payload: {
        targetFile: fileObj
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