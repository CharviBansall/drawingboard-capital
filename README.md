# DrawingBoard App

<img src="https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/brand-assets/svg/WhiteLogoNoWordmark.svg" width="100"/>

## Repository Structure

```
DrawingBoard-App/
├── apps/
│   ├── api/         # Backend API server
│   └── frontend/    # Frontend web application
├── packages/
│   ├── shared/      # Shared utilities and types
│   └── transactional/ # Cloudflare Worker for transactional emails using Resend and React Email
├── supabase/        # Supabase configuration and migrations
├── pnpm-workspace.yaml  # pnpm workspace configuration
└── package.json     # Root package configuration
```

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend API**: Node.js, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email Service**: Cloudflare Worker with Resend and React Email
- **Infrastructure**: Deployed on Vercel and Cloudflare

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (v10.10.0)

## Getting Started

### Installation

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/drawingboard-org/drawing-board-app.git
   ```

   Note: You'll need proper access to the organization's private repository. Contact your team lead for access.

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

### Environment Setup

1. Copy the example environment files:
   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/frontend/.env.example apps/frontend/.env
   ```

2. Update the environment variables with your local or development credentials.

### Transactional Email Setup

The `transactional` package is a Cloudflare Worker that handles all system-generated emails:

1. Configure Cloudflare Worker environment:
   ```bash
   cd packages/transactional
   cp .env.example .env
   ```

2. Update the environment variables with your Resend API key and other required settings.

3. For local development:
   ```bash
   pnpm --filter transactional dev
   ```

4. To deploy the Worker to Cloudflare:
   ```bash
   pnpm --filter transactional deploy
   ```

Note: The transactional email service is triggered by Supabase Auth hooks for events like user signup, password reset, etc.

### Supabase Configuration

1. Set up your local Supabase environment or connect to the development instance.

2. Configure auth webhooks to point to your transactional email service:
   - Navigate to the Supabase dashboard > Authentication > Webhooks
   - Add hooks for events like signup, login, password reset
   - Point them to your deployed Cloudflare Worker URL or local development URL

### Development

To start the development servers:

```bash
# Start the API server
pnpm --filter api dev

# Start the frontend application
pnpm --filter frontend dev

# Start the transactional email service
pnpm --filter transactional dev

# Start all services concurrently
pnpm -r --parallel dev
```

### Building for Production

```bash
# Build all applications
pnpm -r build

# Build specific application
pnpm --filter frontend build
```

## Why pnpm?

This project uses [pnpm](https://pnpm.io/) as the package manager for several reasons:

- **Disk space efficiency**: pnpm uses a content-addressable store which saves disk space by avoiding duplication of packages.
- **Strict dependency management**: Prevents hidden dependencies and ensures a more accurate representation of the dependency tree.
- **Monorepo support**: Native support for workspaces without additional tools.
- **Performance**: Faster installation times compared to npm and yarn.

## Available Scripts

- `pnpm install` - Install all dependencies
- `pnpm lint` - Run ESLint across the monorepo
- `pnpm format` - Format code using Prettier
- `pnpm test` - Run tests across all packages and applications
- `pnpm build` - Build all applications for production

## Development Workflow

1. Create a new branch for your feature or fix (`git checkout -b feature/your-feature` or `git checkout -b fix/your-fix`)
2. Commit your changes with descriptive messages following [Conventional Commits](https://www.conventionalcommits.org/) format
3. Push your branch to the repository (`git push origin your-branch`)
4. Create a Pull Request on GitHub
5. Ensure CI checks pass
6. Request review from team members
7. Address feedback and make necessary changes
8. Once approved, merge your PR

## Debugging

- API: The API server includes debug logging that can be enabled via the `DEBUG` environment variable
- Frontend: Use React DevTools

## Deployment

Our CI/CD pipeline automatically deploys:
- `develop` branch to the staging environment
- `main` branch to the production environment

Manual deployments should be coordinated with the DevOps team.

## Contributing

Please review our [Contributing Guide](CONTRIBUTING.md) before submitting changes.

## Intellectual Property

This project is proprietary and confidential. Unauthorized copying, transfer, distribution, or use of this software, via any medium, is strictly prohibited. All rights reserved by Drawingboard Capital

## Contact

Drawingboard Capital - [Website](https://drawingboard.capital)

For technical issues or questions, please create an issue in the repository or contact the development team via Slack (#drawingboard-dev channel).
