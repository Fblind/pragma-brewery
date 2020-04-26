# PragaBrewery

## Thoughts
My first solution to the problem would not be an app that needs internet to works since all the information is on the track it can be detected in realtime.

## Assumptions
The client should have a device with a full internet connection around the trip with a lot of data.
Not realtime, one minute to update is ok and the business is not damaged because of this.

## Highlights
The app is separated in a frontend using vue and a backend using node with express
The frontend is set up with a minimal webpack config just to use the component as a page without using any external tool. Then we have an index.html which is the file that will be sent from the server and an src folder where I use the following structure:
- src
  - components (components files that will be used from the pages)
  - pages (every page, usually one per route defined in vue router)
  - store
    - modules
  main.js (entry point of the application)

And the backend has an entry point index.js and then the following structure:
- module
  - handlers
  - models
  - services
  - tests
  router.js

## Next iterations
App notifications
From the technical side, we can add a lot of things that could be useful for the developer and for the end-user.
- Separate backend and frontend in different repos. One big benefit of this is that you can deploy each separated from the other one, so for example if you have to fix a bug in your logic there is no need to deploy the frontend too.
- Frontend can be generated and deployed in a cdn based on the city where the customer uses the app most of the time. The app should be run a lot faster (the idea behind all of this is the JAMStack).
- Add centralized logger, useful for debugging in production
- Create the frontend with vue cli using the benefits from it, add router and store management
- Once the frontend design is accepted add tests. I think add tests for your components very upfront is a bit complicated to maintain, because at the beginning of the project there are a lot of changes regarding the ui. That's why I think all your frontend logic should be in some store module, so you can test that functions with unit test as it "normal node code"
- Add docker so every developer develops in the same environment with minimal configuration
- Add swagger to document the api and validate
