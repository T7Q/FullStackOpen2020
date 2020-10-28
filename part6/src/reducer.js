const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
};

const counterReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'GOOD':
            const goodNew = state.good + 1;
            return { ...state, good: goodNew };
        case 'OK':
            const okNew = state.ok + 1;
            return { ...state, ok: okNew };
        case 'BAD':
            const badNew = state.bad + 1;
            return { ...state, bad: badNew };
        case 'ZERO':
            return { good: 0, ok: 0, bad: 0, };
        default:
            return state;
    }
};

export default counterReducer;
