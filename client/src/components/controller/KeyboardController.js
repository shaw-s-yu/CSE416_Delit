module.exports = {
    KeyCtrlDown: callback => {
        window.onkeydown = e => {
            console.log(e.code)
            if (e.code === KEYCODE.CONTROLLEFT) {
                if (callback) callback()
            }

        }
    },

    KeyCtrlUp: callback => {
        window.onkeyup = e => {
            if (e.code === KEYCODE.CONTROLLEFT) {
                if (callback) callback()
            }
        }
    }
}

const KEYCODE = {
    CONTROLLEFT: 'ControlLeft'
}