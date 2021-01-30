# PULSeBS

Pandemic University Lecture Seat Booking System

## Run

    $ docker-compose up

## Login data

You can find preloaded account [here](./server/README.md).

## Mail server

You can check the emails to localhost:8025 logging in with "francexi" and password "testpass"

## Screenshot

These are some snapshots of this WebApp; for utilizing the App entirely, you can do "docker-compose up" to run it.

### login Page

On the first page, log in to the system via [here](./server/README.md)
![LoginPage](PICs/logInPage.png)

As a booking manager I want to generate a contact tracing report starting with a positive student so that we comply with safety regulations.
![ContactTracing](PICs/ContactTracing.png)
![StudentsDetails](PICs/StudentsDetails.png)

As a booking manager I want to monitor usage (booking, cancellations, attendance) of the system.
![BookinManager](PICs/BookinManager.png)
![MonthlyStatistics](PICs/MonthlyStatistics.png)

As a student I want to access a calendar with all my bookings for the upcoming weeks.
![Calendar](PICs/Calendar.png)

As a support officer I want to modify the schedule of courses so that data is up-to-date.
![UpdateLectureList](PICs/UpdateLectureList.png)

As a support officer I want to upload the list of students, courses, teachers, lectures, and classes to setup the system.
![UploadFiles](PICs/UploadFiles.png)
