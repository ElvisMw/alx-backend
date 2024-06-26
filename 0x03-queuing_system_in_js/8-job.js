/**
 * Function to create push notification jobs in the queue.
 *
 * @param {Array} jobs - An array of job data.
 * @param {Object} queue - The queue object.
 * @throws {Error} If jobs is not an array.
 */
export default function createPushNotificationsJobs(jobs, queue) {
    // Check if jobs is an array
    if (Array.isArray(jobs)) {
        // Iterate over each job in the array
        jobs.forEach((data) => {
            // Create a job in the queue and save it
            const Push3 = queue.create('push_notification_code_3', data).save((err) => {
                // Log the job id when the job is created
                if (!err) {
                    console.log(`Notification job created: ${Push3.id}`);
                }
            });

            // Log when the job is completed
            Push3.on('complete', () => {
                console.log(`Notification job ${Push3.id} completed`);
            });

            // Log when the job progress is updated
            Push3.on('progress', (progress) => {
                console.log(`Notification job ${Push3.id} ${progress}% complete`);
            });

            // Log when the job fails
            Push3.on('failed', (err) => {
                console.log(`Notification job ${Push3.id} failed: ${err}`);
            });
        });
    } else {
        // Throw an error if jobs is not an array
        throw new Error('Jobs is not an array');
    }
}
