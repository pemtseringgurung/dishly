import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const RecipeList = ({ recipes, fetchRecipes }) => {
    const [expandedIndices, setExpandedIndices] = useState(new Set());

    const toggleRecipe = (index) => {
        setExpandedIndices(prevIndices => {
            const newIndices = new Set(prevIndices);
            if (newIndices.has(index)) {
                newIndices.delete(index);
            } else {
                newIndices.add(index);
            }
            return newIndices;
        });
    };

    const deleteRecipe = async (id, event) => {
        event.stopPropagation();
        try {
            await axios.delete(`${API_BASE_URL}/recipes/${id}`);
            fetchRecipes();
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    if (!recipes.length) {
        return <p className="empty-recipes-message">No recipes found. Add a recipe to get started!</p>;
    }

    return (
        <div className="recipe-list">
            <h2>Your Recipes</h2>
            <div className="recipe-grid">
                {recipes.map((recipe, index) => {
                    const isExpanded = expandedIndices.has(index);
                    
                    return (
                        <div key={`recipe-${index}-${recipe.id}`} className={`recipe-card ${isExpanded ? 'expanded' : ''}`}>
                            <div className="recipe-header">
                                <h3>{recipe.title}</h3>
                                <div className="recipe-actions">
                                    <button 
                                        className="toggle-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleRecipe(index);
                                        }}
                                    >
                                        {isExpanded ? '−' : '+'}
                                    </button>
                                </div>
                            </div>
                            
                            {isExpanded && (
                                <div className="recipe-details">
                                    <div className="recipe-section">
                                        <h4>Ingredients</h4>
                                        <p>{recipe.ingredients}</p>
                                    </div>
                                    <div className="recipe-section">
                                        <h4>Instructions</h4>
                                        <p>{recipe.instructions}</p>
                                    </div>
                                    <button 
                                        className="delete-btn" 
                                        onClick={(e) => deleteRecipe(recipe.id, e)}
                                    >
                                        Delete Recipe
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecipeList;