import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './recipe';

const App = () => {
  const APP_ID = '144359d0';
  const APP_KEY = 'f20fd8ce3e4fca7d9725969f818cec7e';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();

    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();

    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">
      <h1 className="app-title">Search for food recipeeeee</h1>
      <form onSubmit={getSearch} action="" className="search-form">
        <input
          className="search-bar"
          type="text"
          name=""
          id=""
          value={search}
          onChange={updateSearch}
          placeholder="e.g search for cherry"
        />
        <button className="search-button" type="button" onClick={getSearch}>
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
