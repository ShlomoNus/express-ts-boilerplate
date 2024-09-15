import { server } from 'server';
import { routes } from 'routes';
import { mongodbCreateConnection } from 'utils/mongo';
import { CONFIG } from 'config';
import { Server } from 'http';

mongodbCreateConnection(CONFIG.Mongo_Base_Url + CONFIG.Mongo_DB).catch(
    error => {
        console.error(error);
    }
);

const port = CONFIG.Port || 3000;

// Add logger and switch the console.logs.
async function gracefulShutdown(serverInstance: Server) {
    try {
        console.info('Closing HTTP server...');
        await serverInstance.close(); // Assuming server.close() exists

        await new Promise(resolve => {
            setTimeout(resolve, 500);
        }); // Allow time for connections to close

        console.info('Server shut down gracefully.');
    } catch (error) {
        console.error('Error during graceful shutdown:', error);
    }
}

async function run() {
    try {
        const httpServer = await server(port, routes);

        if (httpServer) {
            console.log(`Server listening on port ${port}`);

            process.on('SIGTERM', () => {
                void (async () => {
                    try {
                        console.log(
                            'Received SIGTERM signal, shutting down gracefully...'
                        );
                        await gracefulShutdown(httpServer);
                    } catch (error) {
                        console.error(error);
                    }
                })();
            });

            process.on('SIGINT', () => {
                void (async () => {
                    try {
                        console.log(
                            'Received SIGTERM signal, shutting down gracefully...'
                        );
                        await gracefulShutdown(httpServer);
                    } catch (error) {
                        console.error(error);
                    }
                })();
            });
        } else {
            console.error('Server failed to start.');
        }
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

run().catch(err => {
    console.error(err);
}); // Start the serve
