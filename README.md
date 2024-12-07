<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[![CircleCI](https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456)](https://circleci.com/gh/nestjs/nest)
[![Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/package/@nestjs/core)
[![License](https://img.shields.io/npm/l/@nestjs/core.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/@nestjs/common.svg)](https://www.npmjs.com/package/@nestjs/common)
[![Coverage](https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9)](https://coveralls.io/github/nestjs/nest?branch=master)
[![Discord](https://img.shields.io/badge/discord-online-brightgreen.svg)](https://discord.gg/G7Qnnhy)
[![OpenCollective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
[![Donate](https://img.shields.io/badge/Donate-PayPal-ff3f59.svg)](https://paypal.me/kamilmysliwiec)
[![Support us](https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg)](https://opencollective.com/nest#sponsor)
[![Twitter](https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow)](https://twitter.com/nestframework)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project Setup

To install the dependencies for both the frontend and backend, follow these steps:

1. **Install frontend dependencies**: 
   Navigate to the `frontend` directory and install the necessary packages.
2. **Install backend dependencies**: 
   After navigating to the `server` directory, install the required backend dependencies.
3. **Start the development servers**:
   - Run the frontend development server.
   - Run the backend development server.
4. **Build the frontend**:
   - Build the frontend for production.
   - Preview the production build.
5. **Start the backend in production**:
   Run the backend server in production mode.
6. **Run tests**:
   - Run frontend tests.
   - Run backend tests with coverage.

```bash
$ cd apps/frontend              # Navigate to the frontend directory
$ npm install                   # Install frontend dependencies
$ cd ../server                  # Navigate to the server directory
$ npm install                   # Install backend dependencies
$ cd apps/frontend              # Navigate back to frontend directory
$ npm run dev                   # Start frontend development server
$ cd apps/server                # Navigate to backend directory
$ npm run start:dev             # Start backend server in development mode
$ cd apps/frontend              # Navigate back to frontend directory
$ npm run build                 # Build frontend for production
$ npm run preview               # Preview the production build
$ cd apps/server                # Navigate to backend directory
$ npm run start:production      # Start backend server in production mode
$ cd apps/frontend              # Navigate to frontend directory
$ npm run test                  # Run frontend tests
$ cd apps/server                # Navigate to backend directory
$ npm run test:cov              # Run backend tests with coverage
