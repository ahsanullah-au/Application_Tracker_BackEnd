const handleScraper = (url) => {
    const rp = require('request-promise');
    const fs = require('fs');

    

    rp(url).then((res) => {
        fs.writeFileSync(__dirname+ "/tmp/html2.html", res)
    })
    


}

//let url = "https://ca.indeed.com/rc/clk?jk=9627bc5f7fd04c72&amp;from=vj&amp;pos=twoPaneCopyLink"

let url = "https://ca.indeed.com/rc/clk?jk=af8e98d91ec68409&amp;from=vj&amp;ia=1&amp;sjdu=vQIlM60yK_PwYat7ToXhk_BtMgCfoRREjwFTpnTZpxDr2nMIVM2LzYtTq8PoTuWCyVgYsB-CrVACzuliRquR0KdVsNzT9tVrFUobQiL-3go&amp;spon=1&amp;adid=347462548&amp;pos=twoPaneCopyLink"

handleScraper(url);


//Job Location, City. 
//Role
//Org Name, make sure all fields have the same format