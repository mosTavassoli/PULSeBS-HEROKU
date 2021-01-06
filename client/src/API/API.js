import Lecture from "./Lecture";
const baseURL = "/API/REST.php/api";

// Return the detail info of positive studen
async function getPositiveStudentDetail(stID, SSN, idField, ssnField) {
  let url = "";
  if (stID !== null && idField !== null) {
    url = `/students/${stID}/${idField}`;
  } else if (SSN !== null && ssnField !== null) {
    url = `/students/${SSN}/${idField}`;
  }
  const response = await fetch(baseURL + url);
  const positiveSTD = await response.json();
  if (response.ok) {
    return positiveSTD;
  } else {
    let err = { status: response.status, errObj: positiveSTD };
    throw err;
  }
}

async function getAllLectures(userId) {
  /////// xxxxxxxxxxxxxx   YYYY-dd-mm to modify ( also startST is wrong)
  let url = `/users/${userId}/lectures`;
  const response = await fetch(baseURL + url);
  const lectureJson = await response.json();
  if (response.ok) {
    const lectures = lectureJson.lectures;
    const final = lectures.map(
      (l) =>
        new Lecture(
          l.lectureId,
          l.courseId,
          l.startTS,
          l.endTS,
          l.online,
          l.roomName,
          l.totalSeats,
          l.bookedSeats,
          l.courseName,
          l.bookedSelf,
          l.teacherName
        )
    );
    return final;
  } else {
    let err = { status: response.status, errObj: lectureJson };
    throw err; // An object with the error coming from the server
  }
}
//return list of lectures based on the userId **GET** /api/users/{userId}/lectures
async function getLectures(userId) {
  let data = new Date();
  /////// xxxxxxxxxxxxxx   YYYY-dd-mm to modify ( also startST is wrong)
  let url = `/users/${userId}/lectures?startDate=${data.getUTCFullYear()}-${
    data.getMonth() + 1
  }-${data.getDate()}`;
  const response = await fetch(baseURL + url);
  const lectureJson = await response.json();
  if (response.ok) {
    const lectures = lectureJson.lectures;
    const final = lectures.map(
      (l) =>
        new Lecture(
          l.lectureId,
          l.courseId,
          l.startTS,
          l.endTS,
          l.online,
          l.roomName,
          l.totalSeats,
          l.bookedSeats,
          l.courseName,
          l.bookedSelf,
          l.teacherName,
          l.inWaitingList
        )
    );
    return final;
  } else {
    let err = { status: response.status, errObj: lectureJson };
    throw err; // An object with the error coming from the server
  }
}

//return list of lectures based on the userId **GET** /api/users/{userId}/lectures
async function getLecturesStartDate(userId) {
  let data = new Date();
  /////// xxxxxxxxxxxxxx   YYYY-dd-mm to modify ( also startST is wrong)
  let url = `/users/${userId}/lectures?startDate=${data.getUTCFullYear()}-${
    data.getMonth() + 1
  }-${data.getDate()}`;

  const response = await fetch(baseURL + url);
  const lectureJson = await response.json();
  if (response.ok) {
    const lectures = lectureJson.lectures;
    const final = lectures.map(
      (l) =>
        new Lecture(
          l.lectureId,
          l.courseId,
          l.startTS,
          l.endTS,
          l.online,
          l.roomName,
          l.totalSeats,
          l.bookedSeats,
          l.courseName,
          l.bookedSelf,
          l.teacherName
        )
    );
    return final;
  } else {
    let err = { status: response.status, errObj: lectureJson };
    throw err; // An object with the error coming from the server
  }
}

//API for stats
async function getStats(idLecture, idCourse, period, week, month, year) {
  let l = idLecture ? `lecture=${idLecture}&` : "";
  let c = idCourse || idCourse === 0 ? `course=${idCourse}&` : "";
  let w = week || week === 0 ? `week=${week}&` : "";
  let m = month || month === 0 ? `month=${month}&` : "";

  let url = "/stats?" + l + c + `period=${period}&` + w + m + `year=${year}`;

  const response = await fetch(baseURL + url);
  const stats = await response.json();
  if (response.ok) {
    return stats;
  } else {
    let err = { status: response.status, errObj: stats };
    throw err; // An object with the error coming from the server
  }
}

//return list of lectures based on the userId with time filter **GET** /api/users/{userId}/lectures?[startDate=YYYY-mm-dd][endDate=YYYY-mm-dd]

