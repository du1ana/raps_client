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

export function getSuburbInt(suburb) {
  switch (suburb) {
    case "Kottawa":
      return 0;
    case "Kahathuduwa":
      return 1;
    case "Gelanigama":
      return 2;
    case "Dodangoda":
      return 3;
    case "Welipanna":
      return 4;
    case "Kurundugahahetekma":
      return 5;
    case "Baddegama":
      return 6;
    case "Pinnaduwa":
      return 7;
    case "Imaduwa":
      return 8;
    case "Kokmaduwa":
      return 9;
    case "Godagama":
      return 10;
    default:
      return 0;
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

export function getKmPost(int) {
  switch (int) {
    case 0:
      return 0;
    case 1:
      return 5.9;
    case 2:
      return 13.7;
    case 3:
      return 34.8;
    case 4:
      return 46;
    case 5:
      return 67.6;
    case 6:
      return 79.8;
    case 7:
      return 95.3;
    case 8:
      return 108;
    case 9:
      return 116.5;
    case 10:
      return 127;
    default:
      return null;
  }
}
