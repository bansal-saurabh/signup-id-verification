const config = require('../config');

const {
    DocScanClient,
    SessionSpecificationBuilder,
    RequestedTextExtractionTaskBuilder,
    SdkConfigBuilder,
} = require('yoti');


const {
    SandboxDocScanClientBuilder,
    SandboxDocumentTextDataExtractionTaskBuilder,
    SandboxCheckReportsBuilder,
    SandboxTaskResultsBuilder,
    SandboxResponseConfigBuilder
} = require('@getyoti/sdk-sandbox');



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

async function configureSessionResponse(sessionID) {

    const sandboxClient = new SandboxDocScanClientBuilder()
        .withClientSdkId(config.YOTI_CLIENT_SDK_ID,)
        .withPemString(config.YOTI_PEM)
        .build();

    const textExtractionConfig = new SandboxDocumentTextDataExtractionTaskBuilder()
        .withDocumentFields({
            full_name: 'John Doe',
            nationality: 'GBR',
            date_of_birth: '1986-06-01',
            document_number: '123456789',
        })
        .build();

    const checkReportsConfig = new SandboxCheckReportsBuilder()
        .build();

    const taskResultsConfig = new SandboxTaskResultsBuilder()
        .withDocumentTextDataExtractionTask(textExtractionConfig)
        .build();

    const responseConfig = new SandboxResponseConfigBuilder()
        .withCheckReports(checkReportsConfig)
        .withTaskResults(taskResultsConfig)
        .build();

    await sandboxClient.configureSessionResponse(sessionID, responseConfig);
}

module.exports = async (req, res) => {
    try {
        const session = await createSession(req);

        req.session.DOC_SCAN_SESSION_ID = session.getSessionId();
        req.session.DOC_SCAN_SESSION_TOKEN = session.getClientSessionToken();

        configureSessionResponse(req.session.DOC_SCAN_SESSION_ID);

        res.render('verification', {
            sessionId: req.session.DOC_SCAN_SESSION_ID,
            token: req.session.DOC_SCAN_SESSION_TOKEN,
            iframeURL: `${config.YOTI_DOC_SCAN_IFRAME_URL}?sessionID=${req.session.DOC_SCAN_SESSION_ID}&sessionToken=${req.session.DOC_SCAN_SESSION_TOKEN}`,
        });
    } catch (error) {
        res.render('error', { error });
    }
};
