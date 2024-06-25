const dropList = document.querySelectorAll(".drop select");

for (let i = 0; i < dropList.length; i++) {
  for (currencyCode in countryCode) {
    // * creating option tag with passing currencyCode as a text and value
    let optionTag = `<option value="${currencyCode}">${currencyCode}</option>`;

    // * inserting options tag inside select tag
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
}
