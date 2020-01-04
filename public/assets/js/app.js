//Get Articles as JSON
$.getJSON("/articles", function(data) {
    for (let i = 0; i < data.lenghth; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

//Click Events

//Get Article
$(document).on("click", "p", function() {
    $('#notes').empty();

    let thisId = $(this).attr('data-id');

    //AJAX Call for Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        .then(function(data) {
            console.log(data);
            $('#notes').append("<h2>" + data.title + "</h2>");
            $('#notes').append("<input id='titleinput' name='title >");
            $('#notes').append("<textarea id='bodyinput' name='body'></textarea>");
            $('#notes').append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            if (data.note) {
                $('#titleinput').val(data.note.title);
                $('#bodyinput').val(data.note.body);
            }
        });
});

//Save Button
$(document).on('click', '#savenote', function() {
    let thisId = $(this).attr('data-id');

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $('#titleinput').val(),
            body: $('#bodyinput').val()
        }
    })
        .then(function(data) {
            console.log(data);
            $('#notes').empty();
        });

        $('#titleinput').val('');
        $('#bodyinput').val('');
})