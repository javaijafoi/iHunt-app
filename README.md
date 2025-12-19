# iHunt — independent VTT build for internal testing

This repository contains a cleaned fork of the original cassApp virtual tabletop, stripped of external services, donation links, and public branding so it can be tested privately.

## Development

Clone this repository and work locally.

### Prerequisites

1. Install Node `>=22` (to match the engine property in `package.json`) or use the provided devcontainer with VS Code.

### Installation

iHunt relies on Node and npm to download its dependencies and run.

Install dependencies:

```sh
npm install
```

### Running the application

Start the dev server:

```sh
npm run start
```

Vite will serve the site at http://localhost:1234 and hot-reload on save.
