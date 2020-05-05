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
    },

    triggerLeftCtrlZ: e => {
        return e.code === KEYS.KEY_Z && e.ctrlKey
    },
    triggerLeftCtrlY: e => {
        return e.code === KEYS.KEY_Y && e.ctrlKey
    }
}

const KEYS = {
    CONTROLLEFT: 'ControlLeft',
    SHIFTLEFT: 'ShiftLeft',
    KEY_C: 'KeyC',
    KEY_V: 'KeyV',
    KEY_Z: 'KeyZ',
    KEY_Y: 'KeyY',
}