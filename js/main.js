const fromSelect = document.querySelector('.currency__from select');
const toSelect = document.querySelector('.currency__to select');
const amountInput = document.querySelector('.currency__amount input');
const convertButton = document.querySelector('.currency__button');
const exchangeButton = document.querySelector('.currency__board-button');
const answer = document.createElement('div');
answer.classList.add('answer');
document.querySelector('.currency__inner').appendChild(answer);

async function fetchExchangeRate(fromCurrency, toCurrency) {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Ошибка при получении данных из API');
    }

    const data = await response.json();
    return data.rates[toCurrency];
}

async function convertCurrency() {
    let fromCurrency = fromSelect.value.trim();
    let toCurrency = toSelect.value.trim();
    let amount = parseInt(amountInput.value.trim());

    // Проверка корректности введенной суммы
    if (!amount || amount <= 0) {
        console.error("Введите корректную сумму для конвертации.");
        answer.textContent = "Ошибка: введите корректную сумму.";
        amountInput.classList.add('input-error');
        setTimeout(() => {
            amountInput.classList.remove('input-error');
        }, 500);
        return;
    }
    // Получение курса валют
    const exchangeRate = await fetchExchangeRate(fromCurrency, toCurrency);
    console.log(exchangeRate);

    // Конвертация
    let convertedAmount = (amount * exchangeRate).toFixed(2);

    // Обновление текста ответа
    answer.textContent = `Конвертация: ${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}

convertButton.addEventListener('click', convertCurrency);

exchangeButton.addEventListener('click', () => {
    // Обмен значений между полями FROM и TO
    const fromValue = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = fromValue;
});