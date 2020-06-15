const handleScraper = (req, res, rp, HTMLParser) => {
  if (req.body.site === 'Indeed') {
    rp(req.body.URL)
      .then((resp) => {
        const htmlResponse = HTMLParser.parse(resp).querySelector('#indeedApplyButtonContainer').firstChild;
        return ({
          jobTitle: htmlResponse.getAttribute('data-indeed-apply-jobTitle'),
          jobLocation: htmlResponse.getAttribute('data-indeed-apply-jobLocation'),
          jobCompanyName: htmlResponse.getAttribute('data-indeed-apply-jobCompanyName'),
          jobURL: htmlResponse.getAttribute('data-indeed-apply-jobUrl'),
        });
      })
      .then((indeedJob) => res.json(indeedJob))
      .catch((err) => res.status(400).json('Could not scrape Indeed URL'));
  } else if (req.body.site === 'LinkedIn') {
    const options = {
      uri: req.body.URL,
      headers: {
        'accept': 'text/html',
        'accept-encoding': 'br',
        'accept-language': 'en-US,en;q=0.8,ms;q=0.6',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
      },

    };
    rp(options)
      .then((resp) => {
        const jobFields = {
          jobTitle: HTMLParser.parse(resp).querySelector('.sub-nav-cta__header').text,
          jobLocation: HTMLParser.parse(resp).querySelector('.sub-nav-cta__sub-text-container').firstChild.text,
          jobCompanyName: HTMLParser.parse(resp).querySelector('.sub-nav-cta__sub-text-container').lastChild.text,
          jobURL: req.body.URL,
        };

        return (jobFields);
      })
      .then((linkedinJob) => res.json(linkedinJob))
      .catch((err) => res.status(400).json('Could not scrape LinkedIn URL'));
  }
};

module.exports = {
  handleScraper,
};


// let url = "https://ca.indeed.com/viewjob?jk=e7fd7b4781a9ebc2&tk=1e9eebcgc4ouu800&from=serp&vjs=3&advn=6114451463185775&adid=196595498&sjdu=XuMSTO2lVbIQBVQc5QpEYbP5n_-s08hrxMD-dtpZk1kZUApBFh4bKDvm7LdYQCE42rEk1z1jvfUYyBKDz740wBUGplM10pGaORioW3mZaM2CcPUpqIpeYedZh5I4mDxMcNBoGZC3UaGLRyjmtX1Ys8Y5n05Y-_DiB1f4S4gQMbI"
// Doesnt work for out of indeed apply, stored in html3 file
