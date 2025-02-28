import React, { useEffect, useState } from 'react'
import RecipeList from './components/RecipeList'
import RecipeForm from './components/RecipeForm'
import axios from 'axios'
import { API_BASE_URL } from './config'
import './index.css'

const App = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const fetchRecipes = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/recipes`)
      setRecipes(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching recipes:", err)
      setError("Failed to load recipes. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Dishly</h1>
        <p className="tagline">Your personal recipe collection</p>
      </header>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading recipes...</p>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <RecipeList recipes={recipes} fetchRecipes={fetchRecipes} />
          
          <button onClick={() => setShowForm(!showForm)} className="add-recipe-button">
            {showForm ? '−' : '+'} {showForm ? 'Cancel' : 'Add Recipe'}
          </button>
          
          {showForm && <RecipeForm triggerRefresh={fetchRecipes} />}
        </>
      )}
    </div>
  )
}

export default App
