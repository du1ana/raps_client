export function getLocalTime(datetime) {
  var d = new Date(datetime.toString());
  return d.toString().match(/\d\d:\d\d/)[0];
}

export function getLocalDate(datetime) {
  var d = new Date(datetime.toString());
  return d.toString().match(/\w+ \w+ \d+ \d+/);
}

export function getSuburbName(int) {
  switch (int) {
    case 0:
      return "Kottawa";
    case 1:
      return "Kahathuduwa";
    case 2:
      return "Gelanigama";
    case 3:
      return "Dodangoda";
    case 4:
      return "Welipanna";
    case 5:
      return "Kurundugahahetekma";
    case 6:
      return "Baddegama";
    case 7:
      return "Pinnaduwa";
    case 8:
      return "Imaduwa";
    case 9:
      return "Kokmaduwa";
    case 10:
      return "Godagama";
    default:
      return "Undefined";
  }
}

export function getKmCat(int) {
  switch (int) {
    case 0:
      return "KM1";
    case 1:
      return "KM2";
    case 2:
      return "KM3";
    case 3:
      return "KM4";
    case 4:
      return "KM5";
    case 5:
      return "KM6";
    default:
      return "Undefined";
  }
}
