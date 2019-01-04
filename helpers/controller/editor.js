
module.exports = {
    getNewsById: (req, res) => {
        console.log(req.params);
        // console.log(req);
        res.send({oK: 'ok'});
    }
}