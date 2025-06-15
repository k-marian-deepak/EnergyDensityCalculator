# EnergyDensity_TeamDataSync

EnergyDensity_TeamDataSync is a collaborative web application designed to calculate and compare the energy densities of various fuels and energy storage systems.
Built with a modern full-stack architecture, it facilitates real-time data synchronization and collaborative analysis.

## 🔧 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** Drizzle ORM (likely with SQLite or PostgreSQL)
- **Build Tools:** Vite
- **Styling:** Tailwind CSS
- **Configuration:** TypeScript, PostCSS

## 📁 Project Structure

```
EnergyDensity_TeamDataSync/
├── client/                  # Frontend application
├── server/                  # Backend API and logic
├── shared/                  # Shared utilities and types
├── energy-density-calculator/ # Core calculation modules
├── components.json          # UI component definitions
├── drizzle.config.ts        # Drizzle ORM configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project metadata and scripts
├── postcss.config.js        # PostCSS configuration
└── package-lock.json        # Dependency lock file
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/k-marian-deepak/EnergyDensity_TeamDataSync.git
   cd EnergyDensity_TeamDataSync
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database:**

   Configure your database settings in `drizzle.config.ts`. Then, run migrations:

   ```bash
   # Command to run migrations (example)
   npm run migrate
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🧮 Features

- **Energy Density Calculator:** Compute and compare energy densities of various fuels and storage systems.
- **Real-time Collaboration:** Synchronize data and calculations across multiple users in real-time.
- **Modular Architecture:** Separation of concerns with distinct client, server, and shared modules.
- **Responsive Design:** User-friendly interface optimized for various devices.

## 🛠️ Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build the application for production |
| `npm run start`   | Start the production server          |
| `npm run lint`    | Lint the codebase                    |
| `npm run test`    | Run tests                            |

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## 📫 Contact

For any inquiries or feedback, please contact [k-marian-deepak](https://github.com/k-marian-deepak).
