
import React from 'react';

interface RecipeInstructionsProps {
  instructions: string[];
}

const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({ instructions }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">طريقة التحضير</h3>
      <ol className="relative list-none space-y-6 border-r-2 border-primary/20 pr-6 mr-2">
        {instructions.map((step, index) => (
          <li key={index} className="relative">
            <div className="absolute right-[-29px] top-0 bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center">
              {index + 1}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="text-gray-700">{step}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeInstructions;
