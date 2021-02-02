export const PickUp = (state = '', action) => {
  switch (action.type) {
    case 'PickUp':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const Drop = (state = '', action) => {
  switch (action.type) {
    case 'Drop':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const PickUpDate = (state = '', action) => {
  switch (action.type) {
    case 'PickUpDate':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const PackageWeight = (state = '', action) => {
  switch (action.type) {
    case 'PackageWeight':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const PackageSpace = (state = '', action) => {
  switch (action.type) {
    case 'PackageSpace':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const EntireTruck = (state = false, action) => {
  switch (action.type) {
    case 'EntireTruck':
      state = !state;

      return state;
    default:
      return state;
  }
};

export const ReceivingPersonName = (state = '', action) => {
  switch (action.type) {
    case 'ReceivingPersonName':
      state = action.data;

      return state;
    default:
      return state;
  }
};

export const ReceivingPersonNum = (state = '', action) => {
  switch (action.type) {
    case 'ReceivingPersonNum':
      state = action.data;

      return state;
    default:
      return state;
  }
};
