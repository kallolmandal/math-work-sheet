import {ServerApp} from './server.app';

let serverApp = new ServerApp();

// Setup the express server
serverApp.setupServer();

// Start the express server
serverApp.startServer();
