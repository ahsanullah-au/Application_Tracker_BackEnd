const rp = require('request-promise');
const HTMLParser = require('node-html-parser');
const fs = require('fs')

const url = "https://www.linkedin.com/jobs/view/1862422355"

const options ={
    uri: url,
    headers: {
        "accept" : "text/html",
        "accept-encoding" : "br",
        "accept-language" : "en-US,en;q=0.8,ms;q=0.6",
        "user-agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
    }

}
const linkedinScraper = () => {
    

    rp(options)
    .then(resp=>{
        //fs.writeFileSync(__dirname + "/tmp/html4.html", resp)
        const htmlResponse = HTMLParser.parse(resp).querySelector(".sub-nav-cta__text-container").firstChild.text
        console.log(HTMLParser.parse(resp).querySelector(".sub-nav-cta__header").text)
        console.log(HTMLParser.parse(resp).querySelector(".sub-nav-cta__sub-text-container").firstChild.text)
        console.log(HTMLParser.parse(resp).querySelector(".sub-nav-cta__sub-text-container").lastChild.text)
        console.log(url)
    })
    .catch(err => console.log(err))
        
}


linkedinScraper();