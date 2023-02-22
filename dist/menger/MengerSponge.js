import { Mat4 } from "../lib/TSM.js";
class Cube {
    constructor(x, y, z, side) {
        this.minx = x;
        this.miny = y;
        this.minz = z;
        this.length = side;
    }
}
/**
 * Represents a Menger Sponge
 */
export class MengerSponge {
    constructor(level) {
        this.cubes = [];
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
        // 36 per cube
        this.indices_flat = new Uint32Array([
            //front face
            0, 1, 2,
            3, 5, 4,
            //back face
            7, 6, 8,
            11, 9, 10,
            //right face
            13, 12, 14,
            17, 15, 16,
            //left face
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
            // right face
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            // left face
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
    makeCube(startX, startY, startZ, side_length) {
        // public makeCube(startX: number, startY: number, startZ: number, side_length: number, position_list: number[], indices_list: number[], normals_list: number[]): void{
        // position_list: Float32Array;
        let position_list = new Float32Array([
            //front face
            startX, startY, startZ, 1.0,
            startX, startY + side_length, startZ, 1.0,
            startX + side_length, startY, startZ, 1.0,
            startX, startY + side_length, startZ, 1.0,
            startX + side_length, startY, startZ, 1.0,
            startX + side_length, startY + side_length, startZ, 1.0,
            //back face
            startX, startY, startZ + side_length, 1.0,
            startX, startY + side_length, startZ + side_length, 1.0,
            startX + side_length, startY, startZ + side_length, 1.0,
            startX, startY + side_length, startZ + side_length, 1.0,
            startX + side_length, startY, startZ + side_length, 1.0,
            startX + side_length, startY + side_length, startZ + side_length, 1.0,
            // right face      
            startX, startY, startZ, 1.0,
            startX, startY + side_length, startZ, 1.0,
            startX, startY, startZ + side_length, 1.0,
            startX, startY + side_length, startZ, 1.0,
            startX, startY, startZ + side_length, 1.0,
            startX, startY + side_length, startZ + side_length, 1.0,
            //left face
            startX + side_length, startY, startZ, 1.0,
            startX + side_length, startY + side_length, startZ, 1.0,
            startX + side_length, startY, startZ + side_length, 1.0,
            startX + side_length, startY + side_length, startZ, 1.0,
            startX + side_length, startY, startZ + side_length, 1.0,
            startX + side_length, startY + side_length, startZ + side_length, 1.0,
            //top face
            startX, startY + side_length, startZ, 1.0,
            startX + side_length, startY + side_length, startZ, 1.0,
            startX, startY + side_length, startZ + side_length, 1.0,
            startX + side_length, startY + side_length, startZ, 1.0,
            startX, startY + side_length, startZ + side_length, 1.0,
            startX + side_length, startY + side_length, startZ + side_length, 1.0,
            //bottom face
            startX, startY, startZ, 1.0,
            startX + side_length, startY, startZ, 1.0,
            startX, startY, startZ + side_length, 1.0,
            startX + side_length, startY, startZ, 1.0,
            startX, startY, startZ + side_length, 1.0,
            startX + side_length, startY, startZ + side_length, 1.0, //6
        ]);
        let positions_joined = new Float32Array(this.positions_flat.length + position_list.length);
        positions_joined.set(this.positions_flat);
        positions_joined.set(position_list, this.positions_flat.length);
        this.positions_flat = positions_joined;
        let indices_list = new Uint32Array([
            //front face
            this.indices_flat.length, this.indices_flat.length + 1, this.indices_flat.length + 2,
            this.indices_flat.length + 3, this.indices_flat.length + 5, this.indices_flat.length + 4,
            //back face
            this.indices_flat.length + 7, this.indices_flat.length + 6, this.indices_flat.length + 8,
            this.indices_flat.length + 11, this.indices_flat.length + 9, this.indices_flat.length + 10,
            //right face
            this.indices_flat.length + 13, this.indices_flat.length + 12, this.indices_flat.length + 14,
            this.indices_flat.length + 17, this.indices_flat.length + 15, this.indices_flat.length + 16,
            //left face
            this.indices_flat.length + 19, this.indices_flat.length + 20, this.indices_flat.length + 18,
            this.indices_flat.length + 23, this.indices_flat.length + 22, this.indices_flat.length + 21,
            //top face
            this.indices_flat.length + 25, this.indices_flat.length + 24, this.indices_flat.length + 26,
            this.indices_flat.length + 29, this.indices_flat.length + 27, this.indices_flat.length + 28,
            //bottom face
            this.indices_flat.length + 30, this.indices_flat.length + 31, this.indices_flat.length + 32,
            this.indices_flat.length + 33, this.indices_flat.length + 35, this.indices_flat.length + 34
        ]);
        let indices_joined = new Uint32Array(this.indices_flat.length + indices_list.length);
        indices_joined.set(this.indices_flat);
        indices_joined.set(indices_list, this.indices_flat.length);
        this.indices_flat = indices_joined;
        let normals_list = new Float32Array([
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
            // right face
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            // left face
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
        let normals_joined = new Float32Array(this.normals_flat.length + normals_list.length);
        normals_joined.set(this.normals_flat);
        normals_joined.set(normals_list, this.normals_flat.length);
        this.normals_flat = normals_joined;
    }
    recursiveCubes(minx, miny, minz, side_length, levels) {
        if (levels == 1) {
            this.makeCube(minx, miny, minz, side_length);
            return;
        }
        side_length = side_length / 3;
        this.recursiveCubes(minx, miny, minz, side_length, levels - 1);
        this.recursiveCubes(minx, miny + side_length, minz, side_length, levels - 1);
        this.recursiveCubes(minx, miny + (2 * side_length), minz, side_length, levels - 1);
        this.recursiveCubes(minx + side_length, miny, minz, side_length, levels - 1);
        this.recursiveCubes(minx + side_length, miny + (2 * side_length), minz, side_length, levels - 1);
        this.recursiveCubes(minx + (2 * side_length), miny, minz, side_length, levels - 1);
        this.recursiveCubes(minx + (2 * side_length), miny + side_length, minz, side_length, levels - 1);
        this.recursiveCubes(minx + (2 * side_length), miny + (2 * side_length), minz, side_length, levels - 1);
        this.recursiveCubes(minx, miny, minz + side_length, side_length, levels - 1);
        this.recursiveCubes(minx, miny + (2 * side_length), minz + side_length, side_length, levels - 1);
        this.recursiveCubes(minx + (2 * side_length), miny, minz + side_length, side_length, levels - 1);
        this.recursiveCubes(minx + (2 * side_length), miny + (2 * side_length), minz + side_length, side_length, levels - 1);
        this.recursiveCubes(minx, miny, minz + (2 * side_length), side_length, levels - 1);
        this.recursiveCubes(minx, miny + side_length, minz + (2 * side_length), side_length, levels - 1);
        this.recursiveCubes(minx, miny + (2 * side_length), minz + (2 * side_length), side_length, levels - 1);
        this.recursiveCubes(minx + side_length, miny, minz + (2 * side_length), side_length, levels - 1);
        this.recursiveCubes(minx + side_length, miny + (2 * side_length), minz + (2 * side_length), side_length, levels - 1);
        this.recursiveCubes(minx + (2 * side_length), miny, minz + (2 * side_length), side_length, levels - 1);
        this.recursiveCubes(minx + (2 * side_length), miny + side_length, minz + (2 * side_length), side_length, levels - 1);
        this.recursiveCubes(minx + (2 * side_length), miny + (2 * side_length), minz + (2 * side_length), side_length, levels - 1);
    }
    /* Returns a flat Float32Array of the sponge's vertex positions */
    positionsFlat() {
        // TODO: right now this makes a single triangle. Make the cube fractal instead.
        if (this.isDirty()) {
            // this.MakeMenger();
            this.positions_flat = new Float32Array();
            this.indices_flat = new Uint32Array();
            this.normals_flat = new Float32Array();
            this.recursiveCubes(-.5, -.5, -.5, 1, this.L);
            this.setClean();
        }
        return this.positions_flat;
    }
    /**
     * Returns a flat Uint32Array of the sponge's face indices
     */
    indicesFlat() {
        // TODO: right now this makes a single triangle. Make the cube fractal instead.
        if (this.isDirty()) {
            // this.MakeMenger();
            // this.setClean();
            this.positions_flat = new Float32Array();
            this.indices_flat = new Uint32Array();
            this.normals_flat = new Float32Array();
            this.recursiveCubes(-.5, -.5, -.5, 1, this.L);
            this.setClean();
        }
        return this.indices_flat;
    }
    /**
     * Returns a flat Float32Array of the sponge's normals
     */
    normalsFlat() {
        // TODO: right now this makes a single triangle. Make the cube fractal instead.
        if (this.isDirty()) {
            // this.MakeMenger();
            // this.setClean();
            this.positions_flat = new Float32Array();
            this.indices_flat = new Uint32Array();
            this.normals_flat = new Float32Array();
            this.recursiveCubes(-.5, -.5, -.5, 1, this.L);
            this.setClean();
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