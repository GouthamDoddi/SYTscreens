export const companyName = data => {
  console.log('companyName called');

  return {
    type: 'CompanyName',
    data,
  };
};

export const contactNumber = data => ({
  type: 'ContactNumber',
  data,
});

export const noOfVehicals = data => ({
  type: 'NoOfVehicals',
  data,
});

export const selectedTruck = data => ({
  type: 'SelectedTruck',
  data,
});

export const allTruckData = data => ({
  type: 'AllTruckData',
  data,
});
