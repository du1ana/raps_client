import haversine from "haversine";

export const findNearestExit = (userCoords) => {
  /*
    userCoords should be an object with location and latitude
    e.g. userCoords = {
      latitude:6.123123,
      longitude:7.3435
    }
    */

  const exitCoords = {
    Kottawa: { latitude: 6.84049, longitude: 79.980573 },
    Kahathuduwa: { latitude: 6.784015, longitude: 79.980355 },
    Gelanigama: { latitude: 6.715369, longitude: 80.000144 },
    Dodangoda: { latitude: 6.542138, longitude: 80.043321 },
    Welipanna: { latitude: 6.453122, longitude: 80.088722 },
    Kurundugahahetekma: { latitude: 6.271763, longitude: 80.13916 },
    Baddegama: { latitude: 6.180164, longitude: 80.19423 },
    Pinnaduwa: { latitude: 6.069075, longitude: 80.264147 },
    Imaduwa: { latitude: 6.035074, longitude: 80.36598 },
    Kokmaduwa: { latitude: 6.022619, longitude: 80.432987 },
    Godagama: { latitude: 5.976512, longitude: 80.518374 },
  };

  let prev_exit = null,
    prev_distance = null,
    distance = null;
  for (let exit in exitCoords) {
    let exitCoord = {
      latitude: exitCoords[exit].latitude,
      longitude: exitCoords[exit].longitude,
    };
    distance = haversine(userCoords, exitCoord, { unit: "km" }); //need haversine package to do this

    if (prev_exit !== null && prev_distance < distance) {
      return prev_exit;
    }
    prev_exit = exit;
    prev_distance = distance;
  }
};
