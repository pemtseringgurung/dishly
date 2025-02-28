   // backend/routes/recipes.js
   const express = require('express');
   const router = express.Router();
   const pool = require('../db');

   // Get all recipes
   router.get('/', async (req, res) => {
       try {
           const result = await pool.query('SELECT * FROM recipes');
           res.json(result.rows);
       } catch (error) {
           console.error('Error fetching recipes:', error);
           res.status(500).send('Server error');
       }
   });

   // Create a new recipe
   router.post('/', async (req, res) => {
       const { title, ingredients, instructions } = req.body;
       try {
           const result = await pool.query(
               'INSERT INTO recipes (title, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *',
               [title, ingredients, instructions]
           );
           res.status(201).json(result.rows[0]);
       } catch (error) {
           console.error('Error adding recipe:', error);
           res.status(500).send('Server error');
       }
   });

   // Update a recipe
   router.put('/:id', async (req, res) => {
       const { id } = req.params;
       const { title, ingredients, instructions } = req.body;
       try {
           const result = await pool.query(
               'UPDATE recipes SET title = $1, ingredients = $2, instructions = $3 WHERE id = $4 RETURNING *',
               [title, ingredients, instructions, id]
           );
           res.json(result.rows[0]);
       } catch (error) {
           console.error('Error updating recipe:', error);
           res.status(500).send('Server error');
       }
   });

   // Delete a recipe
   router.delete('/:id', async (req, res) => {
       const { id } = req.params;
       try {
           await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
           res.status(204).send();
       } catch (error) {
           console.error('Error deleting recipe:', error);
           res.status(500).send('Server error');
       }
   });

   module.exports = router;