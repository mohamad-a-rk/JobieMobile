import client from "./client";

const endpoint = "/users"
const feedbacks = "/feedback"


const register = (userInfo) => client.post(endpoint, userInfo);

const signOutAll = () => client.post(endpoint + "/logoutAll")



const getUser = (userId) => client.get(endpoint + "/" + userId)

const getFeedbacks = (userId) => client.get(feedbacks + "/" + userId)

export const editUser = (user, updatedUser, onUploadProgress) => {

    var updates = {}

    Object.keys(updatedUser).forEach((val) => {
        if (user[val] !== updatedUser[val])
            updates[val] = updatedUser[val]
    })

    return client.patch(endpoint + "/me", updates, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });


}

export const changePassword = (passwords, onUploadProgress) => {

    return client.patch(endpoint + "/me/password", passwords, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });

}

export const updateData = (updates, onUploadProgress) => {

    return client.patch(endpoint + "/me", updates, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });

}

export default { register, getUser, editUser, changePassword, signOutAll, updateData, getFeedbacks };
