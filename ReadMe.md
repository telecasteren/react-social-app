# 🍕 Foodiegram

![image](public/resources/images/screenshot.webp)

**A social media application.**

## Description

Foodiegram is a social media app for "foodies", gathering food lovers from around the world to a social meeting arena, where the users can share their experiences and recommendations, recipes and tips.

## 🚀 Features

- **Feed & Posts** – View, create and like posts.
- **Search** – Sort and search in posts.
- **User Authentication** – Create an account and log in securely. (restricted to these domains: @noroff.no, @stud.noroff.no)
- **Profile Management** – Update your profile and see your list of posts, edit/delete posts.
- **DM's and messaging** – Send and receive messages between users. _(COMING IN FUTURE)_

## 🛠 Built With

- **Tailwind CSS** – styles
- **HTML & CSS** – structure and custom styles
- **JavaScript** – client-side logic
- **Node.js & Express.js** – backend routing

### Github project

[Click to see Github project board](https://github.com/users/telecasteren/projects/2)<br/>
[Click to go to Github repo](https://github.com/telecasteren/social-app-noroff/tree/js2)

## Getting Started

### 1. Installation

#### Clone the repository:

```bash
git clone https://github.com/telecasteren/social-app-noroff.git
cd social-app-noroff
```

### 2. Prerequisites

- Node.js latest version -
  [Node.js](https://nodejs.org/en/download)

- Express.js v4:

```bash
npm install express@4.18.2
```

Why Express?<br/>
This let's us handle routing(navigation) as 'SPA routing'.<br/>
--> 'Single Page Application' routing for updating content and browser URL without having to do a full page reload.<br/>

Instead of navigating to a new HTML page, the routing system intercepts URL changes and dynamically renders different components or views on the same page. The key for my approach is trying to create a smooth experience for the user.

**Install the dependencies:**

```bash
npm install
```

This will install:

- Tailwind CSS (frontend styles)
- Live Server (static frontend preview)
- [Concurrently](https://www.npmjs.com/package/concurrently)
- Other required dependencies

### 3. Run the app

To start both the backend server and Tailwind, run:

```bash
npm run dev
```

You will see this in the console outcome:</br>
_Server is running on http://localhost:5500_

Now, open it in your preferred browser and get to testing!

### Issues when running

If you're experiencing any issue running the app, try running the following:

```bash
npm install express@4.18.2
rm -rf node_modules package-lock.json
npm install
```

### All available scripts

- npm run dev – _runs the full project for development (starts Tailwind CSS watcher and server concurrently)_
- npm run build – _builds (compiles and minifies) the Tailwind CSS for production<br/>***NOTE! Does not handle routing***_
- npm run frontend – _serves the public/ folder locally with live-server for a static preview.<br/>***NOTE! Does not handle routing***_
- npm run tailwind – _starts Tailwind CSS in watch mode for development (rebuilds on file changes)<br/>***NOTE! Does not handle routing***_

### Testing the app

After cloning the repo and running it, you can test the app from a user perspective:

- Creating a test user within the valid email domain: noroff.no or stud.noroff.no
- Or by logging in as one of these generic test user:<br/>

```bash
username: testbrowsers@noroff.no
password: browsers
---
username: eg95@noroff.no
password: eeeeeeee
```

## ⭐ Contributing

**Right now I'm not looking for contributors, as this is a school project.**</br>
When contributing becomes available, see guidelines and more about it here:
[CONTRIBUTING.md](docs/CONTRIBUTING.md).

## 👨🏼‍💻 Contact me

Portfolio [telecasteren.github.io](https://telecasteren.github.io/)

Github [@telecasteren](https://github.com/telecasteren)

LinkedIn [Tele Caster Nilsen](www.linkedin.com/in/tele-caster-nilsen-7002b9249)

## License

Under no licence p.t.

## 🫶 Acknowledgments

- Noroff Social API for posts and users content

### Under a free licence on Unsplash, some of the images used are by these creators:

#### **AVATAR IMAGES**

- [rayul @ Unsplash](https://unsplash.com/@rayul)
- [ayo-ogunseinde @ Unsplash](https://unsplash.com/@armedshutter)
- [ian-dooley @ Unsplash](https://unsplash.com/@iandooley)
- [toa-heftiba @ Unsplash](https://unsplash.com/@heftiba)
- [ivana-cajina @ Unsplash](https://unsplash.com/@von_co)
- [rafaella-mendes-diniz @ Unsplash](https://unsplash.com/@rafaellamendesdiniz)

#### **POST IMAGES**

- [rayul @ Unsplash](https://unsplash.com/@rayul)
- [chad-montano @ Unsplash](https://unsplash.com/@briewilly)
- [casey-lee @ Unsplash](https://unsplash.com/@caseylee)
- [brooke-lark @ Unsplash](https://unsplash.com/@brookelark)
- [anh-nguyen @ Unsplash](https://unsplash.com/@nguyentuananh)
- [adam-jaime @ Unsplash](https://unsplash.com/@adamjaime)
- [joseph-gonzalez @ Unsplash](https://unsplash.com/@gonzalez)
- [victoria-shes @ Unsplash](https://unsplash.com/@sheshoots)
- [adam-jaime @ Unsplash](https://unsplash.com/@adamjaime)
- [shenggeng-lin @ Unsplash](https://unsplash.com/@shenggeng-lin)
- [alex-munsell @ Unsplash](https://unsplash.com/@alex-munsell)
- [emy @ Unsplash](https://unsplash.com/@emy)
- [cody-chan @ Unsplash](https://unsplash.com/@cody-chan)
- [heather-barnes @ Unsplash](https://unsplash.com/@heather-barnes)
- [kobby-mendez @ Unsplash](https://unsplash.com/@kobby-mendez)
- [otto-norin @ Unsplash](https://unsplash.com/@otto-norin)
- [nguyen-dang-hoang-nhu @ Unsplash](https://unsplash.com/@nguyen-dang-hoang-nhu)

### ℹ️ Resources

[Typewriter effect](https://css-tricks.com/snippets/css/typewriter-effect/)</br>
[Typewriter library](https://www.typeitjs.com/)</br>
[IsoDateString to human readable](https://www.geeksforgeeks.org/how-to-format-javascript-date-as-yyyy-mm-dd/)</br>
[Truncate long strings](https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings)
