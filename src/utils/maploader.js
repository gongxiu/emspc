export default function MapLoader() { // <-- 原作者这里使用的是module.exports
  return new Promise((resolve, reject) => {
    window.initAMap = () => {
      resolve(window.AMap)
    }
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://webapi.amap.com/maps?v=1.4.15&callback=initAMap&key=a1a1830522dec5d154fda20db5a774cd&plugin=AMap.MarkerClusterer&&AMap.moveAnimation'
      script.onerror = reject
      document.head.appendChild(script)
    }
  })
}

