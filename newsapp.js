console.log("IndoEffect :");

// Your API key is: f48c7236a0ba4c8a81c24840ab0d8c1a
// https://newsapi.org/v2/everything?q=tesla&from=2021-06-29&sortBy=publishedAt&apiKey=f48c7236a0ba4c8a81c24840ab0d8c1a

const apikey = "f48c7236a0ba4c8a81c24840ab0d8c1a";
let source = "the-times-of-india";

let accordionExample = document.getElementById('accordionExample');

const xhr = new XMLHttpRequest();
xhr.open('GET', `http://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`, true);
xhr.onload = function() {
    if (this.status === 200) {
        let obj = JSON.parse(this.responseText);
        // console.log(obj);
        let articles = obj.articles;
        // console.log(articles);

        let newshtml = ``;
        articles.forEach(function(element, index) {
            // console.log(element, index);
            let news = ` <div class="card" id="card">
                                <div class="card-header" id="heading${index}">
                                    <h2 class="mb-0">
                                        <button class="btn" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                            <span class="badge bg-primary">Breaking News ${index+1}</span>  ${element["title"]}
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordionExample">
                                    <div class="card-body"><h6><span class="badge bg-secondary">Description</span></h6>${element["description"]}</div>
                                    <div class="card-body"><h6><span class="badge bg-secondary">Content</span></h6>${element["content"]} <a href="${element['url']}" target="_blank" > Read more...</a></div>
                                </div>
                            </div>`;
            newshtml += news;
        });
        accordionExample.innerHTML = newshtml;
    } else {
        console.log("error");
    }
}
xhr.send();

// Search btn :
let searchinput = document.getElementById('searchinput');
searchinput.addEventListener('input', () => {

    let inputval = searchinput.value.toLowerCase();
    console.log("input", inputval);
    let notecard = document.getElementsByClassName('card');
    // for checking : 
    Array.from(notecard).forEach(function(element) {

        let cardtxt = element.getElementsByTagName('button')[0].innerText.toLowerCase();
        let cardtitle = element.getElementsByTagName('h6')[0].innerText;
        console.log(cardtxt);
        if (cardtxt.includes(inputval) || cardtitle.includes(inputval)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }

    })
});