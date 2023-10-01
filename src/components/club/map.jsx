import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import axios from 'axios';

function RouteMap(props) {  
  const startLatitude = parseFloat(props.startLatitude);
  const startLongitude = parseFloat(props.startLongitude);
  const endLatitude = parseFloat(props.endLatitude);
  const endLongitude = parseFloat(props.endLongitude);
  const stop1Longitude = parseFloat(props.stop1Longitude);
  const stop1Latitude = parseFloat(props.stop1Latitude);
  const stop2Latitude = parseFloat(props.stop2Latitude);
  const stop2Longitude = parseFloat(props.stop2Longitude);

  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =  import.meta.env.VITE_MAPBOXTOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [startLongitude, startLatitude],
      zoom: 10,
    });

    let selectedRouteIndex = 0
    let routes = []

    new mapboxgl.Marker().setLngLat([startLongitude, startLatitude]).addTo(map);
    new mapboxgl.Marker().setLngLat([stop1Longitude, stop1Latitude]).addTo(map);
    new mapboxgl.Marker().setLngLat([stop2Longitude, stop2Latitude]).addTo(map);
    new mapboxgl.Marker().setLngLat([endLongitude, endLatitude]).addTo(map);

    const fetchRouteData = () => {
      axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${startLongitude},${startLatitude};${stop1Longitude},${stop1Latitude};${stop2Longitude},${stop2Latitude};${endLongitude},${endLatitude}`,
          {
            params: {
              access_token: mapboxgl.accessToken,
              geometries: 'geojson',
              overview: 'full',
              alternatives: true,
            },
          }
        )
        .then((response) => {
          routes = response.data.routes;
          const routeData = routes[selectedRouteIndex].geometry;

          if (map.getSource('route')) {
            map.getSource('route').setData(routeData);
          } else {
            map.on('load', () => {
              map.addSource('route', {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: routeData,
                },
              });

              map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round',
                },
                paint: {
                  'line-color': '#339FFF',
                  'line-width': 6,
                },
              });
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching route:', error);
        });
    };
    fetchRouteData()
    return () => map.remove();
  }, [startLongitude, startLatitude, stop1Longitude, stop1Latitude, stop2Longitude, stop2Latitude, endLongitude, endLatitude]);

  return <div className='m-auto overflow-hidden w-3/4 md:h-96 sm:h-56 h-40 pb-4' ref={mapContainerRef} />;
}

export default RouteMap;
