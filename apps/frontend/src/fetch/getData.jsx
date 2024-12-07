import axios from "axios";

export const getData = (apiURL, artificialDelay) => {
    let status = "pending";
    let result;
    let suspender = new Promise((resolve, reject) => {
      setTimeout(() => {
        axios(apiURL)
          .then((r) => {
            status = "success";
            result = r.data;
            resolve();
          })
          .catch((e) => {
            status = "error";
            result = e;
            reject();
          });
      }, artificialDelay);
    })
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      },
    }
}