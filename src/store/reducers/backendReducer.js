import io from 'socket.io-client'


const initState = {};

const backendReducer = (state = initState, action) => {
    if (action.type === 'CREATE_SOCKET') {
        const socket = io('https://real-delit.web.app/server');
        // const socket = io('127.0.0.1:5000');


        return {
            socket
        }
    }

    return state;
}

export default backendReducer;