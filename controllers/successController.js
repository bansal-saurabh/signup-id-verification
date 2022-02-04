const config = require('../config');

var fetch = require('node-fetch');

const {
  DocScanClient,
} = require('yoti');

module.exports = async (req, res) => {
  const docScanClient = new DocScanClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  try {
    const sessionResult = await docScanClient.getSession(req.session.DOC_SCAN_SESSION_ID);
    res.render('success', { sessionResult: sessionResult, fetch: fetch });
  } catch (error) {
    res.render('error', { error });
  }
};