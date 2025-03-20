<?php
    @session_start();
    include("../konekcija.php");
    include("../obrada/funkcije.php");
    header("Content-type: application/json");

    if(isset($_POST['poslato'])){
        //uzimanje podataka iz ajaxa
        $obradaUser = $_POST['poslatoUser'];
        $obradaPass = $_POST['poslatoPass'];

        $greska = false;
        $statusKod = "";
        $odgovor = "";
        //regex
        $proveraUser = '/^\S{3,32}$/';
        $proveraPass = '/^\S{8,32}$/';
        //provera
        if(!preg_match($proveraUser, $obradaUser)){
            $greska = true;
        }
        if(!preg_match($proveraPass, $obradaPass)){
            $greska = true;
        }

        if($greska){
            $odgovor = ["poruka" => "Greska u unosu"];
            $statusKod = 422;
        }
        else{
            $upit = "korisnici WHERE userKorisnik = '$obradaUser' AND passKorisnik = '$obradaPass'";
            $tabela = vratiSve($upit);
            if($tabela){
                foreach($tabela as $red){
                    $idKorisnik = $red->idKorisnik;
                    $roleKorisnik = $red->roleKorisnik;
                    $odgovor = ["poruka" => "Good"];
                    $_SESSION['roleK'] = $roleKorisnik;
                    $_SESSION['idK'] = $idKorisnik;
                }
            }else{
                $odgovor = ["poruka" => "Pogresna sifra!"];
            }
        }
        //vracanje odgovora
        echo json_encode($odgovor);
        http_response_code(200);
    }else{
        http_response_code(404);
        header("Location: ../index.php");
    }
?>