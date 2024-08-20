import { VideoProxyElement } from 'ts/components/lit/videoProxyElement/videoProxyElement';
import { Alignment } from "ts/components/lit/aspectRatioElement/aspectRatioInteractiveTypes";
import { Signal } from '@preact/signals-core';

export interface VideoProxyOptions {
  ndcX: number;
  ndcY: number;
  ndcWidth: number;
  ndcHeight: number;
  mode: string;
  debug: boolean;
  zIndex: number;
  aspectRatio: number | string;
  align: Alignment;
}

export interface ProxiesConfig {
  proxies: { [key: string]: VideoProxyOptions };
  metadata: { [key: string]: any };
}

export function serializeProxies(
  videoProxies: Signal<Map<string, VideoProxyElement>> | Map<string, VideoProxyElement>,
  metadata: Signal<{ [key: string]: any }> | { [key: string]: any } = {}
): string {
  const proxiesConfig: ProxiesConfig = {
    proxies: {},
    metadata: metadata instanceof Signal ? metadata.value : metadata
  };

  const proxiesMap = videoProxies instanceof Signal ? videoProxies.value : videoProxies;

  proxiesMap.forEach((proxy, name) => {
    const videoPosition = proxy.videoPosition.value;
    const panelPosition = proxy.panelPosition.value;
    const interaction = proxy.interaction.value;

    proxiesConfig.proxies[name] = {
      ndcX: panelPosition ? panelPosition.position.x : proxy.ndcX,
      ndcY: panelPosition ? panelPosition.position.y : proxy.ndcY,
      ndcWidth: panelPosition ? panelPosition.size.width : proxy.ndcWidth,
      ndcHeight: panelPosition ? panelPosition.size.height : proxy.ndcHeight,
      mode: proxy.mode,
      debug: proxy.debug,
      zIndex: proxy.zIndex,
      aspectRatio: proxy.aspectRatio,
      align: proxy.align
    };
  });

  return JSON.stringify(proxiesConfig);
}

export function deserializeProxies(json: string): ProxiesConfig {
  try {
    const config: ProxiesConfig = JSON.parse(json);
    return config;
  } catch (error) {
    console.error('Error deserializing proxies:', error);
    throw new Error('Failed to deserialize proxies configuration');
  }
}

export interface SVGFriendlyPanel {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export function extractSVGFriendlyPanels(serializedProxies: string): SVGFriendlyPanel[] {
  const config: ProxiesConfig = JSON.parse(serializedProxies);
  const panels: SVGFriendlyPanel[] = [];

  for (const [_, proxyOptions] of Object.entries(config.proxies)) {
    // Convert NDC coordinates to SVG coordinates (0 to 100 range)
    const x = ((proxyOptions.ndcX + 1) / 2) * 100;
    const y = ((1 - proxyOptions.ndcY) / 2) * 100; // Flip Y-axis
    const width = (proxyOptions.ndcWidth / 2) * 100;
    const height = (proxyOptions.ndcHeight / 2) * 100;
    const zIndex = proxyOptions.zIndex;

    panels.push({ x, y, width, height, zIndex });
  }

  return panels;
}