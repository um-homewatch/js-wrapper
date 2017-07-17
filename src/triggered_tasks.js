class TriggeredTasks {
  constructor(axios, home) {
    this.axios = axios;
    this.home = home;
  }

  /**
   * Returns the home's triggered tasks
   * @return {Promise}
   */
  listTriggeredTasks() {
    return this.axios.get(`/homes/${this.home.id}/tasks/triggered`);
  }

  /**
   * Gets a scecnario
   * @param {number} id
   * @return {Promise}
   */
  getTriggeredTask(id) {
    return this.axios.get(`/tasks/triggered/${id}`);
  }

  /**
   * Creates a triggered task
   * @param {Object} triggeredTask
   * @param {number} triggeredTask.scenario_id
   * @param {number} triggeredTask.thing_id
   * @param {number} triggeredTask.thing_to_compare_id
   * @param {string} triggeredTask.comparator
   * @param {Object} triggeredTask.status_to_compare
   * @param {Object} triggeredTask.status_to_apply
   * @return {Promise}
   */
  createTriggeredTask(triggeredTask) {
    return this.axios.post(`/homes/${this.home.id}/tasks/triggered`, { triggered_task: triggeredTask });
  }

  /**
   * Updates a triggered task
   * @param {number} id
   * @param {Object} triggeredTask
   * @param {number} triggeredTask.scenario_id
   * @param {number} triggeredTask.thing_id
   * @param {number} triggeredTask.thing_to_compare_id
   * @param {string} triggeredTask.comparator
   * @param {Object} triggeredTask.status_to_compare
   * @param {Object} triggeredTask.status_to_apply
   * @return {Promise}
   */
  updateTriggeredTask(id, triggeredTask) {
    return this.axios.put(`/tasks/triggered/${id}`, { triggered_task: triggeredTask });
  }

  /**
   * Deletes a triggered task
   * @param {number} id
   * @return {Promise}
   */
  deleteTriggeredTask(id) {
    return this.axios.delete(`/tasks/triggered/${id}`);
  }
}

module.exports = TriggeredTasks;
