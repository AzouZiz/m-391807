
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PresentationControls } from '@react-three/drei';
import Bowl from './Bowl';

interface RecipeSceneProps {
  recipeType: string;
}

const RecipeScene: React.FC<RecipeSceneProps> = ({ recipeType }) => {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 200 }}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
      >
        <Bowl recipeType={recipeType} />
      </PresentationControls>
      <Environment preset="city" />
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
    </Canvas>
  );
};

export default RecipeScene;
