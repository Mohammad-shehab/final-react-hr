import instance from ".";

const getAllDepartments = async () => {
  const response = await instance.get("/departments");
  return response.data.$values; // Access the $values array
};

export {
  getAllDepartments,
};