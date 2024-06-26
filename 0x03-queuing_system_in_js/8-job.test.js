import kue from 'kue';
import {describe, it} from 'mocha';
import createPushNotificationsJobs from './8-job';

// Create a test queue
const queue = kue.createQueue();

// List of jobs to be processed
const jobs = [
  {
    phoneNumber: '1234567890',
    message: 'Your verification code is 1234',
  },
  {
    phoneNumber: '0987654321',
    message: 'Your verification code is 5678',
  },
];

/**
 * Test suite for the createPushNotificationsJobs function.
 */
describe('createPushNotificationsJobs', () => {
  // Enter test mode before each test
  before(() => {
    queue.testMode.enter();
  });

  // Clear the test queue after each test
  afterEach(() => {
    queue.testMode.clear();
  });

  // Exit test mode after all tests
  after(() => {
    queue.testMode.exit();
  });

  /**
   * Test case to check if a job is created for each item in the list.
   */
  it('creates a job for each item in the list', () => {
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(jobs.length);
  });

  /**
   * Test case to check if the job data is set to the expected values.
   */
  it('sets the job data to the expected values', () => {
    createPushNotificationsJobs(jobs, queue);
    jobs.forEach((job, index) => {
      expect(queue.testMode.jobs[index].data).to.eql(job);
    });
  });
});
