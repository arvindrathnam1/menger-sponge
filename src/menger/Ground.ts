import { Mat3, Mat4, Vec3, Vec4 } from "../lib/TSM.js";

export class Ground {

    positions_flat: Float32Array;
    indices_flat: Uint32Array;
    normals_flat: Float32Array;

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

    public positionsFlat(): Float32Array {
        return this.positions_flat;
    }

    public indicesFlat(): Uint32Array {
        return this.indices_flat;
    }

    public normalsFlat(): Float32Array {
        return this.normals_flat;
    }

    public uMatrix(): Mat4 {
        // TODO: change this, if it's useful
        const ret : Mat4 = new Mat4().setIdentity();

        return ret;    
    }
}