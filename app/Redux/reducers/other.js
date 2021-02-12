export const LoginFailed = (state = false, action) => {
  switch (action.type) {
    case 'LoginFailed':
      state = !state;

      return state;

    default:
      return state;
  }
};

export const TruckRegisterFailed = (state = false, action) => {
  switch (action.type) {
    case 'TruckRegisterFailed':
      state = !state;

      return state;

    default:
      return state;
  }
};
