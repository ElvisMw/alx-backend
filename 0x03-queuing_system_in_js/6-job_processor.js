import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

/**
 * Send a notification to the specified phone number with the given message.
 *
 * @param {string} phoneNumber - The phone number to send the notification to.
 * @param {string} message - The message to send in the notification.
 */
function sendNotification(phoneNumber, message) {
    // Log the message to the console
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

/**
 * Process a job in the queue.
 *
 * @param {Object} job - The job to process.
 * @param {Function} done - The done callback to call when the job is processed.
 */
queue.process('push_notification_code', (job, done) => {
    // Send the notification
    sendNotification(job.data.phoneNumber, job.data.message);
    // Call the done callback to signal that the job has been processed
    done();
})
