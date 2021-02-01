import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';
const App = () => {

  const APP_ID = "0c67752c";
  const APP_KEY = "84fb7ea95b157c7da224467d70bd2d51";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    console.log("use effent is called");
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data);
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit = {getSearch} className="search-form">
        <input className="search-bar" type="text" value ={search} onChange = {updateSearch}/>
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
      <div className = "recipes">
    {recipes.map(recipe => (
      <Recipe 
        key = {recipe.recipe.label}
        title = {recipe.recipe.label}
        calories = {recipe.recipe.calories}
        image = {recipe.recipe.image}
        ingredients = { recipe.recipe.ingredients }
        url ={recipe.recipe.url}
      />
    ))}
    </div>
    </div>
  )
}

export default App;
