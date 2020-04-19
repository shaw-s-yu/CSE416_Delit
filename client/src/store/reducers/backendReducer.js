import config from '../../config'
import io from 'socket.io-client'
const API_URL = config.server


const initState = {};

const backendReducer = (state = initState, action) => {
    if (action.type === 'CREATE_SOCKET') {
        const socket = io(API_URL)
        socket.on('connect', () => {
            // console.log(socket.id)
        })
        return {
            socket
        }
    }

    return state;
}

export default backendReducer;