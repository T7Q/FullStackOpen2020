const initialState = 'hello';

const notificationReducer = (state = initialState, action) => {
  // console.log('state now: ', state);
  // console.log('action', action);
  switch (action.type) {
    default:
      return state;
  }
};

export default notificationReducer;