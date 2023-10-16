# Articles App

This is a simple Nextjs web-app with Nestjs backend demonstrating authentication with Auth0. The repository is an Nx mono-repo with articles-server and articles-client apps.

## Client set up

To run this application you will need to creat a free Auth0 account. Follow the guide for "Regular Web Application" here https://auth0.com/docs/quickstart/webapp.

After successfully creating an application add the Auth0 credentials into articles client by copying .env.local.example and replacing each variable.
For AUTH_SECRET you will need to generate your own secret. If you have Node installed in your computer you can 
run this command and copy the code: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

Next dowload the application Signing Certificate following this guide. https://auth0.com/docs/get-started/tenant-settings/signing-keys/view-signing-certificates#if-using-the-rs256-signing-algorithm. Save the certificate as .pem file and rename to auth-cert.pem, placing the file in the src/certs directory.

## Server set up

Copy .env.example from article-server app and add your generated secret to the JWT_SECRET variable.

## Start the app

Run npm install from the root directory.

To start the development server run `nx serve articles-server`. 
To start the client server run `nx serve articles-server`. 

Open your browser and navigate to http://localhost:4200/.
