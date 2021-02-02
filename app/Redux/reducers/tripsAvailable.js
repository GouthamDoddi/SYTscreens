export const NoOfTripsFound = (state = 0, action) => {
  switch (action.type) {
    case 'NoOfTripsFound':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const AllTripIdsNTruckNos = (state = '', action) => {
  // contains an array of objects with tripIDs
  // and repective truckNo
  switch (action.type) {
    case 'AllTripIdsNTruckNos':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const AllTruckDetails = (state = '', action) => {
  // contains an array of objects with tripIDs
  // and repective truckNo
  switch (action.type) {
    case 'AllTruckDetails':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const AllTruckSpaceNWeight = (state = '', action) => {
  // contains aan array of objects that contains all the data
  // about available sapace and weight
  switch (action.type) {
    case 'AllTruckSpaceNWeight':
      state = action.data;

      return state;
    default:
      return state;
  }
};
