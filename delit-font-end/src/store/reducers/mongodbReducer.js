import io from 'socket.io-client'


const initState = {};

const mongodbReducer = (state = initState, action) => {
    console.log(action)
    if (action.type === 'CREATE_SOCKET') {
        const socket = io('https://delit-back-end.herokuapp.com/');
        if (socket !== "undefined") {
            console.log('hiherok')
            socket.on("register_output", (data) => { console.log(data) })
            socket.on("login_output", (data) => { console.log(data) })
        }


        return {
            socket,
        }
    }

    return state;
}

export default mongodbReducer;