export const CustomerFirstName = (state = '', action) => {
  switch (action.type) {
    case 'FirstName':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const CustomerLastName = (state = '', action) => {
  switch (action.type) {
    case 'LastName':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const CustomerMobileNum = (state = '', action) => {
  switch (action.type) {
    case 'MobileNum':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const CustomerOtp = (state = '', action) => {
  switch (action.type) {
    case 'OTP':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const CustomerToken = (state = '', action) => {
  switch (action.type) {
    case 'Token':
      state = action.data;

      return state;
    default:
      return state;
  }
};
