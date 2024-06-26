/**
 * Process a job in the queue.
 *
 * @module 7-job_processor
 */

// Import the kue library
import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

/**
 * An array of blacklisted phone numbers.
 * @type {Array}
 */
const blacklisted = ['4153518780', '4153518781'];

/**
 * Send a notification to the specified phone number with the given message.
 *
 * @param {string} phoneNumber - The phone number to send the notification to.
 * @param {string} message - The message to send in the notification.
 * @param {Object} djob - The job object.
 * @param {Function} done - The done callback to call when the job is processed.
 * @throws {Error} If the phone number is blacklisted.
 */
function sendNotification(phoneNumber, message, djob, done) {
    // Check if the phone number is blacklisted
    if (blacklisted.includes(djob.data.phoneNumber)) {
        return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    }

    // Update the job progress
    djob.progress(0, 50);
    djob.progress(50, 100);

    // Log the message to the console
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

    // Call the done callback to signal that the job has been processed
    return done();
}

/**
 * Process a job in the queue.
 *
 * @param {Object} job - The job to process.
 * @param {Function} done - The done callback to call when the job is processed.
 */
queue.process('push_notification_code_2', 2, (job, done) => {
    // Send the notification
    sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
