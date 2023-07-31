let conso1, conso7;
// < !--modifie conso1 /   conso7 / conso7 Statffich / montr  aull/ aull  figure /   waiting / waiting tableM2U / -- >
$(document).ready(function () {
    $("#conso1").flatpickr({ dateFormat: "d-m-Y" });
    $("#conso7").flatpickr({ dateFormat: "d-m-Y" });
    // Fonction pour récupérer les données par défaut
    function getDefaultData() {
        const currentDate = new Date();
        const conso7 = currentDate.toLocaleDateString('fr-FR');  // Date actuelle au format "jour-mois-année"
        currentDate.setDate(currentDate.getDate() - 7);  // 7 jours avant la date actuelle
        const conso1 = currentDate.toLocaleDateString('fr-FR');  // Date par défaut au format "jour-mois-année"
        $.ajax({
            url: '/CPtopconsoAjax/',
            method: 'post',
            data: { conso1: conso1, conso7: conso7, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            beforeSend: function () {
                $("#waiting").removeClass('hidden');
            },
            success: function (response) {
                // let dataPoints = []
                let datas = JSON.parse(response.result);

                if (datas.length === 0) {
                    // $("#figure").html('<div class="app-content-headerText">AUCUNES DONNEES</div>');
                    // $("#consotabl").html('');
                    $("#aull").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                       return;
                }
                // for (let i = 0; i < datas.length; i++) {
                //     let obj = {
                //         x: moment(datas[i].transdate, "YYYYMMDD").toDate(),
                //         y: datas[i].Total_ChargeFromPrepaid

                //     }
                //     dataPoints.push(obj)
                // }
                // // Créez ici les dataPoints pour Fee et transfert en utilisant les formules souhaitées

                // let dataPointssum = []; // Ajout de cette ligne pour définir dataPointssum

                // for (let i = 0; i < datas.length; i++) {
                //     let obj = {
                //         x: moment(datas[i].transdate, "YYYYMMDD").toDate(),
                //         y: datas[i].Total_ChargeFromPrepaid
                //     };
                //     dataPoints.push(obj);

                //     let trsf = datas[i].Total_Transferamount;
                //     let fee = datas[i].Total_TransitionFee;
                //     // Calculer GAP et GAPpercent à partir des formules
                //     let sum = trsf + fee;
                //     let objsum = {
                //         x: moment(datas[i].dw_date_key, "YYYYMMDD").toDate(),
                //         y: sum
                //     };
                //     dataPointssum.push(objsum);
                // }
                // // Créez le graphique CanvasJS
                // CanvasJS.addCultureInfo("fr",
                //     {
                //         decimalSeparator: ",",
                //         digitGroupSeparator: " ",
                //     })
                // var chart = new CanvasJS.Chart("figure", {
                //     animationEnabled: true,
                //     title: {
                //         text: "M2U Reconciliation"
                //     },
                //     culture: "fr",
                //     axisX: {

                //         valueFormatString: "DD-MM-YYYY",
                //     },
                //     axisY: [{
                //         title: "MONTANT ",
                //         lineColor: "#C24642",
                //         tickColor: "#C24642",
                //         labelFontColor: "#C24642",
                //         titleFontColor: "#C24642",
                //         includeZero: true,
                //         suffix: " FCFA"
                //     }],
                //     toolTip: {
                //         shared: true
                //     },
                //     legend: {
                //         cursor: "pointer",
                //         itemclick: toggleDataSeries
                //     },
                //     data: [
                //         {
                //             type: "column",
                //             name: "Transfer Amount+Transition Fee (FCFA)",
                //             color: "#C24642",
                //             axisYIndex: 0,
                //             showInLegend: true,
                //             dataPoints: dataPointssum,
                //         },
                //         {
                //             type: "column",
                //             name: "Charge From Prepaid (FCFA)",
                //             color: "#7F6084",
                //             axisYIndex: 0,
                //             showInLegend: true,
                //             dataPoints: dataPoints,
                //         }
                //     ]
                // });
                // chart.render();
                var tableau = '<hr><br>' +
                    '<table style="width:100%;">' +
                    '<thead>' +
                    '<tr>' +
                    '<th >DATE</th>' +
                    '<th>MSISDN</th>' +
                    '<th >CONSO</th>' +
                    '<th >PROFILE</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody >';

                for (let j = 0; j < datas.length; j++) {
                    let row = datas[j];
                    let formattedDate = moment(row.transdate, "YYYYMMDD").format("DD-MM-YYYY");
                    tableau += '<tr>' +
                        '<td><div>' + formattedDate + '</div></td>' +
                        '<td><div>' + row.subno + '</div></td>' +
                        '<td><div>' + row.conso+ '</div></td>' +
                        '<td><div>' + row.product_name+ '</div></td>' +
                        '</tr>'
                }
                tableau += '</tbody></table>';
                $("#aull").html(tableau);
            },
            complete: function () {
                $("#waiting").addClass('hidden');
            },

        });
    }
    // Appel à la fonction pour récupérer les données par défaut lors du chargement de la page
    getDefaultData();

    $("#montr").click(function () {
        conso1 = document.getElementById("conso1").value;
        conso7 = document.getElementById("conso7").value;

        if (conso1 === "") {
            $("#figure").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>');;
            return;
        }
        if (conso7 === "") {
            $("#figure").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>');
            return;
        }

        $.ajax({
            url: '/CPtopconsoAjax/',
            method: 'post',
            data: { conso1: conso1, conso7: conso7, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            dataType: 'json',
            beforeSend: function () {
                $("#waiting").removeClass('hidden');
            },
            success: function (response) {
                // let dataPoints = []
                let datas = JSON.parse(response.result);

                if (datas.length === 0) {
                    // $("#figure").html('<div class="app-content-headerText">AUCUNES DONNEES</div>');
                    // $("#consotabl").html('');
                    $("#aull").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    return;
                }
                // for (let i = 0; i < datas.length; i++) {
                //     let obj = {
                //         x: moment(datas[i].dw_date_key, "YYYYMMDD").toDate(),
                //         y: datas[i].Total_ChargeFromPrepaid

                //     }
                //     dataPoints.push(obj)
                // }
                // // Créez ici les dataPoints pour Fee et Transfert en utilisant les formules souhaitées

                // let dataPointssum = []; // définir dataPointssum

                // for (let i = 0; i < datas.length; i++) {
                //     let obj = {
                //         x: moment(datas[i].dw_date_key, "YYYYMMDD").toDate(),
                //         y: datas[i].Total_ChargeFromPrepaid
                //     };
                //     dataPoints.push(obj);

                //     let trsf = datas[i].Total_Transferamount;
                //     let fee = datas[i].Total_TransitionFee;
                //     // Calculer GAP et GAPpercent à partir des formules
                //     let sum = trsf + fee;
                //     let objsum = {
                //         x: moment(datas[i].dw_date_key, "YYYYMMDD").toDate(),
                //         y: sum
                //     };
                //     dataPointssum.push(objsum);
                // }


                // var chart = new CanvasJS.Chart("figure", {
                //     animationEnabled: true,
                //     title: {
                //         text: "M2U Reconciliation"
                //     },
                //     culture: "fr",
                //     axisX: {

                //         valueFormatString: "DD-MM-YYYY",
                //     },
                //     axisY: [{
                //         title: "MONTANT ",
                //         lineColor: "#C24642",
                //         tickColor: "#C24642",
                //         labelFontColor: "#C24642",
                //         titleFontColor: "#C24642",
                //         includeZero: true,
                //         suffix: " FCFA"
                //     }],

                //     toolTip: {
                //         shared: true
                //     },
                //     legend: {
                //         cursor: "pointer",
                //         itemclick: toggleDataSeries
                //     },
                //     data: [

                //         {
                //             type: "column",
                //             name: "Transfer Amount+Transition Fee (FCFA)",
                //             color: "#C24642",
                //             axisYIndex: 0,
                //             showInLegend: true,
                //             dataPoints: dataPointssum,
                //         },
                //         {
                //             type: "column",
                //             name: "Charge From Prepaid (FCFA)",
                //             color: "#7F6084",
                //             axisYIndex: 0,
                //             showInLegend: true,
                //             dataPoints: dataPoints,
                //         }
                //     ]
                // });
                // chart.render();
                var tableau = '<hr><br>' +
                    '<table style="width:100%;">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>DATE</th>' +
                    '<th>MSISDN</th>' +
                    '<th>CONSO</th>' +
                    '<th>PROFILE</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody >';

                for (let j = 0; j < datas.length; j++) {
                    let row = datas[j];
                    let formattedDate = moment(row.transdate, "YYYYMMDD").format("DD-MM-YYYY");
                    tableau += '<tr>' +
                        '<td><div>' + formattedDate + '</div></td>' +
                        '<td><div>' + row.subno + '</div></td>' +
                        '<td><div>' + row.conso + '</div></td>' +
                        '<td><div>' + row.product_name + '</div></td>' +
                        '</tr>'
                }
                tableau += '</tbody></table>';
                $("#aull").html(tableau);
            },
            complete: function () {
                $("#waiting").addClass('hidden');
            },
        });
    });
});

function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}





