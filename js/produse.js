window.addEventListener("load", function(e){

    this.document.getElementById("inp-pret").onchange=function(){
        document.getElementById("infoRange").innerHTML=`${this.value}`
    }

    document.getElementById("filtrare").onclick=function(){
        condValidare = true;
       var inpNume=document.getElementById("inp-nume").value.toLowerCase().trim();
       condValidare = condValidare && inpNume.match(new RegExp("^[a-zA-Z0-9]*$"))
       if(!condValidare){
        alert("Wrong Input!");
        return;
       }
       var inpCategorie=document.getElementById("inp-categorie").value; 

       var produse=document.getElementsByClassName("produs");
       for (let produs of produse){
            var cond1=false;
            var cond2=false;
            var cond3 = false;

            produs.style.display="none";

            let nume = produs.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase().trim();
            let autor = produs.getElementsByClassName("val-autor")[0].innerHTML.toLowerCase().trim();
            let categorie = produs.getElementsByClassName("val-categorie")[0].innerHTML;

            if(nume.includes(inpNume)){
                cond1 = true;
            }
            if(autor.includes(inpNume)){
                cond2 = true;
            }//CUMMM BAG IN IF??
            if(inpCategorie=="toate" || categorie==inpCategorie){
                cond3 = true;
            }

            if((cond1 || cond2) && cond3){
                produs.style.display="block";
            }
       }
    }
    document.getElementById("resetare").onclick=function(){
        var produse=document.getElementsByClassName("produs");
        for (let produs of produse){
            produs.style.display="block";
        }
        document.getElementById("inp-nume").value="";
        document.getElementById("sel-toate").selected=true;
   }
   document.getElementById("sortCrescNume").onclick=function(){
        var produse=document.getElementsByClassName("produs");
        var v_produse=Array.from(produse);
        v_produse.sort(function(a,b){
            var pret_a=parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
            var pret_b=parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
            if(pret_a==pret_b){
                var nume_a=a.getElementsByClassName("val-nume")[0].innerHTML;
                var nume_b=b.getElementsByClassName("val-nume")[0].innerHTML;
                return nume_a.localeCompare(nume_b);
            }
            return pret_a-pret_b;
        })
        for (let produs of v_produse){
            produs.parentNode.appendChild(produs);
        }
   }
   document.getElementById("sortDescrescNume").onclick=function(){
        var produse=document.getElementsByClassName("produs");
        var v_produse=Array.from(produse);
        v_produse.sort(function(a,b){
            var pret_a=parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
            var pret_b=parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
            if(pret_a==pret_b){
                var nume_a=a.getElementsByClassName("val-nume")[0].innerHTML;
                var nume_b=b.getElementsByClassName("val-nume")[0].innerHTML;
                return -nume_a.localeCompare(nume_b);
            }
            return pret_b-pret_a;
        })
        for (let produs of v_produse){
            produs.parentNode.appendChild(produs);
        }
    }
    window.onkeydown=function(e){
        if(e.key=='c' && e.altKey){
            var produse=document.getElementsByClassName("produs");
            let suma = 0;
            for (let prod of produse){
                if(prod.style.display != "none")
                    suma+=parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);
            }
            if(!document.getElementById("rezultat")){
                rezultat=document.createElement("p");
                rezultat.id="rezultat";
                rezultat.innerHTML="<b>Total Price: </b>"+suma;
                var ps=document.getElementById("p-suma");
                ps.parentNode.insertBefore(rezultat, ps.nextSibling);
                rezultat.onclick=function(){
                    this.remove();
                }
                setTimeout(function(){
                    document.getElementById("rezultat").remove();
                }, 2000);
            }
        }
    }
});