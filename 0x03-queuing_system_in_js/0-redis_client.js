/**
 * This module creates a Redis client and sets up event listeners for connect and error events.
 * It also logs relevant information to the console.
 */

import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Set up event listener for 'error' event
/**
 * Logs an error message if the Redis client is not connected to the server.
 *
 * @param {Error} err - The error object thrown by the Redis client.
 */
client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));

// Set up event listener for 'connect' event
/**
 * Logs a success message if the Redis client is connected to the server.
 */
client.on('connect', () => {
    console.log('Redis client connected to the server');
})
    // Set up event listener for 'error' event when the Redis client is connected
    .on('error', (err) => {
        console.log(`Redis client not connected to the server: ${err}`);
    });
