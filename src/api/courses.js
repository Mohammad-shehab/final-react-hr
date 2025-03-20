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
    console.error(
      "Error applying for course:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const addCourse = async (course) => {
  const response = await instance.post("/courses", course);
  return response.data;
};

const deleteCourse = async (courseId) => {
  const response = await instance.delete(`/courses/${courseId}`);
  return response.data;
};

export { getAllCourses, applyForCourse, addCourse, deleteCourse };
