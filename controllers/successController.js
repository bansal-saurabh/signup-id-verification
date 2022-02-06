const config = require('../config');

const {
  DocScanClient,
} = require('yoti');

module.exports = async (req, res) => {
  const docScanClient = new DocScanClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  const username = req.body.username;

  try {
    const sessionResult = await docScanClient.getSession(req.session.DOC_SCAN_SESSION_ID);
    res.render('success', {
      sessionResult: sessionResult,
      username: req.session.USERNAME, 
      email: req.session.EMAIL,
    });
  } catch (error) {
    res.render('error', { error });
  }
};