import calculateDistance from "../../helperFunctions/distanceCalculator";
import APICaller from "../../helperFunctions/APICaller";
const apiCaller = new APICaller();
const fetchPSIValues = async () => {
  try {
    const psiData = await apiCaller.fetchPSIReadings();
    return psiData;
  } catch (error) {
    console.error("Error fetching PSI values:", error);
  }
  fetchPSIValues();
};
async function calculatePSIScore(location) {
  try {
    const psiData = await fetchPSIValues();
    const PSIvalue = psiData.value;
    const PSIcoordinates = psiData.coordinates;
    let shortestDistance = Infinity;
    let closestIndex = -1;
    if (!PSIcoordinates || Array.isArray(PSIcoordinates)) {
      console.log("PSIcoordinates not ready.");
    }
    for (let i = 0; i < 5; i++) {
      const coordinates = PSIcoordinates[i];
      const distance = calculateDistance(
        coordinates.latitude,
        coordinates.longitude,
        location.y,
        location.x
      );
      console.log(distance);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestIndex = i;
      }
    }
    const valuesArray = Object.values(PSIvalue);
    return valuesArray[closestIndex];
  } catch (error) {
    console.error("Error calculating PSI score:", error);
  }
}
export default calculatePSIScore;