const dropList = document.querySelectorAll(".drop select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (let currencyCode in countryCode) {
    let selected;
    if (i === 0) {
      selected = currencyCode === "USD" ? "selected" : "";
    } else if (i === 1) {
      selected = currencyCode === "JPY" ? "selected" : "";
    }
    // * creating option tag with passing currencyCode as a text and value
    let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;

    // * inserting options tag inside select tag
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }

  // * changing the flag
  dropList[i].addEventListener("change", (e) => {
    // * calling the loadFlag with passing target element as argument.
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (let code in countryCode) {
    if (code === element.value) {
      // * if currency code is equal to option value
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagsapi.com/${countryCode[code]}/flat/64.png`;
    }
  }
}

// get the exchange currency when reload
window.addEventListener("load", () => {
  exchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault(); //* prevent form from submitting
  exchangeRate();
});

// swap the place using arrow icon
const exchangeIcon = document.querySelector(".drop .icon");
exchangeIcon.addEventListener("click", () => {
  // * currency code of FROM in the tempCode variable.
  let tempCode = fromCurrency.value;

  // * passing TO currency code to FROM currency code.
  fromCurrency.value = toCurrency.value;

  // * passing the tempCode value to the TO currency code.
  toCurrency.value = tempCode;

  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  exchangeRate();
});

function exchangeRate() {
  const amount = document.querySelector(".amount input");

  let amountVal = amount.value;
  if (amountVal === "" || amountVal === "0") {
    amount.value = "1";
    amountVal = 1;
  }

  let exchangeTxt = document.querySelector(".exchange-rate");
  exchangeTxt.innerText = "Getting the exchange rate...";

  getExchange(amountVal);
}

const getExchange = async (amountVal) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const res = await axios.get(`https://v6.exchangerate-api.com/v6/35fe8031bfe4e0c6256b3282/latest/${fromCurrency.value}`, config);
    let rate = res.data.conversion_rates[toCurrency.value];

    let totalExchangeRate = (amountVal * rate).toFixed(2);
    const exchangeTxt = document.querySelector(".exchange-rate");
    exchangeTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;

    // xhuhx
    console.log(res);
  } catch (error) {
    console.error("An error occurred:", error);
    const exchangeTxt = document.querySelector(".exchange-rate");
    exchangeTxt.innerText = "An error occurred while fetching the exchange rate.";
  }
};
