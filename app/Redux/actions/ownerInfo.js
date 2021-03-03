export const ownerFullName = data => ({
  type: 'FullName',
  data,
});

export const ownerMobileNum = mobileNum => ({
  type: 'MobileNum2',
  data: mobileNum,
});

export const ownerOtp = otp => ({
  type: 'OTP2',
  data: otp,
});

export const ownerToken = token => ({
  type: 'Token2',
  data: token,
});

export const checklist = data => ({
  type: 'CheckList',
  data,
});
