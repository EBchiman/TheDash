

$(document).ready(function () {
    function afficheData() {
        
        $.ajax({
            url: '/CPbouclageAjax/',
           beforeSend: function () {
                $("#ADwait").removeClass('hidden');
            },
            success: function (response) {
                let datas = JSON.parse(response.result);
                if (datas.length === 0 ) {
                    $("#tablboucl").html('<center><div class="app-content-headerText">AUCUNES DONNEES</div></center>');
                    return;
                }

                var tableau = '<hr><br>' +
                    '<table style="width:100%;" >' +
                    '<thead>' +
                    '<tr>' +
                    '<th >da_id</th>' +
                    '<th >balance_ouverture</th>' +
                    '<th >balance_fermeture</th>' +
                    '<th >reception</th>' +
                    '<th >consommation</th>' +
                    '<th >GAP</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody >';


                for (let j = 0; j < datas.length; j++) {
                    let row = datas[j] || {};  // Utilisez un objet vide par défaut si
                    let GAP = row.balance_ouverture + row.reception - row.consommation - row.balance_fermeture  ;
                    if (GAP !== 0) {
                    tableau += '<tr>' +
                        '<td><div>' + row.da_id + '</div></td>' +
                        '<td><div>' + row.balance_ouverture + '</div></td>' +
                        '<td><div>' + row.balance_fermeture+ '</div></td>' +
                        '<td><div>' + row.reception + '</div></td>' +
                        '<td><div>' + row.consommation + '</div></td>' +
                        '<td><div>' + GAP + '</div></td>' +
                        '</tr>'
                }
            }
                tableau += '</tbody></table>';
                $("#tablboucl").html(tableau);
            },
            complete: function () {
                $("#ADwait").addClass('hidden');
            },

        });
    }
    // Appel à la fonction pour récupérer les données par défaut lors du chargement de la page
   afficheData();
});
