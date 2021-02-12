export const OwnerFullName = (state = '', action) => {
  switch (action.type) {
    case 'FullName':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const OwnerMobileNum = (state = '', action) => {
  switch (action.type) {
    case 'MobileNum2':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const OwnerOtp = (state = '', action) => {
  switch (action.type) {
    case 'OTP2':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const OwnerToken = (state = '', action) => {
  switch (action.type) {
    case 'Token2':
      state = action.data;

      return state;
    default:
      return state;
  }
};
