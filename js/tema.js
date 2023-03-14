window.addEventListener("DOMContentLoaded", function(){
    temacurenta=localStorage.getItem("tema")
    if(temacurenta)
        document.body.classList.add(temacurenta);
    document.getElementById("tema").onclick=function(){
        if(document.body.classList.contains("dark")){
            document.body.classList.remove("dark");
            localStorage.removeItem("tema");
        }
        else{
            document.body.classList.add("dark");
            localStorage.setItem("tema","dark");
        }
    }
});