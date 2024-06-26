/**
 * This file creates a job in the queue and logs the job id once it is created.
 * It also logs when the job is completed or failed.
 */

import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

/**
 * Object representing a job in the queue
 * @typedef {Object} Job
 * @property {string} phoneNumber - The phone number to send the notification to
 * @property {string} message - The message to send in the notification
 */

/**
 * Create a job in the queue and save it
 * @param {Job} job - The job to be added to the queue
 * @returns {Object} The job object
 */
function createJob(job) {
    // Create a job in the queue and save it
    const pushCode = queue.create('push_notification_code', job).save((err) => {
        if (!err) {
            // Log the job id when the job is created
            console.log(`Notification job created: ${pushCode.id}`);
        }
    });

    // Log when the job is completed
    pushCode.on('complete', () => {
        console.log('Notification job completed');
    });

    // Log when the job fails
    pushCode.on('failed', () => {
        console.log('Notification job failed');
    });

    return pushCode;
}

// Example usage
const job = {
    phoneNumber: 'string',
    message: 'string',
};

createJob(job);
