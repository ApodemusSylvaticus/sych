import { JonGUIState } from '../proto/jon/jon_shared_data.ts';
import { useSignalEffect } from '@preact/signals-react';
import { useDeviceStore } from '../store';

export const useDeviceStateDispatch = (channelName: string = 'deviceState') => {
  const channel = new BroadcastChannel(channelName);
  const updateState = useDeviceStore((state) => state.updateState);

  const handleBroadcastMessage = (event: MessageEvent) => {
    try {
      const binaryData: Uint8Array = new Uint8Array(event.data);
      const deserializedData: JonGUIState = JonGUIState.decode(binaryData);
      console.log('deserializedData', deserializedData);
      updateState(deserializedData);
    } catch (error: any) {
      console.error('Error deserializing JonGUIState:', error);
    }
  };

  useSignalEffect(() => {
    channel.onmessage = handleBroadcastMessage;
    return () => {
      channel.close();
    };
  });
};
