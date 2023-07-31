
document.addEventListener("DOMContentLoaded", function () {


    const filterButton = document.querySelector(".jsmenuEvd");
    const menu = document.querySelector('.menuEvd');

    filterButton.addEventListener('click', function () {

        menu.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {

        const targetElement = event.target;

        if (!targetElement.classList.contains('menuEvd') && targetElement.closest('.jsmenuEvd') === null && !targetElement.classList.contains('menuEvdPromo') && targetElement.closest('.jsmenuEvdPromo') === null) {

            menu.classList.remove('active');
        }
    });
})
document.addEventListener("DOMContentLoaded", function () {

    const filterButton = document.querySelector(".jsmenuEvdPromo");
    const menu = document.querySelector('.menuEvdPromo');

    filterButton.addEventListener('click', function () {

        menu.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {

        const targetElement = event.target;

        if (!targetElement.classList.contains('menuEvdPromo') && targetElement.closest('.jsmenuEvdPromo') === null) {

            menu.classList.remove('active');
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {


    const filterButton = document.querySelector(".jsmenuRA");
    const menu = document.querySelector('.menuRA');

    filterButton.addEventListener('click', function () {

        menu.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {

        const targetElement = event.target;

        if (!targetElement.classList.contains('menuRA') && targetElement.closest('.jsmenuRA') === null &&
            !targetElement.classList.contains('menuRAERSvsOCS') && targetElement.closest('.jsmenuRAERSvsOCS') === null
            && !targetElement.classList.contains('menuRAEWPvsOCS') && targetElement.closest('.jsmenuRAEWPvsOCS') === null) {

            menu.classList.remove('active');
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {


    const filterButton = document.querySelector(".jsmenuRAERSvsOCS");
    const menu = document.querySelector('.menuRAERSvsOCS');

    filterButton.addEventListener('click', function () {

        menu.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {

        const targetElement = event.target;

        if (!targetElement.classList.contains('menuRAERSvsOCS') && targetElement.closest('.jsmenuRAERSvsOCS') === null) {

            menu.classList.remove('active');
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {

    const filterButton = document.querySelector(".jsmenuRAEWPvsOCS");
    const menu = document.querySelector('.menuRAEWPvsOCS');

    filterButton.addEventListener('click', function () {

        menu.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
      
        const targetElement = event.target;

        if (!targetElement.classList.contains('menuRAEWPvsOCS') && targetElement.closest('.jsmenuRAEWPvsOCS') === null) {
            
            menu.classList.remove('active');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {


    const filterButton = document.querySelector(".jsmenuCP");
    const menu = document.querySelector('.menuCP');

    filterButton.addEventListener('click', function () {

        menu.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
       
        const targetElement = event.target;

        if (!targetElement.classList.contains('menu') && targetElement.closest('.jsmenuCP') === null) {
           
            menu.classList.remove('active');
        }
    });
});