//# Book a lecture /api/users/{userId}/book
async function bookLecture(lectureId, userId) {
  // return a new promise.
  return new Promise(function (resolve, reject) {
    // do the usual XHR stuff
    var req = new XMLHttpRequest();
    let url = baseURL + `/users/${userId}/book`;
    let data = `lectureId=${lectureId}`;
    req.open("post", url);
    //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onload = function () {
      if (req.status === 200) {
        const response = req.response;
        let obj = JSON.parse(response);
        resolve(obj);
      } else {
        reject(Error(req.statusText));
      }
    };
    // handle network errors
    req.onerror = function () {
      reject(Error("Network Error"));
    }; // make the request
    req.send(data);
  });
}

//# Cancel a booking **DELETE** /api/users/{userId}/book
async function cancelBooking(lectureId, userId) {
  // return a new promise.
  return new Promise(function (resolve, reject) {
    // do the usual XHR stuff
    var req = new XMLHttpRequest();
    let url = baseURL + `/users/${userId}/book`;
    let data = `lectureId=${lectureId}`;
    req.open("delete", url);
    //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onload = function () {
      if (req.status === 200) {
        const response = req.response;
        let obj = JSON.parse(response);
        resolve(obj);
      } else {
        reject(Error(req.statusText));
      }
    };
    // handle network errors
    req.onerror = function () {
      reject(Error("Network Error"));
    }; // make the request
    req.send(data);
  });
}

// Return list of students booked to a lecture **GET** /api/lectures/{lectureId}/students
async function getStudentsBooked(lectureId) {
  let url = "/lectures/";
  if (lectureId) {
    const queryParams = lectureId + "/students";
    url += queryParams;
  }

  const response = await fetch(baseURL + url);

  const studentsList = await response.json();
  if (response.ok) {
    return studentsList;
  } else {
    let err = { status: response.status, errObj: studentsList };
    throw err; // An object with the error coming from the server
  }
}

// Cancel a lecture **DELETE** /api/lectures/{lectureId}
async function deleteLecture(lectureId) {
  // don't know if this work
  // return a new promise.
  return new Promise(function (resolve, reject) {
    // do the usual XHR stuff
    var req = new XMLHttpRequest();
    let url = baseURL + `/lectures/${lectureId}`;
    let data = `lectureId=${lectureId}`;
    req.open("delete", url);
    //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onload = function () {
      if (req.status === 200) {
        const response = req.response;
        let obj = JSON.parse(response);
        resolve(obj);
      } else {
        reject(Error(req.statusText));
      }
    };
    // handle network errors
    req.onerror = function () {
      reject(Error("Network Error"));
    }; // make the request
    req.send(data);
  });
}

//Login **POST** /api/login

async function userLogin(username, password) {
  return new Promise(function (resolve, reject) {
    // do the usual XHR stuff
    var req = new XMLHttpRequest();
    let url = `${baseURL}/login`;
    let data = `username=${username}&password=${password}`;
    req.open("post", url);
    //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    req.onload = function () {
      const status = JSON.parse(req.response);

      if (status.success === true) {
        const response = req.response;
        let user = JSON.parse(response);
        resolve(user);
      } else {
        reject(status.success);
      }
    };
    // handle network errors
    req.onerror = function () {
      reject(Error("Network Error"));
    }; // make the request
    req.send(data);
  });
}

//Meaning of field type **GET** /api/types

//Check login **GET** /api/logged
async function isLogged() {
  const response = await fetch(`${baseURL}/user/me`);
  const userJson = await response.json();

  if (response.ok) {
    return userJson;
  } else {
    let err = { status: response.status, errObj: userJson };
    throw err; // An object with the error coming from the server
  }
}
async function turnLecture2(lectureId, online) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + `/lectures/${lectureId}/online`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(true),
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}
// let url = baseURL + `/lectures/${lectureId}/online`;
async function turnLecture(lectureId, online) {
  return new Promise(function (resolve, reject) {
    // do the usual XHR stuff
    var req = new XMLHttpRequest();
    let url = baseURL + `/lectures/${lectureId}/online`;
    let data = `value=${!online}`;

    req.open("PATCH", url);
    //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.onload = function () {
      if (req.status === 200) {
        const response = req.response;
        let obj = JSON.parse(response);
        resolve(obj);
      } else {
        reject(Error(req.statusText));
      }
    };
    // handle network errors
    req.onerror = function () {
      reject(Error("Network Error"));
    }; // make the request
    req.send(data);
  });
}

