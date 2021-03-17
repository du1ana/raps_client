export function getLocalTime(datetime){
  var d = new Date(datetime.toString());
  return d.toString().match(/\d\d:\d\d/);
}

export function getLocalDate(datetime){
  var d = new Date(datetime.toString());
  return d.toString().match(/\w+ \w+ \d+ \d+/);
}
