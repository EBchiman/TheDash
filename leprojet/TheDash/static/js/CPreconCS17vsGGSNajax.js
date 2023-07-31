

let day1, day7;

$(document).ready(function () {
    $("#day1").flatpickr({ dateFormat: "d-m-Y" });
    $("#day7").flatpickr({ dateFormat: "d-m-Y" });

    // Fonction pour récupérer les données par défaut
    function getDefaultData() {
        const currentDate = new Date();
        const day7 = currentDate.toLocaleDateString('fr-FR');  // Date actuelle au format "jour-mois-année"
        currentDate.setDate(currentDate.getDate() - 7);  // 7 jours avant la date actuelle
        const day1 = currentDate.toLocaleDateString('fr-FR');  // Date par défaut au format "jour-mois-année"

        $.ajax({
            url: '/CPreconCS17vsGGSNajax/',
            method: 'post',
            data: { day1: day1, day7: day7, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value }, 
            beforeSend: function () {
                $("#attente").removeClass('hidden');
            },
            success: function (response) {
                let datas = JSON.parse(response.result);
                let result1 = datas.result1 || [];
                let result2 = datas.result2 || [];

                if ((datas.result1).length === 0 && (datas.result2).length === 0) {
                    $("#graphe").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    $("#tablGap").html('');
                    return;
                }

                let dataPoints = result2.map(data => ({
                    x: moment(data.tbl_dt, "YYYYMMDD").toDate(),
                    y: data.CS_VOL
                }));
                let dataPoints1 = result1.map(data => ({
                    x: moment(data.tbl_dt, "YYYYMMDD").toDate(),
                    y: data.VOL_DATA_TOTAL_TO
                }));
                // Créez ici les dataPoints pour GAP et GAPpercent en utilisant les formules souhaitées
                let dataPointsGAP = [];
                let dataPointsGAPpercent = [];
                const maxLenth = Math.max(result1.length, result2.length);
                for (let i = 0; i < maxLenth; i++) {
                    let csVol = result2[i].CS_VOL;
                    let volDataTotalTo = result1[i].VOL_DATA_TOTAL_TO;

                    // Calculer GAP et GAPpercent à partir des formules
                    let gap = volDataTotalTo - csVol;
                    let gapPercent = (gap / csVol) * 100;

                    let objGAP = {
                        x: moment(result1[i].tbl_dt, "YYYYMMDD").toDate(),
                        y: gap
                    };

                    let objGAPpercent = {
                        x: moment(result1[i].tbl_dt, "YYYYMMDD").toDate(),
                        y: gapPercent
                    };

                    dataPointsGAP.push(objGAP);
                    dataPointsGAPpercent.push(objGAPpercent);
                }
                
                // Créez le graphique CanvasJS
                CanvasJS.addCultureInfo("fr",
                    {
                        decimalSeparator: ",",
                        digitGroupSeparator: " ",
                    })
                var chart = new CanvasJS.Chart("graphe", {
                    animationEnabled: true,
                    theme: "light2",
                    title: {
                        text: "CS17 vs GGSN"
                    },
                    culture: "fr",
                    axisX: {

                        valueFormatString: "DD-MM-YYYY",
                    },
                    axisY: [{
                        title: "Volume",
                        lineColor: " #101827",
                        tickColor: " #101827",
                        labelFontColor: " #101827",
                        titleFontColor: " #101827",
                        includeZero: true,
                        suffix: " To"
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

                            name: "GAP (To)",
                            showInLegend: true,
                            dataPoints: dataPointsGAP
                        },
                        {
                            type: "line",
                            lineThickness: 2,
                            markerSize: 3,
                            name: "Volume GGSN (To)",
                            color: "#ffed28",
                            axisYIndex: 0,
                            showInLegend: true,
                            dataPoints:dataPoints1
                        },
                        {
                            type: "line",
                            markerSize: 3,
                            lineThickness: 2,
                            name: "Volume CS (To)",
                            color: " #2c394f",
                            axisYIndex: 0,
                            showInLegend: true,
                            dataPoints: dataPoints
                        }
                    ]
                });
                chart.render();

                var tableau = '<hr><br>' +
                    '<table style="width:100%;" >' +
                    '<thead>' +
                    '<tr>' +
                    '<th >DATE</th>' +
                    '<th >VOL_CS (To)</th>' +
                    '<th >VOL_UP (To)</th>' +
                    '<th >VOL_DOWN (To)</th>' +
                    '<th >VOL_GGSN (To)</th>' +
                    '<th >GAP (To)</th>' +
                    '<th  >GAP(%)</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody >';


                const maxLength = Math.max(result1.length, result2.length);
                for (let j = 0; j < maxLength; j++) {
                    let row = result1[j] || {};  // Utilisez un objet vide par défaut si l'indice n'existe pas dans result1
                    let row2 = result2[j] || {}; // Utilisez un objet vide par défaut si l'indice n'existe pas dans result2
                    let GAP = row.VOL_DATA_TOTAL_TO - row2.CS_VOL;
                    let GAPpercent = ((GAP / row2.CS_VOL) * 100).toFixed(1);

                    let formattedDate = moment(row.tbl_dt, "YYYYMMDD").format("DD-MM-YYYY");

                    tableau += '<tr>' +
                        '<td><div>' + formattedDate + '</div></td>' +
                        '<td><div>' + row2.CS_VOL + '</div></td>' +
                        '<td><div>' + row.VOL_DATA_UP_TO + '</div></td>' +
                        '<td><div>' + row.VOL_DATA_DOWN_TO + '</div></td>' +
                        '<td><div>' + row.VOL_DATA_TOTAL_TO + '</div></td>' +
                        '<td><div>' + GAP + '</div></td>' +
                        '<td><div>' + GAPpercent + '</div></td>' +
                        '</tr>'
                }
                tableau += '</tbody></table>';
                $("#tablGap").html(tableau);
            },
            complete: function () {
                $("#attente").addClass('hidden');
            },

        });
    }

    

    // Appel à la fonction pour récupérer les données par défaut lors du chargement de la page
    getDefaultData();

    $("#show").click(function () {
        day1 = document.getElementById("day1").value;
        day7 = document.getElementById("day7").value;

        if (day1 === "") {
            $("#graphe").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>');
            return;
        }
        if (day7 === "") {
            $("#graphe").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>');
            return;
        }

        $.ajax({
            url: '/CPreconCS17vsGGSNajax/',
            method: 'post',
            data: { day1: day1, day7: day7, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            beforeSend: function () {
                $("#attente").removeClass('hidden');
            },
            success: function (response) {
                let datas = JSON.parse(response.result);
                let result1 = datas.result1 || [];
                let result2 = datas.result2 || [];

                if (result1.length === 0 && datas.result2.length === 0 ) {
                    $("#graphe").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    $("#tablGap").html('');
                    return;
                }
                let dataPoints = result2.map(data => ({
                    x: moment(data.tbl_dt, "YYYYMMDD").toDate(),
                    y: data.CS_VOL
                }));
                let dataPoints1 = result1.map(data => ({
                    x: moment(data.tbl_dt, "YYYYMMDD").toDate(),
                    y: data.VOL_DATA_TOTAL_TO
                }));

            

                // Créez ici les dataPoints pour GAP et GAPpercent en utilisant les formules souhaitées
                let dataPointsGAP = [];
                let dataPointsGAPpercent = [];

                const maxLenth = Math.max(result1.length, result2.length);
                for (let i = 0; i < maxLenth; i++) {
                    let csVol = result2[i].CS_VOL;
                    let volDataTotalTo = result1[i].VOL_DATA_TOTAL_TO;

                    // Calculer GAP et GAPpercent à partir des formules
                    let gap = volDataTotalTo - csVol;
                    let gapPercent = (gap / csVol) * 100;

                    let objGAP = {
                        x: moment(result1[i].tbl_dt, "YYYYMMDD").toDate(),
                        y: gap
                    };

                    let objGAPpercent = {
                        x: moment(result1[i].tbl_dt, "YYYYMMDD").toDate(),
                        y: gapPercent
                    };

                    dataPointsGAP.push(objGAP);
                    dataPointsGAPpercent.push(objGAPpercent);
                }
                // Créez le graphique CanvasJS
                CanvasJS.addCultureInfo("fr",
                    {
                        decimalSeparator: ",",
                        digitGroupSeparator: " ",
                    })
                var chart = new CanvasJS.Chart("graphe", {
                    animationEnabled: true,
                    theme: "light2",
                    title: {
                        text: "CS17 vs GGSN"
                    },
                    culture: "fr",
                    axisX: {
                        valueFormatString: "DD-MM-YYYY",
                    },
                    axisY: [{
                        title: "Volume",
                        lineColor: " #101827",
                        tickColor: " #101827",
                        labelFontColor: " #101827",
                        titleFontColor: " #101827",
                        includeZero: true,
                        suffix: " To"
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

                            name: "GAP (To)",
                            showInLegend: true,
                            dataPoints: dataPointsGAP
                        },
                        {
                            type: "line",
                            lineThickness: 2,
                            markerSize: 3,
                            name: "Volume GGSN (To)",
                            color: "#ffed28",
                            axisYIndex: 0,
                            showInLegend: true,
                            dataPoints: dataPoints1
                        },
                        {
                            type: "line",
                            markerSize: 3,
                            lineThickness: 2,
                            name: "Volume CS (To)",
                            color: " #2c394f",
                            axisYIndex: 0,
                            showInLegend: true,
                            dataPoints: dataPoints
                        }
                    ]
                });
                chart.render();
          
                var tableau = '<hr><br>' +
                    '<table style="width:100%;" >' +
                    '<thead>' +
                    '<tr>' +
                    '<th >DATE</th>' +
                    '<th >VOL_CS (To)</th>' +
                    '<th >VOL_UP (To)</th>' +
                    '<th >VOL_DOWN (To)</th>' +
                    '<th >VOL_GGSN (To)</th>' +
                    '<th >GAP (To)</th>' +
                    '<th >GAP(%)</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody >';

                
                const maxLength = Math.max(result1.length, result2.length);
                for (let j = 0; j < maxLength; j++) {
                    let row = result1[j] || {};  // Utilisez un objet vide par défaut si l'indice n'existe pas dans result1
                    let row2 = result2[j] || {}; // Utilisez un objet vide par défaut si l'indice n'existe pas dans result2
                    let GAP = row.VOL_DATA_TOTAL_TO - row2.CS_VOL;
                    let GAPpercent = ((GAP / row2.CS_VOL) * 100).toFixed(1);

                    let formattedDate = moment(row.tbl_dt, "YYYYMMDD").format("DD-MM-YYYY");

                    tableau += '<tr>' +
                        '<td><div>' + formattedDate + '</div></td>' +
                        '<td><div>' + row2.CS_VOL + '</div></td>' +
                        '<td><div>' + row.VOL_DATA_UP_TO + '</div></td>' +
                        '<td><div>' + row.VOL_DATA_DOWN_TO + '</div></td>' +
                        '<td><div>' + row.VOL_DATA_TOTAL_TO + '</div></td>' +
                        '<td><div>' + GAP + '</div></td>' +
                        '<td><div>' + GAPpercent + '</div></td>' +
                        '</tr>'
                }        
                tableau +='</tbody></table>';
                $("#tablGap").html(tableau);
            },
            complete: function () {
                $("#attente").addClass('hidden');
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




    
