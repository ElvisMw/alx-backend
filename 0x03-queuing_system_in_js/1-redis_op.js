import redis from 'redis';

/**
 * Create a Redis client and set up event listeners for connect and error events.
 * Also logs relevant information to the console.
 */
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
    // Set the value for the key in the Redis database.
    client.set(schoolName, value, redis.print());
}

/**
 * Get the value of a key from the Redis database.
 *
 * @param {string} schoolName - The name of the key.
 */
function displaySchoolValue(schoolName) {
    // Get the value of the key from the Redis database.
    client.get(schoolName, (err, value) => {
        if (err) {
            // Log an error message if there was an error retrieving the value.
            console.error('error');
        } else {
            // Log the value of the key.
            console.log(value);
        }
    });
}

// Display the value of the 'Holberton' key.
displaySchoolValue('Holberton');
// Set a new value for the 'HolbertonSanFrancisco' key.
setNewSchool('HolbertonSanFrancisco', '100');
// Display the value of the 'HolbertonSanFrancisco' key.
displaySchoolValue('HolbertonSanFrancisco');
