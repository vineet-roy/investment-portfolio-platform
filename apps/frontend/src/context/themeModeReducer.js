const themeModeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHT": {
      return {
        mode: 'light',
      };
    }
    case "DARK": {
      return {
        mode: 'dark',
      };
    }
    default:
      return state;
  }
};

export default themeModeReducer;
