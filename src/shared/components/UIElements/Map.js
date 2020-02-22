import React, { useRef, useEffect } from 'react';

import { MapContainer } from './Map.style.js';

const Map = (props) => {
	const mapRef = useRef();

	const { center, zoom } = props;

	useEffect(() => {
		const map = new window.google.maps.Map(mapRef.current, {
			center: center,
			zoom: zoom
		});

		new window.google.maps.Marker({ position: center, map: map });
	}, [center, zoom]);

	return (
		<MapContainer
			ref={mapRef}
			className={`${props.className}`}
			style={props.style}
		></MapContainer>
	);
};

export default Map;
