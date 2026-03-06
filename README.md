<div align="center">

# 🏪 OrderHub — Order Management System

**Phase 1 · Inventory & POS**

[![.NET 9](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet&logoColor=white)](#-backend-stack)
[![Angular 18](https://img.shields.io/badge/Angular-18.2-DD0031?logo=angular&logoColor=white)](#-frontend-stack)
[![SQL Server](https://img.shields.io/badge/SQL_Server-2022-CC2927?logo=microsoftsqlserver&logoColor=white)](#-backend-stack)
[![EF Core 9](https://img.shields.io/badge/EF_Core-9.0.3-512BD4?logo=dotnet&logoColor=white)](#-backend-stack)
[![Angular Material](https://img.shields.io/badge/Material-18.2.14-757575?logo=material-design&logoColor=white)](#-frontend-stack)
[![License](https://img.shields.io/badge/License-Private-gray)](#)

A premium, enterprise-grade inventory management and point-of-sale system featuring a fully bilingual interface (Arabic & English), dynamic dark/light theming, real-time VAT calculations, print-ready invoices, and a powerful admin dashboard — all purpose-built for the **Saudi market**.

</div>

---

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠 Technology Stack](#-technology-stack)
- [📁 Project Architecture](#-project-architecture)
- [⚙️ Setup & Installation](#️-setup--installation)
- [🔌 API Reference](#-api-reference)
- [🗄️ Database Schema](#️-database-schema)
- [🌐 Internationalization (i18n)](#-internationalization-i18n)
- [🎨 Theming System](#-theming-system)
- [🧩 Frontend Architecture](#-frontend-architecture)
- [🖨️ Invoice Printing](#️-invoice-printing)
- [📦 Bulk Upload](#-bulk-upload)
- [🌱 Data Seeding](#-data-seeding)

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🌍 **Bilingual UI (AR / EN)** | Full Arabic & English support with seamless RTL ↔ LTR switching via `@ngx-translate` |
| 🌗 **Dark & Light Themes** | Elegant Material 3 theming powered by CSS custom properties, persisted via `localStorage` |
| 🛒 **POS Shopping Cart** | Real-time line totals, 15% VAT computation, quantity controls, sticky order summary sidebar |
| 🧾 **A4 Invoice Printing** | Print-optimized tax invoices with custom headers, navy-styled tables, and RTL-mirrored Arabic layout |
| 📊 **Admin Dashboard** | Paginated item grid with multi-field search, inline actions (edit, delete, add to cart) |
| 📤 **Bulk Excel Upload** | Download `.xlsx` template → fill → upload → atomic validation with row-level error reporting |
| 🖼️ **Image Management** | Drag-and-drop image upload (JPG/PNG, max 5 MB), GUID-named file storage |
| ⚙️ **Runtime Configuration** | Change DB connection, enable/disable seed data, toggle theme & language — all from the Settings panel |
| 🔐 **Soft Deletes** | Items are never physically removed; a global EF Core query filter hides deleted records |
| ✅ **Async Validation** | Real-time item code uniqueness check with 400 ms debounce |
| 🧮 **Computed Pricing** | `NetTotal` is a SQL Server persisted computed column: `Price + (Price × VAT% / 100)` |
| 💰 **SAR Currency** | Custom Saudi Riyal SVG icon rendered natively alongside all monetary values |

---

## 🛠 Technology Stack

### 🔷 Backend Stack

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| ASP.NET Core | **9.0** | Web API framework |
| Entity Framework Core | **9.0.3** | ORM with Code-First migrations |
| Microsoft SQL Server | **2022** | Relational database (LocalDB / SQL Auth) |
| Scalar | **2.13.0** | Interactive API documentation UI |
| ClosedXML | **0.104.2** | Excel generation for bulk upload templates |
| Microsoft.Data.SqlClient | **6.1.4** | SQL Server connectivity provider |

### 🔶 Frontend Stack

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| Angular | **18.2** | SPA framework (Standalone Components + Signals) |
| Angular Material | **18.2.14** | Material Design 3 component library |
| Angular CDK | **18.2.14** | Overlays, dialogs, directionality, accessibility |
| @ngx-translate | **15.0.0** | Runtime i18n (JSON-based translations) |
| RxJS | **7.8** | Reactive stream handling |
| TypeScript | **5.5.2** | Strongly-typed language |
| SCSS | — | Custom design tokens & CSS custom properties |

### 🎨 Design & Typography

| Font | Usage |
|:-----|:------|
| **Inter** | English body text |
| **Cairo** | Arabic body text (RTL) |
| **Outfit** | Display headings & brand identity |
| **Material Icons** | Icon system (Rounded & Outlined variants) |

---

## 📁 Project Architecture

```text
order_management/
│
├── 📄 order_management.sln          # .NET Solution file
├── 📄 project_plan.md               # Phase 1 technical specification
├── 📄 prompt.md                     # AI prompt & architecture rules
├── 📄 README.md                     # ← You are here
│
├── 🔷 backend/                       # ASP.NET Core 9 Web API
│   ├── Program.cs                    # Entry point: DI, CORS, migrations, seeding
│   ├── OrderManagement.API.csproj    # Project manifest & NuGet packages
│   │
│   ├── Controllers/
│   │   ├── ItemsController.cs        # /api/items — Full CRUD + image + bulk upload
│   │   └── ConfigurationController.cs# /api/configuration — DB settings + seed config
│   │
│   ├── Models/
│   │   ├── Item.cs                   # Product entity (GUID PK, soft delete, computed NetTotal)
│   │   ├── AppConfiguration.cs       # Singleton config entity (DB creds, seed settings)
│   │   └── ApiResponse.cs            # Generic response envelope: ApiResponse<T>
│   │
│   ├── DTOs/
│   │   ├── ItemDto.cs                # Item response DTO (includes resolved ImageUrl)
│   │   ├── CreateItemRequest.cs      # Create item input (validated)
│   │   ├── UpdateItemRequest.cs      # Update item input
│   │   ├── ConfigurationDto.cs       # Config response (password masked as ***)
│   │   ├── UpdateConfigurationRequest.cs
│   │   └── TestConnectionRequest.cs  # DB connection test payload
│   │
│   ├── Services/
│   │   ├── IItemService.cs           # Item business logic contract
│   │   ├── ItemService.cs            # Paging, search, CRUD, bulk upload, image upload
│   │   ├── IFileStorageService.cs    # File I/O contract
│   │   ├── FileStorageService.cs     # GUID-named file save (JPG/PNG, 5 MB max)
│   │   └── SeedDataGenerator.cs      # 90+ product templates across 12 Saudi-market categories
│   │
│   ├── Data/
│   │   └── AppDbContext.cs           # EF Core DbContext, model config, SaveChanges override
│   │
│   ├── Middleware/
│   │   └── GlobalExceptionMiddleware.cs  # Catches unhandled exceptions → JSON 500
│   │
│   ├── Migrations/
│   │   ├── InitialCreate              # Items + AppConfigurations tables
│   │   └── AddCategoryAndSeedConfig   # Category column + seed data settings
│   │
│   └── Properties/
│       └── launchSettings.json       # http://localhost:5050
│
└── 🔶 frontend/                      # Angular 18 SPA
    ├── angular.json                  # Build config, SCSS, assets, budgets
    ├── package.json                  # Dependencies & scripts
    ├── tsconfig.json                 # TypeScript strict configuration
    │
    └── src/
        ├── index.html                # Root HTML (Material Icons, Roboto font)
        ├── main.ts                   # Bootstrap → AppComponent
        ├── styles.scss               # Global theme: Material 3 palettes, CSS variables, RTL
        │
        ├── app/
        │   ├── app.component.ts      # Root → delegates to AppShellComponent
        │   ├── app.config.ts         # Providers: Router, HTTP, i18n, APP_INITIALIZER
        │   ├── app.routes.ts         # Lazy-loaded routes (4 pages + wildcard)
        │   │
        │   ├── core/
        │   │   ├── services/
        │   │   │   ├── item.service.ts    # Items API client (CRUD, image, bulk)
        │   │   │   ├── cart.service.ts    # Signal-based cart state (totals, VAT, count)
        │   │   │   ├── config.service.ts  # Config API client + APP_INITIALIZER loader
        │   │   │   └── theme.service.ts   # Dark/light toggle with localStorage persistence
        │   │   ├── models/
        │   │   │   ├── item.model.ts      # ItemDto, CreateItemRequest, UpdateItemRequest
        │   │   │   ├── config.model.ts    # AppConfig, UpdateConfigRequest, TestConnectionRequest
        │   │   │   └── api-response.model.ts  # ApiResponse<T>, PagedResult<T>
        │   │   └── interceptors/
        │   │       └── error.interceptor.ts   # Global HTTP error → Material Snackbar
        │   │
        │   ├── features/
        │   │   ├── store/                 # 🏠 Public Storefront (route: /)
        │   │   │   ├── product-grid/      #    → Browse all products in a responsive grid
        │   │   │   ├── product-card/      #    → Product card with "Add to Cart" & quick view
        │   │   │   └── product-detail-modal/  # → Full product detail in a dialog
        │   │   │
        │   │   ├── items/                 # 📊 Admin Dashboard (route: /admin)
        │   │   │   ├── item-list/         #    → Paginated table with search & inline actions
        │   │   │   ├── item-form/         #    → Create/Edit dialog (reactive form + image upload)
        │   │   │   └── bulk-upload/       #    → Excel template download & bulk import dialog
        │   │   │
        │   │   ├── cart/                  # 🛒 Shopping Cart (route: /cart)
        │   │   │   ├── cart-page/         #    → Cart line items with quantity controls
        │   │   │   └── cart-sidebar/      #    → Sticky order summary (subtotal, VAT, total)
        │   │   │
        │   │   └── configuration/         # ⚙️ Settings Panel (route: /admin/configuration)
        │   │       └── config-panel/      #    → DB settings, seed data, theme & language toggles
        │   │
        │   ├── layout/
        │   │   ├── app-shell/             # Sidenav container, sidebar nav, RTL support
        │   │   └── top-navbar/            # Top toolbar with hamburger menu & brand
        │   │
        │   └── shared/
        │       ├── components/
        │       │   └── confirm-dialog/    # Reusable Material confirmation dialog
        │       └── animations/
        │           └── ui.animations.ts   # Shared Angular animation triggers
        │
        └── assets/
            ├── i18n/
            │   ├── en.json               # English translations (full coverage)
            │   └── ar.json               # Arabic translations (full coverage)
            ├── icons/                    # Custom SVG icons
            └── Saudi_Riyal_Symbol.svg    # 🇸🇦 Official SAR currency symbol
```

---

## ⚙️ Setup & Installation

### 📋 Prerequisites

| Requirement | Minimum Version | Download |
|:------------|:---------------|:---------|
| **.NET SDK** | 9.0 | [dotnet.microsoft.com](https://dotnet.microsoft.com/download/dotnet/9.0) |
| **Node.js** | 18.x+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.x+ | Bundled with Node.js |
| **SQL Server** | 2019+ (or LocalDB) | [microsoft.com/sql-server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) |
| **Angular CLI** | 18.x | `npm install -g @angular/cli` |

### 📂 Step 1 — Database & Storage Directories

The application auto-creates these directories on first launch, but ensure your system has write access to `D:\`:

```
D:\order_managment\                        ← SQL Server .mdf / .ldf files
D:\order_managment\assets\items\           ← Uploaded product images
```

> 💡 **Tip:** You can change both the database path and image storage path from `appsettings.json` or the in-app **Settings** panel at runtime.

### 🔷 Step 2 — Backend Setup

```bash
# Navigate to the backend project
cd backend

# Restore NuGet packages
dotnet restore

# Run the application (auto-applies EF Core migrations on startup)
dotnet run
```

The API server starts at **`http://localhost:5050`**

| Endpoint | Description |
|:---------|:------------|
| `http://localhost:5050/api/items` | Items REST API |
| `http://localhost:5050/api/configuration` | Configuration API |
| `http://localhost:5050/scalar/v1` | 📘 Interactive API Documentation (dev only) |

### 🔶 Step 3 — Frontend Setup

```bash
# Navigate to the frontend project
cd frontend

# Install npm dependencies
npm install

# Start the Angular dev server
npm start
```

The application opens at **`http://localhost:4200`**

### ✅ Step 4 — Verify

1. Open **`http://localhost:4200`** in your browser
2. The storefront loads with product cards (empty until data is seeded)
3. Navigate to **Settings** (`/admin/configuration`) to:
   - Verify / update database connection
   - Enable seed data generation
   - Toggle theme and language

---

## 🔌 API Reference

All endpoints return a unified envelope: `ApiResponse<T>`

```json
{
  "success": true,
  "data": { },
  "message": "Success",
  "errors": []
}
```

### 📦 Items Controller — `/api/items`

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| `GET` | `/api/items?page=1&size=10&search=` | 📄 Paginated list with multi-field search |
| `GET` | `/api/items/{id}` | 🔍 Get single item by GUID |
| `GET` | `/api/items/check-code?code=X&excludeId=` | ✅ Async code uniqueness validator |
| `POST` | `/api/items` | ➕ Create new item |
| `PUT` | `/api/items/{id}` | ✏️ Update item |
| `DELETE` | `/api/items/{id}` | 🗑️ Soft delete (sets `IsDeleted = true`) |
| `POST` | `/api/items/{id}/image` | 🖼️ Upload image (multipart, JPG/PNG, 5 MB max) |
| `GET` | `/api/items/image/{filename}` | 📸 Retrieve product image by filename |
| `GET` | `/api/items/bulk-upload/template` | 📥 Download Excel (.xlsx) bulk upload template |
| `POST` | `/api/items/bulk-upload` | 📤 Bulk create items from Excel file |

### ⚙️ Configuration Controller — `/api/configuration`

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| `GET` | `/api/configuration` | 🔧 Get current config (password masked) |
| `PUT` | `/api/configuration` | 💾 Update DB connection & seed settings |
| `POST` | `/api/configuration/test-connection` | 🔌 Test database connectivity |

---

## 🗄️ Database Schema

### 📋 Items Table

| Column | Type | Constraints | Description |
|:-------|:-----|:------------|:------------|
| `Id` | `UNIQUEIDENTIFIER` | PK, `NEWSEQUENTIALID()` | Auto-generated sequential GUID |
| `ItemCode` | `NVARCHAR(50)` | Required, Unique Index | Human-readable product code |
| `NameEN` | `NVARCHAR(200)` | Required | English product name |
| `NameAR` | `NVARCHAR(200)` | Required | Arabic product name |
| `Category` | `NVARCHAR(100)` | Optional | Product category |
| `Price` | `DECIMAL(18,2)` | Required, ≥ 0 | Base price in SAR |
| `VatPercentage` | `DECIMAL(5,2)` | Required, 0 or 15 | Saudi VAT rate |
| `NetTotal` | `DECIMAL(18,2)` | **Computed (persisted)** | `Price + (Price × VatPercentage / 100)` |
| `ImagePath` | `NVARCHAR(500)` | Nullable | Relative path to uploaded image |
| `CreatedAt` | `DATETIME2` | Default `GETUTCDATE()` | Record creation timestamp |
| `UpdatedAt` | `DATETIME2` | Nullable | Last modification timestamp |
| `IsDeleted` | `BIT` | Default `false` | Soft delete flag (global query filter) |

### ⚙️ AppConfigurations Table

| Column | Type | Default | Description |
|:-------|:-----|:--------|:------------|
| `Id` | `INT` | PK (always `1`) | Singleton configuration row |
| `ServerName` | `NVARCHAR(200)` | `.` | SQL Server instance |
| `DatabaseName` | `NVARCHAR(200)` | `OrderManagementDB` | Target database name |
| `DbUsername` | `NVARCHAR(100)` | `sa` | SQL authentication username |
| `DbPassword` | `NVARCHAR(200)` | — | SQL authentication password |
| `SeedDataEnabled` | `BIT` | `false` | Enable auto-seed on next startup |
| `SeedDataCount` | `INT` | `100` | Target number of seed items |
| `SeedDataCategory` | `NVARCHAR(MAX)` | `All` | Category filter for seeding |
| `UpdatedAt` | `DATETIME2` | Nullable | Last configuration change |

---

## 🌐 Internationalization (i18n)

The application ships with **complete** Arabic and English translations:

| File | Language | Direction |
|:-----|:---------|:----------|
| `assets/i18n/en.json` | 🇬🇧 English | LTR |
| `assets/i18n/ar.json` | 🇸🇦 Arabic | RTL |

### 🔄 How It Works

1. **Translation Loader** — `@ngx-translate/http-loader` fetches JSON files from `/assets/i18n/`
2. **Language Persistence** — Selected language saved in `localStorage` (key: `om_lang`)
3. **RTL Switching** — `document.documentElement.dir` and `document.documentElement.lang` update instantly
4. **Font Switching** — Arabic uses **Cairo** font family; English uses **Inter**
5. **Toggle Location** — Language can be switched from the **Settings** page (`/admin/configuration`)

### 🗂️ Translation Key Namespaces

```
APP_TITLE · NAV · THEME · LANG · STORE · ITEMS · FORM
CART · MODAL · CONFIG · ERRORS · BULK_UPLOAD · CONFIRM · CURRENCY
```

---

## 🎨 Theming System

Built on **Angular Material 3** with custom SCSS design tokens:

### 🎯 Color Palette

| Token | Light Mode | Dark Mode |
|:------|:-----------|:----------|
| `--color-primary` | `#7c3aed` (Violet) | `#7c3aed` |
| `--color-accent` | `#06b6d4` (Cyan) | `#06b6d4` |
| `--color-bg` | `#ffffff` | `#0f172a` |
| `--color-surface` | `#f9fafb` | `#1e293b` |
| `--color-text-main` | `#111827` | `#f1f5f9` |
| `--color-border` | `#e5e7eb` | `#334155` |
| `--color-success` | `#10b981` | `#10b981` |
| `--color-danger` | `#ef4444` | `#ef4444` |

### 🔄 How It Works

1. `ThemeService` manages an `isDark` signal
2. Toggles `.dark-theme` CSS class on `document.body`
3. Preference persisted in `localStorage` (key: `om_theme`)
4. Toggle available in **Settings** page → **Appearance** section

---

## 🧩 Frontend Architecture

### 🗺️ Route Map

| Route | Component | Description |
|:------|:----------|:------------|
| `/` | `ProductGridComponent` | 🏠 Public storefront — browse & add to cart |
| `/admin` | `ItemListComponent` | 📊 Admin item management with pagination |
| `/admin/configuration` | `ConfigPanelComponent` | ⚙️ Database, seeding, theme & language settings |
| `/cart` | `CartPageComponent` | 🛒 Shopping cart with VAT calculations |
| `**` | Redirect → `/` | Wildcard fallback |

> All routes are **lazy-loaded** using dynamic `import()` for optimal bundle splitting.

### 🧱 Core Services

| Service | Responsibility |
|:--------|:--------------|
| `ItemService` | HTTP client for all `/api/items` endpoints |
| `CartService` | Signal-based reactive cart state (items, subtotal, VAT, grand total) |
| `ConfigService` | Loads app config on startup via `APP_INITIALIZER`; exposes config signal |
| `ThemeService` | Dark/light mode toggle with `localStorage` persistence |

### 🛡️ Error Handling

- **Backend:** `GlobalExceptionMiddleware` catches unhandled exceptions → returns `ApiResponse<T>` with HTTP 500
- **Frontend:** `errorInterceptor` catches all HTTP errors → displays Material Snackbar with contextual message

---

## 🖨️ Invoice Printing

The cart page includes a **Print Invoice (A4)** button that:

- Triggers `window.print()` with print-optimized CSS
- Renders a clean **Tax Invoice** layout with:
  - Invoice number and date header
  - Tax ID field
  - Navy-styled product table
  - Subtotal, VAT amount, and grand total summary
- **RTL Support:** Arabic invoices mirror the entire layout automatically
- Hidden screen-only elements (nav, buttons) during print via `@media print`

---

## 📦 Bulk Upload

### 📝 Workflow

1. **Download Template** — Click "Download Template" to get a pre-formatted `.xlsx` file
2. **Fill Data** — Populate rows with: `ItemCode`, `NameEN`, `NameAR`, `Category`, `Price`, `VatPercentage`
3. **Upload** — Select the completed file (max 5 MB, `.xlsx` only)
4. **Validation** — Backend validates **all rows atomically** (all-or-nothing)
5. **Results** — Success count displayed; any row-level errors shown in detail

> The Excel template is generated server-side using **ClosedXML** with headers, data validation rules, and a sample row.

---

## 🌱 Data Seeding

The backend includes a built-in **SeedDataGenerator** with **90+ product templates** across **12 Saudi-market categories**:

| Category | Examples |
|:---------|:---------|
| ☕ Coffee & Beverages | Arabic Coffee, Saudi Chai |
| 🌴 Dates & Sweets | Ajwa Dates, Baklava |
| 🕌 Oud & Perfumes | Arabian Oud, Bukhoor |
| 💻 Electronics | Smart Watches, Tablets |
| 👔 Fashion | Thobes, Abayas |
| 🛒 Groceries & Food | Rice, Saffron |
| 🏠 Home & Living | Majlis Cushions, Lanterns |
| 💊 Health & Personal Care | Miswak, Argan Oil |
| 🚗 Automotive | Car Accessories |
| 🧸 Toys & Kids | Educational Toys |
| ⚽ Sports & Outdoors | Camping Gear |
| 📎 Stationery & Office | Calligraphy Sets |

### 🔧 How to Seed

1. Navigate to **Settings** → (`/admin/configuration`)
2. Under **Data Seeding Settings**:
   - Toggle **Enable Seed Data** → On
   - Set **Seed Count** (1–1000)
   - Optionally filter by **Category**
3. Click **Save**
4. **Restart the backend** — seeding runs during startup if enabled
5. Seeding auto-disables after completion (one-shot)

> Each seeded item includes an Unsplash product image URL, realistic pricing in SAR, bilingual names, and appropriate VAT classification.

---

<div align="center">

**Built with** 💜 **using Angular 18 · .NET 9 · Material Design 3**

</div>
