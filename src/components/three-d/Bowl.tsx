
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface BowlProps {
  recipeType?: string;
}

const Bowl: React.FC<BowlProps> = ({ recipeType = 'default' }) => {
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

export default Bowl;
