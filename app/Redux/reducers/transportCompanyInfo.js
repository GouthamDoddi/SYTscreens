export const CompanyName = (state = '', action) => {
  switch (action.type) {
    case 'CompanyName':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const ContactNumber = (state = '', action) => {
  switch (action.type) {
    case 'ContactNumber':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const NoOfVehicals = (state = [], action) => {
  switch (action.type) {
    case 'NoOfVehicals':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const SelectedTruck = (state = '', action) => {
  switch (action.type) {
    case 'SelectedTruck':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const AllTruckData = (state = [], action) => {
  switch (action.type) {
    case 'AllTruckData':
      state = action.data;

      return state;
    default:
      return state;
  }
};
