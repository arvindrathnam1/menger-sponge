import { Mat4 } from "../lib/TSM.js";
export class Ground {
    constructor() {
        this.positions_flat = new Float32Array([
            -1000.0, -2.0, 0.0, 1.0,
            0.0, -2.0, 1000.0, 1.0,
            1000.0, -2.0, 0.0, 1.0,
            0.0, -2.0, -1000.0, 1.0
        ]);
        this.indices_flat = new Uint32Array([
            0, 1, 2,
            0, 2, 3
        ]);
        this.normals_flat = new Float32Array([
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0
        ]);
    }
    positionsFlat() {
        return this.positions_flat;
    }
    indicesFlat() {
        return this.indices_flat;
    }
    normalsFlat() {
        return this.normals_flat;
    }
    uMatrix() {
        // TODO: change this, if it's useful
        const ret = new Mat4().setIdentity();
        return ret;
    }
}
//# sourceMappingURL=Ground.js.map