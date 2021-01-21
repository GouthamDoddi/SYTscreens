export const pickUp = pickUp => ({
  type: 'PickUp',
  data: pickUp,
});

export const drop = drop => ({
  type: 'Drop',
  data: drop,
});

export const pickUpDate = date => ({
  type: 'PickUpDate',
  data: date,
});

export const packageWeight = packageWeight => ({
  type: 'PackageWeight',
  data: packageWeight,
});

export const packageSpace = packageSpace => ({
  type: 'PackageSpace',
  data: packageSpace,
});

export const entireTruck = entireTruck => ({
  type: 'EntireTruck',
  data: entireTruck,
});

export const receivingPersonName = receivingPersonName => ({
  type: 'ReceivingPersonName',
  data: receivingPersonName,
});

export const receivingPersonNum = receivingPersonNum => ({
  type: 'ReceivingPersonNum',
  data: receivingPersonNum,
});
