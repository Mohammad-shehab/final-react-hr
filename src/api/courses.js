import instance from ".";

const getAllCourses = async () => {
  const response = await instance.get("/courses");
  return response.data.$values; // Access the $values array
};

const applyForCourse = async (courseId) => {
  try {
    const response = await instance.post(`/courses/apply`, { courseId });
    return response.data;
  } catch (error) {
    console.error("Error applying for course:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  getAllCourses,
  applyForCourse,
};