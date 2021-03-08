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
