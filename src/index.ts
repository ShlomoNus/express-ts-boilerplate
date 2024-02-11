import { server } from 'server';
import { routes } from 'routes';
import { mongodbCreateConnection, mongodbDisconnect } from 'helpers/mongo';

import { CONFIG } from 'config';
import { Server } from 'http';

mongodbCreateConnection(CONFIG.Base_Url + CONFIG.Default_End_Point);

const port = CONFIG.Port || 3000;

// Add logger and switch the console.logs.
async function gracefulShutdown(serverInstance: Server) {
    try {
        console.log('Closing MongoDB connection...');
        await mongodbDisconnect();

        console.log('Closing HTTP server...');
        await serverInstance.close(); // Assuming server.close() exists

        await new Promise(resolve => {
            setTimeout(resolve, 500);
        }); // Allow time for connections to close

        console.log('Server shut down gracefully.');
    } catch (error) {
        console.error('Error during graceful shutdown:', error);
    }
}

async function run() {
    try {
        const httpServer = await server(port, routes);

        if (httpServer) {
            console.log(`Server listening on port ${port}`);

            // Graceful shutdown handling (assuming server.close() exists)
            process.on('SIGTERM', async () => {
                console.log(
                    'Received SIGTERM signal, shutting down gracefully...'
                );
                await gracefulShutdown(httpServer);
            });

            process.on('SIGINT', async () => {
                console.log(
                    'Received SIGINT signal (Ctrl+C), shutting down gracefully...'
                );
                await gracefulShutdown(httpServer);
            });
        } else {
            console.error('Server failed to start.');
        }
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

run(); // Start the serve
