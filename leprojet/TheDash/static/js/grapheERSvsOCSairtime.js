let dateDebut2, dateFin2;

$(document).ready(function () {
    $("#dateDebut2").flatpickr({ dateFormat: "d-m-Y" });  // Modifier cette ligne avec l'ID de la date de début pour cette page
    $("#dateFin2").flatpickr({ dateFormat: "d-m-Y" });  // Modifier cette ligne avec l'ID de la date de fin pour cette page

    function getDefaultData() {
        const currentDate = new Date();
        const dateFin2 = currentDate.toLocaleDateString('fr-FR');  // Date actuelle au format "jour-mois-année"
        currentDate.setDate(currentDate.getDate() - 7);  // 7 jours avant la date actuelle
        const dateDebut2 = currentDate.toLocaleDateString('fr-FR');  // Date par défaut au format "jour-mois-année"
        $.ajax({
            url: '/ReconERSvsOCSAirtimeajax/',
            method: 'post',
            data: { dateDebut2: dateDebut2, dateFin2: dateFin2, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            beforeSend: function () {
                $("#loader2").removeClass('hidden');
            },
            success: function (response) {
                let dataPoints = [];
                let datas = JSON.parse(response.result);
                if (datas.length === 0) {
                    $("#chartContain2").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    $("#tablResult2").html('');
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

                var chart = new CanvasJS.Chart("chartContain2", {
                    animationEnabled: true,
                    title: {
                        text: "ERS vs OCS-Airtime Purchase"
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
                $("#tablResult2").html(tableau);
            },
            complete: function () {
                $("#loader2").addClass('hidden');
            }

        });
    }
    // Appel à la fonction pour récupérer les données par défaut lors du chargement de la page
    getDefaultData();


    $("#research2").click(function () {
        dateDebut2 = document.getElementById("dateDebut2").value;  // Modifier cette ligne avec l'ID de la date de début pour cette page
        dateFin2= document.getElementById("dateFin2").value ;  // Modifier cette ligne avec l'ID de la date de fin pour cette page

        if (dateDebut2 === "") {
            $("#chartContain2").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>')
            return;
        }
        if (dateFin2 === "") {
            $("#chartContain2").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>');
            return;
        }

        $.ajax({
            url: '/ReconERSvsOCSAirtimeajax/',
            method: 'post',
            data: { dateDebut2: dateDebut2, dateFin2: dateFin2, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            beforeSend: function () {
                $("#loader2").removeClass('hidden');
            },
            success: function (response) {
                let dataPoints = [];
                let datas = JSON.parse(response.result);
                if (datas.length === 0) {
                    $("#chartContain2").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    $("#tablResult2").html('');
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

                var chart = new CanvasJS.Chart("chartContain2", {
                    animationEnabled: true,
                    title: {
                        text: "ERS vs OCS-Airtime Purchase"
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
                $("#tablResult2").html(tableau);
            },
            complete: function () {
                $("#loader2").addClass('hidden');
            }
        });
    });
});
