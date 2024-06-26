import express from 'express';
import redis from 'redis';
import util from 'util';
import kue from 'kue';

// Create a Redis client
const client = redis.createClient();

// Promisify Redis client methods
const reserveSeat = util.promisify(client.set).bind(client);
const getAvailableSeats = util.promisify(client.get).bind(client);

// Enable/disable reservation
let reservationEnabled = true;

// Create a Kue queue
const queue = kue.createQueue();

// Create an Express app
const app = express();

/**
 * Get the number of available seats.
 * @route GET /available_seats
 * @returns {Object} An object containing the available seats.
 */
app.get('/available_seats', async (req, res) => {
  const availableSeats = await getAvailableSeats('available_seats');
  res.json({ availableSeats }).end();
});

/**
 * Reserve a seat.
 * @route GET /reserve_seat
 * @returns {Object} An object indicating the status of the reservation.
 */
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' }).end();
    return;
  }

  // Create a Kue job for reserving a seat
  const reserveJob = queue.create('reserve_seat').save();
  res.json({ status: 'Reservation in process' });

  // Handle job completion and failure
  reserveJob.on('complete', () => {
    console.log(`Seat reservation job ${reserveJob.id} completed`);
  }).on('failed', () => {
    console.log(`Seat reservation job ${reserveJob.id} failed`);
  });

  const availableSeats = await getAvailableSeats('available_seats');
  if (availableSeats === '0') {
    reservationEnabled = false;
    return;
  }

  // Reserve a seat
  await reserveSeat('available_seats', (parseInt(availableSeats, 10) - 1).toString());
});

/**
 * Process the reserve seat job.
 * @route GET /process
 * @returns {Object} An object indicating the status of the queue processing.
 */
app.get('/process', (req, res) => {
  res.json({ status: 'Queue processing' }).end();

  // Process the reserve seat job
  queue.process('reserve_seat', async (job, done) => {
    const availableSeats = await getAvailableSeats('available_seats');

    if (availableSeats === '0') {
      reservationEnabled = false;
      done();
      return;
    }

    // Reserve a seat
    await reserveSeat('available_seats', (parseInt(availableSeats, 10) - 1).toString());
    done();
  });
});

// Start the server and listen on port 1245
app.listen(1245);
