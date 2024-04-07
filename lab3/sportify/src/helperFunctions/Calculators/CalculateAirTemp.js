import calculateDistance from "../../helperFunctions/distanceCalculator";
import APICaller from "../../helperFunctions/APICaller";
const apiCaller = new APICaller();
const fetchAirValues = async () => {
  try {
    const AirData = await apiCaller.fetchAirReadings();
    //console.log(AirData);
    return AirData;
  } catch (error) {
    console.error("Error fetching Air values:", error);
  }
  fetchAirValues();
};
async function calculateAirScore(location) {
  try {
    const AirData = await fetchAirValues();
    const Airvalue = AirData.value;
    const Aircoordinates = AirData.coordinates;
    //console.log(AirData);
    //console.log(Aircoordinates);
    //console.log(Airvalue);
    let shortestDistance = Infinity;
    let closestIndex = -1;
    if (!Aircoordinates || Array.isArray(Aircoordinates)) {
      console.log("Aircoordinates not ready.");
    }
    for (let i = 0; i < 2; i++) {
      const coordinates = Aircoordinates[i];
      //console.log(coordinates.latitude);
      const distance = calculateDistance(
        coordinates.latitude,
        coordinates.longitude,
        location.y,
        location.x
      );
      //console.log(distance);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestIndex = i;
        //console.log(closestIndex);
      }
    }
    const valuesArray = Object.values(Airvalue);
    //console.log(valuesArray);
    //console.log(closestIndex);
    //console.log(valuesArray[closestIndex]);
    const airResult = valuesArray[closestIndex];
    return airResult;
  } catch (error) {
    console.error("Error calculating Air score:", error);
  }
}
export default calculateAirScore;