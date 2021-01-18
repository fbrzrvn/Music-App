export function render() {
    const searchContainer = $(
        "<section class='searchContainer__section'></section>"
    );

    const selectTypeSearch = renderSelectTypeSearch();

    const selectCountries = renderSelectCountries();

    const selectExplicit = renderSelectExplicit();

    const selectLimit = renderSelectLimit();

    const searchBar = renderInputSearchBar();

    searchContainer.append(selectTypeSearch);
    searchContainer.append(selectCountries);
    searchContainer.append(selectExplicit);
    searchContainer.append(selectLimit);
    searchContainer.append(searchBar);
    $("body").append(searchContainer);
}

function renderSelectTypeSearch() {
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
    div.append(label);
    div.append(select);
    return div;
}

function renderSelectCountries() {
    let div = $("<div class='formSection__div '>");
    let label = $("<label>").text("Select Type of Search:");
    let select = $("<select class='dropdown'></select>");
    addCountries().then(function (json) {
        $.each(json, function (index, item) {
            select.append(
                $("<option>", {
                    value: item.a2,
                    text: item.nameCurrentValue,
                })
            );
        });
    });
    div.append(label);
    div.append(select);
    return div;
}

function renderSelectExplicit() {
    let div = $("<div class='formSection__div '>");
    let label = $("<label>").text("Select Type of Search:");
    let select = $("<select class='dropdown'></select>");
    select.append(new Option("Yes", true));
    select.append(new Option("No", false));
    div.append(label);
    div.append(select);
    return div;
}

function renderSelectLimit() {
    let div = $("<div class='formSection__div '>");
    let label = $("<label>").text("Select Type of Search:");
    let select = $("<select class='dropdown'></select>");
    select.append(new Option("50", 50));
    select.append(new Option("50", 100));
    select.append(new Option("50", 150));
    select.append(new Option("50", 200));
    div.append(label);
    div.append(select);
    return div;
}

function renderInputSearchBar() {
    let div = $("<div class='formSection__div '>");
    let label = $("<label>").text("Select Type of Search:");
    let searchBar = $(
        "<input type='text' class='input searchBar__input'></input>"
    );
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
