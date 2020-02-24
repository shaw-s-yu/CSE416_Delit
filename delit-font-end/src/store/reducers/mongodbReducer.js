import io from 'socket.io-client'


const initState = {};

const mongodbReducer = (state = initState, action) => {
    console.log(action)
    if (action.type === 'CREATE_SOCKET') {
        const socket = io('https://delit-back-end.herokuapp.com/');
        if (socket !== "undefined") {
            console.log('hiherok')
            socket.on("output", () => { })
            socket.on("cleared", () => { })
        }


        return {
            socket,
        }
    }

    return state;
}

export default mongodbReducer;