//Logout **POST** /api/logout
async function userLogout() {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/logout", {
      method: "POST",
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response
          .json()
          .then((obj) => {
            reject(obj);
          }) // error msg in the response body
          .catch((err) => {
            reject({
              errors: [
                { param: "Application", msg: "Cannot parse server response" },
              ],
            });
          }); // something else
      }
    });
  });
}

async function getStatesBookManager(idCourse) {
  let url = `/stats?course=${idCourse}`;

  const response = await fetch(baseURL + url);
  const stats = await response.json();
  if (response.ok) {
    return stats;
  } else {
    let err = { status: response.status, errObj: stats };
    throw err; // An object with the error coming from the server
  }
}

async function getStatesWeekly(idCourse, WeekNo) {
  const year = new Date().getFullYear();
  let url = `/stats?course=${idCourse}&period=week&week=${WeekNo}&year=${year}`;

  const response = await fetch(baseURL + url);
  const stats = await response.json();
  if (response.ok) {
    return stats;
  } else {
    let err = { status: response.status, errObj: stats };
    throw err; // An object with the error coming from the server
  }
}

async function getStatesMonthly(idCourse, MonthNo, year) {
  let url = `/stats?course=${idCourse}&period=month&month=${MonthNo}&year=${year}`;

  const response = await fetch(baseURL + url);
  const stats = await response.json();
  if (response.ok) {
    return stats;
  } else {
    let err = { status: response.status, errObj: stats };
    throw err; // An object with the error coming from the server
  }
}

async function getAllCourses() {
  const url = "/courses";
  const response = await fetch(baseURL + url);
  const courses = await response.json();
  if (response.ok) {
    return courses;
  } else {
    let err = { status: response.status, errObj: courses };
    throw err; //An object with error coming from the server
  }
}

async function uploadCsv(file, section, start, end) {
  return new Promise(async function (resolve, reject) {
    //the received file will be formatted
    var data = new FormData();
    let url;
    //based on the selected file url will be different , the switch will assign different urls here
    switch (section) {
      case "Courses":
        url = baseURL + `/courses/upload`;
        data.append("course_file", file, "course_file.csv");
        break;
      case "Schedules":
        url = baseURL + `/schedules/upload`;
        data.append("schedule_file", file, "schedule_file.csv");
        data.append("startDay", start);
        data.append("endDay", end);
        break;
      case "Student":
        url = baseURL + `/students/upload`;
        data.append("student_file", file, "Students.csv");
        break;
      case "Teachers":
        url = baseURL + `/teachers/upload`;
        data.append("teacher_file", file, "teacher_file.csv");
        break;
      case "Enrollments":
        url = baseURL + `/enrollments/upload`;
        data.append("enrollment_file", file, "enrollment_file.csv");
        break;
      case "Classes":
        url = baseURL + `/enrollments/upload`;
        data.append("enrollment_file", file, "enrollment_file.csv");
        break;
      default:
        break;
    }
    const res = await fetch(url, {
      method: "POST",
      body: data,
    });
    const lectureJson = await res.json();
    if (res.ok) {
      resolve(lectureJson);
    } else {
      reject(Error("Network Error upload"));
    }

    // do the usual XHR stuff
    /*
    var req = new XMLHttpRequest();

    req.open("post", url);
    //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING
    req.onload = function () {
      if (req.status === 200) {
        console.log("buono")
        const response = req.response;
        let obj = JSON.parse(response);
        resolve(obj);
      } else {
        reject(Error(req.statusText));
      }
    };
    // handle network errors
    req.onerror = function () {
      console.log("male")
      reject(Error("Network Error"));
    }; // make the request
    req.send(data);
    */
  });
}

const API = {
  getPositiveStudentDetail,
  getLectures,
  userLogin,
  userLogout,
  isLogged,
  getStudentsBooked,
  deleteLecture,
  bookLecture,
  cancelBooking,
  turnLecture,
  turnLecture2,
  getLecturesStartDate,
  getStats,
  getAllLectures,
  getStatesBookManager,
  getStatesWeekly,
  getStatesMonthly,
  uploadCsv,
  getAllCourses,
};
export default API;
