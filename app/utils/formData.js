// export function getListOfTruckIds (data) {
//   const listOfData = [];

//   for (const tripinfo of data) {
//     const tripDetails = {
//       truckNo: tripinfo.truck_no,
//       tripId: tripinfo.trip_id,
//     };

//     listOfData.push(tripDetails);
//   }
//   console.log(`list of data = ${JSON.stringify(listOfData)}`);

//   return listOfData;
// }

// export const getImgBlob = async image => {
//   const imageUri = image.uri;
//   const response = await fetch(imageUri);

//   // .then(res => console.log(res))
//   // .error(err => console.log(err));
//   console.log(response);
//   const blob = await response.blob();

//   // const ref = firebase.storage().ref()
//   //   .child('image.jpg');

//   console.log(blob);
// };
