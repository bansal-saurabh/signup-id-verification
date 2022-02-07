const config = require('../config');

const {
    DocScanClient,
} = require('yoti');


module.exports = async (req, res) => {
    const docScanClient = new DocScanClient(
        config.YOTI_CLIENT_SDK_ID,
        config.YOTI_PEM
    );

    try {
        const media = await docScanClient.getMediaContent(
            req.session.DOC_SCAN_SESSION_ID,
            req.query.mediaId
        );

        const content = media.getContent();
        const buffer = content.toBuffer();
        const jsonData = JSON.parse(buffer);

        res.set('Content-Type', 'text/html');

        res.send('<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></head><table class="table table-striped table-light"><tbody><tr><td>Full Name:</td><td>' + jsonData.full_name +  '</td></tr><tr><td>Nationality:</td><td>' + jsonData.nationality +  '</td></tr><tr><td>Date of Birth</td><td>' + jsonData.date_of_birth +  '</td></tr><tr><td>Document Number</td><td>' + jsonData.document_number +  '</td></tr></tbody></table>');

    } catch (error) {
        res.render('error', { error });
    }
};