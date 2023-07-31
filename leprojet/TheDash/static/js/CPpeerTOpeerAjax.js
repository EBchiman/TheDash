let dia1, dia7;

$(document).ready(function () {
    $("#dia1").flatpickr({ dateFormat: "d-m-Y" });
    $("#dia7").flatpickr({ dateFormat: "d-m-Y" });
    // Fonction pour récupérer les données par défaut
    function getDefaultData() {
        const currentDate = new Date();
        const dia7 = currentDate.toLocaleDateString('fr-FR');  // Date actuelle au format "jour-mois-année"
        currentDate.setDate(currentDate.getDate() - 7);  // 7 jours avant la date actuelle
        const dia1 = currentDate.toLocaleDateString('fr-FR');  // Date par défaut au format "jour-mois-année"
        $.ajax({
            url: '/CPpeerTOpeerAjax/',
            method: 'post',
            data: { dia1: dia1, dia7: dia7, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            beforeSend: function () {
                $("#attend").removeClass('hidden');
            },
            success:function(response) {
                let dataPoints = []
                let datas = JSON.parse(response.result);

                if (datas.length === 0) {
                    $("#diagram").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    $("#tablM2U").html('');
                    return;
                }
                for (let i = 0; i < datas.length; i++) {
                    let obj = {
                        x: moment(datas[i].dw_date_key, "YYYYMMDD").toDate(),
                        y: datas[i].Total_ChargeFromPrepaid

                    }
                    dataPoints.push(obj)
                }
                // Créez ici les dataPoints pour Fee et transfert en utilisant les formules souhaitées
                
                let dataPointssum = []; // Ajout de cette ligne pour définir dataPointssum

                for (let i = 0; i < datas.length; i++) {
                    let obj = {
                        x: moment(datas[i].dw_date_key, "YYYYMMDD").toDate(),
                        y: datas[i].Total_ChargeFromPrepaid
                    };
                    dataPoints.push(obj);

                    let trsf = datas[i].Total_Transferamount;
                    let fee = datas[i].Total_TransitionFee;
                    // Calculer GAP et GAPpercent à partir des formules
                    let sum = trsf + fee;
                    let objsum = {
                        x: moment(datas[i].dw_date_key, "YYYYMMDD").toDate(),
                        y: sum
                    };
                    dataPointssum.push(objsum);
                }
                // Créez le graphique CanvasJS
                CanvasJS.addCultureInfo("fr",
                    {
                        decimalSeparator: ",",
                        digitGroupSeparator: " ",
                    })
                var chart = new CanvasJS.Chart("diagram", {
                    animationEnabled: true,
                    title: {
                        text: "M2U Reconciliation"
                    },
                    culture: "fr",
                    axisX: {

                        valueFormatString: "DD-MM-YYYY",
                    },
                    axisY: [{
                        title: "MONTANT ",
                        lineColor: " #101827",
                        tickColor: " #101827",
                        labelFontColor: " #101827",
                        titleFontColor: " #101827",
                        includeZero: true,
                        suffix: " FCFA"
                    }],
                    toolTip: {
                        shared: true
                    },
                    legend: {
                        cursor: "pointer",
                        itemclick: toggleDataSeries
                    },
                    dataPointMaxWidth: 30,
                    data: [
                        {
                            type: "column",
                            name: "Transfer Amount (FCFA)+Transition Fee (FCFA)",
                            color: "#2c394f",
                            axisYIndex: 0,
                            showInLegend: true,
                            dataPoints: dataPointssum,
                        },
                        {
                            type: "column",
                            name: "Charge From Prepaid (FCFA)",
                            color: "#ffed28",
                            axisYIndex: 0,
                            showInLegend: true,
                            dataPoints: dataPoints,
                        }
                    ]
                });
                chart.render();
                var tableau = '<hr><br>' +
                    '<table style="width:100%;">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>DATE</th>' +
                    '<th>Total_ChargeFromPrepaid (FCFA)</th>' +
                    '<th >Total_Transferamount (FCFA)</th>' +
                    '<th>Total_TransitionFee (FCFA)</th>' +
                    '<th >GAP</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';

                for (let j = 0; j < datas.length; j++) {
                    let row = datas[j];
                    let formattedDate = moment(row.dw_date_key, "YYYYMMDD").format("DD-MM-YYYY");
                    tableau += '<tr>' +
                        '<td><div>' + formattedDate + '</div></td>' +
                        '<td><div>' + row.Total_ChargeFromPrepaid + '</div></td>' +
                        '<td><div>' + row.Total_Transferamount + '</div></td>' +
                        '<td><div>' + row.Total_TransitionFee + '</div></td>' +
                        '<td><div>' + row.Gap + '</div></td>' +
                        '</tr>'
                }
                tableau += '</tbody></table>';
                $("#tablM2U").html(tableau);
            },
            complete: function () {
                $("#attend").addClass('hidden');
            },

        });
    }
    // Appel à la fonction pour récupérer les données par défaut lors du chargement de la page
    getDefaultData();

    $("#Staffich").click(function () {
        dia1 = document.getElementById("dia1").value;
        dia7 = document.getElementById("dia7").value;

        if (dia1 === "") {
            $("#diagram").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>');
            return;
        }
        if (dia7 === "") {
            $("#diagram").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>');
            return;
        }

        $.ajax({
            url: '/CPpeerTOpeerAjax/',
            method: 'post',
            data: { dia1: dia1, dia7: dia7, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            dataType: 'json',
            beforeSend: function () {
                $("#attend").removeClass('hidden');
            },
            success: function(response) {
                let dataPoints = []
                let datas = JSON.parse(response.result);

                if (datas.length === 0) {
                    $("#diagram").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    $("#tablM2U").html('');
                    return;
                }
                for (let i = 0; i < datas.length; i++) {
                    let obj = {
                        x: moment(datas[i].dw_date_key, "YYYYMMDD").toDate(),
                        y: datas[i].Total_ChargeFromPrepaid

                    }
                    dataPoints.push(obj)
                }
                // Créez ici les dataPoints pour Fee et Transfert en utilisant les formules souhaitées
                
                let dataPointssum = []; // définir dataPointssum

                for (let i = 0; i < datas.length; i++) {
                    let obj = {
                        x: moment(datas[i].dw_date_key, "YYYYMMDD").toDate(),
                        y: datas[i].Total_ChargeFromPrepaid
                    };
                    dataPoints.push(obj);

                    let trsf = datas[i].Total_Transferamount;
                    let fee = datas[i].Total_TransitionFee;
                    // Calculer GAP et GAPpercent à partir des formules
                    let sum = trsf + fee;
                    let objsum = {
                        x: moment(datas[i].dw_date_key, "YYYYMMDD").toDate(),
                        y: sum
                    };
                    dataPointssum.push(objsum);
                }
                
               
                var chart = new CanvasJS.Chart("diagram", {
                    animationEnabled: true,
                    title: {
                        text: "M2U Reconciliation"
                    },
                    culture: "fr",
                    axisX: {

                        valueFormatString: "DD-MM-YYYY",
                    },
                   axisY: [{
                        title: "MONTANT ",
                        lineColor: " #101827",
                        tickColor: " #101827",
                        labelFontColor: " #101827",
                        titleFontColor: " #101827",
                        includeZero: true,
                        suffix: " FCFA"
                    }],
                    toolTip: {
                        shared: true
                    },
                    legend: {
                        cursor: "pointer",
                        itemclick: toggleDataSeries
                    },
                    dataPointMaxWidth: 30,
                    data: [
                        {
                            type: "column",
                            name: "Transfer Amount (FCFA)+Transition Fee (FCFA)",
                            color: " #2c394f",
                            axisYIndex: 0,
                            showInLegend: true,
                            dataPoints: dataPointssum,
                        },
                        {
                            type: "column",
                            name: "Charge From Prepaid (FCFA)",
                            color: "#ffed28",
                            axisYIndex: 0,
                            showInLegend: true,
                            dataPoints: dataPoints,
                        }
                    ]
                });
                chart.render();
                
        
                var tableau = '<hr><br>' +
                    '<table style="width:100%;">' +
                    '<thead>' +
                    '<tr>' +
                    '<th >DATE</th>' +
                    '<th >Total_ChargeFromPrepaid (FCFA)</th>' +
                    '<th >Total_Transferamount (FCFA)</th>' +
                    '<th >Total_TransitionFee (FCFA)</th>' +
                    '<th >GAP</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody >';

             for (let j = 0; j < datas.length; j++) {
                    let row = datas[j];  
                    let formattedDate = moment(row.dw_date_key, "YYYYMMDD").format("DD-MM-YYYY");
                    tableau += '<tr>' +
                        '<td><div>' + formattedDate + '</div></td>' +
                        '<td><div>' + row.Total_ChargeFromPrepaid + '</div></td>' +
                        '<td><div>' + row.Total_Transferamount + '</div></td>' +
                        '<td><div>' + row.Total_TransitionFee + '</div></td>' +
                        '<td><div>' + row.Gap + '</div></td>' +
                        '</tr>'
                }
                tableau += '</tbody></table>';
                $("#tablM2U").html(tableau);
            },
            complete: function () {
                $("#attend").addClass('hidden');
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





