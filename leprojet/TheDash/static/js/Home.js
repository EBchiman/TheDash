document.addEventListener("DOMContentLoaded", function () {


    const filterButton = document.querySelector(".jsmenu");
    const menu = document.querySelector('.menu');

    filterButton.addEventListener('click', function () {

        menu.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {

        const targetElement = event.target;

        if (!targetElement.classList.contains('menu') && targetElement.closest('.jsmenu') === null){

            menu.classList.remove('active');
        }
    });
})




// document.addEventListener("DOMContentLoaded", function () {

//     var modeSwitch = document.querySelector(".mode-switch");

//     let mode = localStorage.getItem('mode');

//     console.log(mode)

//     document.documentElement.classList.toggle(mode)

//     console.log(document.documentElement.classList);


//     modeSwitch.addEventListener("click", function () {

//         newMode = mode === 'dark' ? 'light' : 'dark';


//         document.documentElement.classList.remove(mode);

//         console.log(document.documentElement.classList);

//         document.documentElement.classList.add(newMode);

//         localStorage.setItem('mode', newMode);

//         modeSwitch.classList.toggle("active");

//         mode = newMode
//     });

// });

document.addEventListener("DOMContentLoaded", function () {
    // Récupérer l'état du mode depuis le localStorage
    let mode = localStorage.getItem('mode');

    // Si le mode n'est pas défini dans le localStorage, définir le mode clair par défaut
    if (mode === null) {
        mode = 'light';
    }

    // Appliquer le mode actuel au document
    document.documentElement.classList.add(mode);

    // Récupérer le bouton de mode
    var modeSwitch = document.querySelector(".mode-switch");

    // Mettre à jour l'apparence du bouton de mode en fonction du mode actuel
    if (mode === 'dark') {
        modeSwitch.classList.add("active");
    }

    // Ajouter un écouteur d'événement pour le clic sur le bouton de mode
    modeSwitch.addEventListener("click", function () {
        // Changer le mode en fonction de l'état actuel
        let newMode = mode === 'dark' ? 'light' : 'dark';

        // Appliquer le nouveau mode au document
        document.documentElement.classList.remove(mode);
        document.documentElement.classList.add(newMode);

        // Mettre à jour le localStorage avec le nouveau mode
        localStorage.setItem('mode', newMode);

        // Mettre à jour l'état de mode
        mode = newMode;

        // Mettre à jour l'apparence du bouton de mode
        modeSwitch.classList.toggle("active");
    });
});
