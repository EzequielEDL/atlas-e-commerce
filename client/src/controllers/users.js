import {
  POST_USER_SIGNUP,
  POST_USER_SIGNIN,
  GET_USER_BY_ID,
  GET_USERS,
  SIGN_IN_USER_GOOGLE,
  GET_AUTH_ME,
  POST_RESET_CODE,
  PUT_RESET_CODE,
  UPDATE_USER_STATUS
} from "../constants/api";

export const signUpUser = (dataForm) => {
  return new Promise((resolve, reject) => {
    fetch(POST_USER_SIGNUP, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    })
      .then(response => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 404:
            reject(new Error("It appears that the database url was not found"));
            break;
          default:
            reject(new Error("It seems there was an error"));
            break;
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const signInUser = dataForm => {
  return new Promise((resolve, reject) => {
    fetch(POST_USER_SIGNIN, {
      method: "POST",
      headers: {
        "Accept" : "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm)
    })
    .then(response => {
      switch (response.status) {
        case 200:
          resolve(response.json());
          break;
        case 404:
          reject(new Error("It appears that the database url was not found"));
          break;
        case 400:
          resolve(response.json());
          break;
        default:
          reject(new Error("It seems there was an error"));
          break;
      }
    })
    .catch((err) => {
      console.log("error", err);
      reject(err.message);
    });
  });
};

export const getUserById = (userId) => {
  console.log("userId", userId)
  return new Promise((resolve, reject) => {
    fetch(`${GET_USER_BY_ID}/${userId}`)
      .then(response => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 404:
            reject(new Error("It appears that the database url was not found"));
            break;
          default:
            reject(new Error("It seems there was an error"));
            break;
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const getUserAuthenticated = async getUser => {
  const response = await new Promise((resolve, reject) => {
    const token = window.localStorage.getItem("session");
    if(token){
      fetch(GET_AUTH_ME, {
        headers : {
          "Authorization" : `BEARER ${token}`
        }
      })
      .then(response => {
        if(response.status === 401) resolve(new Error("401"));
        else return response.json();
      })
      .then(user => {
        resolve(user);
      })
      .catch(() => {
        resolve(new Error("401"));
      })
    }else {
      resolve(new Error("not-session"))
    }
  })
  if(response instanceof Error){
    if(response.message !== "not-session"){
      window.localStorage.removeItem("session");
    }
  }else {
    getUser(response);
  }
}

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    fetch(`${GET_USERS}`)
      .then((response) => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 404:
            reject(new Error("It appears that the database url was not found"));
            break;
          default:
            reject(new Error("It seems there was an error"));
            break;
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const signInUserWithGoogle = dataForm => {
  return new Promise((resolve, reject) => {
    fetch(SIGN_IN_USER_GOOGLE, {
      method: "POST",
      headers: {
        "Accept" : "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm)
    })
    .then(response => {
      switch (response.status) {
        case 200:
          resolve(response.json());
          break;
        case 404:
          reject(new Error("It appears that the database url was not found"));
          break;
        case 400:
          resolve(response.json());
          break;
        default:
          reject(new Error("It seems there was an error"));
          break;
      }
    })
    .catch((err) => {
      reject(err.message);
    });
  })
}

export const postResetCode = (inputEmail) => {
  return new Promise((resolve, reject) => {
    fetch(POST_RESET_CODE, {
      method : "POST",
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputEmail)
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 404:
            reject(new Error("It appears that the database url was not found"));
            break;
          default:
            reject(new Error("It seems there was an error"));
            break;
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const putResetPassword = (dataForm) => {
  console.log("FETCH", dataForm)
  return new Promise((resolve, reject) => {
      fetch(PUT_RESET_CODE, {
        method: "PUT",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataForm),
      })
      .then((response) => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 404:
            reject(new Error("It appears that the database url was not found"));
            break;
          default:
            reject(new Error("It seems there was an error"));
            break;
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const updateUserStatus = (id) => {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem("session");
    if (token) {
      fetch(`${UPDATE_USER_STATUS}/auth/promote/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "Authorization" : `BEARER ${token}`
        }
      })
      .then(response => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 404:
            reject(new Error("It appears that the database url was not found"));
            break;
          case 400:
            resolve(response.json());
            break;
          default:
            reject(new Error("It seems there was an error"));
            break;
        }
      })
      .catch((err) => {
        reject(err.message);
      });
    }
  })
}
