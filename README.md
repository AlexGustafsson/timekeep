Timekeep
======
A simple timekeeping web app using modern techniques such as modern EcmaScript, Poi (Webpack, Babel etc.) and Vue. Try it live: https://timekeep.axgn.se.

<p align="center">
  <img alt="Demo" src="https://github.com/AlexGustafsson/timekeep/raw/master/.github/screenshot.png">
<p>

_The UI is heavily inspired by the great work of uixNinja over at https://dribbble.com/shots/8659108-Dashboard-user-interface._

# Quickstart
<a name="quickstart"></a>

```
# Clone the repository
git clone https://github.com/AlexGustafsson/timekeep

# Enter the directory
cd timekeep

## Option A:
# Install dependencies
npm install
# Option A 1: Run development server
npm run dev
# Option A 2: Build and run minimal server
npm run build
npm run start

## Option B:
# Build and run using Docker
./docker-build.sh
docker run -it -p 3000:3000 axgn/timekeep

# You can now go to http://localhost:3000 or http://localhost:4000 if you're using the development server
```

# Table of contents

[Quickstart](#quickstart)<br/>
[Features](#features)<br />
[Technology](#technology)<br />
[Development](#development)<br />
[Disclaimer](#disclaimer)

# Features
<a name="features"></a>

* Stunning dark UI
* Intuitive user experience for simple timekeeping
* Keeps track of time spent on projects even when the app is closed
* Works fully offline with client-side storage
* Exports data for use with Excel
* 296kB gzipped

# Technology
<a name="technology"></a>

### Poi
> Poi is a zero-config bundler built on the top of webpack. By using the buzz word zero-config, it does not mean that there's no config, instead we pre-configurared many things for you. To prevent Poi from becoming too bloated to use, we also introduced some kind of plugin system to make extra features opt-in.

Visit Poi [here](https://github.com/egoist/poi).

### Vue
> Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. It is designed from the ground up to be incrementally adoptable, and can easily scale between a library and a framework depending on different use cases. It consists of an approachable core library that focuses on the view layer only, and an ecosystem of supporting libraries that helps you tackle complexity in large Single-Page Applications.

Visit Vue [here](https://github.com/vuejs/vue).

# Development
<a name="development"></a>

```
# Clone the repository
git clone https://github.com/AlexGustafsson/timekeep

# Enter the directory
cd timekeep

# Install dependencies
npm install

# Follow the conventions enforced
npm run lint
npm run stylelint
npm run test
npm run coverage
npm run check-duplicate-code

# Build for production
npm run build
```

# Disclaimer
<a name="disclaimer"></a>

_Although the project is very capable, it is not built with production in mind. Therefore there might be complications when trying to use the project for large-scale projects meant for the public. The project was developed to easily keep track of time spent on things and as such it might not promote best practices nor be performant._
