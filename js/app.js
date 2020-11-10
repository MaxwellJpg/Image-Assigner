//VARS
const url = 'https://api.unsplash.com/photos/random/' + `?client_id=${client_id}`;

let emails = [];
let imgRes = {};//Holds imgurl & alt

/**
 * IIFE for unsplash requests
 * @return  {function} unsplashRequest()
 */
let setup; (setup = () => {
    unSplashRequest()
        .then(results => {
            imgRes = results;
            embed(results);
        })
        .catch(err => console.error(err))
    ;
})()

/**
 * ASYNC
 * Fetches json of random img from unsplash
 * @return {object} 
 */
async function unSplashRequest() {
    const response = await fetch(url, {
        method: 'GET',
    });

    const json = await response.json();

    return {
        imgurl: json.urls.full,
        alt: json.alt_description
    };
}

/**
 * Embed the results objects (url and alt)
 * @param  {object} results
 */
function embed(results) {
    //add img url to src attribute of img placeholder
    $('#main-img').attr('src', results.imgurl);
    $('#main-img').removeAttr('alt');

    //if img description exists or not
    if(results.alt) {
        $('#main-img').attr('alt', results.alt);
        $('#fig-text').text(results.alt);
    } else {
        $('#main-img').attr('alt', 'No Description');
        $('#fig-text').text('No Description');
    }
}

//EMAIL
/**
 * Validates the input email against re
 * @param  {string} email
 */
function validateEmail(email) {
    var re = 
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    
    return re.test(email); 
}

//form listener
$('#form').on('submit', (e) => {
    //prevent form from sumbitting and reloading
    e.preventDefault();
    let email = $('#email').val();

    //if email is valid
    if (validateEmail(email)) {
        $('#email').css("border", "1px solid green");
        emailArrayPush(email);
        imgDisplay(email);
        setup();

    //if email is not valid
    } else {
        $('#email').css("border", "1px solid red");
    }
});

//EMAIL ARRAY
/**
 * Checks if email exists in array
 * @param  {string} email
 * @return {integer}
 */
function emailMatch(email) {
    if(emails.length>0) {
        for(let x=0; x<emails.length; x++) {
            if(emails[x][0] == email){
                return x;
            } else {
                return -1;
            }
        }
    } else {
        return -1;
    }
}

/**
 * Push email to array if it doesnt exist
 * Push img to array
 * 1st value is email next values are img
 * @param  {string} email
 */
function emailArrayPush(email) {
    //emailsNo is either -1 for no match or array no if there is
    let emailsNo = emailMatch(email);
    let emailLen = emails.length;

    if(emailsNo >= 0) {
        //email exists so just push img
        emails[emailsNo].push(imgRes.imgurl);
    } else {
        //emails doesn't exist push both
        emails.push([]);
        emails[emailLen].push(email);
        emails[emailLen].push(imgRes.imgurl);
    }
}

/**
 * Displays the 2d array in HTML
 * Username and imgs
 * @param  {string} email
 */
function imgDisplay(email) {
    //shorten email to just username
    let username = email.replace(/[^a-zA-Z0-9]/g, '');
    let $el = $('.email-list');
    

    //if email name (username) is NOT in HTML
    if($(`#${username}`).length <= 0) {
        $el.append(`
            <li id="${username}">
                ${email}
                <div class="sm-img-con">
                <img src="${imgRes.imgurl}" alt="${imgRes.alt}">
                </div>
            </li>`
        );

    //if username does exist
    } else {
        $(`#${username}`).append(`<div class="sm-img-con"><img src="${imgRes.imgurl}" alt="${imgRes.alt}"></div>`);
    }
}