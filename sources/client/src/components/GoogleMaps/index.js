import GoogleMapReact from 'google-map-react';
import { useEffect, useRef } from 'react';

import { Wrapper, Marker } from './styles';

const ParkingSpaceMarker = ({ text, isTaken }) => (
    <Marker $isTaken={isTaken}>{text}</Marker>
);

const GoogleMaps = ({
    location = {},
    parkingSpaces = [],
    zoneAreaColor = '',
    zoom,
}) => {
    let refMap = useRef(null);
    let refZone = useRef(null);
    const defaultProps = {
        zoom: 15,
    };
    const drawZonePolygon = (map, maps) => {
        if (!maps) return;
        var zoneArea = new maps.Polygon({
            paths: location?.coords ?? [],
            strokeColor: zoneAreaColor ?? '',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: zoneAreaColor ?? '',
            fillOpacity: 0.2,
        });
        refZone.current = zoneArea;
        zoneArea.setMap(map);
    };
    useEffect(() => {
        if (refMap.current) {
            refZone.current.setMap(null);
            drawZonePolygon(refMap.current.map, refMap.current.maps);
        }
    }, [location?.centre]);
    return (
        <Wrapper>
            <GoogleMapReact
                center={location?.centre}
                zoom={zoom ?? defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps, ref }) => {
                    refMap.current = { map, maps };
                    drawZonePolygon(map, maps);
                }}
            >
                {parkingSpaces.map((p, index) => (
                    <ParkingSpaceMarker
                        key={index}
                        lat={p.lat}
                        lng={p.lng}
                        isTaken={p.taken}
                        text={p.psName}
                    />
                ))}
            </GoogleMapReact>
        </Wrapper>
    );
};

export default GoogleMaps;
