const Products_Key_Name = 'products'

function addProduct(event) {
    event.preventDefault();
    const productName = document.querySelectorAll('input')[0].value;
    const productPrice = Number(document.querySelectorAll('input')[1].value);
    const productCategory = document.querySelectorAll('select')[0].value;
    const productPicture = document.querySelectorAll('textarea')[0].value;
    const oneObject = objectify(productName, productPrice, productCategory, productPicture);
    const newInjection = generatedInjection(oneObject);
    inject(newInjection);
    save(oneObject);
    clearForm();
};


function objectify(productName, productPrice, productCategory, productPicture) {
    const myObject = {
        productName,
        productPrice,
        productCategory,
        productPicture
    }
    return myObject
};


function generatedInjection(object) {
    const newInjection = `
        <tr class="border border-light-subtle">
            <td class="border border-light-subtle">${object.productName}</td>
            <td class="border border-light-subtle">${object.productPrice}</td>
            <td class="border border-light-subtle">${object.productCategory}</td>
            <td class="border border-light-subtle"><img src="${object.productPicture}" class = "rounded-circle"></td>
            <td class="border border-light-subtle"><button onclick = "deletion()">Delete</button></td>
        </tr class="border border-light-subtle"> 
    `;
    return newInjection
};

function deletion() {
    alert('Could not delete the item as requested but hey, look at the bright side - at least you get to keep this delicious item! Bon Appetito!');
};



function inject(injection) {
    document.querySelectorAll("tbody")[0].innerHTML += injection;
};

function save(object) {
    const JSONForthString = localStorage.getItem(Products_Key_Name) || '[]';
    const parsedString = JSON.parse(JSONForthString);
    parsedString.push(object);
    const JSONBackString = JSON.stringify(parsedString)
    localStorage.setItem(Products_Key_Name, JSONBackString);
};



function load() {
    const firstArray = localStorage.getItem(Products_Key_Name);
    if (firstArray) {
        const arrayParsed = JSON.parse(firstArray);
        for (const object of arrayParsed) {
            const newInjection = generatedInjection(object);
            inject(newInjection);
        };
    };
};


load();

function clearForm() {
    document.querySelectorAll('form')[0].reset();
};
