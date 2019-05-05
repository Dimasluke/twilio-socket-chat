const initialState = {
    messages: [],
};

const ADD_MESSAGE = 'ADD_MESSAGE';

function reducer(state = initialState, action) {
    switch(action.type){
        case ADD_MESSAGE:
            console.log(action.payload)
            var message = action.payload
            var messages = state.messages.concat(message)
            return {...state, messages: messages}
        default:
            return state;
    };
};

export function setMessages(message) {
    console.log(message)
    return {
        type: 'ADD_MESSAGE',
        payload: message
    }
}

export default reducer;