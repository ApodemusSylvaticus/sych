import {XYZ, IXYZParams} from "@openglobus/og";
import {Segment} from "@openglobus/og/lib/js/segment/Segment";
import {stringTemplate} from "@openglobus/og/lib/js/utils/shared";

export class OsmLayer extends XYZ {
    constructor() {
        const name = "OSMLayer";
        super(name, {
            iconSrc: "https://tile.openstreetmap.org/8/138/95.png",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: 'Data @ OpenStreetMap contributors, ODbL',
            isBaseLayer: true,
            visibility: false,
            maxNativeZoom: 19,
            defaultTextures: [{color: "#AAD3DF"}, {color: "#F2EFE9"}],
            isSRGB: false,
            shininess: 18,
            specular: [0.00063, 0.00055, 0.00032],
            ambient: [0.2, 0.2, 0.3],
            diffuse: [0.9, 0.9, 0.7],
            urlRewrite: (s: Segment, u: string) => {
                //  NOTE: You can fetch targets here. For example, if
                //        "z" is larger than 8 issue fetch and add targets.
                //        A layer for the targets can be passed via constructor
                //        and a reference to it can be stored as an instance member.
                //        Hit https://sych.app/api/targets/targets-by-tile in your brouser for details
                //
                //  console.log(s.tileX, s.tileY, s.tileZoom);
                return stringTemplate(u, {
                    's': this._getSubdomain(),
                    'x': s.tileX,
                    'y': s.tileY,
                    'z': s.tileZoom
                });
            },
        });
    }
}
