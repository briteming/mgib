# GitHub Blog Project
<p align="left">
<a href="https://reactjs.org/" alt="node.js"><img src="https://img.shields.io/badge/node.js-v20.8.1-blue" /></a>
  <a href="https://reactjs.org/" alt="react"><img src="https://img.shields.io/badge/react-v18.1.0-blue" /></a>
  <a href="https://nextjs.org/" alt="next.js"><img src="https://img.shields.io/badge/next.js-14.1.4-black" /></a>
  <a href="https://v1.chakra-ui.com/" alt="chakra-ui/react"><img src="https://img.shields.io/badge/chakra--ui%2Freact-v2.8.2-green" /></a>
  <a href="https://getbootstrap.com/" alt="bootstrap"><img src="https://img.shields.io/badge/bootstrap-v5.3.3-purple" /></a>
</p>

GitHub Blog is an interactive web application that leverages the GitHub API to manage and display blog posts as GitHub Issues. It supports OAuth-based authentication, enabling post management (browse, add, update, and delete) for authorized users and viewing capabilities for guests.

## Features

- **GitHub OAuth for Authentication**: Secure login process using GitHub OAuth.
- **Post Management through GitHub Issues**: Utilize GitHub issues as blog posts. Closing an issue equates to deleting a post.
- **Markdown Support**: Renders markdown content in posts.
- **Infinite Scrolling**: Loads posts in batches for efficient browsing.
- **Responsive Design**: Built with Next.js and Chakra UI for a modern, responsive user interface.

## Getting Started

### Prerequisites

- Node.js (version 12.x or higher)
- A GitHub account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/maxemc2/github-issue-blog.git
   cd github-blog
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables by following the [Environment Variables Setup](#environment-variables-setup) section.
4. Start the development server:
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables Setup

To configure your application, create a `.env.local` file with `.env.sample` template file at the root of your project directory and add the following variables:

```env
# GitHub OAuth Apps
NEXT_PUBLIC_GITHUB_CLIENT_ID="your_github_client_id_here"
NEXT_PUBLIC_GITHUB_CLIENT_SECRET="your_github_client_secret_here"
# GitHub issue info
NEXT_PUBLIC_GITHUB_OWNER="your_github_username_here"
NEXT_PUBLIC_GITHUB_REPO="your_github_repo_name_here"
# Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="a_randomly_generated_string_here"
```

### Generating a Secure `NEXTAUTH_SECRET`

Generate a secure string using `openssl`:

```bash
openssl rand -hex 32
```

### GitHub OAuth Setup

1. Create a new OAuth App in GitHub under **Settings > Developer settings > OAuth Apps > New OAuth App**.
2. Fill in the **Application name**, set the **Homepage URL** to `http://localhost:3000` for local development, and set the **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github`.
3. After creating the app, copy the **Client ID** and **Client Secret** to your `.env.local` file.