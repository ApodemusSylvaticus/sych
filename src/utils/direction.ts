import { LonLat, Vec3 } from '@openglobus/og';
import { GlobeContextProps } from '@openglobus/openglobus-react';
import { ICoord } from '../store/markers.ts';

// Earth's radius in kilometers
const EARTH_RADIUS = 6371;

// Function to convert degrees to radians
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Function to convert radians to degrees
const toDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

// Function to calculate the intermediate point
export const calculateIntermediatePoint = (start: ICoord, end: ICoord, distance: number): ICoord => {
  const lat1 = toRadians(start.lat);
  const lon1 = toRadians(start.lon);
  const lat2 = toRadians(end.lat);
  const lon2 = toRadians(end.lon);
  // distance in km
  const d = distance / EARTH_RADIUS; // Angular distance in radians

  // Calculate bearing
  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  const bearing = Math.atan2(y, x);

  // Calculate intermediate point
  const lat3 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(bearing));
  const lon3 = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat3));

  return {
    lon: toDegrees(lon3),
    lat: toDegrees(lat3),
    alt: (start.alt || 0) + ((end.alt || 0) - (start.alt || 0)) * (distance / getDistance(start, end)),
  };
};

// Function to calculate distance between two points
const getDistance = (start: ICoord, end: ICoord): number => {
  const lat1 = toRadians(start.lat);
  const lon1 = toRadians(start.lon);
  const lat2 = toRadians(end.lat);
  const lon2 = toRadians(end.lon);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c; // Distance in km
};

// /////////////////////
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

export const calculateEndPoint = (context: GlobeContextProps, startPoint: LonLat, direction: number, length: number): LonLat => {
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
// /////////////////////
