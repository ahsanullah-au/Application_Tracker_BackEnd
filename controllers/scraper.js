const rp = require('request-promise');
const fs = require('fs');

const HTMLParser = require('node-html-parser');

const handleScraper = (url) => {

    rp(url)
        .then((res) => {
            fs.writeFileSync(__dirname + "/tmp/html3.html", res)
            const htmlResponse = HTMLParser.parse(res);
            return ({
                jobTitle: htmlResponse.querySelector('#indeedApplyButtonContainer').firstChild.getAttribute("data-indeed-apply-jobTitle"),
                jobLocation: htmlResponse.querySelector('#indeedApplyButtonContainer').firstChild.getAttribute("data-indeed-apply-jobLocation"),
                jobCompanyName: htmlResponse.querySelector('#indeedApplyButtonContainer').firstChild.getAttribute("data-indeed-apply-jobCompanyName"),
                jobURL: htmlResponse.querySelector('#indeedApplyButtonContainer').firstChild.getAttribute("data-indeed-apply-jobUrl")
            })

        })
        .then(indeedJob => console.log(indeedJob))



}

//let url = "https://ca.indeed.com/rc/clk?jk=af8e98d91ec68409&amp;from=vj&amp;ia=1&amp;sjdu=vQIlM60yK_PwYat7ToXhk_BtMgCfoRREjwFTpnTZpxDr2nMIVM2LzYtTq8PoTuWCyVgYsB-CrVACzuliRquR0KdVsNzT9tVrFUobQiL-3go&amp;spon=1&amp;adid=347462548&amp;pos=twoPaneCopyLink"
//Works


//let url = "https://ca.indeed.com/viewjob?jk=e7fd7b4781a9ebc2&tk=1e9eebcgc4ouu800&from=serp&vjs=3&advn=6114451463185775&adid=196595498&sjdu=XuMSTO2lVbIQBVQc5QpEYbP5n_-s08hrxMD-dtpZk1kZUApBFh4bKDvm7LdYQCE42rEk1z1jvfUYyBKDz740wBUGplM10pGaORioW3mZaM2CcPUpqIpeYedZh5I4mDxMcNBoGZC3UaGLRyjmtX1Ys8Y5n05Y-_DiB1f4S4gQMbI"
//Doesnt work for out of indeed apply, stored in html3 file

let url = "https://ca.indeed.com/viewjob?cmp=VCOMP-Inc.&t=Web+Developer&jk=b9dde5ed9d7d8b62&sjdu=vQIlM60yK_PwYat7ToXhk9q0RyovIEGBKuRB9fhFNbH1hIAF9nj03DCFVZ9zvEVj4eyQKDIQN1ehdWqXZfv1Hf_urytnNe1ZLdH-k_8vzLLYjjmwitoVms14qSNwihpxc5gYht6mGO1DHpkAgEn3KQ&tk=1e9eegvcl4191800&adid=317358990&pub=4a1b367933fd867b19b072952f68dceb&vjs=3"
//Works

handleScraper(url);


//Job Location, City. 
//Role
//Org Name, make sure all fields have the same format