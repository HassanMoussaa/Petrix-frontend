<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> Welcome to Petrix, your go-to AI assistant for all things related to your beloved pets.
>
> With Petrix, we go beyond simple image classification to offer a comprehensive pet care solution. Whether you're an experienced pet owner or a novice, Petrix has you covered.

### User Types 

1. Pet owners 
2. Doctors

### Features of the App 

As a Pet Owner, I want : 

- To Quickly identify the species and breed of my pet by submitting a photo so that I may learn more about them.
- A tool to provide me with real-time health and wellness updates for my pet, including weight check, exercises, and nutritional guidelines, so that I can ensure its overall safety.
- To use my current location to search for local vet clinics and offer a list with important data like the distance, ratings, and contact information, so i can book an appointmen with the best veterinary clinic for the needs of my pet.

As a Doctor, I want: 

- Have a profile page on the site so pet owners can quickly have an exact location of my clinic, opening hours and any other information. 
- Be notified of appointment requests from pet owners, so i could effectively organize my calendar and provide my clients pets the care they need.
- Review the comments and ratings of clients, so I can have a better assessment of the care we are providing.

<br><br> 
<!-- Prototyping -->
<img src="./readme/title3.svg"/>

> We designed PETRIX using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

### Mockups
| Login  | Sign up - 1 | Sign up - 2 |
| ---| ---| ---|
| ![Login](./readme/demo/Login.png) | ![ Sign up - 1](./readme/demo/Sign_up_1.png) | ![ Sign up - 2](./readme/demo/Sing_up_2.png) |
|  AI Classification | AI Assistant | Doctors near you |
| ![AI Classification](./readme/demo/AI_Classification.png) | ![AI Assistant](./readme/demo/AI_Assistant.png) | ![Doctors near you](./readme/demo/Doctors_Near_Me.png) |
| Book Appointment | Handle Appointments | Doctor profile |
| ![Book Appointment](./readme/demo/Booking.png) | ![Handle Appointments](./readme/demo/Handle_Appointment.png) | ![Doctor profile](./readme/demo/Doctor_Profile.png) |

<br><br>

<!-- Implementation -->
<img src="./readme/title4.svg"/>

> Using the wireframes and mockups as a guide, we implemented the Coffee Express app with the following features:

### Pet Owner Screens (Web)
| Register  | AI Classification |  AI Assistant |
| ---| ---| ---|
| ![Register](./readme/demo/signin.gif) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |



### Doctor Screens (Web)
| Login screen  | Register screen |  Landing screen |
| ---| ---| ---|
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Tech stack -->
<img src="./readme/title5.svg"/>

###  Coffee Express is built using the following technologies:

- This project uses the [Flutter app development framework](https://flutter.dev/). Flutter is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.
- For persistent storage (database), the app uses the [Hive](https://hivedb.dev/) package which allows the app to create a custom storage schema and save it to a local database.
- To send local push notifications, the app uses the [flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications) package which supports Android, iOS, and macOS.
  - 🚨 Currently, notifications aren't working on macOS. This is a known issue that we are working to resolve!
- The app uses the font ["Work Sans"](https://fonts.google.com/specimen/Work+Sans) as its main font, and the design of the app adheres to the material design guidelines.

<br><br>

<!-- How to run -->
<img src="./readme/title6.svg"/>

> To set up Coffee Express locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

Now, you should be able to run Coffee Express locally and explore its features.
