export const OwnerFullName = (state = '', action) => {
  switch (action.type) {
    case 'FirstName':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const OwnerMobileNum = (state = '', action) => {
  switch (action.type) {
    case 'MobileNum':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const OwnerOtp = (state = '', action) => {
  switch (action.type) {
    case 'OTP':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const OwnerToken = (state = '', action) => {
  switch (action.type) {
    case 'Token':
      state = action.data;

      return state;
    default:
      return state;
  }
};
