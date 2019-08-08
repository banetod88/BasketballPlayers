$(document).ready(function () {

	var host = window.location.host;
	var token = null;
	var formAction = "Create";

	$("body").on("click", "#btnDelete", obrisiKosarkasa);
	$("body").on("click", "#btnEdit", izmeniKosarkasa);
	//$("body").on("click", "#arhivirajSadrzaj", arhivirajSadrzaj);
	$("body").on("click", "#izmeniSadrzaj", izmeniSadrzaj);
	$("body").on("click", "#odustaniSadrzaj", odustajanjeOdIzmeneSadrzaja);
	$("body").on("click", "#arhivirajSadrzaj", arhivirajSadrzaj);
	$("body").on("click", "#povratakIzArhiveLink", povratakIzArhive);
	$("body").on("click", "#posaljiIzmeneSadrzaja", posaljiIzmeneSadrzaja);
	$("body").on("click", "#dodajNoviSadrzajButton", dodajNoviSadrzaj);
	$("body").on("click", "#posaljiNoviSadrzaj", posaljiNoviSadrzajUBazu);
	$("body").on("click", "#odustaniNoviSadrzaj", prikaziDodajNoviSadrzaj);
    		
	//$("body").on("click", "#slikaSubmit", uploadSlikeNaServer);

//	function uploadSlikeNaServer(e){


	$('#btnUploadFile').on('click', function () {

      var data = new FormData();

      var files = $("#fileUpload").get(0).files;

      // Add the uploaded image content to the form data collection
      if (files.length > 0) {
           data.append("UploadedImage", files[0]);
      }

      // Make Ajax request with the contentType = false, and procesDate = false
      $.ajax({
           type: "POST",
           url:'http://'+ host +'/api/sadrzaj/uploadSlike',
           contentType: false,
           processData: false,
           data: data
           }).done(function(result) {
            alert(result);
            alert("uspesno nakacena slika");
        }).fail(function(a, b, c) {
            console.log(a, b, c);
            alert("NEUSPESNO nakacena slika");
        });

	});


	$("#pocetnaPrijava").click(
		function(){
			$("#pocetna").css("display", "block");
			$("nav").css("display", "none");
			//$("#prijava").css("display", "block");
			$("#prijava").fadeIn(500);
			$("#registracija").css("display", "none");
			$("#pocetnaPrijava, #pocetnaRegistracija").css("display", "none");
			$("#odjavise").css("display", "none");
		}
	);

	$("#pocetnaRegistracija").click(
		function(){
			$("#pocetna").css("display", "block");
			$("#prijava").css("display", "none");
			$("nav").css("display", "none");
			//$("#registracija").css("display", "block");
			$("#registracija").show(500);
			$("#pocetnaPrijava, #pocetnaRegistracija").css("display", "none");
			$("#odjavise").css("display", "none");
		}
	);

	$("#odustajanjeRegistracija").click(
		function(){
			$("#pocetna").css("display", "block");
			//$("#prijava").css("display", "none");
			//$("#registracija").css("display", "none");
			$("nav").show(500);
			$("#prijava").css("display", "none");
			$("#registracija").css("display", "none");
			$("#pocetnaPrijava, #pocetnaRegistracija").css("display", "inline-block");
			$("#odjavise").css("display", "none");

		}
	);

	$("#odustajanjePrijava").click(
		function(){
			$("#pocetna").css("display", "block");
			//$("#prijava").css("display", "none");
			//$("#registracija").css("display", "none");
			$("nav").show(500);
			$("#prijava").css("display", "none");
			$("#registracija").css("display", "none");
			$("#pocetnaPrijava").css("display", "inline-block");
			$("#pocetnaRegistracija").css("display", "inline-block");
			$("#odjavise").css("display", "none");
		}
	);

	$("#prijavaForm").submit(function(e){
		e.preventDefault();
		var eMail=$("#priEmail").val();
		var pass=$("#priLoz").val();

		var dataForSending = { 
			"username" : eMail,  
			"password" : pass,   
			"grant_type": "password" 
		}
		$.ajax({
			"type": "POST",
			"url": 'http://' + host + "/Token",//  /Token -> on je definisan u StartUp.Auth.cs u 38 liniji koda=>TokenEndpointPath = new PathString("/Token") , i uvek cu gadajti njega
			"data": dataForSending, 
			"headers": {}     
		})
		.done(function(data){
			console.log(data);
			token=data.access_token;
			dobaviKosarkase();
			$("#pocetna").css("display", "none");
			$("#pocetna2").css("display", "none");
			$("#prijava").css("display", "none");
			$("#registracija").css("display", "none");
			$("#tabelaSadrzaj").css("display", "block");
			$("#pretraga").css("display", "block");
			$("#odjava").css("display", "block");
			$("#dodavanje").css("display", "block");
			$("#divArhivaLink").css("display", "block");
			$("#pocetnaPrijava, #pocetnaRegistracija").css("display", "none");
			$("nav").css("display", "block");
			$("#odjavise").css("display", "inline-block"); 
			$("#arhivaLink").css("display", "inline-block");  
			$("#pretraga_dodavanjeWrapper").css("display", "block");
			dobaviKlubove();
			dodavanjeSadrzaja();
		})
		.fail(function(){
			alert("ne valjaju akredencijali");
		})
	});

	$("#odjavise").click(function () {
        token = null;//AKO SE ODJAVLJUJEM TOKEN POSTAJE NULL
        headers = {};//ZAGLAVLJA POSTAJU PRAZNA

			$("#pocetna").css("display", "block");
			$("#pocetna2").css("display", "none");
			$("#prijava").css("display", "none");
			$("#registracija").css("display", "none");
			$("#tabelaSadrzaj").css("display", "block");
			$("#pretraga").css("display", "none");
			$("#odjava").css("display", "none");
			$("#odjavise").css("display", "none");
			$("#arhivaLink").css("display", "none");
			$("#dodavanje").css("display", "none");
			$("#pretraga_dodavanjeWrapper").css("display", "none");
			$("#pocetnaPrijava, #pocetnaRegistracija").css("display", "inline-block");
		dodavanjeSadrzaja();
        refreshTable();
    });

	$("#pretraga").submit(function(e){
			e.preventDefault();
			var minBrUt=$("#pretragaNajmanje").val();
			var maxBrUt=$("#pretragaNajvise").val();

			var dataForSending = { 
			"najmanje" : minBrUt,  
			"najvise" : maxBrUt   
			}
		
			$.ajax({
			"type": "POST",
			"url": 'http://' + host + "/api/pretraga",//  /Token -> on je definisan u StartUp.Auth.cs u 38 liniji koda=>TokenEndpointPath = new PathString("/Token") , i uvek cu gadajti njega
			"data": dataForSending, 
			"headers":{Authorization: "Bearer "+ token}   

			}).done(function(data){

			var $container = $("#tabelaSadrzaj");
        	$container.empty(); 

        	var div = $("<div id=tabelaWrapper></div>");
            var h1 = $("<h1>Košarkaši</h1>");
            div.append(h1);

            var table = $("<table></table>"); //class='table table-bordered table-sm event-table'
	            if(token){
					var header = $("<tr><th>Ime i prezime</th><th>Godina rođenja</th><th>Klub</th><th>Utakmice</th><th>Poeni</th><th>Akcija-Obriši</th><th>Akcija-Izmeni</th></tr>");
	            }else{var header = $("<tr><th>Ime i prezime</th><th>Godina rođenja</th><th>Klub</th><th>Utakmice</th><th>Poeni</th></tr>");}
            
            table.append(header);
            for (i=0; i<data.length; i++)
            {

                var row = "<tr>";
                var displayData = "<td>" + data[i].KosarkasImeIPrezime + "</td><td>" + data[i].KosarkasGodinaRodjenja + "</td><td>" + data[i].kosarkaskiKlub.KosarkaskiKlubNaziv + "</td><td>" + data[i].KosarkasBrojUtakmica  + "</td><td>" + data[i].KosarkasProsecanBrojPoena  + "</td>";

	                if(token){
		               var stringId = data[i].KosarkasId.toString();
	  	               var displayDelete = "<td><button id=btnDelete name=" + stringId + ">Obriši</button></td>";
		               var displayEdit = "<td><button id=btnEdit name=" + stringId + ">Izmeni</button></td>";
		               row += displayData + displayDelete + displayEdit + "</tr>";  
		                 
					}else{
						row +=displayData+"</tr>";
					}

				table.append(row);
 			}

			div.append(table)
            $container.append(div);


		}).fail(function(){alert("Ne mogu dobaviti kosarkaše");})
	});

//#################FUNKCIJA ZA DOABVLJANJE 

	function dobaviKlubove(){
		$.ajax({
			"type":"GET",
			"url":'http://'+ host +'/api/klubovi/'
			//"headers": headers

		}).done(function(data){
			var $klub = $("#dodavanjeKlub");
			   	$klub.empty(); 

	        	//var select = $("<select></select>");//OBRISI POSLE AKO NE TREBA
	        	var allOptions="";
	        	for(i=0; i<data.length; i++){
	        		var option = "<option value="+data[i].KosarkaskiKlubId+">"+data[i].KosarkaskiKlubNaziv+"</option>";
	        		allOptions += option;
	        	}
	 //       	select.append(allOptions); OBRISI POSLE AKO BRISAO I VAR SELECT
	        	$klub.append(allOptions);
	})};

	function dobaviKosarkase(){
		
		var headers ={};
		if (token){
			headers ={"Authorization":"Bearer " + token}
		}

		
		$.ajax({
			"type":"GET",
			"url":'http://'+ host +'/api/kosarkasi/',
			"headers": headers

		}).done(function(data){

			var $container = $("#tabelaSadrzaj");
        	$container.empty(); 

        	var div = $("<div id=tabelaWrapper></div>");
            var h1 = $("<h1>Košarkaši</h1>");
            div.append(h1);

            var table = $("<table></table>"); //class='table table-bordered table-sm event-table'
	            if(token){
					var header = $("<tr><th>Ime i prezime</th><th>Godina rođenja</th><th>Klub</th><th>Utakmice</th><th>Poeni</th><th>Akcija-Obriši</th><th>Akcija-Izmeni</th></tr>");
	            }else{var header = $("<tr><th>Ime i prezime</th><th>Godina rođenja</th><th>Klub</th><th>Utakmice</th><th>Poeni</th></tr>");}
            
            table.append(header);
            for (i=0; i<data.length; i++)
            {

                var row = "<tr>";
                var displayData = "<td>" + data[i].KosarkasImeIPrezime + "</td><td>" + data[i].KosarkasGodinaRodjenja + "</td><td>" + data[i].kosarkaskiKlub.KosarkaskiKlubNaziv + "</td><td>" + data[i].KosarkasBrojUtakmica  + "</td><td>" + data[i].KosarkasProsecanBrojPoena  + "</td>";

	                if(token){
		               var stringId = data[i].KosarkasId.toString();
	  	               var displayDelete = "<td><button id=btnDelete name=" + stringId + ">Obriši</button></td>";
		               var displayEdit = "<td><button id=btnEdit name=" + stringId + ">Izmeni</button></td>";
		               row += displayData + displayDelete + displayEdit + "</tr>";  
		                 
					}else{
						row +=displayData+"</tr>";
					}

				table.append(row);
 			}

			div.append(table)
            $container.append(div);


		}).fail(function(){alert("Ne mogu dobaviti košarkaše");})
	};

//#################FUNKCIJA ZA brisanje 
	function obrisiKosarkasa() {
		if(token){

				// izvlacimo {id}
				var deleteID = this.name;
				// saljemo zahtev 
				$.ajax({
					"url":'http://'+ host +'/api/kosarkasi/'+ deleteID.toString(),
					type: "DELETE",
					headers:{Authorization: "Bearer "+ token}
				})
				.done(function(data, status){
					refreshTable();
				})
				.fail(function(data, status){
					alert("Desila se greška!");
					});

		}else{alert("Niste prijavljeni");}
	};

//#################FUNKCIJA ZA MENANJE 
	function izmeniKosarkasa(){
		var editId = this.name;

		$.ajax({
			"url":'http://'+ host +'/api/kosarkasi/' + editId.toString(),
			type: "GET",
		})
		.done(function(data, status){
			$("#izmenaImeIPrezime").val(data.KosarkasImeIPrezime);
			$("#izmenaGodinaRodjenja").val(data.KosarkasGodinaRodjenja);
			$("#izmenaBrojUtakmica").val(data.KosarkasBrojUtakmica);
			$("#izmenaBrojPoena").val(data.KosarkasProsecanBrojPoena);
			$("#dodavanjeKlub").val(data.KosarkaskiKlubId)
			editingId = data.KosarkasId;
			formAction = "Update";
		})
		.fail(function(data, status){
			formAction = "Create";
			alert("Desila se greška!");
		});
	};

	function refreshTable() {
		// cistim formu
		$("#izmenaImeIPrezime").val('');
		$("#izmenaGodinaRodjenja").val('');
		$("#izmenaBrojUtakmica").val('');
		$("#izmenaBrojPoena").val('');
		$("#dodavanjeKlub").val('');
		// osvezavam
		dobaviKosarkase();
		//$("#btnAuthors").trigger("click");//
	};

	$("#odustajanjeIzmenaKosarkasa").click(function(){
		refreshTable();
	});


	$("#dodavanjeForm").submit(function(e){
		e.preventDefault();
		if(token){
			var izmenaImeIPrezime = $("#izmenaImeIPrezime").val();
			var izmenaGodinaRodjenja = $("#izmenaGodinaRodjenja").val();
			var izmenaBrojUtakmica = $("#izmenaBrojUtakmica").val();
			var izmenaBrojPoena = $("#izmenaBrojPoena").val();
			var dodavanjeKlub = $("#dodavanjeKlub").val();
			var httpAction;
			var sendData;
			var url;

			// u zavisnosti od akcije pripremam objekat
			if (formAction === "Create") {

				httpAction = "POST";
				url ='http://'+ host +'/api/kosarkasi/';

				sendData = {

					"KosarkasImeIPrezime": izmenaImeIPrezime,
					"KosarkasGodinaRodjenja": izmenaGodinaRodjenja,
					"KosarkasBrojUtakmica": izmenaBrojUtakmica,
					"KosarkasProsecanBrojPoena":izmenaBrojPoena,
					"KosarkaskiKlubId":dodavanjeKlub
				};
				/**/
			}
			else {
				httpAction = "PUT";
				url ='http://'+ host +'/api/kosarkasi/' + editingId.toString();
				sendData = {
					"KosarkasId":editingId,
					"KosarkasImeIPrezime": izmenaImeIPrezime,
					"KosarkasGodinaRodjenja": izmenaGodinaRodjenja,
					"KosarkasBrojUtakmica": izmenaBrojUtakmica,
					"KosarkasProsecanBrojPoena":izmenaBrojPoena,
					"KosarkaskiKlubId":dodavanjeKlub
				};
			}
			
		/**/
			console.log("Objekat za slanje");
			console.log(sendData);

			$.ajax({
				url: url,
				type: httpAction,
				data: sendData,
				headers:{Authorization: "Bearer "+ token}
			})
			.done(function(data, status){
				formAction = "Create";
				refreshTable();
			})
			.fail(function(data, status){
				alert("Desila se greska!");
			})
		}else{alert("Nemate autorizaciju za datu operaciju")}
	});

	$("#btnDelete").submit(function(e){
		e.preventDefault();
	});

	$("#registracijaForma").submit(function (e) {
        e.preventDefault();

        var email = $("#regEmail").val();
        var loz1 = $("#regLoz").val();
        var loz2 = $("#regLoz2").val();

        // objekat koji se salje
        var sendData = {
            "Email": email,
            "Password": loz1,
            "ConfirmPassword": loz2
        };


        $.ajax({    
            type: "POST",
            url: 'http://' + host + "/api/Account/Register",
            data: sendData  
 
        }).done(function (data) {
            $("#info").append("Uspešna registracija. Možete se prijaviti na sistem.");
            $("#prijava").css("display", "block"); 
        	$("#registracija").css("display", "none");

        }).fail(function (data) {
            alert(data);
            alert("Nije uspela registracija");
        });
    });

//#######  RAD SA SADRZAJEM  

	$("#posaljiIzmeneSadrzaja").click(function(){
		//e.preventDefault();
		posaljiIzmeneSadrzaja();
	});

//#######  RAD SA SADRZAJEM   


	function dodavanjeSadrzaja(){
			$.ajax({
					"url":'http://'+ host +'/api/sadrzaj/',
					type: "GET",
					headers:{}
				}).done(function(data){

					var $container = $("#stupciSadrzaj");
					$container.empty();

					for(i=0; i<data.length; i++){

						var $stupciElementId = "stupciElementId"+data[i].SadrzajId;
						var $stupciElement = $(`<div id=${$stupciElementId} class=stupciElement></div>`);

						var $stupciSlika = $(`<div id=stupciSlikaId${data[i].SadrzajId} class=stupciSlika><img src=${data[i].SadrzajSlikaLink} height='200px' /></div>`);
						$stupciElement.append($stupciSlika);
						//$stupciTextNaslov = ("<div class=stupciTextNaslov style=display:none><input type=text class=inputStupciTextNaslov /></div>");
						var $stupciText = $(`<div id=stupciTextId${data[i].SadrzajId} class=stupciText><h3>${data[i].kosarkas.KosarkasImeIPrezime}</h3><p>${data[i].SadrzajTekst}</p></div>`);
						$stupciElement.append($stupciText);

					if(token){
						var $stupciDugmici= $(`<div id=stupciDugmiciId${data[i].SadrzajId} class=stupciDugmici style=display:block></div>`);


						var $dugmici=$(`<input type="hidden" id="stupciKosarkasId" value=${data[i].KosarkasId}/> <button type="button" id="izmeniSadrzaj" name=${data[i].SadrzajId}>Izmeni</button> <button type="button" id="arhivirajSadrzaj" name=${data[i].SadrzajId}>Arhiviraj</button>`);
						$stupciDugmici.append($dugmici);
						$stupciElement.append($stupciDugmici);						
					}

						$container.append($stupciElement);
			}
			if(token){
			var $dodajNoviSadrzaj = $(`<div id=dodajNoviSadrzaj><p>Dodaj novi sadržaj</p><button type="button" id="dodajNoviSadrzajButton"></button></div>`);
			//var $dodajNoviSadrzaj = $(`<div id=dodajNoviSadrzaj class=stupciElement><input  id="dodajNoviSadrzajButton" type="image" width="248" height="248" alt="Dodaj novi sadržaj" src="/images/123.jpg"></div>`);
      
			$container.append($dodajNoviSadrzaj);				

			
					}
					/*
					$(".inputStupciTextNaslov").val("");
					$(".stupciTextNaslov").css("display", "none");
					$("#stupciForm").remove();
					var $container = $("#stupciSadrzaj");
					//$container.empty();
					var $stupciElement = $(".stupciElement");
					//var $stupciElement = $("<div class=stupciElement></div>");
					var $stupciSlika = $(".stupciSlika");
						$stupciSlika.empty();
						$stupciSlika.append("<img src=" + data.SadrzajSlikaLink +" height='200px' />");
					//$("<div class='stupciSlika'></div>");
					var $stupciText = $(".stupciText");
					var $stupciTextH3 = $(".stupciText h3");
						$stupciTextH3.empty(); 
						$stupciTextH3.append(data.kosarkas.KosarkasImeIPrezime);

					var $stupciTextPTag = $(".stupciText p");
						$stupciTextPTag.empty();
						$stupciTextPTag.append(data.SadrzajTekst);
						//$stupciText.append($stupciTextH3);

					//var $stupciText = $(`<div class=stupciText><h3>${data.kosarkas.KosarkasImeIPrezime}</h3><p>${data.SadrzajTekst}</p></div>`);  //</div> treba vratiti
					//var $stupciElementClosing = $("</div>");


					//$stupciElement.append($stupciSlika);
					//$stupciElement.append($stupciText);


					//$container.append($stupciElement);


					*/

				}).fail(function(data, status){alert("ne mogu dobaviti sadrzaj")});
	}

	function izmeniSadrzaj(){
		//if(token){
				var editID = this.name;
				// saljemo zahtev 
				$.ajax({
					"url":'http://'+ host +'/api/sadrzaj/'+ editID.toString(),
					type: "GET",
					//headers:{Authorization: "Bearer "+ token}
					headers:{}
				})
				.done(function(data, status){

					var $stupciSlika = $(`#stupciSlikaId${editID}`);
					


					var $stupciText = $(`#stupciTextId${editID}`);
					$stupciText.append(`<div id=formaIzmenaSlike${editID}><label for=fileUpload>Odaberite sliku: <input id=fileUpload${editID} type=file /></div>`);
					$(`#stupciTextId${editID} h3`).empty();
					$(`#stupciTextId${editID} p`).empty();
					//$stupciText.empty();
					var $formStupci = $(`<form id=stupciForm${editID}></form>`);/*<input type=text id=stubacNaslov value=\'${data.kosarkas.KosarkasImeIPrezime}\' />*/
					dobaviKosarkaseZaIzmenu(editID, data.KosarkasId);

					var $stupciTextIzmena = $(`<br/><textarea id=stupciTextIzmena${editID} style='margin: 0px; width: 280px; height: 277px;' form=stupciForm>${data.SadrzajTekst}</textarea>`);
					$stupciText.append($formStupci);
					$stupciText.append($stupciTextIzmena);


					var $stupciDugmici = $(`#stupciDugmiciId${editID}`);
						$stupciDugmici.empty();
						var $dugmici=$(` <button type="button" id="posaljiIzmeneSadrzaja" name=${data.SadrzajId} form=stupciForm>Posalji izmene</button> <button type="button" id="odustaniSadrzaj" name=${data.SadrzajId}>Odustani</button>`);
						$stupciDugmici.append($dugmici);

					
				})
				.fail(function(data, status){
					alert("Desila se greška!");
					});

		//}else{alert("Niste prijavljeni");}
	}

	function posaljiIzmeneSadrzaja(){
	  var editID = this.name;
	  var data = new FormData();
      var files = $(`#fileUpload${editID}`).get(0).files;
      //var filename = files.name;

      // Add the uploaded image content to the form data collection
      if (files.length > 0) {
           data.append("UploadedImage", files[0]);
      }

      // Make Ajax request with the contentType = false, and procesDate = false
      $.ajax({
           type: "POST",
           url:'http://'+ host +'/api/sadrzaj/uploadSlike/'+editID.toString(),
           contentType: false,
           processData: false,
           data: data
           }).done(function(result) {

				//var $imeIPrezimeId =  $(`#kosarkasIzmena${editID}`).val(); NEPOTREBNO
				//var ImeIPrezime = $(`#kosarkasIzmena${editID}`).val(); NEPOTREBNO
		        var FormaText = $(`#stupciTextIzmena${editID}`).val();
		        var kosarkasId = $(`#kosarkasIzmena${editID}`).val();

		        // objekat koji se salje
		        var sendData = {
				    "SadrzajId": editID,
				   // "SadrzajSlikaLink": "/Slike/220px-Nikola_Jokic_(40980299891).jpg",//###########################OVDE RADIM
				    "SadrzajTekst": FormaText,
				   // "SadrzajArhiviran": false,
				    "KosarkasId": kosarkasId
		        };


				$.ajax({
					url:'http://'+ host +'/api/sadrzaj/'+ editID.toString(),
					type: "PUT",
					data: sendData,
					headers:{Authorization: "Bearer "+ token}
					//headers:{}
					})
					.done(function(data, status){
						 dodavanjeSadrzaja();
					}).fail(function(data, status){alert("Ne mogu dobaviti sadržaj")});



        }).fail(function(a, b, c) {
            console.log(a, b, c);
            alert("Neuspešno nakačena slika");
        });
	};

	function arhivirajSadrzaj(){
		var editID = this.name;

		$.ajax({
			"url":'http://'+ host +'/api/sadrzaj/arhiviraj/'+ editID.toString(),
			type: "PATCH",
			headers:{Authorization: "Bearer "+ token}//,
			//data: sendData
							
		}).done(function(data, status){
			dodavanjeSadrzaja();

		}).fail(function(data, status){
			alert("Desila se greska prilikom izmene");

		});
	};

	function prikaziArhiviraniSadrzaj(){
		$.ajax({
			"url":'http://'+ host +'/api/sadrzaj/arhiva',
			type: "GET",
			headers:{}
				

		}).done(function(data, status){
			$("main").css("display", "none"); 
			$("#arhivaContainer").css("display","block");
			$("#pocetna").css("display", "none");
			$("#pocetna2").css("display", "none");
			$("#prijava").css("display", "none");
			$("#registracija").css("display", "none");
			$("#tabelaSadrzaj").css("display", "none");
			$("#stupciSadrzaj").css("display", "none");
			$("#pretraga").css("display", "none");
			$("#odjava").css("display", "none");  
			$("#dodavanje").css("display", "none");
			$("#arhiva").css("display", "block");
			$("#arhivaLink").css("display", "none"); 
			$("#povratakIzArhiveLink").css("display", "inline-block");
			var $arhiva = $("#arhivaContainer");

			$arhiva.empty();
			//$arhiva.append(`<a href=povratak id=nazadArhiva>&lt;&lt;Povratak</a>`);
			var $naslov =(`<h2>Arhivirani članci</h2>`);

			$arhiva.append($naslov);

			for(i=0; i<data.length; i++){

				var $stupciElement = $("<div class=stupciElement></div>");

				var $stupciSlika = $("<div class=stupciSlika><img src=" + data[i].SadrzajSlikaLink +" height='200px' /></div>");
				$stupciElement.append($stupciSlika);
				
				var $stupciText = $(`<div class=stupciText><h3>${data[i].kosarkas.KosarkasImeIPrezime}</h3><p>${data[i].SadrzajTekst}</p></div>`);
				$stupciElement.append($stupciText);

				$arhiva.append($stupciElement);

        	}

		}).fail(function(data,status){
			alert(status);
			//alert("greska prilikom dobavljanja podataka za arhivu");
		});
	};

	function dobaviKosarkaseZaIzmenu(editID,kosarkasId){
		$.ajax({
			"type":"GET",
			"url":'http://'+ host +'/api/kosarkasi/'

		}).done(function(data){
		var $formaUKojuDodajem = $(`#stupciForm${editID}`);
		   	$formaUKojuDodajem.empty(); 

		var $selectTag = $(`<select id=kosarkasIzmena${editID}></select>`);

        	var allOptions="";
        	for(i=0; i<data.length; i++){
        		if(data[i].KosarkasId===kosarkasId){
        		var option = "<option value="+data[i].KosarkasId+" selected>"+data[i].KosarkasImeIPrezime+"</option>";
        		}else{
        		var option = "<option value="+data[i].KosarkasId+" >"+data[i].KosarkasImeIPrezime+"</option>";	
        		}
        		allOptions += option;
        	}
        	$selectTag.append(allOptions);
        	$formaUKojuDodajem.append($selectTag);
	})};

	function odustajanjeOdIzmeneSadrzaja(){
		var editID = this.name;

		$.ajax({
					"url":'http://'+ host +'/api/sadrzaj/'+ editID.toString(),
					type: "GET",
					//headers:{Authorization: "Bearer "+ token}
					headers:{}
				})
				.done(function(data, status){

					var $stupciElementId = "#stupciElementId"+data.SadrzajId;
					
					
					var $stupciElement = $($stupciElementId);
					$stupciElement.empty();

					var $stupciSlika = $(`<div id=stupciSlikaId${data.SadrzajId} class=stupciSlika><img src=${data.SadrzajSlikaLink} height='200px' /></div>`);
						$stupciElement.append($stupciSlika);
						//$stupciTextNaslov = ("<div class=stupciTextNaslov style=display:none><input type=text class=inputStupciTextNaslov /></div>");
						var $stupciText = $(`<div id=stupciTextId${data.SadrzajId} class=stupciText><h3>${data.kosarkas.KosarkasImeIPrezime}</h3><p>${data.SadrzajTekst}</p></div>`);
						$stupciElement.append($stupciText);

					if(token){
						var $stupciDugmici= $(`<div id=stupciDugmiciId${data.SadrzajId} class=stupciDugmici style=display:block></div>`);
						var $dugmici=$(`<input type="hidden" id="stupciKosarkasId" value=${data.KosarkasId}/> <button type="button" id="izmeniSadrzaj" name=${data.SadrzajId}>Izmeni</button> <button type="button" id="arhivirajSadrzaj" name=${data.SadrzajId}>Arhiviraj</button>`);
						
						$stupciDugmici.append($dugmici);
						$stupciElement.append($stupciDugmici);						
					}

				}).fail(function(data, status){
					alert("Desila se greška!");
					});
	};

	function povratakIzArhive(e){
		e.preventDefault();
		if(token){
			dobaviKosarkase();
			$("main").css("display", "block"); 
			$("#arhivaContainer").css("display", "none"); 
			$("#pocetna").css("display", "none");
			$("#pocetna2").css("display", "none");
			$("#prijava").css("display", "none");
			$("#registracija").css("display", "none");
			$("#tabelaSadrzaj").css("display", "block");
			$("#pretraga").css("display", "block");
			$("#odjava").css("display", "block");
			$("#dodavanje").css("display", "block");
			$("#stupciSadrzaj").css("display", "block");
			$("#divArhivaLink").css("display", "inline-block");
			$("#pocetnaPrijava, #pocetnaRegistracija").css("display", "none");
			$("nav").css("display", "block");
			$("#povratakIzArhiveLink").css("display", "none"); 
			$("#odjavise").css("display", "inline-block");  
			$("#arhivaLink").css("display", "inline-block");  
			$("#pretraga_dodavanjeWrapper").css("display", "block");
			dobaviKlubove();
			dodavanjeSadrzaja();
		}else{alert("Greska pri ucitavnju stranice");}
	};

	function dodajNoviSadrzaj(){
		
		$.ajax({
			"type":"GET",
			"url":'http://'+ host +'/api/kosarkasi/'

		}).done(function(data,status){
		var $formaUKojuDodajem = $(`#dodajNoviSadrzaj`);
		   	$formaUKojuDodajem.empty(); 

		var $inputPolje = $(`<div id=formaDodavanjeNoveSlike><label for=fileUpload>Odaberite sliku: <input id=fileNovaSlikaUpload type=file /></div>`);

			$formaUKojuDodajem.append($inputPolje);

		var $selectTag = $(`<select id=noviKosarkasUnos></select>`);

        	var allOptions="";
        	for(i=0; i<data.length; i++){
        		var option = "<option value="+data[i].KosarkasId+" >"+data[i].KosarkasImeIPrezime+"</option>";
        		allOptions += option;
        	}
        	$selectTag.append(allOptions);
        	$formaUKojuDodajem.append($selectTag);

        	$textarea = (`<br/><textarea id=noviSadrzajTekstUnos style='margin: 0px; width: 280px; height: 277px;' form=stupciForm></textarea>`);

        	$formaUKojuDodajem.append($textarea);

        	$dugmici = ("<div id=stupciDugmiciUnos class=stupciDugmici style=display:block><button type=button id=posaljiNoviSadrzaj>Pošalji Sadržaj</button><button type=button id=odustaniNoviSadrzaj>Odustani</button></div>");
        	$formaUKojuDodajem.append($dugmici);

			}).fail(function(data){
				alert("Greška prilikom pozivanja funkcije")
			});
	};

	function posaljiNoviSadrzajUBazu(){

			var SadrzajTekst=$("#noviSadrzajTekstUnos").val();
			var KosarkasId=$("#noviKosarkasUnos").val();
			var files = $(`#fileNovaSlikaUpload`).get(0).files;
			var podaciSlika = new FormData();


			var dataForSending = { 
			"SadrzajSlikaLink": null,
        	"SadrzajTekst": SadrzajTekst,
        	"SadrzajArhiviran": false,
        	"KosarkasId": KosarkasId
  			}
		
			$.ajax({
			"type": "POST",
			"url": 'http://' + host + "/api/sadrzaj",
			"data": dataForSending, 
			"headers":{Authorization: "Bearer "+ token}     

			}).done(function(data){
				console.log(data);
				var editID = data.SadrzajId;
				//var editID = this.name;

				
      			//var files = $(`#fileUpload${editID}`).get(0).files;  OBRISI POSLE!
				      //var filename = files.name;

				      // Add the uploaded image content to the form data collection
				if (files.length > 0) {
				    podaciSlika.append("UploadedImage", files[0]);
				}

				$.ajax({
		           type: "POST",
		           url:'http://'+ host +'/api/sadrzaj/uploadSlike/'+editID.toString(),
		           contentType: false,
		           processData: false,
		           data: podaciSlika
		           }).done(function(result) {

		           dodavanjeSadrzaja();
					//prikaziDodajNoviSadrzaj();

		           }).fail(function(){
		           	alert("Greška pri učitavnju slike");
		           });

		    }).fail(function(result){
		    	alert("greska pri ucitavnju podataka");
		    });

			//alert("uspesno dodat novi sadrzaj");

	};

	function prikaziDodajNoviSadrzaj(){
		if(token){
			var $formaUKojuDodajem = $(`#dodajNoviSadrzaj`);
		   	$formaUKojuDodajem.empty(); 
			
			var $dodajNoviSadrzaj = $(`<p>Dodaj novi sadržaj</p><button type="button" id="dodajNoviSadrzajButton"></button>`)
		   	$formaUKojuDodajem.append($dodajNoviSadrzaj); 
		   }
	};

	$("#arhivaLink").click(function(e){
		e.preventDefault();
		prikaziArhiviraniSadrzaj();
	});


	dodavanjeSadrzaja();
	dobaviKosarkase(); 
});


