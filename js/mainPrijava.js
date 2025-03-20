$(document).ready(function(){
    $(document).on('click',"#prijavaDugme", function(){
        //dohvatanje
        var prijavaId = $("#prijavaId").val();
        var prijavaVreme = $("#prijavaVreme").val();
        var prijavaLink = $("#prijavaLink").val();
        var prijavaKomentar = $("#prijavaKomentar").val();
        //regex
        var proveraVreme = /^([0-9]{1,2}):[0-9]{1,2}(:[0-9]{1,2})$/;
        var proveraLink = /^https:\/\/www.youtube.com\/\S{5,30}$/;
        var greska = false;
        var notifikacija = "Greske:";
        //provera
        if(!proveraVreme.test(prijavaVreme)){
            greska = true;
            notifikacija += "\nLos format vremena!"
        }
        if(!proveraLink.test(prijavaLink)){
            greska = true;
            notifikacija += "\nLos format linka!"
        }
        //ajax
        if(!greska){
            $.ajax({
                url: "obrada/obradaPrijava.php",
                method: "POST",
                datatype: "JSON",
                data: {
                    poslato: true,
                    poslatoId: prijavaId,
                    poslatoVreme: prijavaVreme,
                    poslatoLink: prijavaLink,
                    poslatoKomentar: prijavaKomentar
                },
                success: function(result){
                    $("#odgovor").html(`<p>Rezultat: ${result.poruka}</p>`);
                },
                error: function(xhr){
                    console.log(xhr);
                }
            });
        }else{
            alert(notifikacija);
        }
    });
});