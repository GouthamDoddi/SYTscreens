export function getListOfTruckIds (data) {
  const listOfData = [];

  for (const tripinfo of data) {
    const tripDetails = {
      truckNo: tripinfo.truck_no,
      tripId: tripinfo.trip_id,
    };

    listOfData.push(tripDetails);
  }
  console.log(`list of data = ${JSON.stringify(listOfData)}`);

  return listOfData;
}
