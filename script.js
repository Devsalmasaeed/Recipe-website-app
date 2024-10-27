// Fetch chicken data from the API using an arrow function
const fetchMeals = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
        const data = await response.json();
        
        if (data.meals) {
            displayMeals(data.meals);
        } else {
            document.getElementById('meal-list').innerHTML = '<p>No meals found.</p>';
        }
    } catch (error) {
        console.error('Error fetching meal data:', error);
        document.getElementById('meal-list').innerHTML = '<p>Failed to fetch meal data. Please try again later.</p>';
    }
}


const displayMeals = (meals) => {
    const mealList = document.getElementById('meal-list');
    
    mealList.innerHTML = ''; 

    meals.forEach(meal => {
        const ingredients = getIngredients(meal);
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');

        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
            <h2 class="meal-title">${meal.strMeal}</h2>
            <p class="meal-description">${meal.strInstructions.substring(0, 200)}...</p>
            <ul class="meal-ingredients">
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${meal.strYoutube}" target="_blank" class="meal-video-link">Watch Video</a>
        `;

        mealList.appendChild(mealCard);
    });
}


const getIngredients = (meal) => {
    let ingredients = [];
    for (let i = 1; i <= 6; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
        
    }
    return ingredients;
}



fetchMeals();