module.exports = {

    triggerLeftControll: e => {
        return e.code === KEYS.CONTROLLEFT
    },

    triggerLeftShift: e => {
        return e.code === KEYS.SHIFTLEFT
    },

    triggerLeftCtrlC: e => {
        return e.code === KEYS.KEY_C && e.ctrlKey
    },

    triggerLeftCtrlV: e => {
        return e.code === KEYS.KEY_V && e.ctrlKey
    }
}

const KEYS = {
    CONTROLLEFT: 'ControlLeft',
    SHIFTLEFT: 'ShiftLeft',
    KEY_C: 'KeyC',
    KEY_V: 'KeyV',
}