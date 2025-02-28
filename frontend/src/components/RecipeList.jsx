import React from 'react';
import RecipeDetail from './RecipeDetail';

const RecipeList = ({ recipes, fetchRecipes }) => {
    const [selectedRecipe, setSelectedRecipe] = React.useState(null);

    const handleSelectRecipe = (recipe) => {
        setSelectedRecipe(recipe);
    };

    return (
        <div className="recipe-list">
            <h2>Your Recipes</h2>
            {recipes.length === 0 ? (
                <p>No recipes found. Add a recipe to get started!</p>
            ) : (
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id} onClick={() => handleSelectRecipe(recipe)}>
                            {recipe.title}
                        </li>
                    ))}
                </ul>
            )}
            {selectedRecipe && <RecipeDetail recipe={selectedRecipe} fetchRecipes={fetchRecipes} setSelectedRecipe={setSelectedRecipe} />}
        </div>
    );
};

export default RecipeList;
