
import React from 'react';

interface RecipeIngredientsProps {
  ingredients: string[];
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({ ingredients }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">المكونات</h3>
      <ul className="list-disc list-inside space-y-2">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-700">{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeIngredients;
