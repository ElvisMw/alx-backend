/**
 * This module publishes messages to a Redis channel at specified intervals.
 * Messages include information about Holberton School students starting courses,
 * and a command to terminate the server.
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

/**
 * Publishes a message to the Redis channel after a specified time delay.
 *
 * @param {string} message - The message to be published.
 * @param {number} time - The delay in milliseconds before the message is published.
 */
function publishMessage(message, time) {
    // Delay the publication of the message by the specified time
    setTimeout(() => {
        // Log the message before it is published
        console.log(`About to send ${message}`);
        // Publish the message to the Redis channel
        client.publish('holberton school channel', message);
    }, time)
}


// Publish messages to the Redis channel
publishMessage('Holberton Student #1 starts course', 100); // 100ms delay
publishMessage('Holberton Student #2 starts course', 200); // 200ms delay
publishMessage('KILL_SERVER', 300); // 300ms delay
publishMessage('Holberton Student #3 starts course', 400); // 400ms delay
