
// Fonction pour regrouper les données par numéro
function groupDataByNumero(dataArray) {
    let groupedData = {};
    for (let i = 0; i < dataArray.length; i++) {
        let row = dataArray[i];
        if (groupedData[row.msisdn]) {
            groupedData[row.msisdn].push(row);
        } else {
            groupedData[row.msisdn] = [row];
        }
    }
    return groupedData;
}

// Fonction pour trouver la balance pour une date donnée (non utilisée dans le code final)
function findBalanceForRowAndDate(dataArray, targetDate) {
    for (let i = 0; i < dataArray.length; i++) {
        let row = dataArray[i];
        if (row.data_day === targetDate) {
            return row.balance;
        }
    }
    return 0; // Si aucune balance trouvée pour la date donnée, retourne 0
}

// Fonction pour trier les données par date de manière décroissante
function sortDataByDateDescending(dataArray) {
    return dataArray.sort((a, b) => {
        const dateA = new Date(a.data_day);
        const dateB = new Date(b.data_day);
        return dateA - dateB; // Tri par ordre décroissant
    });
}

// Fonction pour trouver la balance la plus récente pour une date donnée
function getMostRecentbalanceForDate(dataArray, targetDate) {
    let sortedData = sortDataByDateDescending(dataArray);
    for (let i = 0; i < sortedData.length; i++) {
        let row = sortedData[i];
        if (row.data_day === targetDate) {
            return row.balance;
        }
    }
    return 0; // Si aucune balance trouvée pour la date donnée, retourne 0
}

$(document).ready(function () {
    $("#bald1").flatpickr({ dateFormat: "d-m-Y" });
    $("#bald7").flatpickr({ dateFormat: "d-m-Y" });
    let bald1, bald7;

    function getDefaultData() {
        const currentDate = new Date();
        bald7 = currentDate.toLocaleDateString('fr-FR');
        currentDate.setDate(currentDate.getDate() - 7);
        bald1 = currentDate.toLocaleDateString('fr-FR');
        $.ajax({
            url: '/balanceAjax/',
            method: 'post',
            data: { bald1: bald1, bald7: bald7, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            dataType: 'json',
            beforeSend: function () {
                $("#waitmn").removeClass('hidden');
            },
            success: function (response) {
                let datas = JSON.parse(response.result);
                if (datas.length === 0) {
                    $("#balance").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    return;
                }
                        // Obtenir tous les numéros uniques pour lesquels nous avons des données de balance
                let uniqueNumeros = [...new Set(datas.map(data => data.msisdn))];

                var tableau = '<hr><br>' +
                    '<table style="width:100%;">' +
                    '<thead>' +
                    '<tr>' +
                    '<th  >NUMERO</th>' +
                    '<th >DATE</th>' +
                    '<th >BALANCE</th>' +
                    '<th >CONSO</th>' +
                    '<th>PROFILE</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';

                for (let msisdn of uniqueNumeros) {
                    let dataForNumero = datas.filter(data => data.msisdn === msisdn);
                    let sortedDataForNumero = sortDataByDateDescending(dataForNumero);
                    
                tableau += '<tr>' +
                        '<td  rowspan="' + sortedDataForNumero.length + '"><div>' + msisdn + '</div></td>';

                    for (let i = 0; i < sortedDataForNumero.length; i++) {
                        let row = sortedDataForNumero[i]; 
                        let formattedDate = moment(row.data_day, "YYYYMMDD").format("DD-MM-YYYY");
                        tableau += '<td ><div>' + formattedDate + '</div></td>' +
                            '<td ><div>' + row.balance + '</div></td>';

                        if (i === 0) {
                                   
                            tableau += '<td   rowspan="' + sortedDataForNumero.length + '"><div>' + row.conso + '</div></td>' +
                                '<td rowspan="' + sortedDataForNumero.length + '"><div>' + row.product_name + '</div></td>';
                        }

                        tableau += '</tr>';
                    }

                }
                
                tableau += '</tbody></table>';
                $("#balance").html(tableau);
            },
            complete: function () {
                $("#waitmn").addClass('hidden');
            }
        });
    }

    getDefaultData();

    $("#visibl").click(function () {
        bald1 = document.getElementById("bald1").value;
        bald7 = document.getElementById("bald7").value;

        if (bald1 === "" || bald7 === "") {
            $("#Legraf").html('<div class="app-content-headerText">Veuillez saisir des dates valides</div>');
            return;
        }
        $.ajax({
            url: '/balanceAjax/',
            method: 'post',
            data: { bald1: bald1, bald7: bald7, csrfmiddlewaretoken: document.querySelector('[name=csrfmiddlewaretoken]').value },
            dataType: 'json',
            beforeSend: function () {
                $("#waitmn").removeClass('hidden');
            },
            success: function (response) {
                let datas = JSON.parse(response.result);
                if (datas.length === 0) {
                    $("#balance").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    return;
                }

                // Obtenir tous les numéros uniques pour lesquels nous avons des données de balance
                let uniqueNumeros = [...new Set(datas.map(data => data.msisdn))];

                var tableau = '<hr><br>' +
                    '<table style="width:100%;">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>NUMERO</th>' +
                    '<th >DATE</th>' +
                    '<th >BALANCE</th>' +
                    '<th >CONSO</th>' +
                    '<th>PROFILE</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';

                for (let msisdn of uniqueNumeros) {
                    let dataForNumero = datas.filter(data => data.msisdn === msisdn);
                    let sortedDataForNumero = sortDataByDateDescending(dataForNumero);
                    

                    tableau += '<tr>' +
                        '<td  rowspan="' + sortedDataForNumero.length + '"><div>' + msisdn + '</div></td>';

                    for (let i = 0; i < sortedDataForNumero.length; i++) {
                        let row = sortedDataForNumero[i];
                        let formattedDate = moment(row. data_day, "YYYYMMDD").format("DD-MM-YYYY");
                        tableau += '<td ><div>' + formattedDate + '</div></td>' +
                            '<td ><div>' + row.balance + '</div></td>';

                        if (i === 0) {
                            tableau += '<td   rowspan="' + sortedDataForNumero.length + '"><div>' + row.conso + '</div></td>' +
                                '<td rowspan="' + sortedDataForNumero.length + '"><div>' + row.product_name + '</div></td>';
                        }

                        tableau += '</tr>';
                    }

                }

                tableau += '</tbody></table>';
                $("#balance").html(tableau);
            },
            complete: function () {
                $("#waitmn").addClass('hidden');
            }
        });
    });
        
})
