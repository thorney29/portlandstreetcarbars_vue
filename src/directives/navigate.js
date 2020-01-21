export function navigate = function (lat, lng, name) {
  var ua = navigator.userAgent.toLowerCase()

  function iOSversion () {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
      // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
      var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
      return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)]
    }
  }
  var ver = iOSversion() || [0]
  // var addressLongLat = lat + ',' + lng
  if (ver[0] >= 5) {
    window.open('https://maps.apple.com/?q=' + name, '_system')
    if (navigator.userAgent.match('CriOS')) {
      window.open('comgooglemaps://?q=' + name)
      // window.open("geo:0,0?q="+ name , '_system')
    }
  } else if ((ua.indexOf('android') !== -1)) {
    // window.open("geo:"+addressLongLat)
    window.open('geo:0,0?q=' + name, '_system')
  } else {
    // window.open("http://maps.google.com/?q="+addressLongLat, '_system')
    window.open('https://www.google.com/maps/place/?key=AIzaSyCXOqIYw5VQH9kCQwj3buLfVV3vHvKfxsM&q=' + name)
  }
}
export default navigate