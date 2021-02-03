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
