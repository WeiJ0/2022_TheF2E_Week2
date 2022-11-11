export const GET_FILE = 'GET_FILE';

export const getFile = (file) => {
    return {
        type: GET_FILE,
        payload: {
            targetFile: file.name,
            base64Data: file.base64Data
        }
    }
}