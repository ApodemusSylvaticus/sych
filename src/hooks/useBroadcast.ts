import { useEffect } from 'react';

export const useBroadcast = () => {
  useEffect(() => {
    const channel = new BroadcastChannel('deviceState');
    if (channel.onmessage) {
      channel.onmessage((event, ...rest) => {
        console.log('BroadcastChannel event', event);
        console.log('BroadcastChannel rest', rest);
      });
    }

    // lrfSignal => for targets
    // gpsSignal => self target
  }, []);
};
