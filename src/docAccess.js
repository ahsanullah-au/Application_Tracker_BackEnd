//This handles all document storage in DB
//Document records are stores in DB while the actual docs uploaded to S3
//Simple functions that add/delete and get docs

const handleAddDoc = (req, res, db) => {
    if (!req.body.userID || !req.body.fileName || !req.body.fileURL) {
        return res.status(400).json('Missing Info');
    }


    return db('docs')
        .returning('*')
        .insert({
            userid: req.body.userID,
            filename: req.body.fileName,
            fileurl: req.body.fileURL,
        })
        .then((response) => res.json(response[0]))
        .catch((err) => res.status(400).json(err));
};

const handleGetDocs = (req, res, db) => {
    const { userID } = req.params;
    if (!userID) {
        return res.status(400).json('Missing Info');
    }

    return db('docs')
        .select({

            docID: 'docid',
            fileName: 'filename',
            fileURL: 'fileurl',

        })
        .where('userid', parseInt(userID, 10))
        .then((response) => res.json(response))
        .catch((err) => res.status(400).json(err));
};

const handleUpdateDoc = (req, res, db) => {
    if (!req.body.docID || !req.body.fileName || !req.body.fileURL) {
        return res.status(400).json('Missing Info');
    }

    return db('docs')
        .returning('*')
        .where('docid', req.body.docID)
        .update({
            filename: req.body.fileName,
            fileurl: req.body.fileURL,
        })
        .then((response) => res.json(response[0]))
        .catch((err) => res.status(400).json(err));
};

const handleDeleteDoc = (req, res, db) => {
    if (!req.body.docID) {
        return res.status(400).json('Missing Info');
    }

    return db('docs')
        .returning('*')
        .where('docid', req.body.docID)
        .del()
        .then((response) => res.json(response[0]))
        .catch((err) => res.status(400).json(err));
};

const handleGetLinkedDocs = (req, res, db) => {
    const { appID } = req.params;
    
    if (!appID) {
        return res.status(400).json("Missing Info")
    }

    return db("applicationsv1")
        .select({
            linkedDocs: "linkeddocs"
        })
        .where("appid", parseInt(appID, 10))
        .then((response) => res.json(response[0].linkedDocs))
        .catch((err) => res.status(400).json(err));

}


const handleUpdateLinkDoc = (req, res, db) => {
    if (!req.body.appID) {
        return res.status(400).json("Missing Info")
    }

    return db("applicationsv1")
        .returning("*")
        .where("appid", req.body.appID)
        .update({ "linkeddocs": req.body.docArray })
        .then((response) => res.json(response[0]))
        .catch((err) => res.status(400).json(err));
}


module.exports = {
    handleAddDoc,
    handleGetDocs,
    handleUpdateDoc,
    handleDeleteDoc,
    handleUpdateLinkDoc,
    handleGetLinkedDocs,
};
