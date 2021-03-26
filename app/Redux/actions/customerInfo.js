export const customerFirstName = firstName => ({
  type: 'FirstName',
  data: firstName,
});

export const customerLastName = lastName => ({
  type: 'LastName',
  data: lastName,
});

export const customerMobileNum = mobileNum => ({
  type: 'MobileNum',
  data: mobileNum,
});

export const customerOtp = otp => ({
  type: 'OTP',
  data: otp,
});

export const customerToken = token => ({
  type: 'Token',
  data: token,
});

export const customerPackages = data => ({
  type: 'CustomerPackages',
  data,
});

export const receivingPackages = data => ({
  type: 'ReceivingPackages',
  data,
});
