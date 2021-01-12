# Login

Will set a cookie with a string used to authentication

- **POST** /api/login
  - _request params_
    - username: string
    - password: string
  - _response body_
    - success: bool
    - userId: int
    - type: int

# Meaning of field type

- **GET** /api/types
  - _request params_
    - empty
  - _response params_
    - success: bool
    - list: [array(object)]
      - typeId: int
      - typeDesc: string _(student, teacher, booking manager)_

# Check login

- **GET** /api/logged
  - _request params_
    - empty
  - _response body_
    - success: bool
    - loggedIn: bool
  - _if not logged the response code will be 403_

# Logout

- **POST** /api/logout
  - _request params_
    - empty
  - _response body_
    - success: bool

# Current user

Requires login

- **GET** /api/user/me
  - _request params_
    - empty
  - _response body_
    - success: bool
    - userId: int
    - type: int
    - username: string
    - email: string
    - firstname: string
    - lastname: string
    - city: string
    - birthday: ISO-8601 string "-" separated
    - SSN: string

# All courses

- **GET** /api/courses
  - _request params_
    - _optional_ ofLogged: no value
  - _response body_
    - success: bool
    - courses: [object]{
      - ID: int
      - code: string
      - name: string
      - year: int _(is the academical year: for example 1 for the first year)_
      - semester: int
      - teacherId: int
      - teacherFirstName: string
      - teacherLastName: string
      - teacherEmail: string
        }

# All lectures of a specific course
Requires login as support officer

- **GET** /api/courses/{courseId}/lectures?[startDate=YYYY-mm-dd][endDate=yyyy-mm-dd]
  - _request params_
    - startDate: ISO-8601 date *(optional: default, Big Bang)*
    - endDate: ISO-8601 date *(optional: default, Big Crunch)*
  - _response body_
    - success: bool
    - courseId: int
    - courseCode: string
    - courseName: string
    - lectures [array(object)]
      - lectureId: int
      - startTS: int _(GMT timezone)_
      - endTS: int _(GMT timezone)_
      - online: bool
      - roomName: string

# All lectures of a user

Requires login as student or teacher

- **GET** /api/users/{userId}/lectures?[startDate=YYYY-mm-dd][enddate=yyyy-mm-dd]
  - _request params_
    - empty
  - _response body_
    - success: bool
    - lectures: [object]
      - lectureId: int
      - courseId: int
      - courseName: string
      - startTS: int _(GMT timezone)_
      - endTS: int _(GMT timezone)_
      - online: bool
      - teacherName: string
      - roomName: string
      - bookedSeats: int
      - totalSeats: int
      - bookedSelf: bool
      - inWaitingList: bool

# Book a lecture

Requires login as student

- **POST** /api/users/{userId}/book
  - _request params_
    - lectureId: int
  - _response body_
    - success: bool
    - inWaitingList: bool
    - mailSent: bool

# Students booked to a lecture

Requires login as teacher

- **GET** /api/lectures/{lectureId}/students
  - _request params_
    - empty
  - _response body_
    - success: bool
    - students: [object]
      - studentId: int
      - studentName: string
      - email: string
      - inWaitingList : bool

# Cancel a booking

Requires login as student

- **DELETE** /api/users/{userId}/book
  - _request params_
    - lectureId: int
  - _response body_
    - success: bool

# Cancel a lecture

Requires login as teacher

- **DELETE** /api/lectures/{lectureId}
  - _request params_
    - empty
  - _response body_
    - success: bool

# Edit a lecture online status

Requires login as teacher

- **PATCH** /api/lectures/{lectureId}/online
  - _request params_
    - value: bool
  - _response body_
    - success: bool

# Edit a block of lecture online status

Requires login as support officer

