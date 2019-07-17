import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe'

const App = () => {

  const APP_ID = '06733fc1';
  const APP_KEY = 'd72cd18df7a4be8d4b9ae7734eaead39';

  const [recipes, setReipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setReipes(data.hits);
    console.log("TCL: getRecipes -> data.hits", data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value)

    console.log("TCL: App -> search", search)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }


  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>

      </form>
      <div className="recipes">
        {recipes.map(recipe => (
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
}

export default App;