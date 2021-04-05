// export const LoginFailed = (state = null, action) => {
//   switch (action.type) {
//     case 'LoginFailed':
//       state = action.data;

//       return state;

//     default:
//       return state;
//   }
// };


export const TruckRegisterFailed = (state = false, action) => {
  switch (action.type) {
    case 'TruckRegisterFailed':
      state = action.data;

      return state;

    default:
      return state;
  }
};

export const Rating = (state = false, action) => {
  switch (action.type) {
    case 'Rating':
      state = action.data;

      return state;

    default:
      return state;
  }
};
