import React, { useState,useRef } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import './ThreejsCustomizer.css'


function Model({ modelPath ,name}) {

  if(name==="glb"||name==='gltf'){
    const gltf = useGLTF(modelPath, true);
    return <primitive object={gltf.scene} />;
  }else if (name==="fbx"){
    const fbx = useLoader(FBXLoader, modelPath);
  return <primitive object={fbx} />;
  }


}

function TheejsCustomizer() {

  const arr=["glb","gltf","fbx"];
  const [modelPath, setModelPath] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [name,SetName]=useState("");
  const fileUpload=useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const extension = name;
      if (extension === "glb" || extension ==="gltf" || extension === "fbx") {
        const url = URL.createObjectURL(file);
        setModelPath(url);
        setShowPopup(false);
      }else if(extension !=ext && extension !=ext && extension !=ext){
        fileUpload.current.value="";
        alert("select  correct file")
      }
    }
  };


  return (
    <div  className='container'>
      <div className='btn-container'>
       <span className='enter'><i className="fa fa-arrow-left" onClick={()=>setShowPopup(false)}></i></span>
       <span className='enter'><i className="fa fa-arrow-right" onClick={()=>setShowPopup(true)}></i></span>
       <span className='enter'><i className="fa fa-rotate-right" onClick={()=>setModelPath(null)}></i></span>
      </div>
      {showPopup && (
        <div className="popup">
          <h3>RENDER 3D MODELS</h3>
          <input className='input' type="file" accept=".glb,.gltf,.fbx" placeholder='no file chosen' onChange={handleFileUpload} ref={fileUpload} />
          <button className='input-btn' >
            <select className='select' onClick={(e)=>SetName(e.target.value)}>{
              arr.map((opt,index)=>{
               return <option key={index}>{opt}</option>
              })}
              
          </select></button>
        </div>
      )}
      <div className='model' style={{  width: '100%', height: '100vh' }} >
      <Canvas camera={{fov:50}}>
        <Stage environment="city" intensity={0.75}>
        {modelPath && <Model modelPath={modelPath} name={name}  />}
        </Stage>
        <OrbitControls enableZoom={false} position={[0,0,0]} />
      </Canvas>
      </div>
      
    </div>
  );
}

export default TheejsCustomizer;
