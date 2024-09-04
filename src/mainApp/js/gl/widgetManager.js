'use strict';

import {VideoFrameRect} from './videoFrameRect.js';
import {VideoShader} from './videoShader.js';

/**
 * Manages the collection of widgets, handling their creation, updating, and rendering.
 */
export class WidgetManager {
    /**
     * Creates a WidgetManager.
     * @param {WebGL2RenderingContext} gl - The WebGL rendering context.
     */
    constructor(gl) {
        this.gl = gl;
        this.widgetMap = new Map(); // Hash map for quick access by name
        this.widgetArray = []; // Sorted array for efficient rendering
    }

    /**
     * Adds a new VideoFrameRect widget to the manager.
     * @param {string} name - The unique name for the widget.
     * @param {VideoShader} shaderProgram - The ShaderProgram object for the widget.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {number} width - The width of the widget.
     * @param {number} height - The height of the widget.
     * @param {number} [zLevel=0] - The z-level of the widget.
     * @returns {VideoFrameRect} The newly created widget.
     * @throws {Error} If a widget with the given name already exists.
     */
    addVideoRect(name, shaderProgram, x, y, width, height, zLevel = 0) {
        if (this.widgetMap.has(name)) {
            throw new Error(`Widget with name '${name}' already exists.`);
        }

        const newWidget = new VideoFrameRect(this.gl, shaderProgram, x, y, width, height);
        newWidget.name = name;
        newWidget.z = zLevel;

        this.widgetMap.set(name, newWidget);
        this.widgetArray.push(newWidget);
        this.sortWidgetsByZLevel();

        return newWidget;
    }

    /**
     * Retrieves a widget by its name.
     * @param {string} name - The name of the widget to retrieve.
     * @returns {Widget|undefined} The widget with the given name, or undefined if not found.
     */
    getWidget(name) {
        return this.widgetMap.get(name);
    }

    /**
     * Updates multiple properties of a widget in a single call.
     * @param {string} name - The name of the widget to update.
     * @param {Object} properties - An object containing the properties to update.
     * @param {number} [properties.x] - The new x coordinate.
     * @param {number} [properties.y] - The new y coordinate.
     * @param {number} [properties.width] - The new width.
     * @param {number} [properties.height] - The new height.
     * @param {number} [properties.zLevel] - The new z-level.
     * @throws {Error} If the widget is not found.
     */
    updateWidget(name, properties) {
        const widget = this.widgetMap.get(name);
        if (!widget) {
            throw new Error(`Widget with name '${name}' not found.`);
        }

        let needsSort = false;

        if ('x' in properties || 'y' in properties) {
            widget.move(properties.x ?? widget.x, properties.y ?? widget.y);
        }

        if ('width' in properties || 'height' in properties) {
            widget.resize(properties.width ?? widget.width, properties.height ?? widget.height);
        }

        if ('zLevel' in properties) {
            widget.z = properties.zLevel;
            needsSort = true;
        }

        if (needsSort) {
            this.sortWidgetsByZLevel();
        }
    }

    /**
     * Sorts widgets by their z-level.
     */
    sortWidgetsByZLevel() {
        this.widgetArray.sort((a, b) => a.z - b.z);
    }

    /**
     * Deletes a widget.
     * @param {string} name - The name of the widget to delete.
     */
    delete(name) {
        const widget = this.widgetMap.get(name);
        if (widget) {
            widget.delete();
            this.widgetMap.delete(name);
            const index = this.widgetArray.indexOf(widget);
            if (index !== -1) {
                this.widgetArray.splice(index, 1);
            }
        }
    }

    /**
     * Deletes all widgets.
     */
    deleteAll() {
        this.widgetArray.forEach(widget => widget.delete());
        this.widgetMap.clear();
        this.widgetArray = [];
    }

    /**
     * Cleans up resources and deletes all widgets.
     */
    destructor() {
        this.deleteAll();
        // Additional cleanup if necessary
        this.gl = null;
    }

    /**
     * Renders all widgets.
     */
    render() {
        this.widgetArray.forEach(widget => widget.render());
    }
}