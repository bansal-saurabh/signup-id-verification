const config = require('../config');

const {
    DocScanClient,
    SessionSpecificationBuilder,
    RequestedTextExtractionTaskBuilder,
    SdkConfigBuilder,
} = require('yoti');

async function createSession(req) {
    const docScanClient = new DocScanClient(
        config.YOTI_CLIENT_SDK_ID,
        config.YOTI_PEM
    );

    const sessionSpec = new SessionSpecificationBuilder()
        .withClientSessionTokenTtl(600)
        .withResourcesTtl(90000)
        .withUserTrackingId('123')
        .withRequestedTask(
            new RequestedTextExtractionTaskBuilder()
                .withManualCheckFallback()
                .build()
        )
        .withSdkConfig(
            new SdkConfigBuilder()
                .withAllowsCameraAndUpload()
                .withPrimaryColour('#2d9fff')
                .withSecondaryColour('#FFFFFF')
                .withFontColour('#FFFFFF')
                .withLocale('en-GB')
                .withPresetIssuingCountry('GBR')
                .withSuccessUrl(`${config.YOTI_APP_BASE_URL}/success`)
                .withErrorUrl(`${config.YOTI_APP_BASE_URL}/error`)
                .build()
        );

    return docScanClient.createSession(sessionSpec.build());
}

module.exports = async (req, res) => {
    try {
        const session = await createSession(req);

        req.session.DOC_SCAN_SESSION_ID = session.getSessionId();
        req.session.DOC_SCAN_SESSION_TOKEN = session.getClientSessionToken();

        res.render('verification', {
            sessionId: req.session.DOC_SCAN_SESSION_ID,
            token: req.session.DOC_SCAN_SESSION_TOKEN,
            iframeURL: `${config.YOTI_DOC_SCAN_IFRAME_URL}?sessionID=${req.session.DOC_SCAN_SESSION_ID}&sessionToken=${req.session.DOC_SCAN_SESSION_TOKEN}`,
        });
    } catch (error) {
        res.render('error', { error });
    }
};
