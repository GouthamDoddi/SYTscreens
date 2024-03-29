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

export const SelectedTruckData = (state = '', action) => {
  switch (action.type) {
    case 'SelectedTruckData':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const DeliveryRequests = (state = '', action) => {
  switch (action.type) {
    case 'DeliveryRequests':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const TripDetails = (state = '', action) => {
  switch (action.type) {
    case 'TripDetails':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const SelectedTrip = (state = '', action) => {
  switch (action.type) {
    case 'SelectedTrip':
      state = action.data;

      return state;
    default:
      return state;
  }
};
