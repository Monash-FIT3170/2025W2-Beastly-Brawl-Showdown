# 2025W2-Beastly-Brawl-Showdown

The application is hosted in 3 ways

- On a production site https://www.beastlybrawl.app/
  - This will only be up during Milestone presentations where we need to handle increased demand/load
- On a test site https://www.beastlybrawl-test.app/
  - This is generally up 24/7
- Locally hosted. See details instructions below

## Instructions To Locally Run Application

1. Install node.js
   - Check node.js version > v22.14.0, run `node -v`
   - Check npm version > v10.9.2, run `npm -v`
2. Install meteor using node,js
   - Run `npx meteor` (ensure to run in admin terminal)
   - Check meteor version == v3.2, run `meteor --version`, downgrade if needed
3. Open up a new terminal in your IDE, ensuring you're in the `2025W2-Beastly-Brawl-Showdown` directory.
4. Run `meteor npm i` to install dependencies
5. Run `meteor run --settings settings.dev.json`

## Deployment Infrastructure and Management

The application is deployed on two DigitalOcean droplets (TEST: 1 vCPU, 1GB RAM - PROD: 4 vCPU, 8GB RAM).
Docker is used to run both a container of the Meteor application and an Nginx container for the web server.

There are four GitHub Actions Workflows to manage application deployment.

- Test - Startup Droplet & Deploy Game
  - Can be run manually on any branch. Automatically triggered on PR creation/update and merge to main
- Prod - Startup Droplet & Deploy Game
  - Can only be run manually on the **main branch**.
- Test - Shutdown Droplet
  - Can be run manually on any branch. No automatic triggers.
- Prod - Shutdown Droplet
  - Can be run manually on the **main branch**. Automatically triggered every night at around 11:55PM AEST.

## System Architects:

- Devan (dfed0003@student.monash.edu)
- Danniel (dyou0009@student.monash.edu)
- Daniel Loh (dloh0003@student.monash.edu)

## Product Managers:

- Naveen (nsel0009@student.monash.edu)
- Meng (hsia0003@student.monash.edu)
- Tinesia (tyuu0023@student.monash.edu)
- Derek (dcao0008@student.monash.edu)
- Omar (osal0004@student.monash.edu)

## Release Train Engineers:

- Aden (atra0066@student.monash.edu)
- Will Richter (wric0006@student.monash.edu)
- Luna (pnag0009@student.monash.edu)
- Cameron (cameronhumphreys77@gmail.com)
- Anika (akam0020@student.monash.edu)
- Huu Nguyen (hngu0187@student.monash.edu)
