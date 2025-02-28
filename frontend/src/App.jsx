import React, { useEffect, useState } from 'react'
import RecipeList from './components/RecipeList'
import RecipeForm from './components/RecipeForm'
import axios from 'axios'
import { API_BASE_URL } from './config'
import './App.css'

const App = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      
      <RecipeForm triggerRefresh={fetchRecipes} />
      
      {loading ? (
        <p>Loading recipes...</p>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <RecipeList recipes={recipes} fetchRecipes={fetchRecipes} />
      )}
    </div>
  )
}

export default App
