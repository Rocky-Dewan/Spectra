# Spectra - Setup & Run Guide

## Quick Start (3 Steps)

### 1. Navigate to Project Directory
```bash
cd /home/Spectra
```

### 2. Install Dependencies
```bash
pnpm install

pnpm add -D cross-env

```

### 3. Start Development Server
```bash
pnpm dev
```

The application will start at `http://localhost:3000`

---

## Detailed Setup Steps

### Prerequisites
- Node.js 22+ (already installed)
- pnpm (already installed)
- Python 3 with OpenCV (for forensic analysis)

### Step 1: Navigate to Project
```bash
cd /home/Spectra
```

### Step 2: Install Node Dependencies
```bash
pnpm install
```

### Step 3: Install Python Dependencies (One-time)
```bash
pip3 install opencv-python scipy pillow numpy -q
```

### Step 4: Create Database Tables
```bash
pnpm drizzle-kit migrate
```

### Step 5: Start Development Server
```bash
pnpm dev
```

### Step 6: Access Application
Open browser and go to: `http://localhost:3000`

---
