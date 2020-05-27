const handleScraper = () => {
    const rp = require('request-promise');
    const url = "https://ca.indeed.com/rc/clk?jk=9627bc5f7fd04c72&amp;from=vj&amp;pos=twoPaneCopyLink"

    rp(url).then((res) => {
        console.log(res)
    })
    


}

handleScraper();

//Job Location, City. 
//Role
//Org Name, make sure all fields have the same format