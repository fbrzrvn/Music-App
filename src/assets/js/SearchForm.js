export function render() {
    const searchContainer = $(
        "<section class='searchContainer__section'></section>"
    );

    const selectTypeSearch = $("<select class='type'></select>");
    $.each(addOptions(), function (index, item) {
        selectTypeSearch.append(
            $("<option>", {
                value: item.value,
                text: item.text,
                selected: item.selected,
            })
        );
    });

    const selectCountries = $("<select class='countries'></select>");
    addCountries().then(function (json) {
        $.each(json, function (index, item) {
            selectCountries.append(
                $("<option>", {
                    value: item.a2,
                    text: item.nameCurrentValue,
                })
            );
        });
    });

    const selectExplicit = $("<select class='explicit'></select>");
    selectExplicit.append(new Option("Yes", true));
    selectExplicit.append(new Option("No", false));

    const selectLimit = $("<select class='limit'></select>");
    selectLimit.append(new Option("50", 50));
    selectLimit.append(new Option("50", 100));
    selectLimit.append(new Option("50", 150));
    selectLimit.append(new Option("50", 200));

    const searchBar = $("<input type='text'></input>");

    searchContainer.append(selectTypeSearch);
    searchContainer.append(selectCountries);
    searchContainer.append(selectExplicit);
    searchContainer.append(selectLimit);
    searchContainer.append(searchBar);
    $("body").append(searchContainer);
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
            selected: true,
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
