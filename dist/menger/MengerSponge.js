import { Mat4 } from "../lib/TSM.js";
/**
 * Represents a Menger Sponge
 */
export class MengerSponge {
    constructor(level) {
        this.setLevel(level);
        // TODO: other initialization	
        var min = -0.5;
        this.side_length = 1;
        /*
        this.positions_flat = new Float32Array([
          1.0, 0.0, 0.0, 1.0,
          -1.0, 0.0, 0.0, 1.0,
          0.0, 1.0, 0.0, 1.0
        ]);
        */
        this.positions_flat = new Float32Array([
            //front face
            min, min, min, 1.0,
            min, min + 1, min, 1.0,
            min + 1, min, min, 1.0,
            min, min + 1, min, 1.0,
            min + 1, min, min, 1.0,
            min + 1, min + 1, min, 1.0,
            //back face
            min, min, min + 1, 1.0,
            min, min + 1, min + 1, 1.0,
            min + 1, min, min + 1, 1.0,
            min, min + 1, min + 1, 1.0,
            min + 1, min, min + 1, 1.0,
            min + 1, min + 1, min + 1, 1.0,
            // right face      
            min, min, min, 1.0,
            min, min + 1, min, 1.0,
            min, min, min + 1, 1.0,
            min, min + 1, min, 1.0,
            min, min, min + 1, 1.0,
            min, min + 1, min + 1, 1.0,
            //left face
            min + 1, min, min, 1.0,
            min + 1, min + 1, min, 1.0,
            min + 1, min, min + 1, 1.0,
            min + 1, min + 1, min, 1.0,
            min + 1, min, min + 1, 1.0,
            min + 1, min + 1, min + 1, 1.0,
            //top face
            min, min + 1, min, 1.0,
            min + 1, min + 1, min, 1.0,
            min, min + 1, min + 1, 1.0,
            min + 1, min + 1, min, 1.0,
            min, min + 1, min + 1, 1.0,
            min + 1, min + 1, min + 1, 1.0,
            //bottom face
            min, min, min, 1.0,
            min + 1, min, min, 1.0,
            min, min, min + 1, 1.0,
            min + 1, min, min, 1.0,
            min, min, min + 1, 1.0,
            min + 1, min, min + 1, 1.0, //6
        ]);
        // this.indices_flat = new Uint32Array([0, 1, 2]);
        this.indices_flat = new Uint32Array([
            //front face
            0, 1, 2,
            3, 5, 4,
            //back face
            7, 6, 8,
            11, 9, 10,
            //left face
            13, 12, 14,
            17, 15, 16,
            //right face
            19, 20, 18,
            23, 22, 21,
            //top face
            25, 24, 26,
            29, 27, 28,
            //bottom face
            30, 31, 32,
            33, 35, 34
        ]);
        //this.normals_flat = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0]);
        this.normals_flat = new Float32Array([
            // front face
            0.0, 0.0, -1.0, 0.0,
            0.0, 0.0, -1.0, 0.0,
            0.0, 0.0, -1.0, 0.0,
            0.0, 0.0, -1.0, 0.0,
            0.0, 0.0, -1.0, 0.0,
            0.0, 0.0, -1.0, 0.0,
            //back face
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            // left face
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            // right face
            1.0, 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 0.0,
            //top face
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            //bottom face
            0.0, -1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0,
        ]);
    }
    /**
     * Returns true if the sponge has changed.
     */
    isDirty() {
        // return true;
        return this.dirty;
    }
    setClean() {
        this.dirty = false;
    }
    setDirty() {
        this.dirty = true;
    }
    setLevel(level) {
        this.L = level;
        this.setDirty();
        // TODO: initialize the cube
    }
    // goes in order of positions, normals, indices
    // can put these into class variables? 
    // calls only when dirty -> starter already handles that and sets clean after i think?
    // public recursiveCubes(side_length: number): void{
    //   side_length = side_length/3;
    // }
    /* Returns a flat Float32Array of the sponge's vertex positions */
    positionsFlat() {
        // TODO: right now this makes a single triangle. Make the cube fractal instead.
        if (this.isDirty()) {
            for (let i = 2; i <= this.L; i++) {
                this.side_length = this.side_length / 3;
                //use push instead of concat 
            }
            //recompute this.positions_flat;
        }
        return this.positions_flat;
    }
    /**
     * Returns a flat Uint32Array of the sponge's face indices
     */
    indicesFlat() {
        // TODO: right now this makes a single triangle. Make the cube fractal instead.
        if (this.isDirty()) {
            //recompute this.indices_flat;
        }
        return this.indices_flat;
    }
    /**
     * Returns a flat Float32Array of the sponge's normals
     */
    normalsFlat() {
        // TODO: right now this makes a single triangle. Make the cube fractal instead.
        if (this.isDirty()) {
            //recompute this.normals_flat;
        }
        return this.normals_flat;
    }
    /**
     * Returns the model matrix of the sponge
     */
    uMatrix() {
        // TODO: change this, if it's useful
        const ret = new Mat4().setIdentity();
        return ret;
    }
}
//# sourceMappingURL=MengerSponge.js.map