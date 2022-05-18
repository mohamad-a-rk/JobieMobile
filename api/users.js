import client from "./client";

const endPoint = "/users"

const register = (userInfo) => client.post(endPoint, userInfo);

const getUser = (userId) => client.get(endPoint + "/" + userId)

export default { register, getUser };
