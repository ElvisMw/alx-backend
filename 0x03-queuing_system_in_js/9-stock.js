import express from 'express';
import redis from 'redis';
import util from 'util';

/**
 * Create a Redis client and set up event listeners for connect and error events.
 */
const client = redis.createClient();

client.on('connect', () => {
    // Log a success message if the Redis client is connected to the server.
    console.log('Redis client connected to the server');
}).on('error', (err) => {
    // Log an error message if the Redis client is not connected to the server.
    console.log(`Redis client not connected to the server: ${err}`);
});

/**
 * A list of items containing information about each item.
 * @type {Array}
 */
const list = [
    {
        itemId: '1',
        itemName: 'Suitcase 250',
        price: '50',
        initialAvailableQuantity: '4',
    },
    {
        itemId: '2',
        itemName: 'Suitcase 450',
        price: '100',
        initialAvailableQuantity: '10',
    },
    {
        itemId: '3',
        itemName: 'Suitcase 650',
        price: '350',
        initialAvailableQuantity: '2',
    },
    {
        itemId: '4',
        itemName: 'Suitcase 1050',
        price: '550',
        initialAvailableQuantity: '5',
    },
];

/**
 * Get an item by its itemId from the list.
 * @param {string} itemId - The ID of the item to retrieve.
 * @returns {Object|undefined} The item object if found, undefined otherwise.
 */
function getItemById(itemId) {
    let main;
    list.forEach((item) => {
        if (item.itemId === itemId) {
            main = item;
        }
    });
    return main;
}

/**
 * Reserve stock for an item by its itemId.
 * @param {string} itemId - The ID of the item to reserve stock for.
 * @param {number} stock - The amount of stock to reserve.
 */
function reserveStockById(itemId, stock) {
    client.hset('item', itemId, stock);
}

/**
 * Get the current reserved stock for an item by its itemId.
 * @param {string} itemId - The ID of the item to retrieve the reserved stock for.
 * @returns {Promise<number>} A promise that resolves to the current reserved stock amount.
 */
async function getCurrentReservedStockById(itemId) {
    const getAsync = util.promisify(client.hget).bind(client);
    return getAsync('item', itemId);
}

/**
 * Create an Express app that handles various API endpoints.
 */
const app = express();

/**
 * Get a list of all available products.
 * @route GET /list_products
 * @returns {Array} An array of product objects.
 */
app.get('/list_products', (req, res) => {
    res.json(list).end();
});

/**
 * Get a specific product by its itemId.
 * @route GET /list_products/:itemId
 * @param {string} itemId - The ID of the product to retrieve.
 * @returns {Object} A product object.
 */
app.get('/list_products/:itemId', async (req, res) => {
    const field = req.params.itemId;
    const Product = getItemById(field);
    const checkInventory = await getCurrentReservedStockById(field);
    if (Product) {
        Product.currentQuantity = checkInventory;
        res.json(Product).end();
    } else {
        res.json({status: 'Product not found'}).end();
    }
});

/**
 * Reserve a specific product by its itemId.
 * @route GET /reserve_product/:itemId
 * @param {string} itemId - The ID of the product to reserve.
 * @returns {Object} A response object indicating the status of the reservation.
 */
app.get('/reserve_product/:itemId', async (req, res) => {
    const field = req.params.itemId;
    const Product = getItemById(field);
    if (Product) {
        if (Product.initialAvailableQuantity > 0) {
            reserveStockById(field, Product.initialAvailableQuantity);
            Product.initialAvailableQuantity -= 1;
            res.json({status: 'Reservation confirmed', itemId: field}).end();
        } else {
            res.json({status: 'Not enough stock available', itemId: field}).end();
        }
    } else {
        res.json({status: 'Product not found'}).end();
    }
});

/**
 * Start the server and listen on port 1245.
 */
app.listen(1245);
