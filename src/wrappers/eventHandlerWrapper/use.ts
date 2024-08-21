import { Globe, LonLat, Vec3 } from '@openglobus/og';
import { MouseHandlerEvent } from '@openglobus/og/lib/js/input/MouseHandler';

function generateClickForLonLat(globe: Globe, lon: number, lat: number): void {
  // Create a LonLat object
  const lonlat = new LonLat(lon, lat);

  // Convert LonLat to cartesian coordinates
  const cartesian = Vec3.fromLonLat(lonlat);

  // Get the current camera position
  const cam = globe.camera;

  // Create a ray from the camera to the lon/lat point
  const ray = cam.frustum.rayFromWindow(globe.renderer.handler.getCenter());

  // Intersect the ray with the globe
  const intersection = globe.terrain.rayIntersect(ray);

  if (intersection) {
    // Create a mock event object
    const mockEvent = new MouseEvent('click', {
      clientX: globe.renderer.handler.getCenter().x,
      clientY: globe.renderer.handler.getCenter().y,
    });

    globe.planet.events.registerNames();
    // Call the click handler
    globe.planet.events.dispatch({ handlers: [() => {}], active: true }, mockEvent, intersection);
  } else {
    console.log('No intersection found for the given coordinates.');
  }
}

// Usage example:
// Assuming 'globe' is your OpenGlobus instance
// generateClickForLonLat(globe, longitude, latitude);
