import instance from ".";

const getPendingApplications = async () => {
  const response = await instance.get("/course-applications");
  return response.data.$values.filter(application => application.status === "Pending");
};

const approveApplication = async (applicationId) => {
  const response = await instance.put(`/course-applications/${applicationId}/approve`);
  return response.data;
};

const rejectApplication = async (applicationId) => {
  const response = await instance.put(`/course-applications/${applicationId}/reject`);
  return response.data;
};

const completeApplication = async (applicationId) => {
  const response = await instance.put(`/course-applications/${applicationId}/complete`);
  return response.data;
};

export {
  getPendingApplications,
  approveApplication,
  rejectApplication,
  completeApplication,
};