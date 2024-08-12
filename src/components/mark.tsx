import React, { useCallback, useEffect, useState } from 'react';
import { GlobeContextProps, Vector } from '@openglobus/openglobus-react';
import { Entity, Billboard, Geometry, useGlobeContext } from '@openglobus/openglobus-react';
import { useMarkerStore } from '../store/markers.ts';
import { Vec3, LonLat } from '@openglobus/og';

const calculateNorthVector = (cartesianPoint: Vec3, ellipsoid: any): Vec3 => {
  const { x, y, z } = cartesianPoint;
  const a = ellipsoid._a;
  const b = ellipsoid._b;
  const e2 = (a * a - b * b) / (a * a);

  const p = Math.sqrt(x * x + y * y);
  const θ = Math.atan2(p, z);
  const φ = Math.atan2(z + e2 * b * Math.pow(Math.sin(θ), 3), p - e2 * a * Math.pow(Math.cos(θ), 3));

  const cosφ = Math.cos(φ);
  const sinφ = Math.sin(φ);
  const λ = Math.atan2(y, x);
  const cosλ = Math.cos(λ);
  const sinλ = Math.sin(λ);

  return new Vec3(-sinφ * cosλ, -sinφ * sinλ, cosφ).normalize();
};

const calculateEndPoint = (context: GlobeContextProps, startPoint: LonLat, direction: number, length: number): LonLat => {
  // Convert start point to cartesian coordinates
  const globe = context.globe;
  if (globe === null) {
    throw new Error('globe must be a globe');
  }
  const startCartesian = globe.planet.ellipsoid.lonLatToCartesian(startPoint);

  // Calculate direction vector in ECEF coordinates
  const northVector = calculateNorthVector(startCartesian, globe.planet.ellipsoid);
  const eastVector = northVector.cross(new Vec3(0, 0, 1)).normalize();
  const directionVector = eastVector.scale(Math.cos(direction)).add(northVector.scale(Math.sin(direction)));

  // Scale the direction vector by the length
  const displacement = directionVector.scale(length);

  // Add the displacement to the start point
  const endCartesian = startCartesian.add(displacement);

  // Convert end point back to LonLat
  return globe.planet.ellipsoid.cartesianToLonLat(endCartesian);
};

const LineMarker = () => {
  const selfMarker = useMarkerStore((state) => state.selfMarker);
  const { globe } = useGlobeContext();
  const [endPoint, setEndPoint] = useState<LonLat>();
  const [direction, setDirection] = useState(Math.PI / 4);
  const [rerenderKey, setRerenderKey] = useState(0);

  const updateEndPoint = useCallback(() => {
    if (globe && selfMarker) {
      const newEndPoint = calculateEndPoint(
        { globe },
        { lon: selfMarker.coords.lon, lat: selfMarker.coords.lat, height: selfMarker.coords.alt },
        direction,
        100000,
      );
      setEndPoint(newEndPoint);
      // Trigger a rerender by updating the key
      setRerenderKey((prev) => prev + 1);
    }
  }, [globe, selfMarker, direction]);

  useEffect(() => {
    updateEndPoint();
  }, [updateEndPoint]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDirection((prev) => prev + Math.PI / 4);
      updateEndPoint();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [updateEndPoint]);

  return (
    <Vector name={'Test name'} key={rerenderKey}>
      <Entity
        name="Self Marker"
        geometry={{ type: 'POINT', coordinates: [selfMarker.coords.lon, selfMarker.coords.lat, selfMarker.coords.alt] }}
        lon={selfMarker.coords.lon}
        lat={selfMarker.coords.lat}
        alt={selfMarker.coords.alt}
        properties={{ color: '#000002' }}
      >
        <Billboard size={[60, 60]} src={'src/assets/point2.svg'} color={'#000002'} />
      </Entity>
      {endPoint && (
        <Entity name="line" lon={selfMarker.coords.lon} lat={selfMarker.coords.lat} alt={selfMarker.coords.alt}>
          <Geometry
            lineColor={'rgba(59, 6, 6, 1)'} // RGB values for #000002 with alpha
            lineWidth={5}
            type={'LINESTRING'}
            coordinates={[
              [selfMarker.coords.lon, selfMarker.coords.lat, selfMarker.coords.alt],
              [endPoint.lon, endPoint.lat, endPoint.height || 0],
            ]}
            visibility={true}
          />
        </Entity>
      )}
    </Vector>
  );
};

export default LineMarker;
