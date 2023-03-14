window.onload = function(){
    
    function sorteaza(semn){
        var produse=document.getElementsByClassName("revista");
        var v_produse=Array.from(produse);


        v_produse.sort(function(a,b){
            var pret_a=(parseFloat(a.getElementsByClassName("val-nrpagini")[0].innerHTML))/(parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML));
            var pret_b=(parseFloat(b.getElementsByClassName("val-nrpagini")[0].innerHTML))/(parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML));
            return (pret_a-pret_b)*semn;
        })
        for (let produs of v_produse){
            produs.parentNode.appendChild(produs);
        }       
    }

    document.getElementById("i_rad1").checked=function(){
        sorteaza(document.getElementById("i_rad1").value());
    }
    document.getElementById("i_rad2").checked=function(){
        sorteaza(document.getElementById("i_rad2").value());
    }

}