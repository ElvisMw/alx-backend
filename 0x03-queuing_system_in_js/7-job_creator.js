import kue from 'kue';

/**
 * An array of job objects to be processed by the queue.
 * @type {Array}
 */
const jobs = [
    {
        phoneNumber: '4765432180',
        message: 'This is the code 1234 to verify your account'
    },
    {
        phoneNumber: '4765432181',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4765432143',
        message: 'This is the code 4321 to verify your account'
    },
    {
        phoneNumber: '4153538781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4153118782',
        message: 'This is the code 4321 to verify your account'
    },
    {
        phoneNumber: '4153718781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4159518782',
        message: 'This is the code 4321 to verify your account'
    },
    {
        phoneNumber: '4158718781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4153818782',
        message: 'This is the code 4321 to verify your account'
    },
    {
        phoneNumber: '4154318781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4151218782',
        message: 'This is the code 4321 to verify your account'
    }
];

/**
 * Create a queue instance.
 * @type {Object}
 */
const queue = kue.createQueue();

/**
 * Iterate over the jobs array and create jobs in the queue.
 */
jobs.forEach((data) => {
    // Create a job in the queue and save it
    const pushCode = queue.create('push_notification_code_2', data).save((err) => {
        if (!err) {
            // Log the job id when the job is created
            console.log(`Notification job created: ${pushCode.id}`);
        }
    });

    // Log when the job is completed
    pushCode.on('complete', () => {
        console.log(`Notification job ${pushCode.id} completed`);
    });

    // Log when the job fails
    pushCode.on('failed', (err) => {
        console.log(`Notification job ${pushCode.id} failed: ${err}`);
    });
});
