class TimedTasks {
  constructor(axios, home) {
    this.axios = axios;
    this.home = home;
  }

  /**
   * Returns the home's timed tasks
   * @return {Promise}
   */
  listTimedTasks() {
    return this.axios.get(`/homes/${this.home.id}/tasks/timed`);
  }

  /**
   * Gets a scecnario
   * @param {number} id
   * @return {Promise}
   */
  getTimedTask(id) {
    return this.axios.get(`/tasks/timed/${id}`);
  }

  /**
   * Creates a timed task
   * @param {Object} timedTask
   * @param {number} timedTask.scenario_id
   * @param {number} timedTask.thing_id
   * @param {Object} timedTask.status
   * @param {string} timedTask.cron
   * @return {Promise}
   */
  createTimedTask(timedTask) {
    return this.axios.post(`/homes/${this.home.id}/tasks/timed`, { timed_task: timedTask });
  }

  /**
   * Updates a timed task
   * @param {number} id
   * @param {Object} timedTask
   * @param {number} timedTask.scenario_id
   * @param {number} timedTask.thing_id
   * @param {Object} timedTask.status
   * @param {string} timedTask.cron
   * @return {Promise}
   */
  updateTimedTask(id, timedTask) {
    return this.axios.put(`/tasks/timed/${id}`, { timed_task: timedTask });
  }

  /**
   * Deletes a timed task
   * @param {number} id
   * @return {Promise}
   */
  deleteTimedTask(id) {
    return this.axios.delete(`/tasks/timed/${id}`);
  }
}

module.exports = TimedTasks;
