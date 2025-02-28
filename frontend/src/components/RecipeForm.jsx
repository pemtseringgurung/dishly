import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const RecipeForm = ({ triggerRefresh }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/recipes`, {
                title,
                ingredients,
                instructions,
            });
            setTitle('');
            setIngredients('');
            setInstructions('');
            triggerRefresh();
        } catch (error) {
            setError('Failed to add recipe. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Add New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Recipe Title</label>
                    <input 
                        id="title"
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Enter a delicious recipe name" 
                        required 
                        disabled={isSubmitting}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea 
                        id="ingredients"
                        value={ingredients} 
                        onChange={(e) => setIngredients(e.target.value)} 
                        placeholder="List ingredients separated by commas" 
                        required 
                        disabled={isSubmitting}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea 
                        id="instructions"
                        value={instructions} 
                        onChange={(e) => setInstructions(e.target.value)} 
                        placeholder="Describe the cooking steps" 
                        required 
                        disabled={isSubmitting}
                    />
                </div>
                
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Recipe'}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default RecipeForm;
