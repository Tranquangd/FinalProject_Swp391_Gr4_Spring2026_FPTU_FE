import apiClient from "./Axios";

export const lecturerApi = {
  getGroups() {
    return apiClient.get("/lecturer/groups");
  },

  getStudents(groupId) {
    return apiClient.get(`/groups/${groupId}/students`);
  },

  getJiraTasks(groupId) {
    return apiClient.get(`/groups/${groupId}/jira`);
  },

  getProgressReports(groupId) {
    return apiClient.get(`/groups/${groupId}/progress`);
  },

  getGithubStats(groupId) {
    return apiClient.get(`/groups/${groupId}/github`);
  },
};
