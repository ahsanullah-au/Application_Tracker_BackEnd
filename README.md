# Application_Tracker_BackEnd

Back End of a webapp that helps you keep track of your job applications. Uses Node and Express on the backend. Connects to a PostgreSQL database using Knex.

# Features:

* Secure Signin/Register, uses bcrypt
* Add, Modify, Remove applications based on requests from frontend
* Indeed parsing from URL requests, uses html-parser and request-promise
* File Storage to store documents sent by front end, using a AWS S3 Bucket presigned URL
* Linking of documents to specific applications


# Upcoming:

* Maps integration that returns distances from addresses requested.
* Fix of LinkedIn parsing or change into a API based solution due to inconsistency