document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById("search");
    const countriesContainer = document.querySelector(".results-wrapper");
    const countryTemplate = document.getElementById("country-template").innerHTML;

    Mustache.parse(countryTemplate);

    const searchCountries = () => {
        const inputValue = document.getElementById("input").value;
        const url = `https://restcountries.eu/rest/v2/name/${inputValue.length ? inputValue : "poland"}`;

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                searchBtn.classList.remove("pending");
                if (!!response) {
                    countriesContainer.innerHTML = "";
                    displayResults(response);
                    document.getElementById("input").value = "";
                }
            })
            .catch(() => {
                console.error("Error:", "No country found");
            });
    };

    const displayResults = results => {
        results.forEach(result => new Country(result));
    };

    function Country(countryData) {
        this.render = countriesContainer.insertAdjacentHTML(
            "beforeend",
            Mustache.render(countryTemplate, {
                name: countryData.name,
                flag: countryData.flag,
                language: countryData.languages[0].name,
                currency: countryData.currencies[0].name,
                capital: countryData.capital
            })
        );
    }

    searchBtn.addEventListener("click", function() {
        this.classList.add("pending");
        searchCountries();
    });
});
