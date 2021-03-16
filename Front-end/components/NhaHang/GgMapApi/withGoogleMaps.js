import React, { forwardRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';
const googlemapsLibraries = ['geometry']; // whatever google libraries you need

export function withGoogleMaps(Component) {
  return forwardRef((props, ref) => {   
    const { isLoaded  } = useLoadScript({
      googleMapsApiKey: '',
      libraries: googlemapsLibraries,
    });

    const onLoad = React.useCallback(
      function onLoad (mapInstance) {
        console.log(mapInstance)
      }
    )


    if (isLoaded) {
      return <Component {...props} onLoadMap = {onLoad} ref={ref} />;
    } else
     return <div>Map loading....</div>;

    console.log(isLoaded)
   });
}
