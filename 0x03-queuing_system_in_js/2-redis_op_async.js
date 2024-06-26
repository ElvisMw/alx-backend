import redis from 'redis';
import util from 'util';

// Create a Redis client
const client = redis.createClient();

// Set up event listener for 'error' event
client.on('error', (err) => {
    // Log an error message if the Redis client is not connected to the server.
    console.log(`Redis client not connected to the server: ${err}`);
});

// Set up event listener for 'connect' event
client.on('connect', () => {
    // Log a success message if the Redis client is connected to the server.
    console.log('Redis client connected to the server');
})
    // Set up event listener for 'error' event when the Redis client is connected
    .on('error', (err) => {
        // Log an error message if the Redis client is not connected to the server.
        console.log(`Redis client not connected to the server: ${err}`);
    });

/**
 * Set a new value for a key in the Redis database.
 *
 * @param {string} schoolName - The name of the key.
 * @param {string} value - The value to set for the key.
 */
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print());
}

/**
 * Get the value of a key from the Redis database.
 *
 * @param {string} schoolName - The name of the key.
 */
let displaySchoolValue = async schoolName => {
    // Get the value of the key from the Redis database.
    const getAsync = util.promisify(client.get).bind(client);
    console.log(await getAsync(schoolName));
};

// Display the value of the 'Holberton' key.
displaySchoolValue('Holberton');

// Set a new value for the 'HolbertonSanFrancisco' key.
setNewSchool('HolbertonSanFrancisco', '100');

// Display the value of the 'HolbertonSanFrancisco' key.
displaySchoolValue('HolbertonSanFrancisco');
