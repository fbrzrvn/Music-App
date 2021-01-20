import { getData } from "./api.js";

let searchState = {
    type: "song",
    country: "US",
    explicit: "",
    limit: "",
    searchQuery: "",
};

export function render() {
    const searchContainer = $(
        "<section class='searchContainer__section'></section>"
    );

    const TypeSearch = renderTypeSearch();
    const Countries = renderCountries();
    const Explicit = renderExplicit();
    const Limit = renderLimit();
    const searchBar = renderSearchBar();

    searchContainer.append(TypeSearch);
    searchContainer.append(Countries);
    searchContainer.append(Explicit);
    searchContainer.append(Limit);
    searchContainer.append(searchBar);
    $("body").append(searchContainer);
}

function renderTypeSearch() {
    let div = $("<div class='formSection__div '>");
    let label = $("<label>").text("Select Type of Search:");
    let select = $("<select class='dropdown dropdownType__select'></select>");
    $.each(addOptions(), function (index, item) {
        select.append(
            $("<option>", {
                value: item.value,
                text: item.text,
                selected: item.selected,
            })
        );
    });
    select.on("change", function (e) {
        searchState.type = this.value;
        getData(searchState);
    });
    div.append(label);
    div.append(select);
    return div;
}

function renderCountries() {
    let div = $("<div class='formSection__div '>");
    let label = $("<label>").text("Select Type of Search:");
    let select = $("<select class='dropdown'></select>");
    addCountries()
        .then(function (json) {
            $.each(json, function (index, item) {
                select.append(
                    $("<option>", {
                        value: item.a2,
                        text: item.nameCurrentValue,
                    })
                );
            });
        })
        .then(function () {
            select.val("US");
        });

    select.on("change", function (e) {
        searchState.country = this.value;
        getData(searchState);
    });
    div.append(label);
    div.append(select);
    return div;
}

function renderExplicit() {
    let div = $("<div class='formSection__div '>");
    let label = $("<label>").text("Select Type of Search:");
    let select = $("<select class='dropdown'></select>");
    select.append(new Option("Yes", "Yes"));
    select.append(new Option("No", "No"));
    select.on("change", function (e) {
        searchState.explicit = this.value;
        getData(searchState);
    });
    div.append(label);
    div.append(select);
    return div;
}

function renderLimit() {
    let div = $("<div class='formSection__div '>");
    let label = $("<label>").text("Select Type of Search:");
    let select = $("<select class='dropdown'></select>");
    select.append(new Option("50", "50"));
    select.append(new Option("100", "100"));
    select.append(new Option("150", "150"));
    select.append(new Option("200", "200"));
    select.on("change", function (e) {
        searchState.limit = this.value;
        getData(searchState);
    });
    div.append(label);
    div.append(select);
    return div;
}

function renderSearchBar() {
    let div = $("<div class='formSection__div '>");
    let label = $("<label>").text("Select Type of Search:");
    let searchBar = $(
        "<input type='text' class='input searchBar__input'></input>"
    );
    searchBar.on("blur", function (e) {
        searchState.searchQuery = this.value;
        getData(searchState);
    });
    div.append(label);
    div.append(searchBar);
    return div;
}

function addOptions() {
    return [
        {
            value: "song",
            text: "Song",
            selected: true,
        },
        {
            value: "musicArtist",
            text: "Artist",
            selected: false,
        },
        {
            value: "album",
            text: "Albums",
            selected: false,
        },
        {
            value: "musicVideo",
            text: "Music Videos",
            selected: false,
        },
    ];
}

function addCountries() {
    return fetch(
        "https://www.liferay.com/api/jsonws/country/get-countries/"
    ).then(function (response) {
        return response.json();
    });
}
