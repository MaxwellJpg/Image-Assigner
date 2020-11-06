//VARS
const url = 'https://api.unsplash.com/photos/random/' + `?client_id=${client_id}`;

let emails = [];
let imgURL;

/**
 * IIFE for unsplash requests
 * @return  {function} unsplashRequest()
 */
let unSplashReq; (unSplashReq = () => {
        unSplashRequest()
            .then(results => {
            embed(results);
        });
})()

/**
 * fetches json of random img from unsplash
 * @return {object} 
 */
async function unSplashRequest() {
    const response = await fetch(url, {
        method: 'GET',
    });

    const json = await response.json();

    imgURL = json.urls.full;
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
    $('img').attr('src', results.imgurl);
    $('img').removeAttr('alt');

    if(results.alt) {
        $('img').attr('alt', results.alt);
        $('#fig-text').text(results.alt);
    } else {
        $('img').attr('alt', 'No Description');
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
    e.preventDefault();
    let email = $('#email').val();

    if (validateEmail(email)) {
        $('#email').css("border", "1px solid green");
        emailArrayPush(email);
        unSplashReq();
        //$(this).unbind('submit').submit();
    } else {
        $('#email').css("border", "1px solid red");
    }
});

//PUSH EMAIL AND ARRAY TO ARRAY
//CHECK IF EMAIL EXISTS
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
function emailArrayPush(email) {
    let emailsNo = emailMatch(email);
    let emailLen = emails.length;

    if(emailsNo > -1) {
        emails[emailsNo].push(imgURL);
    } else {
        emails.push([]);
        emails[emailLen].push(email);
        emails[emailLen].push(imgURL);
    }
}