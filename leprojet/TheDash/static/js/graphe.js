let dateDebut, dateFin 

 
  $(document).ready(function(){
    
      $("#dateDebut").flatpickr({dateFormat: "d-m-Y"});
      $("#dateFin").flatpickr({ dateFormat: "d-m-Y" });

      function getDefaultData() {
          const currentDate = new Date();
          const dateFin = currentDate.toLocaleDateString('fr-FR');  // Date actuelle au format "jour-mois-année"
          currentDate.setDate(currentDate.getDate() - 7);  // 7 jours avant la date actuelle
          const dateDebut = currentDate.toLocaleDateString('fr-FR');  // Date par défaut au format "jour-mois-année"
          $.ajax({
              url: '/ReconEWPvsERSajax/',
              method: 'post',
              data: { dateDebut: dateDebut, dateFin: dateFin, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
              beforeSend: function () {
                  $("#loader").removeClass('hidden')
              },
              success: function (response) {
                  let dataPoints = []
                  // $("#tablResult").html(response.result)
                  let datas = JSON.parse(response.result)
                  if (datas.length === 0) {
                      $("#chartContainer").html('<center><div class="app-content-headerText"AUCUNES DONNEES</div></center>');
                      $("#tablResult").html('')
                      return
                  }
                    for (let i = 0; i < datas.length; i++) {
                      let obj = {
                          x: new Date(datas[i].dates),
                          y: datas[i].gapamount

                      }
                      dataPoints.push(obj)
                  }

                  CanvasJS.addCultureInfo("fr",
                      {
                          decimalSeparator: ",",
                          digitGroupSeparator: " ",
                      })
                  var chart = new CanvasJS.Chart("chartContainer", {
                      animationEnabled: true,
                      title: {
                          text: "EWP vs ERS Reconcialiation"
                      },
                      culture: "fr",
                      axisX: {

                          valueFormatString: "DD-MM-YYYY",
                      },
                      axisY: {
                          title: "Montant",
                          lineColor: " #101827",
                          tickColor: " #101827",
                          labelFontColor: " #101827",
                          titleFontColor: " #101827",
                          includeZero: true,
                          suffix: " FCFA",
                          type: "spline",
                      },
                      data: [{
                          type: "spline",
                          lineThickness: 2,
                          markerSize: 3,
                          color: " #2c394f",
                          dataPoints: dataPoints
                      }]
                  });
                  chart.render();
                  
                  let tableau = `<hr><br>
                <table style="width:100%;">
                    <thead>
						<tr>
							<th rowspan="2">DATE</th>
							<th colspan="2">FROM EWP</th>
							<th colspan="2">FROM ERS</th>
							<th colspan="2" >GAP (EWP - ERS)</th>
						</tr>
						<tr>
							
							<th><div >NBRE</div></th>
							<th><div >AMOUNT</div></th>
							<th><div >NBRE</div></th>
							<th><div >AMOUNT</div></th>
							<th><div >NBRE</div></th>
							<th><div >AMOUNT</div></th>
						</tr>
					</thead>
                `
                  let ligne = ""
                  datas.map(row => {
                      ligne += `<tr>
                    <td><div>${row.dates}</div></td>
                    <td><div >${row.ewp_total}</div></td>
                    <td><div >${row.ewpamount}</div></td>
                    <td><div>${row.ers_total}</div></td>
                    <td><div >${row.ersamount}</div></td>
                    <td><div >${row.gap_total}</div></td>
                    <td><div >${row.gapamount}</div></td>
                    </tr>`

                  })
                  tableau += ligne + '</table>'
                  $("#tablResult").html(tableau)
              },
              complete: function () {
                  $("#loader").addClass('hidden')
              }

          });
      }
      // Appel à la fonction pour récupérer les données par défaut lors du chargement de la page
      getDefaultData();

      
    $("#research").click(function(){
        dateDebut = document.getElementById("dateDebut").value
        dateFin = document.getElementById("dateFin").value
        if (dateDebut===""){
            $("#chartContainer").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>')
            return
        }
        if (dateFin=== "") {
            $("#chartContainer").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>')
            return
        }
        
        $.ajax({url:'/ReconEWPvsERSajax/',
                    method:'post',
            data: { dateDebut: dateDebut, dateFin: dateFin, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value},
            beforeSend: function () { 
                $("#loader").removeClass('hidden')
            },   
            success:function(response) {
                let dataPoints = []
                    // $("#tablResult").html(response.result)
                    let datas = JSON.parse(response.result)
                    if (datas.length === 0) {
                        $("#chartContainer").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>')
                        $("#tablResult").html('')
                        return
                    }
                    
                    for(let i=0; i<datas.length; i++){
                        let obj = {
                            x: new Date(datas[i].dates),
                            y: datas[i].gapamount
                    
                        }
                        dataPoints.push(obj)
                    }
                    
                   CanvasJS.addCultureInfo("fr",
                   {
                    decimalSeparator: ",",
                    digitGroupSeparator:" ",
                   })
                    var chart = new CanvasJS.Chart("chartContainer", {
                        animationEnabled: true,
                        title: {
                            text: "EWP vs ERS Reconcialiation"
                        },
                        culture:"fr",
                        axisX: {
                            
                            valueFormatString: "DD-MM-YYYY",
                        },
                        axisY: {
                            title: "Montant",
                            lineColor: " #101827",
                            tickColor: " #101827",
                            labelFontColor: " #101827",
                            titleFontColor: " #101827",
                            includeZero: true,
                            suffix: " FCFA",
                            type: "spline",
                        },
                        data: [{
                            type: "spline",
                            lineThickness: 2,
                            markerSize: 3,
                            color: " #2c394f",
                            dataPoints: dataPoints
                        }]
                    });
                    chart.render();
                
                let tableau=`<hr><br>
                <table style="width:100%;" >
                    <thead>
						<tr>
							<th rowspan="2">DATE</th>
							<th colspan="2"><div >FROM EWP</div></th>
							<th colspan="2"> <div >FROM ERS</div></th>
							<th colspan="2"><div >GAP (EWP - ERS)</div></th>
						</tr>
						<tr>
							
							<th><div>NBRE</div></th>
							<th><div>AMOUNT</div></th>
							<th><div>NBRE</div></th>
							<th><div>AMOUNT</div></th>
							<th><div>NBRE</div></th>
							<th><div>AMOUNT</div></th>
						</tr>
					</thead>
                `
                let ligne =""
                datas.map(row=>{
                    ligne += `<tr>
                    <td><div>${row.dates}</div></td>
                    <td><div>${row.ewp_total}</div></td>
                    <td><div >${row.ewpamount}</div></td>
                    <td><div >${row.ers_total}</div></td>
                    <td><div >${row.ersamount}</div></td>
                    <td><div >${row.gap_total}</div></td>
                    <td><div >${row.gapamount}</div></td>
                    </tr>`

                })
                    tableau += ligne +'</table>'
                    $("#tablResult").html(tableau)
                  },
                complete:function(){
                    $("#loader").addClass('hidden')
                }
            
        })

    })
})



