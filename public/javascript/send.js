$(document).ready(function () {
    $('#original_url').on('input', function () {
        var url = new String($('#original_url').val());
        $('#embed_url').val('https://www.youtube.com/embed/' + url.substr(32) + '?modestbranding=0;feature=oembed&controls=0;&showinfo=0;&rel=0&frameborder=0&allowfullscreen=allowfullscreen' );
        $('#iframe_code').val('<iframe src="https://www.youtube.com/embed/' + url.substr(32) + 'feature=oembed&showinfo=0" frameborder="0"  "></iframe');
        $('#show_video').append('<iframe src="https://www.youtube.com/embed/' + url.substr(32) +' "></iframe>' )
    })


    $(document).on('click', '#search', function () {
        $('#list').empty();
        var data = {
            'date_start': $('#date_start').val(),
            'date_end': $('#date_end').val()
        };
        $.ajax({
            url: "http://localhost:3000/get_data",
            type: "POST",
            dataType: 'json',
            data: data,
            success: function (data) {
                for (index = 0; index < data.result.length; index++) {
                    $('#list').prepend('<span id=' + data.result[index]._id + '>' + data.result[index].name +
                        '  ' + data.result[index].date.toString().substr(0, 10) + '</span><br>');
                }
            },
        });
    })

    $(document).on('click', 'span', function (e) {
        $.ajax({
            url: "http://localhost:3000/get_dataByID",
            type: "POST",
            dataType: 'json',
            data: {
                'id': e.target.id
            },
            success: function (data) {
                $('#name').val(data.result.name);
                $('#embed_url').val(data.result.embed_url);
                $('#iframe_code').val(data.result.iframe_code);
            },
        });
    });

    $("#image-form").on('submit', (function (e) {
        e.preventDefault();
        var data = new FormData();
        var date = new Date().toLocaleDateString();
        data.append("file", $("#file").get(0).files[0]);
        data.append('name', $('#name').val());
        data.append('embed_url', $('#embed_url').val());
        data.append('iframe_code', $('#iframe_code').val());
        data.append('date', date);
        $.ajax({
            url: "http://localhost:3000/uploads",
            enctype: 'multipart/form-data',
            type: "POST",
            dataType: 'json',
            data: data,
            contentType: false,
            processData: false,
            success: function () {},
            error: function () {}
        });
    }));
})