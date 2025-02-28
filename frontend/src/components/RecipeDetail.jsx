import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const RecipeDetail = ({ recipe, fetchRecipes, setSelectedRecipe }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(recipe.title);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.instructions);

    const handleUpdate = async () => {
        try {
            await axios.put(`${API_BASE_URL}/recipes/${recipe.id}`, { 
                title, 
                ingredients, 
                instructions 
            });
            fetchRecipes();
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update recipe:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            try {
                await axios.delete(`${API_BASE_URL}/recipes/${recipe.id}`);
                fetchRecipes();
                setSelectedRecipe(null);
            } catch (error) {
                console.error("Failed to delete recipe:", error);
            }
        }
    };

    return (
        <div className="recipe-detail">
            {isEditing ? (
                <div>
                    <h2>Edit Recipe</h2>
                    <div className="form-group">
                        <label htmlFor="edit-title">Recipe Title</label>
                        <input 
                            id="edit-title"
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="edit-ingredients">Ingredients</label>
                        <textarea 
                            id="edit-ingredients"
                            value={ingredients} 
                            onChange={(e) => setIngredients(e.target.value)} 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="edit-instructions">Instructions</label>
                        <textarea 
                            id="edit-instructions"
                            value={instructions} 
                            onChange={(e) => setInstructions(e.target.value)} 
                        />
                    </div>
                    
                    <div className="button-group">
                        <button onClick={handleUpdate}>Update Recipe</button>
                        <button className="button-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>{recipe.title}</h2>
                    
                    <div className="recipe-detail-section">
                        <h3>Ingredients</h3>
                        <p>{recipe.ingredients}</p>
                    </div>
                    
                    <div className="recipe-detail-section">
                        <h3>Instructions</h3>
                        <p>{recipe.instructions}</p>
                    </div>
                    
                    <div className="button-group">
                        <button className="button-edit" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="button-delete" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetail;