- **PATCH** /api/lectures/online
  - _request params_
    - value: bool (true -> turn all to online, false -> turn all to presence)
    - year: array(int) _(optional, default: all the years)_
    - semester: array(int) _(optional, default: all the semesters)_
    - start_date: ISO-8601 date _(optional, default: current date and time)_
    - end_date: ISO-8601 date _(optional, default: last day of 35 ABY (if you don't know what is it, search star wars))_
  - _response body_
    - success: bool
    - affectedRecords: int

# Booking statistics

Requires login as teacher or booking manager

- **GET** /api/stats?lecture=LL&course=XXX&period=PPPP&week=WW&month=MM&year=YYYY
  - _URL params details_
    - lecture: id of lecture
    - course: id of course | all
      - if lecture not present, defaults to all, ignored otherwise
    - period: week | month | all
      - if lecture not present, defaults to all, ignored otherwise
    - week: 0 <= id of week <= 52
      - mandatory if period = week, ignored otherwise
    - month: 0 <= id of month <= 11
      - mandatory if period = month, ignored otherwise
    - year: year > 0
      - mandatory if period = week | month, ignored otherwise
  - _response body_
    - success: bool
    - courseId: int | null
    - bookingsAvg: float
    - bookingsStdDev: float
    - totalBookings: int
    - attendanceAvg: float
    - attendanceStdDev: float
    - totalAttendance: int
    - cancellationsAvg: float
    - cancellationsStdDev: float
    - totalCancellations: int
    - nLectures: int
      - attendance statistics are not present at the moment
      - cancellation statistics are present only for a booking manager

# Upload students csv

Require login as support officer

- **POST** /api/students/upload
  - _request params_
    - student_file: file _content of the csv file correctly formatted as multipart/form-data (check out FormData object)_
  - _response body_
    - success: bool

# Upload teachers csv

Require login as support officer

- **POST** /api/teachers/upload
  - _request params_
    - teacher_file: file _content of the csv file correctly formatted as multipart/form-data (check out FormData object)_
  - _response body_
    - success: bool

# Upload courses csv

Require login as support officer

- **POST** /api/courses/upload
  - _request params_
    - course_file: file _content of the csv file correctly formatted as multipart/form-data (check out FormData object)_
  - _response body_
    - success: bool

# Upload enrollments csv

Require login as support officer

- **POST** /api/enrollments/upload
  - _request params_
    - enrollment_file: file _content of the csv file correctly formatted as multipart/form-data (check out FormData object)_
  - _response body_
    - success: bool

# Upload schedule csv
Requiire login as support officer

- **POST** /api/schedules/upload
  - *request params*
    - schedule_file: file *content of the csv file correctly formatted as multipart/form-data (check out FormData object)*
    - startDay: string YYYY-mm-dd
    - endDay: string YYYY-mm-dd
  - *response body*
    - success: bool

# Edit a course schedule
Require login as support officer

- **PATCH** /api/courses/{courseId}/schedule
  - *request params*
    - originalWeekday: int *(0 to 6, where 0 is Monday, 6 is Sunday)*
    - newWeekday: int *(0 to 6, where 0 is Monday, 6 is Sunday)*
    - newTime: string *(optional: default is to not change the time. Time should be formatted like this hh:mm)*
    - startDateTime: ISO-8601 date and time *(optional: default is the current date and time)*
    - endDateTime: ISO-8601 date and time *(optional: default is to the infinite and beyond)*
  - *response body*
    - success: bool
    - affectedRow: int

The endpoint will change all the lectures of the `courseId` course that are held in `originalWeekday` during the specified period of time
(using `startDateTime` and `endDateTime`) to `newWeekday` and `newTime`. For example, if originalWeekday is 0 and newWeekday is 4, all the
lectures of course `courseId` that are held on Monday, will be moved to Friday. Notice that `startDateTime` cannot be for any reason in the
past, since only not already held lectures can be affected.

# Error

If an error occurs, the _response body_ is

- success: bool
- reason: string

If the user is not authenticated and tries to use an endpoint that require authentication, the HTTP response will be 403
