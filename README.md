# Super Lig France

A modern web application dedicated to Turkish football, offering in-depth analysis, live statistics, and a passionate community around the Turkish Super Lig.

<img width="1511" alt="image" src="https://github.com/user-attachments/assets/8fab0f23-f4ed-422a-8fdb-df119941c1e1" />


## Key Features

- Live match scores
- Detailed player ratings
- In-depth performance analysis
- Comprehensive team and player statistics
- Modern and responsive interface

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Database**:
  - Prisma ORM
  - Neon (PostgreSQL serverless)
- **Authentication**: Clerk
- **Styling**: TailwindCSS
- **UI Components**:
  - Radix UI
  - Shadcn/ui
  - Lucide React
- **Animations**: Motion & tw-animate-css
- **Markdown**: React Markdown with Remark GFM

## Prerequisites

- Node.js (LTS version recommended)
- pnpm (package manager)
- Clerk account for authentication
- Neon database (PostgreSQL)
- Configured environment variables

## Database Configuration

1. Create an account on [Neon](https://neon.tech)
2. Create a new project
3. Configure the following environment variables:

```env
DATABASE_URL="postgres://..."
DIRECT_URL="postgres://..."
```

4. Initialize the database:

```bash
pnpm prisma db push
pnpm prisma generate
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/super-lig-fr.git
cd super-lig-fr
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Fill in the `.env` file with your own values.

## Getting Started

### Development

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
super-lig-fr/
├── src/
│   ├── app/                # Next.js routes and pages
│   │   └── (authed)/      # Protected routes
│   ├── components/        # UI components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utilities and services
├── prisma/              # Database schema
└── public/             # Static files
```

## Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm prisma generate`: Generate Prisma types
- `pnpm prisma db push`: Sync database schema
- `pnpm prisma studio`: Database administration interface

## Contributing

Contributions are welcome! Please feel free to:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Authors

- Your Name - [@your-twitter](https://twitter.com/your-twitter)

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Neon](https://neon.tech)
- [Clerk](https://clerk.com/)
- And all other open-source tools used in this project
