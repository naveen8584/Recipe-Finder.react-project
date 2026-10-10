import React from 'react';
import './styles/RecipeModal.css';

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  // Collect ingredients and measurements
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient =
      recipe[`strIngredient${i}`]?.trim() || '';

    const measure =
      recipe[`strMeasure${i}`]?.trim() || '';

    if (ingredient) {
      ingredients.push({
        name: ingredient,
        measure: measure,
      });
    }
  }

  // Split cooking instructions into steps
  const steps = recipe.strInstructions
    ? recipe.strInstructions
        .split(/\r?\n|(?<=\.)\s+/)
        .map((step) => step.trim())
        .filter((step) => step.length > 3)
    : [];

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close recipe"
        >
          &times;
        </button>

        <div className="modal-body">
          {/* Recipe Image */}
          <div className="modal-image">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
          </div>

          {/* Recipe Details */}
          <div className="modal-details">
            <h2>{recipe.strMeal}</h2>

            <p>
              <strong>Category: </strong>
              {recipe.strCategory || 'Not available'}
            </p>

            <p>
              <strong>Area: </strong>
              {recipe.strArea || 'Not available'}
            </p>

            {/* Ingredients */}
            <div className="ingredients-section">
              <h3>Ingredients</h3>

              {ingredients.length > 0 ? (
                <ul>
                  {ingredients.map((item, index) => (
                    <li key={index}>
                      {item.measure
                        ? `${item.measure} ${item.name}`
                        : item.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Ingredients are not available.</p>
              )}
            </div>

            {/* Cooking Instructions */}
            <div className="instructions">
              <h3>Cooking Instructions</h3>

              {steps.length > 0 ? (
                <ol>
                  {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p>Instructions are not available.</p>
              )}
            </div>

            {/* YouTube Link */}
            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-link"
              >
                Watch on YouTube
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
