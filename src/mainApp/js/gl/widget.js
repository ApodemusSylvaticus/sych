'use strict';

/**
 * Represents a basic widget with a position, size, and z-level.
 * It serves as a base class for more specific types of widgets.
 */
export class Widget {
    /**
     * @type {Float32Array} Internal storage for position [x, y].
     * @private
     */
    #position;

    /**
     * @type {Float32Array} Internal storage for size [width, height].
     * @private
     */
    #size;

    /**
     * @type {number} Internal storage for z-level.
     * @private
     */
    #z;

    /**
     * @type {Float32Array} Internal storage for bounding box [x, y, width, height].
     * @private
     */
    #bbox;

    /**
     * Creates a widget.
     * @param {number} x - The x coordinate of the widget.
     * @param {number} y - The y coordinate of the widget.
     * @param {number} width - The width of the widget.
     * @param {number} height - The height of the widget.
     * @throws {TypeError} If an instance of the base class Widget is directly created.
     */
    constructor(x, y, width, height) {
        if (new.target === Widget) {
            throw new TypeError("Cannot construct instances of abstract class Widget.");
        }

        this.#position = new Float32Array([x, y]);
        this.#size = new Float32Array([width, height]);
        this.#z = 0;
        this.#bbox = new Float32Array(4);
        this._updateBBox();
    }

    /**
     * Gets the bounding box of the widget.
     * @returns {Float32Array} The bounding box as a typed array.
     */
    get bbox() {
        return this.#bbox;
    }

    /**
     * Gets or sets the z-level of the widget.
     */
    get z() {
        return this.#z;
    }

    set z(newZ) {
        this.#z = newZ;
    }

    /**
     * Gets or sets the x-coordinate of the widget's position.
     */
    get x() {
        return this.#position[0];
    }

    set x(newX) {
        this.#position[0] = newX;
        this._updateBBox();
    }

    /**
     * Gets or sets the y-coordinate of the widget's position.
     */
    get y() {
        return this.#position[1];
    }

    set y(newY) {
        this.#position[1] = newY;
        this._updateBBox();
    }

    /**
     * Gets or sets the width of the widget.
     */
    get width() {
        return this.#size[0];
    }

    set width(newWidth) {
        this.#size[0] = newWidth;
        this._updateBBox();
    }

    /**
     * Gets or sets the height of the widget.
     */
    get height() {
        return this.#size[1];
    }

    set height(newHeight) {
        this.#size[1] = newHeight;
        this._updateBBox();
    }

    /**
     * Moves the widget to a new position.
     * @param {number} newX - The new x coordinate.
     * @param {number} newY - The new y coordinate.
     */
    move(newX, newY) {
        this.x = newX;
        this.y = newY;
    }

    /**
     * Resizes the widget to a new size.
     * @param {number} newWidth - The new width.
     * @param {number} newHeight - The new height.
     */
    resize(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
    }

    /**
     * Abstract method to render the widget.
     * @throws {Error} If the method is not implemented by the subclass.
     */
    render() {
        throw new Error("Method 'render()' must be implemented by subclasses.");
    }

    /**
     * Abstract method to delete the widget.
     * @throws {Error} If the method is not implemented by the subclass.
     */
    delete() {
        throw new Error("Method 'delete()' must be implemented by subclasses.");
    }

    /**
     * Updates the bounding box based on the current position and size.
     * @private
     */
    _updateBBox() {
        this.#bbox.set([...this.#position, ...this.#size]);
    }
}
