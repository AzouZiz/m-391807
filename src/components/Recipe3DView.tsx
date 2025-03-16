
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PresentationControls } from '@react-three/drei';
import { Mesh } from 'three';
import { Button } from '@/components/ui/button';
import { Box, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// مكون للوعاء ثلاثي الأبعاد
const Bowl = ({ recipeType = 'default' }) => {
  const meshRef = useRef<Mesh>(null);
  
  // تعيين لون الطعام بناءً على نوع الوصفة
  const foodColor = {
    'سلطات': '#7fca7d',
    'حساء': '#e09b45',
    'أطباق رئيسية': '#d35f5f',
    'حلويات': '#d499b9',
    'default': '#b5a642'
  }[recipeType] || '#b5a642';
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group>
      {/* الوعاء */}
      <mesh position={[0, -0.5, 0]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[2, 1.5, 1, 32]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.2} metalness={0.3} />
      </mesh>
      
      {/* محتوى الطعام */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial 
          color={foodColor} 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
      
      {/* تفاصيل الطعام (حسب النوع) */}
      {recipeType === 'سلطات' && (
        <>
          {[...Array(12)].map((_, i) => (
            <mesh 
              key={i}
              position={[
                Math.cos(i / 12 * Math.PI * 2) * 0.7, 
                0.1, 
                Math.sin(i / 12 * Math.PI * 2) * 0.7
              ]}
            >
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color={i % 3 === 0 ? '#ff6b6b' : '#7fca7d'} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
};

interface Recipe3DViewProps {
  recipeType?: string;
  isButtonHidden?: boolean;
}

const Recipe3DView: React.FC<Recipe3DViewProps> = ({ 
  recipeType = 'default',
  isButtonHidden = false
}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      {!isButtonHidden && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex gap-2 items-center"
            >
              <Box size={16} />
              عرض ثلاثي الأبعاد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md md:max-w-xl h-[500px] p-0">
            <DialogHeader className="absolute top-2 right-2 z-10">
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            <div className="w-full h-full">
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
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {isButtonHidden && (
        <div className="w-full h-[300px]">
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
        </div>
      )}
    </>
  );
};

export default Recipe3DView;
