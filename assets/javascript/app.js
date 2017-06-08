/* 
 Bernard Williams
 UCF Bootcamp APR2017 Week 5
 Trivia Game
 */
var gifs = [];
var offset = 0;
var categories = ['MILF', 'American Pie', 'Stifflers Mom', 'One time at Band Camp'];
var newCategory = '';
var btnArray = [];

$(document).ready(function () {


    function runSearch() {

        //var queryURL = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC ";

        var q = $(this).val();
        var l = $('#limit option:selected').text();
        var r = $('#rating option:selected').text();

        queryURL = "http://api.giphy.com/v1/gifs/search?q=" + q + "&limit=" + l + "&rating=" + r + '&api_key=dc6zaTOxFJmzC&offset=' + offset;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            gifs = response.data;
            loadPics();
        });
    }

    $('#submit').click(addButton);


    function loadPics() {
        //Once the document is loaded check the config file and add a media object for each player in the config file
        $("#searchResults").empty();

        var resultsNav = $('<div>');
        var nextLink = $('<a>');
        var prevLink = $('<a>');
        nextLink.attr('id', 'next');
        nextLink.text('Next >>');
        prevLink.attr('id', 'prev');
        prevLink.text('<< Prev');

        if (offset > 0) {
            resultsNav.append(prevLink);
        }

        resultsNav.append(nextLink);

        $("#searchResults").append(resultsNav);

        $('#next').bind('click', function () {
            offset++
            runSearch();
        });
        $('#prev').bind('click', function () {
            console.log('This isnt working');
            offset--;
            runSearch();
        });

        for (var index = 0; index < gifs.length; index++) {
            var picture = gifs[index];
            console.log("------------------------------------");
            console.log(picture);

            //Create a new media object for each picture in the result set.
            var newPicElement = $("<div>");
            newPicElement.addClass("media player");
            newPicElement.attr("id", gifs[index].id);

            var newMediaLeft = $("<div>");
            newMediaLeft.addClass("media-left");
            var newMediaImage = $("<img>");
            newMediaImage.addClass("media-object media-image");
            newMediaImage.attr("src", gifs[index].images.fixed_height_small.url);
            newMediaLeft.append(newMediaImage);

            var newMediaBody = $("<div>");
            newMediaBody.addClass("media-body");

            //Generate heading
            var newMediaHeading = $("<h5>");
            newMediaHeading.addClass("media-heading");
            newMediaHeading.text(gifs[index].name);
            var ratingLabel = $("<span id='rating'>");


            var rating = gifs[index].rating
            //Select color based on rating
            if (rating = 'g') {
                ratingLabel.addClass("badge healthPoints badge-success");
            } else if (rating = 'r') {
                ratingLabel.addClass("badge healthPoints badge-danger");
            } else if (rating = 'pg') {
                ratingLabel.addClass("badge healthPoints badge-warning");
            }

            ratingLabel.text('Rated: ' + rating.toUpperCase());
            newMediaHeading.append(ratingLabel);


            var newMediaText = $("<p>");
            newMediaText.text('Source of File: ' + gifs[index].source);


            newMediaBody.append(newMediaHeading);
            newMediaBody.append(newMediaText);
            newPicElement.append(newMediaLeft);
            newPicElement.append(newMediaBody);

            $("#searchResults").append(newPicElement);

            //Put a border around the character panel

        }
    }

    function loadButtons() {

        console.log('this is the load buttons function')
        $('#buttonsArea').empty();

        // Loop through the array of categories, then generate buttons for each category in the array
        for (var i = 0; i < categories.length; i++) {
            var newBtn = $('<button>');
            newBtn.attr('type', "button");
            newBtn.attr('id', i);
            newBtn.attr('value', categories[i]);
            newBtn.text(categories[i]);
            newBtn.on('click', runSearch);
            console.log(categories);
            $('#buttonsArea').append(newBtn);
        }
    }

    function addButton() {
        console.log('Add button functionality has been declared')
        var category = $('#addCategory').val().trim();

        if (category.length > 0) {
            categories.push(category);
            loadButtons();
        }

    }

    loadButtons();
    console.log(categories);
});

