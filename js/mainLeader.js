$(document).ready(function(){
    $(document).on('click',"#searchDugme", function(){

        //dohvatanje
        var searchText = $("#searchText").val();
        var greska = false;

        if(searchText==""){
            greska = true;
        }

        //ajax
        if(!greska){
            $.ajax({
                url: "obrada/obradaLeader.php",
                method: "POST",
                datatype: "JSON",
                data: {
                    poslato: true,
                    poslatoText: searchText
                },
                success: function(result){
                    $("#zaPretragu").html(result);
                },
                error: function(xhr){
                    console.log(xhr);
                }
            });
        }
    });

    $(document).on('click',"#resetDugme", function(){
        $.ajax({
            url: "obrada/obradaLeader.php",
            method: "POST",
            datatype: "JSON",
            data: {
                poslatoReset: true
            },
            success: function(result){
                $("#zaPretragu").html(result); 
            },
            error: function(xhr){
                console.log(xhr);
            }
        });
    });
});