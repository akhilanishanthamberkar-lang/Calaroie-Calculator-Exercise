const form = document.querySelector('#calorie-form');
const errorMessage = document.querySelector('#form-error');

function roundCalories(value) {
  return Math.round(value / 10) * 10;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  errorMessage.textContent = '';

  const age = Number(form.elements.age.value);
  const height = Number(form.elements.height.value);
  const weight = Number(form.elements.weight.value);
  const gender = form.elements.gender.value;
  const activity = Number(form.elements.activity.value);

  if (!age || !height || !weight || !gender || !activity) {
    errorMessage.textContent = 'Please fill in each field to get your estimate.';
    return;
  }
  if (age < 15 || age > 100 || height < 120 || height > 230 || weight < 35 || weight > 300) {
    errorMessage.textContent = 'Check your entries: age 15–100, height 120–230 cm, and weight 35–300 kg.';
    return;
  }

  // Mifflin–St Jeor resting energy estimate; a midpoint is used when no equation is selected.
  const genderAdjustment = gender === 'male' ? 5 : gender === 'female' ? -161 : -78;
  const restingCalories = (10 * weight) + (6.25 * height) - (5 * age) + genderAdjustment;
  const maintenance = roundCalories(restingCalories * activity);

  document.querySelector('#maintain-result').textContent = maintenance.toLocaleString();
  document.querySelector('#lose-result').textContent = Math.max(1200, roundCalories(maintenance - 500)).toLocaleString();
  document.querySelector('#gain-result').textContent = roundCalories(maintenance + 300).toLocaleString();
  document.querySelector('#results').classList.add('has-results');
});
