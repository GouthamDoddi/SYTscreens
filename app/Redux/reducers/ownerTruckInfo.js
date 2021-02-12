export const TruckNo = (state = '', action) => {
  switch (action.type) {
    case 'TruckNo':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const TruckModel = (state = '', action) => {
  switch (action.type) {
    case 'TruckModel':
      state = action.data;

      return state;
    default:
      return state;
  }
};


export const TotalSpace = (state = 0, action) => {
  switch (action.type) {
    case 'TotalSpace':
      state = action.data;

      return state;
    default:
      state = 0;

      return state;
  }
};

export const TotalWeight = (state, action) => {
  switch (action.type) {
    case 'TotalWeight':
      state = action.data;

      return state;
    default:
      state = 0;

      return state;
  }
};
