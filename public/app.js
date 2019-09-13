$.get('/scrape', data => {
    for (let i = 0; i < data.length; i++) {
        $("#article").append("<p article-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }

})

$.getJSON("/article", function (data) {
    for (let i = 0; i < data.length; i++) {
        $("#note").append("<p note-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");

    }
});

$(document).on("click", "p", function () {
    $("#note").empty();
    const thisId = $(this).attr("notes-id");

    $.ajax({
        method: "GET",
        url: "/article/" + thisId
    }).then(function (data) {
        console.log(data);

        $("#note").append("<h2>" + data.title + "</h2>");
        $("#note").append("<input id ='titleInput' name='title' />");
        $("#note").append("<textarea id='bodyInput' name='body'></textarea>");
        $("#note").append("<button notes-id='" > + data._id + " 'id='savenote'>Click here to save note</button>");

        if (data.note) {
            $("#titleInput").val(data.note.title);
            $("#bodyInput").val(data.note.body);
        }
    });
});

$(document).on("click", "#savenote", function () {
    const thisId = $(this).attr("note-id");

    $.ajax({
        method: "POST",
        url: "/article/" + thisId,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    }).then(function (data) {
        console.log(data);
        $("#note").empty();
    });

    $("#titleInput").val("");
    $("#bodyInput").val("");
});

