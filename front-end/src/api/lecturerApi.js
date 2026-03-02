import apiClient from "./Axios";

export const lecturerApi = {
  getGroups() {
    return apiClient.get("/lecturer/groups");
  },

  getStudents(groupId) {
    return apiClient.get(`/groups/${groupId}/students`);
  },

 getJiraTasks(projectId) {
    return apiClient.get(`/jira/issues/project/${projectId}`);
  },

  getAllMemberStatistics(projectId) {
    return apiClient.get(`/reports/project/${projectId}/members`);
  },

  getMemberStatistics(projectId, userId) {
    return apiClient.get(`/reports/project/${projectId}/member/${userId}`);
  },

  getLecturerOverview(lecturerId) {
    return apiClient.get(`/reports/lecturer/${lecturerId}`);
  },
  
  getGithubStats(groupId) {
    return apiClient.get(`/groups/${groupId}/github`);
  },
};
