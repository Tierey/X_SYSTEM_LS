
$(function() {
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);
    $('#btn').on('click',function(e){

        ___browserSync___.socket.emit('click',{
            filename,
            id:$(this).attr('id')
        });
    })
});