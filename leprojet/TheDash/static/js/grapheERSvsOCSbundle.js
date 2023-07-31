let dateDebut1, dateFin1;

$(document).ready(function () {
    $("#dateDebut1").flatpickr({ dateFormat: "d-m-Y" });  // Modifier cette ligne avec l'ID de la date de début pour cette page
    $("#dateFin1").flatpickr({ dateFormat: "d-m-Y" });  // Modifier cette ligne avec l'ID de la date de fin pour cette page

    function getDefaultData() {
        const currentDate = new Date();
        const dateFin1 = currentDate.toLocaleDateString('fr-FR');  // Date actuelle au format "jour-mois-année"
        currentDate.setDate(currentDate.getDate() - 7);  // 7 jours avant la date actuelle
        const dateDebut1 = currentDate.toLocaleDateString('fr-FR');  // Date par défaut au format "jour-mois-année"
        $.ajax({
            url: '/ReconERSvsOCSBundleajax/',
            method: 'post',
            data: { dateDebut1: dateDebut1, dateFin1: dateFin1, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            beforeSend: function () {
                $("#loader1").removeClass('hidden');
            },
            success: function (response) {
                let dataPoints = [];
                let datas = JSON.parse(response.result);
                if (datas.length === 0) {
                    $("#chartContain").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    $("#tablResult1").html('');
                    return;
                }

                for (let i = 0; i < datas.length; i++) {
                    let obj = {
                        x: new Date(datas[i].DATEID),
                        y: datas[i].GAP_AMOUNT
                    };
                    dataPoints.push(obj);
                }

                CanvasJS.addCultureInfo("fr", {
                    decimalSeparator: ",",
                    digitGroupSeparator: " "
                });

                var chart = new CanvasJS.Chart("chartContain", {
                    animationEnabled: true,
                    title: {
                        text: "ERS vs OCS-Bundle Purchase"
                    },
                    culture: "fr",
                    axisX: {
                        valueFormatString: "DD-MM-YYYY"
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

                var tableau = '<hr><br>' +
                    '<table style="width:100%;">' +
                    '<thead>' +
                    '<tr>' +
                    '<th  rowspan="2">DATE</th>' +
                    '<th  colspan="2">ERS</th>' +
                    '<th  colspan="2">OCS</th>' +
                    '<th  colspan="2">GAP</th>' +
                    '<th rowspan="2" >COMMENTS</th>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>TOTAL</th>' +
                    '<th>AMOUNT</th>' +
                    '<th>TOTAL</th>' +
                    '<th>AMOUNT</th>' +
                    '<th>TOTAL</th>' +
                    '<th>AMOUNT</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody >';

                for (var j = 0; j < datas.length; j++) {
                    var row = datas[j];
                    var comments = '';

                    if (row.GAP_TOTAL !== 0) {
                        comments = 'To Check';
                    }

                    tableau += '<tr>' +
                        '<td><div>' + row.DATEID + '</div></td>' +
                        '<td><div>' + row.ERS_TOTAL + '</div></td>' +
                        '<td><div>' + row.ERS_AMOUNT + '</div></td>' +
                        '<td><div>' + row.CS16_TOTAL + '</div></td>' +
                        '<td><div>' + row.CS16_AMOUNT + '</div></td>' +
                        '<td><div>' + row.GAP_TOTAL + '</div></td>' +
                        '<td><div>' + row.GAP_AMOUNT + '</div></td>' +
                        '<td><div style="color:red">' + comments + '</div></td>' +
                        '</tr>';
                }

                tableau += '</tbody></table>';
                $("#tablResult1").html(tableau);
            },
            complete: function () {
                $("#loader1").addClass('hidden');
            }

        });
    }
    // Appel à la fonction pour récupérer les données par défaut lors du chargement de la page
    getDefaultData();

    $("#research1").click(function () {
        dateDebut1 = document.getElementById("dateDebut1").value;  // Modifier cette ligne avec l'ID de la date de début pour cette page
        dateFin1 = document.getElementById("dateFin1").value;  // Modifier cette ligne avec l'ID de la date de fin pour cette page

        if (dateDebut1 === "") {
            $("#chartContain").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>');
            return;
        }
        if (dateFin1 === "") {
            $("#chartContain").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>');
            return;
        }

        $.ajax({
            url: '/ReconERSvsOCSBundleajax/',
            method: 'post',
            data: { dateDebut1: dateDebut1, dateFin1: dateFin1, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            beforeSend: function () {
                $("#loader1").removeClass('hidden');
            },
            success: function (response) {
                let dataPoints = [];
                let datas = JSON.parse(response.result);
                if (datas.length === 0) {
                    $("#chartContain").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    $("#tablResult1").html('');
                    return;
                }

                for (let i = 0; i < datas.length; i++) {
                    let obj = {
                        x: new Date(datas[i].DATEID),
                        y: datas[i].GAP_AMOUNT
                    };
                    dataPoints.push(obj);
                }

                CanvasJS.addCultureInfo("fr", {
                    decimalSeparator: ",",
                    digitGroupSeparator: " "
                });

                var chart = new CanvasJS.Chart("chartContain", {
                    animationEnabled: true,
                    title: {
                        text: "ERS vs OCS-Bundle Purchase"
                    },
                    culture: "fr",
                    axisX: {
                        valueFormatString: "DD-MM-YYYY"
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

                var tableau = '<hr><br>' +
                    '<table style="width:100%;">' +
                    '<thead>' +
                    '<tr>' +
                    '<th  rowspan="2">DATE</th>' +
                    '<th colspan="2">ERS</th>' +
                    '<th  colspan="2">OCS</th>' +
                    '<th  colspan="2">GAP</th>' +
                    '<th rowspan="2">COMMENTS</th>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>TOTAL</th>' +
                    '<th>AMOUNT</th>' +
                    '<th>TOTAL</th>' +
                    '<th>AMOUNT</th>' +
                    '<th>TOTAL</th>' +
                    '<th>AMOUNT</th>'+
                    '</tr>' +
                    '</thead>' +
                    '<tbody >';

                for (var j = 0; j < datas.length; j++) {
                    var row = datas[j];
                    var comments = '';

                    if (row.GAP_TOTAL !== 0) {
                        comments = 'To Check';
                    }

                    tableau += '<tr>' +
                        '<td><div>' + row.DATEID + '</div></td>' +
                        '<td><div>' + row.ERS_TOTAL + '</div></td>' +
                        '<td><div>' + row.ERS_AMOUNT + '</div></td>' +
                        '<td><div>' + row.CS16_TOTAL + '</div></td>' +
                        '<td><div>' + row.CS16_AMOUNT + '</div></td>' +
                        '<td><div>' + row.GAP_TOTAL + '</div></td>' +
                        '<td><div>' + row.GAP_AMOUNT + '</div></td>' +
                        '<td><div  style="color:red">' + comments + '</div></td>' +
                        '</tr>';
                }

                tableau += '</tbody></table>';
                $("#tablResult1").html(tableau);
            },
            complete: function () {
                $("#loader1").addClass('hidden');
            }
        });
    });
});
