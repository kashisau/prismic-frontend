import React, { Component, Fragmen } from 'react'

const HERE_MAPS_SCIPTS = [
  '//js.api.here.com/v3/3.0/mapsjs-core.js',
  '//js.api.here.com/v3/3.0/mapsjs-service.js',
  '//js.api.here.com/v3/3.0/mapsjs-mapevents.js'
]

const HERE_API_KEY = process.env.HERE_API_KEY
const HERE_APP_CODE = process.env.HERE_APP_CODE

export default class Map extends Component {

  mapRef = React.createRef()
  hereMap;

  initialiseMap() {
    const herePlatform = new H.service.Platform({
      'app_id': HERE_API_KEY,
      'app_code': HERE_APP_CODE,
      'useHTTPS': true
    });

    const pixelRatio = window.devicePixelRatio || 1;
    const defaultLayers = herePlatform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320
    });

    this.hereMap = new H.Map(
      this.mapRef,
      defaultLayers.normal.map,
      {
        zoom: 12,
        center: { lat: this.props.lat, lng: this.props.lng }
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.hereMap));
  }

  async componentDidMount() {
    if (!window.H) {
      const headScript = document.getElementsByTagName('script')[0]
      const loadMapScripts = HERE_MAPS_SCIPTS.map(
        scriptUrl => {
          const scriptTag = document.createElement('script')
          scriptTag.type = 'text/javascript'
          scriptTag.charSet = 'utf-8'
          scriptTag.src = scriptUrl

          // Curry the above into a promise that can be called in sequence
          return () => {
              return new Promise((resolve, reject) => {
              headScript.parentNode.insertBefore(scriptTag, headScript)
              scriptTag.addEventListener('load', _ => {
                resolve(true)
              })
              scriptTag.addEventListener('error', _ => {
                reject(true)
              })
            })
          }
        }
      )

      loadMapScripts[0]()
        .then(loadMapScripts[1])
        .then(loadMapScripts[2])
        .then(() => { this.initialiseMap.call(this) })
    } else {
      this.initialiseMap()
    }
  }

  render() {
    return (
      <div>
        <div style={{ height: `50vh` }} ref={r => this.mapRef = r} />
      </div>
      )
  }
}
