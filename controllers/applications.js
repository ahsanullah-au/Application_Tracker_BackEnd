const handleAddApplication = (req, res, db) => {

    if (!req.body.userID || !req.body.appCompany || !req.body.appRole || !req.body.appLocation || !req.body.appDate || !req.body.appResponse || !req.body.appLink) {
        return res.status(400).json('Missing Info')
    }
    else {
        const tempAppNotes = (req.body.appNotes ? req.body.appNotes : " ");

        return db('applicationsv1')
            .returning('*')
            .insert({
                userid: req.body.userID,
                appcompany: req.body.appCompany,
                approle: req.body.appRole,
                applocation: req.body.appLocation,
                appdate: req.body.appDate,
                appresponse: req.body.appResponse,
                applink: req.body.appLink,
                appnotes: tempAppNotes
            })
            .then(response => res.json(response[0]))
            .catch(err => res.status(400).json(err))
    }

}

const handleGetApplications = (req, res, db) => {
    if (!req.body.userID) {
        return res.status(400).json('Missing Info')
    }
    else {
        return db('applicationsv1')
            .where('userid', req.body.userID)
            .then(response => res.json(response))
            .catch(err => res.status(400).json(err))
    }

}

const handleUpdateApplication = (req, res, db) => {
    if (!req.body.appID || !req.body.appCompany || !req.body.appRole || !req.body.appLocation || !req.body.appDate || !req.body.appResponse || !req.body.appLink) {
        return res.status(400).json('Missing Info')
    }
    else {
        const tempAppNotes = (req.body.appNotes ? req.body.appNotes : " ");

        return db('applicationsv1')
            .returning('*')
            .where('appid', req.body.appID)
            .update({
                appcompany: req.body.appCompany,
                approle: req.body.appRole,
                applocation: req.body.appLocation,
                appdate: req.body.appDate,
                appresponse: req.body.appResponse,
                applink: req.body.appLink,
                appnotes: tempAppNotes
            })
            .then(response => res.json(response[0]))
            .catch(err => res.status(400).json(err))

    }

}

const handleDeleteApplication = (req, res, db) => {

}




module.exports = {
    handleAddApplication: handleAddApplication,
    handleGetApplications: handleGetApplications,
    handleUpdateApplication: handleUpdateApplication,
    handleDeleteApplication: handleDeleteApplication
}