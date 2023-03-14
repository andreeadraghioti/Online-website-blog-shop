const express=require("express");
const fs=require("fs");
const sharp=require("sharp");
const {Client}=require("pg");
const ejs=require("ejs");
const sass=require("sass");
var cssBootstrap=sass.compile(__dirname+"/resurse/SCSS/customizare-bootstrap.scss",{sourceMap:true});
fs.writeFileSync(__dirname+"/resurse/CSS/biblioteci/bootstrap-custom.css",cssBootstrap.css);

var client = new Client({database:"laborator",
           user:"andreea",
           password:"andreea",
           host:"localhost",
           port:5432});
client.connect();

client.query("select * from unnest(enum_range(null::categ_produse))", function(err, rez){
    if(err)
        console.log(err);
    else
        console.log(rez)
});

app=express();

app.set("view engine","ejs");

app.use("/resurse",express.static(__dirname+"/resurse"));

// app.use("/node_modules",express.static(__dirname+"/node_modules"));

app.get(["/","/index","/home"],function(req, res){
    console.log("request");
    res.render("pagini/index",{ip: req.ip, imagini:obGlobal.imagini});
});

app.get("/portfolio",function(req, res){
    res.render("pagini/portfolio",{imagini:obGlobal.imagini});
});

app.get("/produse",function(req, res){
    client.query("select * from unnest(enum_range(null::categ_produse))", function(err, rezCateg){
        continuareQuery=""
        if(req.query.tip)
            continuareQuery+=` and product_type='${req.query.tip}'`
        client.query("select * from produse where 1=1"+ continuareQuery, function(err, rez){
            if(err){
                console.log(err);
                renderError(res,2);
            }
            else
                res.render("pagini/produse",{produse:rez.rows, optiuni:rezCateg.rows});
        });
    });
});

app.get("/reviste",function(req, res){
    
        client.query("select * from reviste", function(err, rez){
            if(err){
                console.log(err);
                renderError(res,2);
            }
            else
                res.render("pagini/reviste",{reviste:rez.rows, optiuni:[]});
        });
});

app.get("/produs/:id",function(req, res){
    client.query("select * from produse where id="+req.params.id, function(err, rez){
        if(err){
            console.log(err);
            renderError(res,2);
        }
        else
            res.render("pagini/produs",{prod:rez.rows[0]});
    });
});

app.get("*/galerie-animata.css", function(req, res){
    var sirScss=fs.readFileSync(__dirname+"/resurse/SCSS/galerie_animata.scss").toString("utf8");
    var culori=["navy", "black", "purple", "grey"];
    var indiceAleator=Math.floor(Math.random()*culori.length);
    var culoareAleatoare=culori[indiceAleator];
    rezScss=ejs.render(sirScss,{culoare:culoareAleatoare});
    console.log(rezScss);
    var caleScss=__dirname+"/temp/galerie_animata.scss"
    fs.writeFileSync(caleScss, rezScss);
    try{
        rezCompilare=sass.compile(caleScss,{sourceMap:true});
        var caleCss=__dirname+"/temp/galerie_animata.css";
        fs.writeFileSync(caleCss, rezCompilare.css);
        res.setHeader("Content-Type","text/css");
        res.sendFile(caleCss);
    }
    catch(err){

    }
});

app.get("*/galerie-animata.css.map", function(req, res){
    res.sendFile(path.join(__dirname, "temp/galerie-animata.css.map"));
});

app.get("/*.ejs",function(req, res){
    renderError(res,403);
});

app.get("/*",function(req, res){
    console.log("request");
    res.render("pagini"+req.url, function(err, rezRandare){
        if(err){
            if(err.message.includes("Failed to lookup view"))
                renderError(res,404);
            else{
                
            }
        }
        else{
            res.send(rezRandare);
        }
    });
});

obGlobal={
    erori:null,
    imagini:null
}

function createImages(){
    var continutFisier=fs.readFileSync(__dirname+"/resurse/json/galerie.json").toString("utf-8");
    var obiect=JSON.parse(continutFisier);
    var dim_mediu = 400;
    var dim_mic = 150;
    obGlobal.imagini=obiect.imagini;
    obGlobal.imagini.forEach(function (elem){
        [numeFisier,extensie]=elem.fisier.split(".");
        if(!fs.existsSync(obiect.cale_galerie+"/mediu/")){
            fs.mkdirSync(obiect.cale_galerie+"/mediu/");
        }
        elem.fisier_mediu=obiect.cale_galerie+"/mediu/"+numeFisier+".webp";
        elem.fisier=obiect.cale_galerie+"/"+elem.fisier;
        sharp(__dirname+"/"+elem.fisier).resize(dim_mediu).toFile(__dirname+"/"+elem.fisier_mediu);
    })
    // console.log(obGlobal.imagini);
}
createImages();

function createErrors(){
    var continutFisier=fs.readFileSync(__dirname+"/resurse/json/erori.json").toString("utf-8");
    obGlobal.erori=JSON.parse(continutFisier);
}
createErrors();

function renderError(res,identificator, titlu, text, imagine){
    var eroare = obGlobal.erori.info_erori.find(function(elem){
        return elem.identificator==identificator;
    })
    titlu = titlu || (eroare && eroare.titlu) || obGlobal.erori.eroare_default.titlu;
    text = text || (eroare && eroare.text) || obGlobal.erori.eroare_default.text;
    imagine = imagine || (eroare && obGlobal.erori.cale_baza+"/"+eroare.imagine) || obGlobal.erori.eroare_default.imagine;
    if(eroare && eroare.status){
        res.status(identificator).render("pagini/eroare", {titlu:titlu, text:text, imagine: imagine})
    }
    else{
        res.render("pagini/eroare", {titlu:titlu, text:text, imagine: imagine})
    }
}

app.listen(8080);
console.log("Serverul a pornit");