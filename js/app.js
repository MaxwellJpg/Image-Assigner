
const url = 'https://api.unsplash.com/photos/random/' + 
`?client_id=${client_id}`;

unSplashRequest()
    .then(results => {
        console.log(results);
        embed(results);
    });

async function unSplashRequest() {
    const response = await fetch(url, {
        method: 'GET',
    });

    const json = await response.json();

    const imgUrl = json.urls.full;
    return imgUrl;
}

function embed(imgurl) {
    $('img').attr('src', imgurl);
}

//EMAIL

function validateEmail(email) {
    var re = 
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    re.test(email);
}

//validation
$('#form').on('submit', (e) => {
    e.preventDefault();
    let email = $('#email').val();

    if (validateEmail(email)) {
        $('#email').css("border", "1px solid green");
      } else {
        $('#email').css("border", "1px solid red");
      }
});