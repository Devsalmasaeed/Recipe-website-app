const searchInput = document.getElementById('search');
const formSubmit = document.getElementById('form-submit');
const randomBtn = document.getElementById('random-btn');
const searchKeyword = document.getElementById('search-keyword');
const meals = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');

const searchMeal = async (e) => {
    e.preventDefault();
        const input = searchInput.value.trim();
        searchKeyword.innerHTML = '';
        singleMeal.innerHTML = '';
if (input) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
        const data = await response.json();

    if (data.meals === null) {
        searchKeyword.innerHTML = `There are no search results. Try again!`;
    } else {
        searchKeyword.innerHTML = `<h2>Showing results for: ${input}</h2>`;
        meals.innerHTML = data.meals.map((meal) => `
            <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
                <p class="meal-description">${meal.strInstructions.substring(0, 100)}...</p>
                <button onclick="getMealById(${meal.idMeal})">View Details</button>
            </div>
        </div>
        `).join('');
        searchInput.value = '';
    }
    } catch (err) {
        console.error(err);
    }
} else {
    alert('Please enter a search term.');
}
};

const displayMeal = (mealDetails) => {
    const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            if (mealDetails[`strIngredient${i}`]) {
                ingredients.push(
        `${mealDetails[`strIngredient${i}`]} - ${mealDetails[`strMeasure${i}`]}`
    );
    }
}

singleMeal.innerHTML = `<div class="single-meal">
    <h1>${mealDetails.strMeal}</h1>
    <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}"/>
    <div class="single-meal-info">
        ${mealDetails.strCategory ? `<p>${mealDetails.strCategory}</p>` : ''}
        ${mealDetails.strArea ? `<p>${mealDetails.strArea}</p>` : ''}
    </div>
    <div class="single-meal-details">
        <p>${mealDetails.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        ${mealDetails.strYoutube ? `<a href="${mealDetails.strYoutube}" class="video-link" target="_blank">Watch Video</a>` : ''}
    </div>
</div>`;
};

const getMealById = async (mealID) => {
try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    const data = await response.json();

    displayMeal(data.meals[0]);
    document.querySelector('#single-meal').scrollIntoView({ behavior: 'smooth' });
} catch (err) {
    console.error(err);
}
};

const getRandomMealDetails = async () => {
    searchKeyword.innerHTML = '';
    meals.innerHTML = '';

try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();

    displayMeal(data.meals[0]);
} catch (err) {
    console.error(err);
}
};

formSubmit.addEventListener('submit', searchMeal);
randomBtn.addEventListener('click', getRandomMealDetails);
