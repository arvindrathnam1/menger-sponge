export let defaultVSText = `
    precision mediump float;

    attribute vec3 vertPosition;
    attribute vec3 vertColor;
    attribute vec4 aNorm;
    
    varying vec4 lightDir;
    varying vec4 normal;   
 
    uniform vec4 lightPosition;
    uniform mat4 mWorld;
    uniform mat4 mView;
	uniform mat4 mProj;

    void main () {
		//  Convert vertex to camera coordinates and the NDC
        gl_Position = mProj * mView * mWorld * vec4 (vertPosition, 1.0);
        
        //  Compute light direction (world coordinates)
        lightDir = lightPosition - vec4(vertPosition, 1.0);
		
        //  Pass along the vertex normal (world coordinates)
        normal = aNorm;
    }
`;
// TODO: Write the fragment shader
// The above colors are the base colors; you'll shade the cube based on the orientation of the 
// face relative to the light source, as described by the diffuse term in the Phong illumination model.
/*
        //diffuse term
        glm::dvec3 l = pLight->getDirection(r.at(i));
        glm::dvec3 n = i.getN();
        glm::dvec3 diff = kd(i);

        glm::dvec3 diff_term;

        if (i.getMaterial().Trans()) {
            diff_term = diff * glm::abs(glm::dot(l, n)) * color;
        }
        else {
            diff_term = diff * glm::max(0.0, glm::dot(l, n)) * color;
        }
*/
export let defaultFSText = `
    precision mediump float;

    varying vec4 lightDir;
    varying vec4 normal;    


    void main () {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        if(normal == vec4(1.0, 0.0, 0.0, 0.0)){
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); //red
        }
        else if(normal == vec4(-1.0, 0.0, 0.0, 0.0)){
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); //red
        }
        else if(normal == vec4(0.0, 1.0, 0.0, 0.0)){
            gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); //green
        }
        else if(normal == vec4(0.0, -1.0, 0.0, 0.0)){
            gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); //green
        }
        else if(normal == vec4(0.0, 0.0, 1.0, 0.0)){
            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); //blue
        }
        else{
            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); //blue
        }
        vec3 lightDir3 = vec3(lightDir[0], lightDir[1], lightDir[2]);
        lightDir3 = normalize(lightDir3);
        vec3 normal3 = vec3(normal[0], normal[1], normal[2]);
        
        if(dot(lightDir3, normal3)<0.0){
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
        else{
            gl_FragColor[0] = dot(lightDir3, normal3) * gl_FragColor[0];
            gl_FragColor[1] = dot(lightDir3, normal3) * gl_FragColor[1];
            gl_FragColor[2] = dot(lightDir3, normal3) * gl_FragColor[2];
        }

    }
`;
// TODO: floor shaders
export let floorVSText = ``;
export let floorFSText = ``;
//# sourceMappingURL=Shaders.js.map