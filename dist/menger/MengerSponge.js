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
        this.setLevel(level);
        // TODO: other initialization	
        var min = -0.5;
        this.side_length = 1;
        this.cubes = [];
        this.cubes.push(new Cube(-.5, -.5, -.5, 1));
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
    makeCube(startX, startY, startZ, side_length, position_list, indices_list, normals_list) {
        position_list.push(
        //front face
        startX, startY, startZ, 1.0, //0
        startX, startY + side_length, startZ, 1.0, //1
        startX + side_length, startY, startZ, 1.0, //2
        startX, startY + side_length, startZ, 1.0, //1
        startX + side_length, startY, startZ, 1.0, //2
        startX + side_length, startY + side_length, startZ, 1.0, //3
        //back face
        startX, startY, startZ + side_length, 1.0, //4
        startX, startY + side_length, startZ + side_length, 1.0, //5
        startX + side_length, startY, startZ + side_length, 1.0, //6
        startX, startY + side_length, startZ + side_length, 1.0, //5
        startX + side_length, startY, startZ + side_length, 1.0, //6
        startX + side_length, startY + side_length, startZ + side_length, 1.0, //7
        // right face      
        startX, startY, startZ, 1.0, //0
        startX, startY + side_length, startZ, 1.0, //1
        startX, startY, startZ + side_length, 1.0, //4
        startX, startY + side_length, startZ, 1.0, //1
        startX, startY, startZ + side_length, 1.0, //4
        startX, startY + side_length, startZ + side_length, 1.0, //5
        //left face
        startX + side_length, startY, startZ, 1.0, //2
        startX + side_length, startY + side_length, startZ, 1.0, //3
        startX + side_length, startY, startZ + side_length, 1.0, //6
        startX + side_length, startY + side_length, startZ, 1.0, //3
        startX + side_length, startY, startZ + side_length, 1.0, //6
        startX + side_length, startY + side_length, startZ + side_length, 1.0, //7
        //top face
        startX, startY + side_length, startZ, 1.0, //1
        startX + side_length, startY + side_length, startZ, 1.0, //3
        startX, startY + side_length, startZ + side_length, 1.0, //5
        startX + side_length, startY + side_length, startZ, 1.0, //3
        startX, startY + side_length, startZ + side_length, 1.0, //5
        startX + side_length, startY + side_length, startZ + side_length, 1.0, //7
        //bottom face
        startX, startY, startZ, 1.0, //0
        startX + side_length, startY, startZ, 1.0, //2
        startX, startY, startZ + side_length, 1.0, //4
        startX + side_length, startY, startZ, 1.0, //2
        startX, startY, startZ + side_length, 1.0, //4
        startX + side_length, startY, startZ + side_length, 1.0);
        indices_list.push(
        //front face
        indices_list.length, indices_list.length + 1, indices_list.length + 2, indices_list.length + 3, indices_list.length + 5, indices_list.length + 4, 
        //back face
        indices_list.length + 7, indices_list.length + 6, indices_list.length + 8, indices_list.length + 11, indices_list.length + 9, indices_list.length + 10, 
        //right face
        indices_list.length + 13, indices_list.length + 12, indices_list.length + 14, indices_list.length + 17, indices_list.length + 15, indices_list.length + 16, 
        //left face
        indices_list.length + 19, indices_list.length + 20, indices_list.length + 18, indices_list.length + 23, indices_list.length + 22, indices_list.length + 21, 
        //top face
        indices_list.length + 25, indices_list.length + 24, indices_list.length + 26, indices_list.length + 29, indices_list.length + 27, indices_list.length + 28, 
        //bottom face
        indices_list.length + 30, indices_list.length + 31, indices_list.length + 32, indices_list.length + 33, indices_list.length + 35, indices_list.length + 34);
        normals_list.push(
        // front face
        0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 
        //back face
        0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 
        // right face
        -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 
        // left face
        1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 
        //top face
        0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 
        //bottom face
        0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0);
    }
    MakeMenger() {
        if (this.L > 1) {
            for (let i = 2; i <= this.L; i++) {
                this.pushToList();
            }
            let position = [];
            let index = [];
            let normal = [];
            this.cubes.forEach(cube => {
                this.makeCube(cube.minx, cube.miny, cube.minz, cube.length, position, index, normal);
            });
            this.positions_flat = Float32Array.from(position);
            this.indices_flat = Uint32Array.from(index);
            this.normals_flat = Float32Array.from(position);
        }
    }
    pushToList() {
        var big_cube = this.cubes.shift();
        if (big_cube == null) {
            return;
        }
        let compute_size = big_cube.length;
        while (big_cube.length == compute_size) {
            var minx = big_cube.minx;
            var miny = big_cube.miny;
            var minz = big_cube.minz;
            var side_length = big_cube.length / 3;
            this.cubes.push(new Cube(minx, miny, minz, side_length));
            this.cubes.push(new Cube(minx, miny + side_length, minz, side_length));
            this.cubes.push(new Cube(minx, miny + (2 * side_length), minz, side_length));
            this.cubes.push(new Cube(minx + side_length, miny, minz, side_length));
            this.cubes.push(new Cube(minx + side_length, miny + (2 * side_length), minz, side_length));
            this.cubes.push(new Cube(minx + (2 * side_length), miny, minz, side_length));
            this.cubes.push(new Cube(minx + (2 * side_length), miny + side_length, minz, side_length));
            this.cubes.push(new Cube(minx + (2 * side_length), miny + (2 * side_length), minz, side_length));
            this.cubes.push(new Cube(minx, miny, minz + side_length, side_length));
            this.cubes.push(new Cube(minx, miny + (2 * side_length), minz + side_length, side_length));
            this.cubes.push(new Cube(minx + (2 * side_length), miny, minz + side_length, side_length));
            this.cubes.push(new Cube(minx + (2 * side_length), miny + (2 * side_length), minz + side_length, side_length));
            this.cubes.push(new Cube(minx, miny, minz + (2 * side_length), side_length));
            this.cubes.push(new Cube(minx, miny + side_length, minz + (2 * side_length), side_length));
            this.cubes.push(new Cube(minx, miny + (2 * side_length), minz + (2 * side_length), side_length));
            this.cubes.push(new Cube(minx + side_length, miny, minz + (2 * side_length), side_length));
            this.cubes.push(new Cube(minx + side_length, miny + (2 * side_length), (2 * minz + side_length), side_length));
            this.cubes.push(new Cube(minx + (2 * side_length), miny, minz + (2 * side_length), side_length));
            this.cubes.push(new Cube(minx + (2 * side_length), miny + side_length, minz + (2 * side_length), side_length));
            this.cubes.push(new Cube(minx + (2 * side_length), miny + (2 * side_length), minz + (2 * side_length), side_length));
            big_cube = this.cubes.shift();
            if (big_cube == null) {
                return;
            }
        }
        this.cubes.push(big_cube);
    }
    /*
  
    public recursiveCubes(side_length: number, levels: number): void{
      if(levels==0){
        return;
      }
      side_length = side_length/3;
  
      // commented out middle 7?
      //-.5-> minx y z of larger cube
  
      this.positions_flat.push(makeCube(-.5, -.5, -.5, side_length));
      this.positions_flat.push(makeCube(-.5, -.5+side_length, -.5, side_length));
      this.positions_flat.push(makeCube(-.5, -.5+(2*side_length), -.5, side_length));
  
      this.positions_flat.push(makeCube(-.5+side_length, -.5, -.5, side_length));
      // this.positions_flat.push(makeCube(-.5+side_length, -.5+side_length, -.5, side_length));
      this.positions_flat.push(makeCube(-.5+side_length, -.5+(2*side_length), -.5, side_length));
  
      this.positions_flat.push(makeCube(-.5+(2*side_length), -.5, -.5, side_length));
      this.positions_flat.push(makeCube(-.5+(2*side_length), -.5+side_length, -.5, side_length));
      this.positions_flat.push(makeCube(-.5+(2*side_length), -.5+(2*side_length), -.5, side_length));
  
      this.positions_flat.push(makeCube(-.5, -.5, -.5+side_length, side_length));
      // this.positions_flat.push(makeCube(-.5, -.5+side_length, -.5+side_length, side_length));
      this.positions_flat.push(makeCube(-.5, -.5+(2*side_length), -.5+side_length, side_length));
  
      //this.positions_flat.push(makeCube(-.5+side_length, -.5, -.5+side_length, side_length));
      //this.positions_flat.push(makeCube(-.5+side_length, -.5+side_length, -.5+side_length, side_length));
      //this.positions_flat.push(makeCube(-.5+side_length, -.5+(2*side_length), -.5+side_length, side_length));
      
      this.positions_flat.push(makeCube(-.5+(2*side_length), -.5, -.5+side_length, side_length));
      // this.positions_flat.push(makeCube(-.5+(2*side_length), -.5+side_length, -.5+side_length, side_length));
      this.positions_flat.push(makeCube(-.5+(2*side_length), -.5+(2*side_length), -.5+side_length, side_length));
  
      this.positions_flat.push(makeCube(-.5, -.5, -.5+(2*side_length), side_length));
      this.positions_flat.push(makeCube(-.5, -.5+side_length, -.5+(2*side_length), side_length));
      this.positions_flat.push(makeCube(-.5, -.5+(2*side_length), -.5+(2*side_length), side_length));
  
      this.positions_flat.push(makeCube(-.5+side_length, -.5, -.5+(2*side_length), side_length));
      // this.positions_flat.push(makeCube(-.5+side_length, -.5+side_length, -.5+(2*side_length), side_length));
      this.positions_flat.push(makeCube(-.5+side_length, -.5+(2*side_length), -.5+(2*side_length), side_length));
      
      this.positions_flat.push(makeCube(-.5+(2*side_length), -.5, -.5+(2*side_length), side_length));
      this.positions_flat.push(makeCube(-.5+(2*side_length), -.5+side_length, -.5+(2*side_length), side_length));
      this.positions_flat.push(makeCube(-.5+(2*side_length), -.5+(2*side_length), -.5+(2*side_length), side_length));
  
      this.recursiveCubes(side_length, levels-1);
    }
  
    */
    /* Returns a flat Float32Array of the sponge's vertex positions */
    positionsFlat() {
        // TODO: right now this makes a single triangle. Make the cube fractal instead.
        if (this.isDirty()) {
            this.MakeMenger();
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
            this.MakeMenger();
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
            this.MakeMenger();
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