# 2025W2-Beastly-Brawl-Showdown

Beastly Brawl Showdown is a web-based role-playing game where players battle each other using unique monsters with distinct abilities, inspired by classic tabletop games like Dungeons & Dragons. The game features simple attack and defend mechanics, live match updates, and a variety of tournament formats (adventure and battle royale), making it accessible and engaging for both new and experienced players. Its social, in-person focus encourages interaction and serves as a fun party or icebreaker game. The combination of strategy, luck, and diverse monster abilities ensures each match feels fresh and unpredictable.

---

## Hosting

- **Production:** https://www.beastlybrawl.app/ (active during milestone presentations)
- **Test:** https://www.beastlybrawl-test.app/ (generally up 24/7)
- **Local:** See instructions below

---

## Instructions To Locally Run Application

1. **Install Node.js**

   - [Download Node.js](https://nodejs.org/en/download)
   - Check Node.js version (> v22.14.0):  
     `node -v`
   - Check npm version (> v10.9.2):  
     `npm -v`

2. **Install Meteor**

   - In an admin terminal, run:  
     `npx meteor`
   - Check Meteor version (should be v3.2):  
     `meteor --version`

3. **Clone the Repository**

   - `git clone https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown.git`
   - Navigate to the project root directory.

4. **Install Dependencies**

   - `meteor npm install`

5. **Set Up Environment Variables**

   - Create a `.env` file in the project root.
   - Add your MongoDB connection string:  
     `MONGO_URL=your_mongodb_connection_string`

6. **Start the Application**
   - `npm start`

---

## Tech Stack Overview

### Frontend (React - TypeScript)

- Built with React and TypeScript.
- Uses Tailwind CSS and custom React components for UI consistency.
- [Frontend source code](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/tree/main/client)

### Backend (Meteor - TypeScript)

- Meteor manages game logic, state, authentication, matchmaking, and MongoDB communication.
- [Backend source code](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/tree/main/server)

### API Technology (socket.io)

- Enables real-time communication between client and server.
- Handles player input, game state updates, and more.
- [Socket server setup](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/blob/main/server/main.ts)
- [Frontend socket connection](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/blob/main/client/src/socket.ts)

### Database (MongoDB)

- Hosted on MongoDB Atlas (free tier).
- Stores user accounts and game tracking data.
- Set `MONGO_URL` environment variable to connect.

### Cloud Service Host (Digital Ocean)

- Deployed on two DigitalOcean droplets:
  - TEST: 1 vCPU, 1GB RAM
  - PROD: 4 vCPU, 8GB RAM
- Managed with Terraform.
- [Terraform files](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/tree/main/terraform)
- Static assets served via DigitalOcean Spaces CDN.

### Containerisation (Docker & Docker Compose)

- Application is containerised using Docker.
- [Dockerfile](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/blob/main/Dockerfile)
- Two containers are run:
  - The Meteor application
  - Nginx

### Web Server (Nginx, SSL, DNS)

- Nginx acts as a reverse proxy for HTTP/HTTPS.
- SSL certificates from Namecheap/Name.com (free using GitHub Student Developer Pack, expiring Aug 2026).
- DNS entries for human-readable domains (free using GitHub Student Developer Pack, expiring Aug 2026).
- [Nginx prod config](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/blob/main/deployment/default.prod.conf)
- [Nginx test config](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/blob/main/deployment/default.test.conf)

### Automation (GitHub Actions)

There are four GitHub Actions Workflows to manage application deployment.

- **Test - Startup Droplet & Deploy Game**
  - Can be run manually on any branch. Automatically triggered on PR creation/update and merge to main
- **Prod - Startup Droplet & Deploy Game**
  - Can only be run manually on the **main branch**.
- **Test - Shutdown Droplet**
  - Can be run manually on any branch. No automatic triggers.
- **Prod - Shutdown Droplet**

  - Can be run manually on the **main branch**. Automatically triggered every night at around 11:55PM AEST.

- [Startup workflow](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/blob/main/.github/workflows/startup-template.yaml)
- [Shutdown workflow](https://github.com/Monash-FIT3170/2025W2-Beastly-Brawl-Showdown/blob/main/.github/workflows/shutdown-template.yaml)

#### Startup Workflow

- Starts droplet via Terraform (recreates from snapshot).
- Builds Docker image.
- Deploys app using Docker Compose (runs containers for Meteor & Nginx).

#### Shutdown Workflow

- Takes droplet snapshot.
- Destroys droplet via Terraform (As just shutting it down still incurs costs. Destroying but saving a snapshot is cheaper).

#### GitHub Repository Secrets

| SECRET NAME                                | DESCRIPTION                        |
| ------------------------------------------ | ---------------------------------- |
| BEASTLYBRAWL_APP_ROOT_URL_PROD             | Production site URL                |
| BEASTLYBRAWL_APP_ROOT_URL_TEST             | Test site URL                      |
| BEASTLYBRAWL_APP_SSL_CERT_PROD             | Production SSL certificate         |
| BEASTLYBRAWL_APP_SSL_CERT_TEST             | Test SSL certificate               |
| BEASTLYBRAWL_APP_SSL_KEY_PROD              | Production SSL key                 |
| BEASTLYBRAWL_APP_SSL_KEY_TEST              | Test SSL key                       |
| DIGITAL_OCEAN_DROPLET_IP_PROD              | Production VM IP                   |
| DIGITAL_OCEAN_DROPLET_IP_TEST              | Test VM IP                         |
| DIGITAL_OCEAN_DROPLET_SSH_PRIVATE_KEY_PROD | Production VM SSH key              |
| DIGITAL_OCEAN_DROPLET_SSH_PRIVATE_KEY_TEST | Test VM SSH key                    |
| DIGITAL_OCEAN_PAT                          | DigitalOcean Personal Access Token |
| DIGITAL_OCEAN_SPACES_ACCESS_KEY_ID         | Spaces Access Key ID               |
| DIGITAL_OCEAN_SPACES_SECRET_KEY            | Spaces Secret Key                  |
| GHCR_PACKAGES_TOKEN                        | GHCR packages token                |
| MONGO_URL                                  | MongoDB connection string          |

---

## Meet The Team!

<div align="center">

  <div style="display:inline-block; width:280px; margin:20px; vertical-align:top; text-align:center;">
    <img src="https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/CHARMER_COBRA.png" alt="Team Cobra" width="200" />
    <h3>Team Cobra</h3>
    <table align="center" style="border-collapse:collapse;">
      <tr>
        <td><strong>Naveen</strong><br><small>nsel0009@student.monash.edu</small></td>
        <td><strong>Huu Nguyen</strong><br><small>hngu0187@student.monash.edu</small></td>
      </tr>
      <tr>
        <td><strong>Danniel</strong><br><small>dyou0009@student.monash.edu</small></td>
        <td><strong>Luna</strong><br><small>pnag0009@student.monash.edu</small></td>
      </tr>
      <tr>
        <td><strong>Omar</strong><br><small>osal0004@student.monash.edu</small></td>
        <td></td>
      </tr>
    </table>
  </div>

  <div style="display:inline-block; width:280px; margin:20px; vertical-align:top; text-align:center;">
    <img src="https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png" alt="Team Rhino" width="200" />
    <h3>Team Rhino</h3>
    <table align="center" style="border-collapse:collapse;">
      <tr>
        <td><strong>Devan</strong><br><small>dfed0003@student.monash.edu</small></td>
        <td><strong>Meng</strong><br><small>hsia0003@student.monash.edu</small></td>
      </tr>
      <tr>
        <td><strong>Aden</strong><br><small>atra0066@student.monash.edu</small></td>
        <td><strong>Will Richter</strong><br><small>wric0006@student.monash.edu</small></td>
      </tr>
    </table>
  </div>

  <div style="display:inline-block; width:280px; margin:20px; vertical-align:top; text-align:center;">
    <img src="https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/POISON_POGO.png" alt="Team Pogo" width="200" />
    <h3>Team Pogo</h3>
    <table align="center" style="border-collapse:collapse;">
      <tr>
        <td><strong>Cameron</strong><br><small>cameronhumphreys77@gmail.com</small></td>
        <td><strong>Anika</strong><br><small>akam0020@student.monash.edu</small></td>
      </tr>
      <tr>
        <td><strong>Tinesia</strong><br><small>tyuu0023@student.monash.edu</small></td>
        <td><strong>Derek</strong><br><small>derek.jcao@gmail.com</small></td>
      </tr>
      <tr>
        <td><strong>Daniel Loh</strong><br><small>dloh0003@student.monash.edu</small></td>
        <td></td>
      </tr>
    </table>
  </div>

</div>

---
