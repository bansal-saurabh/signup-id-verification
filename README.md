# signup-id-verification

Sign up landing page with ID verification using Yoti Sandbox API.

## Running the project locally

1. Download and install the LTS version of NodeJS.
2. Clone the git repository and navigate to the project folder.
3. Install dependencies with the command 'npm install' in cmd/powershell or bash.
4. Create the folder 'keys' and copy your Private Key file.
5. Create the file '.env' with the following parameters:
```
YOTI_CLIENT_SDK_ID=<SDK_ID>
YOTI_KEY_FILE_PATH=<PATH_TO_PRIVATE_KEY>
YOTI_DOC_SCAN_API_URL=<YOTI_API_SANBBOX_URL>
```
6. Start the server with the 'npm start' command.
7. Open the URL 'http://localhost:3000' in a web browser.
