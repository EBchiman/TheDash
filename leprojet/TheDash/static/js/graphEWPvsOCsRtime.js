let strt, ennd;

$(document).ready(function () {
    $("#strt").flatpickr({ dateFormat: "d-m-Y" });  // Modifier cette ligne avec l'ID de la date de début pour cette page
    $("#ennd").flatpickr({ dateFormat: "d-m-Y" });  // Modifier cette ligne avec l'ID de la date de fin pour cette page


    function getDefaultData() {
        const currentDate = new Date();
        const ennd = currentDate.toLocaleDateString('fr-FR');  // Date actuelle au format "jour-mois-année"
        currentDate.setDate(currentDate.getDate() - 7);  // 7 jours avant la date actuelle
        const strt = currentDate.toLocaleDateString('fr-FR');  // Date par défaut au format "jour-mois-année"
        $.ajax({
            url: '/ReconEWPvsOCsRtimeajax/',
            method: 'post',
            data: { strt: strt, ennd: ennd, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            beforeSend: function () {
                $("#loder").removeClass('hidden');
            },
            success: function (response) {
                let dataPoints = [];
                let datas = JSON.parse(response.result);
                if (datas.length === 0) {
                    $("#chartCanv").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    $("#letablo").html('');
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

                var chart = new CanvasJS.Chart("chartCanv", {
                    animationEnabled: true,
                    title: {
                        text: "EWP vs OCS-Airtime Purchase"
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
                    '<table style="width:100%;" >' +
                    '<thead>' +
                    '<tr>' +
                    '<th rowspan="2">DATE</th>' +
                    '<th  colspan="2">EWP</th>' +
                    '<th colspan="2">OCS</th>' +
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
                        '<td><div>' + row.EWP_TOTAL + '</div></td>' +
                        '<td><div>' + row.EWP_AMOUNT + '</div></td>' +
                        '<td><div>' + row.OCS_TOTAL + '</div></td>' +
                        '<td><div>' + row.OCS_AMOUNT + '</div></td>' +
                        '<td><div>' + row.GAP_TOTAL + '</div></td>' +
                        '<td><div>' + row.GAP_AMOUNT + '</div></td>' +
                        '<td><div style="color:red">' + comments + '</div></td>' +
                        '</tr>';
                }

                tableau += '</tbody></table>';
                $("#letablo").html(tableau);
            },
            complete: function () {
                $("#loder").addClass('hidden');
            }

        });
    }
    // Appel à la fonction pour récupérer les données par défaut lors du chargement de la page
    getDefaultData();



    $("#stats").click(function () {
        strt = document.getElementById("strt").value;  // Modifier cette ligne avec l'ID de la date de début pour cette page
       ennd = document.getElementById("ennd").value;  // Modifier cette ligne avec l'ID de la date de fin pour cette page

        if (strt=== "") {
            $("#chartCanv").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>');
            return;
        }
        if (ennd === "") {
            $("#chartCanv").html('<center><div class="app-content-headerText">Veuillez saisir une date valide</div></center>');
            return;
        }

        $.ajax({
            url: '/ReconEWPvsOCsRtimeajax/',
            method: 'post',
            data: { strt:strt, ennd:ennd , csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            beforeSend: function () {
                $("#loder").removeClass('hidden');
            },
            success: function (response) {
                let dataPoints = [];
                let datas = JSON.parse(response.result);
                if (datas.length === 0) {
                    $("#chartCanv").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    $("#letablo").html('');
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

                var chart = new CanvasJS.Chart("chartCanv", {
                    animationEnabled: true,
                    title: {
                        text: "EWP vs OCS-Airtime Purchase"
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
                    '<th rowspan="2">DATE</th>' +
                    '<th  colspan="2">EWP</th>' +
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
                        '<td><div>' + row.EWP_TOTAL + '</div></td>' +
                        '<td><div>' + row.EWP_AMOUNT + '</div></td>' +
                        '<td><div>' + row.OCS_TOTAL + '</div></td>' +
                        '<td><div>' + row.OCS_AMOUNT + '</div></td>' +
                        '<td><div>' + row.GAP_TOTAL + '</div></td>' +
                        '<td><div>' + row.GAP_AMOUNT + '</div></td>' +
                        '<td><div style="color:red">' + comments + '</div></td>' +
                        '</tr>';
                }

                tableau += '</tbody></table>';
                $("#letablo").html(tableau);
            },
            complete: function () {
                $("#loder").addClass('hidden');
            }
        });
    });
});
