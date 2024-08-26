// LayoutManager.ts

import { CanvasManager, ChannelType, ConfigData } from 'js/canvasManager';
import { InteractionMode } from '../panelElement/panelElement';
import { Alignment } from "../aspectRatioElement/aspectRatioInteractiveTypes";
import { VideoProxyOptions } from './proxySerializationUtils';

export enum Layout {
  DayFullHeatQuarter,
  HeatFullDayQuarter,
  DayFull,
  HeatFull,
}

export interface LayoutConfig {
  [key: string]: VideoProxyOptions;
}

export class LayoutManager {
  private layouts: Map<Layout, LayoutConfig> = new Map();
  private currentLayout: Layout = Layout.DayFullHeatQuarter;

  constructor(private canvasManager: CanvasManager) {}

  async initialize(): Promise<void> {
    await this.initializeLayouts();
  }

  private async initializeLayouts(): Promise<void> {
    const dayConfig = await this.canvasManager.getDayConfig();
    const heatConfig = await this.canvasManager.getHeatConfig();
    const dayAspect = dayConfig.codedWidth / dayConfig.codedHeight;
    const heatAspect = heatConfig.codedWidth / heatConfig.codedHeight;

    const pipHeatWidth = 0.8;
    const pipHeatHeight = 0.8;
    const pipDayWidth = 0.6;
    const pipDayHeight = 0.6;

    this.layouts.set(Layout.DayFullHeatQuarter, {
      day: {
        ndcX: -1.0, ndcY: 1.0, ndcWidth: 2.0, ndcHeight: 2.0,
        mode: InteractionMode.Fixed, zIndex: 0, aspectRatio: dayAspect,
        align: Alignment.Center, debug: false,
      },
      heat: {
        ndcX: 1.0 - pipHeatWidth, ndcY: pipHeatHeight / 2, ndcWidth: pipHeatWidth, ndcHeight: pipHeatHeight,
        mode: InteractionMode.Fixed, zIndex: 1, aspectRatio: heatAspect,
        align: Alignment.Right, debug: false,
      }
    });

    this.layouts.set(Layout.HeatFullDayQuarter, {
      heat: {
        ndcX: -1.0, ndcY: 1.0, ndcWidth: 2.0, ndcHeight: 2.0,
        mode: InteractionMode.Fixed, zIndex: 0, aspectRatio: heatAspect,
        align: Alignment.Left, debug: false,
      },
      day: {
        ndcX: 1.0 - pipDayWidth, ndcY: 1.0, ndcWidth: pipDayWidth, ndcHeight: pipDayHeight,
        mode: InteractionMode.Fixed, zIndex: 1, aspectRatio: dayAspect,
        align: Alignment.TopRight, debug: false,
      }
    });

    this.layouts.set(Layout.DayFull, {
      day: {
        ndcX: -1.0, ndcY: 1.0, ndcWidth: 2.0, ndcHeight: 2.0,
        mode: InteractionMode.Fixed, zIndex: 0, aspectRatio: dayAspect,
        align: Alignment.Center, debug: false,
      }
    });

    this.layouts.set(Layout.HeatFull, {
      heat: {
        ndcX: -1.0, ndcY: 1.0, ndcWidth: 2.0, ndcHeight: 2.0,
        mode: InteractionMode.Fixed, zIndex: 0, aspectRatio: heatAspect,
        align: Alignment.Center, debug: false,
      }
    });
  }

  setLayout(layout: Layout): LayoutConfig {
    this.currentLayout = layout;
    return this.layouts.get(layout)!;
  }

  getCurrentLayout(): Layout {
    return this.currentLayout;
  }

  nextLayout(): LayoutConfig {
    const layouts = Array.from(this.layouts.keys());
    const currentIndex = layouts.indexOf(this.currentLayout);
    const nextIndex = (currentIndex + 1) % layouts.length;
    return this.setLayout(layouts[nextIndex]);
  }

  previousLayout(): LayoutConfig {
    const layouts = Array.from(this.layouts.keys());
    const currentIndex = layouts.indexOf(this.currentLayout);
    const previousIndex = (currentIndex - 1 + layouts.length) % layouts.length;
    return this.setLayout(layouts[previousIndex]);
  }

  getChannelType(name: string): ChannelType {
    return name.toLowerCase().includes('heat') ? ChannelType.HEAT : ChannelType.DAY;
  }

  convertToQuadConfig(proxyConfig: VideoProxyOptions): any {
    return {
      x: proxyConfig.ndcX,
      y: proxyConfig.ndcY,
      width: proxyConfig.ndcWidth * 2,
      height: proxyConfig.ndcHeight * 2,
      zIndex: proxyConfig.zIndex,
      meta: {}
    };
  }

  getLayoutNames(): string[] {
    return Object.keys(Layout).filter(key => isNaN(Number(key)));
  }

  getLayoutByName(name: string): Layout | undefined {
    return Layout[name as keyof typeof Layout];
  }

  addCustomLayout(name: string, config: LayoutConfig): void {
    const newLayoutIndex = Object.keys(Layout).length / 2;
    (Layout as any)[name] = newLayoutIndex;
    (Layout as any)[newLayoutIndex] = name;
    this.layouts.set(newLayoutIndex as Layout, config);
  }

  removeLayout(layout: Layout): boolean {
    return this.layouts.delete(layout);
  }

  updateLayoutConfig(layout: Layout, newConfig: LayoutConfig): void {
    if (this.layouts.has(layout)) {
      this.layouts.set(layout, newConfig);
    } else {
      throw new Error(`Layout ${Layout[layout]} does not exist.`);
    }
  }
}
