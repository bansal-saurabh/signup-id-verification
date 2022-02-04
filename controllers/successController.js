const config = require('../config');

const {
  DocScanClient,
} = require('yoti');

const {
  SandboxDocScanClientBuilder,
  SandboxDocumentTextDataExtractionTaskBuilder,
  SandboxCheckReportsBuilder,
  SandboxTaskResultsBuilder,
  SandboxResponseConfigBuilder
} = require('@getyoti/sdk-sandbox');

module.exports = async (req, res) => {
  const docScanClient = new DocScanClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  const sandboxClient = new SandboxDocScanClientBuilder()
    .withClientSdkId(config.YOTI_CLIENT_SDK_ID,)
    .withPemString(config.YOTI_PEM)
    .build();

  async function configureSessionResponse() {

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

    await sandboxClient.configureSessionResponse(req.session.DOC_SCAN_SESSION_ID, responseConfig);
  }

  configureSessionResponse();

  try {
    const sessionResult = await docScanClient.getSession(req.session.DOC_SCAN_SESSION_ID);
    res.render('success', { sessionResult });
  } catch (error) {
    res.render('error', { error });
  }
};