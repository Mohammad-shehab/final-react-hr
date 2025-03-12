import instance from ".";

const getAllUsers = async () => {
  const response = await instance.get("/users");
  return response.data.$values; // Return the $values array directly
};

export {
  getAllUsers,
};