# Las Vegas Smokeout Website

This repository contains the source code for the official website of the Las Vegas Smokeout annual event. It's built using modern web technologies for a seamless content management and user experience.

## Description

This project is a full-stack website featuring:

- A **Next.js** frontend for fast, server-rendered pages and a great developer experience.
- A **Sanity.io** backend providing a flexible, embedded Content Management System (CMS) / Studio for easy event updates.
- **Tailwind CSS** (if you used it) for utility-first styling.
- Deployment-ready for platforms like **Vercel**.

## Features

- **Event Schedule:** Dynamically updated list of events, sortable by date/time.
- **Attendee Galleries:** Browse photos of current and past attendees.
- **Host Hotel Information:** Details and booking info for the venue.
- **T-Shirt Showcase:** View current and past T-shirt designs.
- **Sponsor Display:** Logos and links for event sponsors.
- **Registration Info:** Details on how to register for the event.
- **Announcements:** Easily update home page announcements via the CMS.

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (React Framework)
- **Backend/CMS:** [Sanity.io](https://www.sanity.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) _(Remove if not used)_
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Prerequisites

- [Node.js](https://nodejs.org/) (Version 18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A free [Sanity.io](https://www.sanity.io/signup) account

## Getting Started

Follow these instructions to set up a local development environment.

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/](https://github.com/)[your-github-username]/las-vegas-smokeout-web.git
    cd las-vegas-smokeout-web
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up Sanity.io:**

    - **Connect to your own Sanity project:** This project requires a Sanity backend. If you are setting this up for the first time from the clone, you'll need to link it to your _own_ Sanity project. You can either:
      - Run `npx sanity@latest init --reconfigure` in the project directory and follow the prompts to create a new project or connect to an existing one.
      - Or, manually create a project at [manage.sanity.io](https://manage.sanity.io) and update the environment variables.
    - **Environment Variables:** Create a file named `.env.local` in the project root by copying the example file:
      ```bash
      cp .env.local.example .env.local
      ```
      Update `.env.local` with your Sanity Project ID and Dataset name:
      ```plaintext
      NEXT_PUBLIC_SANITY_PROJECT_ID="YOUR_PROJECT_ID"
      NEXT_PUBLIC_SANITY_DATASET="production" # Or your dataset name
      # NEXT_PUBLIC_SANITY_API_VERSION="YYYY-MM-DD" # Optional: Specify API version
      ```
    - **Configure CORS:** Go to [manage.sanity.io](https://manage.sanity.io), select your project, navigate to the **API** tab, and add `http://localhost:3000` to the **CORS origins** list (ensure "Allow Credentials" is checked).

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    # yarn dev
    ```

5.  **Access the application:**
    - **Website:** Open [http://localhost:3000](http://localhost:3000) in your browser.
    - **Sanity Studio (CMS):** Open [http://localhost:3000/studio](http://localhost:3000/studio) in your browser. You'll need to log in with your Sanity account.

## Deployment

This Next.js application can be easily deployed to platforms like [Vercel](https://vercel.com/) (recommended) or Netlify. Remember to:

1.  Configure the necessary environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`) in your deployment platform's settings.
2.  Add your production URL(s) to your Sanity project's CORS origins list.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE.md) file for details.
