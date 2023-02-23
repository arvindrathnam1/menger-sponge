import { CanvasAnimation, WebGLUtilities } from "../lib/webglutils/CanvasAnimation.js";
import { GUI } from "./Gui.js";
import { MengerSponge } from "./MengerSponge.js";
import { Ground } from "./Ground.js";
import { mengerTests } from "./tests/MengerTests.js";
import { defaultFSText, defaultVSText, floorFSText, floorVSText } from "./Shaders.js";
import { Mat4, Vec4 } from "../lib/TSM.js";
export class MengerAnimation extends CanvasAnimation {
    constructor(canvas) {
        super(canvas);
        /* The Menger sponge */
        this.sponge = new MengerSponge(1);
        /* Menger Sponge Rendering Info */
        this.mengerVAO = -1;
        this.mengerProgram = -1;
        /* Menger Buffers */
        this.mengerPosBuffer = -1;
        this.mengerIndexBuffer = -1;
        this.mengerNormBuffer = -1;
        /* Menger Attribute Locations */
        this.mengerPosAttribLoc = -1;
        this.mengerNormAttribLoc = -1;
        /* Menger Uniform Locations */
        this.mengerWorldUniformLocation = -1;
        this.mengerViewUniformLocation = -1;
        this.mengerProjUniformLocation = -1;
        this.mengerLightUniformLocation = -1;
        /* Global Rendering Info */
        this.lightPosition = new Vec4();
        this.backgroundColor = new Vec4();
        // TODO: data structures for the floor
        /* Ground */
        this.ground = new Ground();
        /* Menger Sponge Rendering Info */
        this.groundVAO = -1;
        this.groundProgram = -1;
        /* Menger Buffers */
        this.groundPosBuffer = -1;
        this.groundIndexBuffer = -1;
        this.groundNormBuffer = -1;
        /* Menger Attribute Locations */
        this.groundPosAttribLoc = -1;
        this.groundNormAttribLoc = -1;
        /* Menger Uniform Locations */
        this.groundWorldUniformLocation = -1;
        this.groundViewUniformLocation = -1;
        this.groundProjUniformLocation = -1;
        this.groundLightUniformLocation = -1;
        this.gui = new GUI(canvas, this, this.sponge);
        /* Setup Animation */
        this.reset();
    }
    /**
     * Setup the animation. This can be called again to reset the animation.
     */
    reset() {
        /* debugger; */
        this.lightPosition = new Vec4([-10.0, 10.0, -10.0, 1.0]);
        this.backgroundColor = new Vec4([0.0, 0.37254903, 0.37254903, 1.0]);
        this.initMenger();
        this.initFloor();
        this.gui.reset();
    }
    /**
     * Initialize the Menger sponge data structure
     */
    initMenger() {
        this.sponge.setLevel(1);
        /* Alias context for syntactic convenience */
        const gl = this.ctx;
        /* Compile Shaders */
        this.mengerProgram = WebGLUtilities.createProgram(gl, defaultVSText, defaultFSText);
        gl.useProgram(this.mengerProgram);
        /* Create VAO for Menger Sponge */
        this.mengerVAO = this.extVAO.createVertexArrayOES();
        this.extVAO.bindVertexArrayOES(this.mengerVAO);
        /* Create and setup positions buffer*/
        // Returns a number that indicates where 'vertPosition' is in the shader program
        this.mengerPosAttribLoc = gl.getAttribLocation(this.mengerProgram, "vertPosition");
        /* Ask WebGL to create a buffer */
        this.mengerPosBuffer = gl.createBuffer();
        /* Tell WebGL that you are operating on this buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mengerPosBuffer);
        /* Fill the buffer with data */
        gl.bufferData(gl.ARRAY_BUFFER, this.sponge.positionsFlat(), gl.STATIC_DRAW);
        /* Tell WebGL how to read the buffer and where the data goes */
        gl.vertexAttribPointer(this.mengerPosAttribLoc /* Essentially, the destination */, 4 /* Number of bytes per primitive */, gl.FLOAT /* The type of data */, false /* Normalize data. Should be false. */, 4 *
            Float32Array.BYTES_PER_ELEMENT /* Number of bytes to the next element */, 0 /* Initial offset into buffer */);
        /* Tell WebGL to enable to attribute */
        gl.enableVertexAttribArray(this.mengerPosAttribLoc);
        /* Create and setup normals buffer*/
        this.mengerNormAttribLoc = gl.getAttribLocation(this.mengerProgram, "aNorm");
        this.mengerNormBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mengerNormBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.sponge.normalsFlat(), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.mengerNormAttribLoc, 4, gl.FLOAT, false, 4 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(this.mengerNormAttribLoc);
        /* Create and setup index buffer*/
        this.mengerIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mengerIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.sponge.indicesFlat(), gl.STATIC_DRAW);
        /* End VAO recording */
        this.extVAO.bindVertexArrayOES(this.mengerVAO);
        /* Get uniform locations */
        this.mengerWorldUniformLocation = gl.getUniformLocation(this.mengerProgram, "mWorld");
        this.mengerViewUniformLocation = gl.getUniformLocation(this.mengerProgram, "mView");
        this.mengerProjUniformLocation = gl.getUniformLocation(this.mengerProgram, "mProj");
        this.mengerLightUniformLocation = gl.getUniformLocation(this.mengerProgram, "lightPosition");
        /* Bind uniforms */
        gl.uniformMatrix4fv(this.mengerWorldUniformLocation, false, new Float32Array(this.sponge.uMatrix().all()));
        gl.uniformMatrix4fv(this.mengerViewUniformLocation, false, new Float32Array(Mat4.identity.all()));
        gl.uniformMatrix4fv(this.mengerProjUniformLocation, false, new Float32Array(Mat4.identity.all()));
        gl.uniform4fv(this.mengerLightUniformLocation, this.lightPosition.xyzw);
    }
    /**
     * Sets up the floor and floor drawing
     */
    initFloor() {
        // TODO: your code to set up the floor rendering
        /* Alias context for syntactic convenience */
        const gl = this.ctx;
        /* Compile Shaders */
        this.groundProgram = WebGLUtilities.createProgram(gl, floorVSText, floorFSText);
        gl.useProgram(this.groundProgram);
        /* Create VAO for Menger Sponge */
        this.groundVAO = this.extVAO.createVertexArrayOES();
        this.extVAO.bindVertexArrayOES(this.groundVAO);
        /* Create and setup positions buffer*/
        // Returns a number that indicates where 'vertPosition' is in the shader program
        this.groundPosAttribLoc = gl.getAttribLocation(this.groundProgram, "vertPosition");
        /* Ask WebGL to create a buffer */
        this.groundPosBuffer = gl.createBuffer();
        /* Tell WebGL that you are operating on this buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.groundPosBuffer);
        /* Fill the buffer with data */
        gl.bufferData(gl.ARRAY_BUFFER, this.ground.positionsFlat(), gl.STATIC_DRAW);
        /* Tell WebGL how to read the buffer and where the data goes */
        gl.vertexAttribPointer(this.groundPosAttribLoc /* Essentially, the destination */, 4 /* Number of bytes per primitive */, gl.FLOAT /* The type of data */, false /* Normalize data. Should be false. */, 4 *
            Float32Array.BYTES_PER_ELEMENT /* Number of bytes to the next element */, 0 /* Initial offset into buffer */);
        /* Tell WebGL to enable to attribute */
        gl.enableVertexAttribArray(this.groundPosAttribLoc);
        /* Create and setup normals buffer*/
        this.groundNormAttribLoc = gl.getAttribLocation(this.groundProgram, "aNorm");
        this.groundNormBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.groundNormBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.ground.normalsFlat(), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.groundNormAttribLoc, 4, gl.FLOAT, false, 4 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(this.groundNormAttribLoc);
        /* Create and setup index buffer*/
        this.groundIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.groundIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.ground.indicesFlat(), gl.STATIC_DRAW);
        /* End VAO recording */
        this.extVAO.bindVertexArrayOES(this.groundVAO);
        /* Get uniform locations */
        this.groundWorldUniformLocation = gl.getUniformLocation(this.groundProgram, "mWorld");
        this.groundViewUniformLocation = gl.getUniformLocation(this.groundProgram, "mView");
        this.groundProjUniformLocation = gl.getUniformLocation(this.groundProgram, "mProj");
        this.groundLightUniformLocation = gl.getUniformLocation(this.groundProgram, "lightPosition");
        /* Bind uniforms */
        gl.uniformMatrix4fv(this.groundWorldUniformLocation, false, new Float32Array(this.ground.uMatrix().all()));
        gl.uniformMatrix4fv(this.groundViewUniformLocation, false, new Float32Array(Mat4.identity.all()));
        gl.uniformMatrix4fv(this.groundProjUniformLocation, false, new Float32Array(Mat4.identity.all()));
        gl.uniform4fv(this.groundLightUniformLocation, this.lightPosition.xyzw);
    }
    /**
     * Draws a single frame
     */
    draw() {
        const gl = this.ctx;
        /* Clear canvas */
        const bg = this.backgroundColor;
        gl.clearColor(bg.r, bg.g, bg.b, bg.a);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
        /* Menger - Update/Draw */
        const modelMatrix = this.sponge.uMatrix();
        gl.useProgram(this.mengerProgram);
        this.extVAO.bindVertexArrayOES(this.mengerVAO);
        /* Update menger buffers */
        if (this.sponge.isDirty()) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.mengerPosBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.sponge.positionsFlat(), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.mengerPosAttribLoc, 4, gl.FLOAT, false, 4 * Float32Array.BYTES_PER_ELEMENT, 0);
            gl.enableVertexAttribArray(this.mengerPosAttribLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.mengerNormBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.sponge.normalsFlat(), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.mengerNormAttribLoc, 4, gl.FLOAT, false, 4 * Float32Array.BYTES_PER_ELEMENT, 0);
            gl.enableVertexAttribArray(this.mengerNormAttribLoc);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mengerIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.sponge.indicesFlat(), gl.STATIC_DRAW);
            this.sponge.setClean();
        }
        /* Update menger uniforms */
        gl.uniformMatrix4fv(this.mengerWorldUniformLocation, false, new Float32Array(modelMatrix.all()));
        gl.uniformMatrix4fv(this.mengerViewUniformLocation, false, new Float32Array(this.gui.viewMatrix().all()));
        gl.uniformMatrix4fv(this.mengerProjUniformLocation, false, new Float32Array(this.gui.projMatrix().all()));
        console.log("Drawing ", this.sponge.indicesFlat().length, " triangles");
        /* Draw menger */
        gl.drawElements(gl.TRIANGLES, this.sponge.indicesFlat().length, gl.UNSIGNED_INT, 0);
        // TODO: draw the floor
        console.log("Drawing Floor");
        gl.useProgram(this.groundProgram);
        this.extVAO.bindVertexArrayOES(this.groundVAO);
        gl.uniformMatrix4fv(this.groundWorldUniformLocation, false, new Float32Array(this.ground.uMatrix().all()));
        gl.uniformMatrix4fv(this.groundViewUniformLocation, false, new Float32Array(this.gui.viewMatrix().all()));
        gl.uniformMatrix4fv(this.groundProjUniformLocation, false, new Float32Array(this.gui.projMatrix().all()));
        gl.drawElements(gl.TRIANGLES, this.ground.indicesFlat().length, gl.UNSIGNED_INT, 0);
    }
    setLevel(level) {
        this.sponge.setLevel(level);
    }
    getGUI() {
        return this.gui;
    }
}
export function initializeCanvas() {
    const canvas = document.getElementById("glCanvas");
    /* Start drawing */
    const canvasAnimation = new MengerAnimation(canvas);
    mengerTests.registerDeps(canvasAnimation);
    mengerTests.registerDeps(canvasAnimation);
    canvasAnimation.start();
}
//# sourceMappingURL=App.js.map