/**
 * This module demonstrates advanced Redis operations using the hset and hgetall commands.
 */

import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Set up event listener for 'error' event
client.on('error', (err) => console.log(`Redis client not connected t o the server: ${err}`));

// Set up event listener for 'connect' event
client.on('connect', () => {
    console.log('Redis client connected to the server');
}).on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
});

/**
 * An array of keys representing different Holberton School locations.
 * @type {Array}
 */
const keys = ['Portland', 'Seattle', 'New York', 'Bogota', 'Cali', 'Paris'];

/**
 * An object mapping keys to values representing the number of students at each Holberton School location.
 * @type {Object}
 */
const values = {
    Portland: '50', Seattle: '80', 'New York': '20', Bogota: '20', Cali: '40', Paris: '2',
};

/**
 * Set the values for each key in the 'HolbertonSchools' hash.
 */
keys.forEach((data) => client.hset('HolbertonSchools', data, values[data], redis.print()));

/**
 * Retrieve all key-value pairs from the 'HolbertonSchools' hash.
 */
client.hgetall('HolbertonSchools', (err, value) => {
    if (err) {
        console.error('error');
    } else {
        console.log(value);
    }
});
