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
        this.widgets = [];
    }

    /**
     * Adds a new VideoFrameRect widget to the manager.
     * @param {VideoShader} shaderProgram - The ShaderProgram object for the widget.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {number} width - The width of the widget.
     * @param {number} height - The height of the widget.
     * @returns {VideoFrameRect} The newly created widget.
     */
    addVideoRect(shaderProgram, x, y, width, height) {
        const newWidget = new VideoFrameRect(this.gl, shaderProgram, x, y, width, height);
        this.widgets.push(newWidget);
        return newWidget;
    }

    /**
     * Moves a widget to a new position.
     * @param {Widget} widget - The widget to move.
     * @param {number} x - The new x coordinate.
     * @param {number} y - The new y coordinate.
     */
    move(widget, x, y) {
        const index = this.widgets.indexOf(widget);
        if (index !== -1) {
            this.widgets[index].move(x, y);
        }
    }

    /**
     * Resizes a widget.
     * @param {Widget} widget - The widget to resize.
     * @param {number} width - The new width.
     * @param {number} height - The new height.
     */
    resize(widget, width, height) {
        const index = this.widgets.indexOf(widget);
        if (index !== -1) {
            this.widgets[index].resize(width, height);
        }
    }

    /**
     * Sets the z-level for a widget.
     * @param {Widget} widget - The widget to set the z-level for.
     * @param {number} newZLevel - The new z-level.
     */
    setZLevel(widget, newZLevel) {
        const index = this.widgets.indexOf(widget);
        if (index !== -1) {
            this.widgets[index].z = newZLevel;
            this.sortWidgetsByZLevel();
        }
    }

    /**
     * Sorts widgets by their z-level.
     */
    sortWidgetsByZLevel() {
        this.widgets.sort((a, b) => a.z - b.z);
    }

    /**
     * Deletes a widget.
     * @param {Widget} widget - The widget to delete.
     */
    delete(widget) {
        const index = this.widgets.indexOf(widget);
        if (index !== -1) {
            this.widgets[index].delete();
            this.widgets.splice(index, 1);
        }
    }

    /**
     * Deletes all widgets.
     */
    delete_all() {
        this.widgets.forEach(widget => widget.delete());
        this.widgets = [];
    }

    /**
     * Deletes all widgets.
     */
    destructor() {
        this.widgets.forEach(widget => widget.delete());
        this.widgets = [];
    }

    /**
     * Renders all widgets.
     */
    render() {
        this.widgets.forEach(widget => widget.render());
    }
}
