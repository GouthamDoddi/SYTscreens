export const noOfTripsFound = data => ({
  type: 'NoOfTripsFound',
  data,
});

export const allTripIdsNTruckNos = tripIdsNTruckNos => ({
  type: 'AllTripIdsNTruckNos',
  data: tripIdsNTruckNos,
});


export const allTruckDetails = data => ({
  type: 'AllTruckDetails',
  data,
});

export const allTruckSpaceNWeight = data => ({
  type: 'AllTruckSpaceNWeight',
  data,
});

export const selectedTruckData = data => ({
  type: 'SelectedTruckData',
  data,
});

export const deliveryRequests = data => ({
  type: 'DeliveryRequests',
  data,
});

export const tripDetails = data => ({
  type: 'TripDetails',
  data,
});

export const selectedTrip = data => ({
  type: 'SelectedTrip',
  data,
});
