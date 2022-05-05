import client from "./client";

const send = (response, form) =>
  client.post("/response", {
    ...response,
    form,
  });

export default {
  send,
};
