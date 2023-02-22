import { Mat3, Mat4, Vec3, Vec4 } from "../lib/TSM.js";

/* A potential interface that students should implement */
interface IMengerSponge {
  setLevel(level: number): void;
  isDirty(): boolean;
  setClean(): void;
  normalsFlat(): Float32Array;
  indicesFlat(): Uint32Array;
  positionsFlat(): Float32Array;
}

/**
 * Represents a Menger Sponge
 */
export class MengerSponge implements IMengerSponge {

  // TODO: sponge data structures
  L: number;
  dirty: boolean;
  positions_flat: Float32Array;
  indices_flat: Uint32Array;
  normals_flat: Float32Array;
  side_length: number;
  
  constructor(level: number) {
	  this.setLevel(level);    
    // TODO: other initialization	

    var min = -0.5;
    this.side_length=1;

    /*
    this.positions_flat = new Float32Array([
      1.0, 0.0, 0.0, 1.0, 
      -1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0
    ]);
    */
    this.positions_flat = new Float32Array([
      min, min, min, 1.0,
      min, min+1, min, 1.0,
      min+1, min, min, 1.0,
      min+1, min+1, min, 1.0,
      min, min, min+1, 1.0,
      min, min+1, min+1, 1.0,
      min+1, min, min+1, 1.0,
      min+1, min+1, min+1, 1.0
    ]);

    // this.indices_flat = new Uint32Array([0, 1, 2]);
    this.indices_flat = new Uint32Array([
      // front face
      0, 1, 2,
      1, 3, 2,
      // left side face
      0, 1, 4,
      1, 5, 4,
      // right side face
      2, 6, 3,
      3, 6, 7,
      // back face
      4, 5, 6, 
      5, 7, 6,
      // top face
      1, 3, 5,
      3, 7, 5,
      // bottom face
      0, 4, 2,
      2, 4, 6,
    ]);

    //this.normals_flat = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0]);
    this.normals_flat = new Float32Array([
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
    ]);
  }

  /**
   * Returns true if the sponge has changed.
   */
  public isDirty(): boolean {
    // return true;
    return this.dirty;
  }

  public setClean(): void {
    this.dirty = false;
  }

  public setDirty(): void {
    this.dirty = true;
  }
  
  public setLevel(level: number)
  {
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
  public positionsFlat(): Float32Array {
	  // TODO: right now this makes a single triangle. Make the cube fractal instead.
    if(this.isDirty()){
      for(let i=2; i<=this.L; i++){
        this.side_length = this.side_length/3;
        
      }
      //recompute this.positions_flat;
    }
    return this.positions_flat;
  }

  /**
   * Returns a flat Uint32Array of the sponge's face indices
   */
  public indicesFlat(): Uint32Array {
    // TODO: right now this makes a single triangle. Make the cube fractal instead.
    if(this.isDirty()){
      //recompute this.indices_flat;
    }
    return this.indices_flat;
  }

  /**
   * Returns a flat Float32Array of the sponge's normals
   */
  public normalsFlat(): Float32Array {
	  // TODO: right now this makes a single triangle. Make the cube fractal instead.
	  if(this.isDirty()){
      //recompute this.normals_flat;
    }
    return this.normals_flat;
  }

  /**
   * Returns the model matrix of the sponge
   */
  public uMatrix(): Mat4 {

    // TODO: change this, if it's useful
    const ret : Mat4 = new Mat4().setIdentity();

    return ret;    
  }
  
}
