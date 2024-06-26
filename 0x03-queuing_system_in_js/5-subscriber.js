/**
 * This module subscribes to a Redis channel and logs any messages received.
 * It also unsubscribes and quits the Redis client when the message 'KILL SERVER' is received.
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
}).on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

// Subscribe to the 'holberton school channel'
client.subscribe('holberton school channel');

/**
 * Handle the 'message' event from the Redis client.
 * If the channel is 'holberton school channel' and the message is 'KILL SERVER',
 * unsubscribe from the channel and quit the Redis client.
 * Otherwise, log the message.
 *
 * @param {string} channel - The channel that the message was received on.
 * @param {string} message - The message received from the channel.
 */
client.on('message', (channel, message) => {
    if (channel === 'holberton school channel') {
        if (message === 'KILL SERVER') {
            client.unsubscribe('holberton school channel');
            console.log(message);
            client.quit();
        } else
            console.log(message);
    }
});
