<div align="center">

# 🏪 OrderHub — Order Management System

**Phase 1 · Inventory & POS — Serverless Edition**

[![Angular 18](https://img.shields.io/badge/Angular-18.2-DD0031?logo=angular&logoColor=white)](#-frontend-stack)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](#-backend--database)
[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222?logo=github&logoColor=white)](#-live-demo)
[![Angular Material](https://img.shields.io/badge/Material-18.2.14-757575?logo=material-design&logoColor=white)](#-frontend-stack)
[![License](https://img.shields.io/badge/License-Private-gray)](#)

A premium, serverless inventory management and point-of-sale system featuring a fully bilingual interface (Arabic & English), dynamic dark/light theming, real-time VAT calculations, print-ready invoices, and a powerful admin dashboard — all purpose-built for the **Saudi market**.

Powered by **Supabase** (PostgreSQL + Storage + REST API) and hosted on **GitHub Pages** — zero backend servers to maintain.

</div>

---

## 🌐 Live Demo

**🔗 [https://hossam1104.github.io/order_manegment/](https://hossam1104.github.io/order_manegment/)**

> The application is fully functional — browse items, add to cart, switch languages, toggle themes, and manage inventory from the admin panel.

---

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
- [🏗️ Architecture Overview](#️-architecture-overview)
- [🛠 Technology Stack](#-technology-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Setup & Installation](#️-setup--installation)
- [🗄️ Database Schema](#️-database-schema)
- [🔌 Supabase API Layer](#-supabase-api-layer)
- [🌐 Internationalization (i18n)](#-internationalization-i18n)
- [🎨 Theming System](#-theming-system)
- [🧩 Frontend Architecture](#-frontend-architecture)
- [💾 Client-Side Persistence](#-client-side-persistence)
- [🖨️ Invoice Printing](#️-invoice-printing)
- [📦 Bulk Upload (CSV)](#-bulk-upload-csv)
- [🚀 Deployment](#-deployment)

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🌍 **Bilingual UI (AR / EN)** | Full Arabic & English support with seamless RTL ↔ LTR switching via `@ngx-translate` |
| 🌗 **Dark & Light Themes** | Elegant Material 3 theming powered by CSS custom properties, persisted via `localStorage` |
| 🛒 **POS Shopping Cart** | Real-time line totals, 15 % VAT computation, quantity controls, sticky order summary sidebar, persisted in `localStorage` |
| 🧾 **A4 Invoice Printing** | Print-optimized tax invoices with custom headers, navy-styled tables, and RTL-mirrored Arabic layout |
| 📊 **Admin Dashboard** | Paginated item grid with multi-field search, inline actions (edit, delete, add to cart) |
| 📤 **Bulk CSV Upload** | Download `.csv` template → fill → upload → client-side parsing with row-level validation |
| 🖼️ **Image Management** | Drag-and-drop image upload (JPG/PNG, max 5 MB) stored in Supabase Storage with public URLs |
| ⚙️ **Settings Panel** | Toggle dark/light theme and Arabic/English language from the in-app Settings page |
| 🔐 **Soft Deletes** | Items are never physically removed; a `is_deleted` flag hides them from all queries |
| ✅ **Async Validation** | Real-time item code uniqueness check with 400 ms debounce against Supabase |
| 🧮 **Computed Pricing** | `net_total` is a PostgreSQL `GENERATED ALWAYS AS` stored column: `price + (price × vat_percentage / 100)` |
| 💰 **SAR Currency** | Custom Saudi Riyal SVG icon rendered natively alongside all monetary values |
| ☁️ **Serverless Backend** | No servers to manage — Supabase handles database, storage, and REST API |
| 🚀 **GitHub Pages Hosting** | Static SPA deployed to GitHub Pages with SPA routing support (404.html fallback) |
| 💾 **Offline-Ready State** | Cart, theme, and language preferences survive page refreshes via `localStorage` |

---

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                      GitHub Pages (CDN)                          │
│                 Static Angular 18 SPA Bundle                     │
│         https://hossam1104.github.io/order_manegment/            │
└────────────────────────────┬─────────────────────────────────────┘
                             │  HTTPS
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Supabase Cloud Platform                        │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   PostgreSQL DB  │  │  REST API (Auto)│  │  Object Storage │  │
│  │  ─────────────── │  │  ─────────────  │  │  ─────────────  │  │
│  │  • items         │  │  • PostgREST    │  │  product-images │  │
│  │  • app_configs   │  │  • RPC functions│  │  (public bucket)│  │
│  │  • RLS policies  │  │  • Row-level    │  │  5 MB max/file  │  │
│  │  • triggers      │  │    security     │  │  JPG / PNG      │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### Before vs After Migration

| Aspect | Before (Local Stack) | After (Serverless) |
|:-------|:---------------------|:-------------------|
| **Frontend Hosting** | `localhost:4200` (dev server) | GitHub Pages (CDN, global) |
| **API Server** | ASP.NET Core 9 on `localhost:5050` | Supabase auto-generated REST API |
| **Database** | SQL Server 2022 (LocalDB) | Supabase PostgreSQL (cloud) |
| **Image Storage** | Local filesystem (`D:\...`) | Supabase Storage (public bucket) |
| **ORM** | Entity Framework Core 9 | `@supabase/supabase-js` client SDK |
| **Excel Templates** | ClosedXML server-side `.xlsx` | Client-side CSV generation |
| **Server Cost** | Requires Windows + .NET + SQL Server | **Free tier** — zero infrastructure |

---

## 🛠 Technology Stack

### ☁️ Backend & Database

| Technology | Purpose |
|:-----------|:--------|
| **Supabase** (PostgreSQL 15) | Managed relational database with auto-generated REST API |
| **PostgREST** | Auto-exposes tables as RESTful endpoints (built into Supabase) |
| **Supabase Storage** | Object storage for product images (public `product-images` bucket, 5 MB limit) |
| **Row-Level Security (RLS)** | PostgreSQL policies controlling read/write access at the row level |
| **PL/pgSQL Functions** | Custom `get_items_paged()` RPC for server-side pagination and search |
| **Database Triggers** | Auto-update `updated_at` timestamp on every row modification |
| `@supabase/supabase-js` | **v2.98.0** — TypeScript SDK for querying, inserting, uploading from the Angular app |

### 🔶 Frontend Stack

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| Angular | **18.2** | SPA framework (Standalone Components + Signals) |
| Angular Material | **18.2.14** | Material Design 3 component library |
| Angular CDK | **18.2.14** | Overlays, dialogs, directionality, accessibility |
| @ngx-translate | **15.0.0** | Runtime i18n (JSON-based translations) |
| @supabase/supabase-js | **2.98.0** | Supabase client SDK for DB queries, storage, and RPC calls |
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

### 🚀 Hosting & CI/CD

| Service | Purpose |
|:--------|:--------|
| **GitHub Pages** | Static SPA hosting (free, CDN-backed) |
| **gh-pages branch** | Orphan branch containing only the production build output |
| `.nojekyll` | Disables Jekyll processing to serve Angular assets correctly |
| `404.html` | Copy of `index.html` — enables SPA client-side routing on GitHub Pages |

---

## 📁 Project Structure

```text
order_management/
│
├── 📄 order_management.sln          # Legacy .NET solution file (kept for reference)
├── 📄 project_plan.md               # Phase 1 technical specification
├── 📄 prompt.md                     # AI prompt & architecture rules
├── 📄 README.md                     # ← You are here
│
├── 🗄️ supabase/                      # Database migration scripts
│   ├── 001_schema.sql                # Tables, indexes, triggers, RPC functions
│   ├── 002_seed_data.sql             # Optional seed data (90+ Saudi-market products)
│   └── 003_rls_storage.sql           # Row-Level Security policies + Storage bucket setup
│
├── 🔷 backend/                       # Legacy ASP.NET Core 9 API (no longer deployed)
│   └── ...                           # Kept for reference; all logic migrated to Supabase
│
├── 🔶 frontend/                      # Angular 18 SPA (production app)
│   ├── angular.json                  # Build config, SCSS, assets, budgets
│   ├── package.json                  # Dependencies & scripts
│   ├── tsconfig.json                 # TypeScript strict configuration
│   │
│   └── src/
│       ├── index.html                # Root HTML (Material Icons inline, Google Fonts)
│       ├── main.ts                   # Bootstrap → AppComponent
│       ├── styles.scss               # Global theme: Material 3 palettes, CSS variables, RTL
│       │
│       ├── environments/
│       │   ├── environment.ts        # Dev config (Supabase URL, anon key, bucket name)
│       │   └── environment.prod.ts   # Prod config (same Supabase project)
│       │
│       ├── app/
│       │   ├── app.component.ts      # Root → delegates to AppShellComponent
│       │   ├── app.config.ts         # Providers: Router, HTTP, i18n, APP_INITIALIZER
│       │   ├── app.routes.ts         # Lazy-loaded routes (4 pages + wildcard)
│       │   │
│       │   ├── core/
│       │   │   ├── services/
│       │   │   │   ├── supabase.service.ts  # Supabase client singleton (createClient wrapper)
│       │   │   │   ├── item.service.ts      # Items CRUD via Supabase SDK (queries, RPC, storage)
│       │   │   │   ├── cart.service.ts       # Signal-based cart state with localStorage persistence
│       │   │   │   ├── config.service.ts     # App initializer (lightweight, no remote config needed)
│       │   │   │   └── theme.service.ts      # Dark/light toggle with localStorage persistence
│       │   │   ├── models/
│       │   │   │   ├── item.model.ts         # ItemDto, CreateItemRequest, UpdateItemRequest
│       │   │   │   ├── config.model.ts       # AppConfig type definitions
│       │   │   │   └── api-response.model.ts # ApiResponse<T>, PagedResult<T>
│       │   │   └── interceptors/
│       │   │       └── error.interceptor.ts  # Global HTTP error → Material Snackbar
│       │   │
│       │   ├── features/
│       │   │   ├── store/                 # 🏠 Public Storefront (route: /)
│       │   │   │   ├── product-grid/      #    → Browse all products in a responsive grid
│       │   │   │   ├── product-card/      #    → Product card with "Add to Cart" & quick view
│       │   │   │   └── product-detail-modal/  # → Full product detail in a dialog
│       │   │   │
│       │   │   ├── items/                 # 📊 Admin Dashboard (route: /admin)
│       │   │   │   ├── item-list/         #    → Paginated table with search & inline actions
│       │   │   │   ├── item-form/         #    → Create/Edit dialog (reactive form + image upload)
│       │   │   │   └── bulk-upload/       #    → CSV template download & bulk import dialog
│       │   │   │
│       │   │   ├── cart/                  # 🛒 Shopping Cart (route: /cart)
│       │   │   │   ├── cart-page/         #    → Cart line items with quantity controls
│       │   │   │   └── cart-sidebar/      #    → Sticky order summary (subtotal, VAT, total)
│       │   │   │
│       │   │   └── configuration/         # ⚙️ Settings Panel (route: /settings)
│       │   │       └── config-panel/      #    → Theme toggle & language toggle
│       │   │
│       │   ├── layout/
│       │   │   ├── app-shell/             # Sidenav container, sidebar nav, RTL support
│       │   │   └── top-navbar/            # Top toolbar with hamburger menu & brand
│       │   │
│       │   └── shared/
│       │       ├── components/
│       │       │   └── confirm-dialog/    # Reusable Material confirmation dialog
│       │       └── animations/
│       │           └── ui.animations.ts   # Shared Angular animation triggers
│       │
│       └── assets/
│           ├── i18n/
│           │   ├── en.json               # English translations (full coverage)
│           │   └── ar.json               # Arabic translations (full coverage)
│           ├── icons/                    # Custom SVG icons
│           └── Saudi_Riyal_Symbol.svg    # 🇸🇦 Official SAR currency symbol
│
└── 📦 _deploy/                        # GitHub Pages deployment directory
    ├── .git/                          # Orphan gh-pages branch (push target)
    ├── .nojekyll                      # Disables Jekyll processing
    ├── 404.html                       # SPA fallback (copy of index.html)
    └── ...                            # Production build output files
```

---

## ⚙️ Setup & Installation

### 📋 Prerequisites

| Requirement | Minimum Version | Download |
|:------------|:---------------|:---------|
| **Node.js** | 18.x+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.x+ | Bundled with Node.js |
| **Angular CLI** | 18.x | `npm install -g @angular/cli` |
| **Supabase Account** | Free tier | [supabase.com](https://supabase.com/) |

> **Note:** No .NET SDK or SQL Server required — the backend is entirely managed by Supabase.

### 🗄️ Step 1 — Supabase Project Setup

1. Create a new project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Open the **SQL Editor** in your Supabase dashboard
3. Run the migration scripts **in order**:

```
supabase/001_schema.sql     → Tables, indexes, triggers, RPC function
supabase/002_seed_data.sql  → (Optional) 90+ Saudi-market product seed data
supabase/003_rls_storage.sql → Row-Level Security policies + Storage bucket
```

4. Copy your **Project URL** and **anon (public) key** from **Settings → API**

### 🔧 Step 2 — Configure Environment

Update the Supabase credentials in the environment files:

```typescript
// frontend/src/environments/environment.ts
export const environment = {
    production: false,
    supabaseUrl: 'https://YOUR_PROJECT.supabase.co',
    supabaseKey: 'YOUR_ANON_KEY',
    storageBucket: 'product-images'
};
```

Do the same for `environment.prod.ts`.

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
2. The storefront loads with product cards (or empty if you skipped the seed data)
3. Navigate to **Settings** (`/admin/configuration`) to:
   - Toggle dark/light theme
   - Switch between Arabic and English
4. Try adding items to the cart — they persist across page refreshes

---

## 🗄️ Database Schema

All tables live in the Supabase-managed **PostgreSQL 15** instance.

### 📋 `items` Table

| Column | Type | Constraints | Description |
|:-------|:-----|:------------|:------------|
| `id` | `UUID` | PK, `uuid_generate_v4()` | Auto-generated UUID v4 |
| `item_code` | `VARCHAR(50)` | Required, Unique (partial index, non-deleted) | Human-readable product code |
| `name_en` | `VARCHAR(200)` | Required | English product name |
| `name_ar` | `VARCHAR(200)` | Required | Arabic product name |
| `category` | `VARCHAR(100)` | Default `''` | Product category |
| `price` | `DECIMAL(18,2)` | Required, ≥ 0 | Base price in SAR |
| `vat_percentage` | `DECIMAL(5,2)` | Required, `CHECK (IN (0, 15))` | Saudi VAT rate |
| `net_total` | `DECIMAL(18,2)` | **`GENERATED ALWAYS AS` (stored)** | `price + (price × vat_percentage / 100)` |
| `image_path` | `VARCHAR(500)` | Nullable | Supabase Storage public URL or external URL |
| `created_at` | `TIMESTAMPTZ` | Default `NOW()` | Record creation timestamp |
| `updated_at` | `TIMESTAMPTZ` | Nullable, auto-set by trigger | Last modification timestamp |
| `is_deleted` | `BOOLEAN` | Default `FALSE` | Soft delete flag |

**Indexes:**
- `idx_items_item_code` — Unique partial index on `item_code WHERE is_deleted = FALSE`
- `idx_items_created_at` — Descending on `created_at WHERE is_deleted = FALSE`
- `idx_items_category` — On `category WHERE is_deleted = FALSE`

### ⚙️ `app_configurations` Table

| Column | Type | Default | Description |
|:-------|:-----|:--------|:------------|
| `id` | `INT` | PK, `CHECK (id = 1)` | Singleton configuration row |
| `seed_data_enabled` | `BOOLEAN` | `FALSE` | Enable seed data flag |
| `seed_data_count` | `INT` | `100` | Target number of seed items |
| `seed_data_category` | `TEXT` | `'All'` | Category filter for seeding |
| `updated_at` | `TIMESTAMPTZ` | Nullable, auto-set by trigger | Last configuration change |

### 🔄 Database Triggers

| Trigger | Table | Event | Action |
|:--------|:------|:------|:-------|
| `items_updated_at` | `items` | `BEFORE UPDATE` | Sets `updated_at = NOW()` |
| `app_configurations_updated_at` | `app_configurations` | `BEFORE UPDATE` | Sets `updated_at = NOW()` |

### 🔒 Row-Level Security (RLS)

All tables have RLS **enabled**. Current policies allow public (anon) access for this Phase 1 deployment:

| Table | Policy | Operation | Rule |
|:------|:-------|:----------|:-----|
| `items` | `items_select_all` | SELECT | `USING (true)` |
| `items` | `items_insert_anon` | INSERT | `WITH CHECK (true)` |
| `items` | `items_update_anon` | UPDATE | `USING (true)` |
| `items` | `items_delete_anon` | DELETE | `USING (true)` |
| `app_configurations` | `config_select_all` | SELECT | `USING (true)` |
| `app_configurations` | `config_update_anon` | UPDATE | `USING (true)` |
| `storage.objects` | `product_images_*` | ALL | `bucket_id = 'product-images'` |

> **Phase 2 roadmap:** Swap these open policies for authenticated-only rules once Supabase Auth is integrated.

---

## 🔌 Supabase API Layer

The Angular app communicates with Supabase **directly** using `@supabase/supabase-js` — no custom API server needed.

### 🧱 `SupabaseService` (Singleton)

```typescript
// Wraps createClient() with project URL + anon key
// Exposes: client (SupabaseClient), getStorageUrl(path)
```

### 📦 `ItemService` — Data Operations

| Operation | Supabase Method | Description |
|:----------|:----------------|:------------|
| **List (paginated + search)** | `client.rpc('get_items_paged', { p_page, p_size, p_search })` | Calls custom PL/pgSQL function for server-side pagination |
| **Get single item** | `client.from('items').select('*').eq('id', id).single()` | Direct table query |
| **Check code uniqueness** | `client.from('items').select('id', { count, head }).eq('item_code', code)` | Count query with optional `excludeId` |
| **Create item** | `client.from('items').insert({...}).select().single()` | Insert + return created row |
| **Update item** | `client.from('items').update({...}).eq('id', id).select().single()` | Update + return updated row |
| **Soft delete** | `client.from('items').update({ is_deleted: true }).eq('id', id)` | Sets `is_deleted` flag |
| **Upload image** | `client.storage.from('product-images').upload(path, file, { upsert })` | Stores in bucket, returns public URL |
| **Bulk import** | Client-side CSV parse → `client.from('items').insert(rows)` | Parses CSV, inserts all rows |

### 🧮 `get_items_paged()` — Custom RPC Function

A PL/pgSQL function that handles:
- Server-side multi-field search (`item_code`, `name_en`, `name_ar` — case-insensitive)
- Pagination with `LIMIT` / `OFFSET`
- Returns JSON: `{ items: [...], totalcount, page, size }`
- Filters out soft-deleted items

---

## 🌐 Internationalization (i18n)

The application ships with **complete** Arabic and English translations:

| File | Language | Direction |
|:-----|:---------|:----------|
| `assets/i18n/en.json` | 🇬🇧 English | LTR |
| `assets/i18n/ar.json` | 🇸🇦 Arabic | RTL |

### 🔄 How It Works

1. **Translation Loader** — `@ngx-translate/http-loader` fetches JSON files from `./assets/i18n/`
2. **Language Persistence** — Selected language saved in `localStorage` (key: `om_lang`) and restored on startup
3. **RTL Switching** — `document.documentElement.dir` and `document.documentElement.lang` update instantly
4. **Font Switching** — Arabic uses **Cairo** font family; English uses **Inter**
5. **Startup Restoration** — `AppShellComponent` constructor reads `om_lang` from `localStorage` and calls `translate.use()` + sets `dir`/`lang` attributes
6. **Toggle Location** — Language can be switched from the **Settings** page (`/admin/configuration`)

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

1. `ThemeService` manages an `isDark` signal — instantiated at app startup via `AppShellComponent`
2. Toggles `.dark-theme` CSS class on `document.body`
3. Preference persisted in `localStorage` (key: `om_theme`) and restored automatically on page load
4. Toggle available in **Settings** page → **Appearance** section

---

## 🧩 Frontend Architecture

### 🗺️ Route Map

| Route | Component | Description |
|:------|:----------|:------------|
| `/` | `ProductGridComponent` | 🏠 Public storefront — browse & add to cart |
| `/admin` | `ItemListComponent` | 📊 Admin item management with pagination |
| `/admin/configuration` | `ConfigPanelComponent` | ⚙️ Theme & language settings |
| `/cart` | `CartPageComponent` | 🛒 Shopping cart with VAT calculations |
| `**` | Redirect → `/` | Wildcard fallback |

> All routes are **lazy-loaded** using dynamic `import()` for optimal bundle splitting.

### 🧱 Core Services

| Service | Responsibility |
|:--------|:--------------|
| `SupabaseService` | Singleton Supabase client — wraps `createClient()` with project URL and anon key |
| `ItemService` | All items CRUD via Supabase SDK: table queries, RPC calls, storage uploads, CSV bulk import |
| `CartService` | Signal-based reactive cart state (items, subtotal, VAT, grand total) with `localStorage` persistence |
| `ConfigService` | Lightweight `APP_INITIALIZER` — no remote config needed in serverless mode |
| `ThemeService` | Dark/light mode toggle with `localStorage` persistence (key: `om_theme`) |

### 🛡️ Error Handling

- **Frontend:** `errorInterceptor` catches all HTTP errors → displays Material Snackbar with contextual message
- **Supabase errors:** Caught in each service method's `.pipe(map(...))` and surfaced as `ApiResponse<T>` error envelopes

---

## 💾 Client-Side Persistence

All user preferences and session state are stored in the browser's `localStorage` for a seamless experience across page refreshes:

| Key | Service | Data | Format |
|:----|:--------|:-----|:-------|
| `om_cart` | `CartService` | Shopping cart items and quantities | JSON array of `{ item: ItemDto, quantity: number }` |
| `om_theme` | `ThemeService` | Selected theme preference | `'dark'` or `'light'` |
| `om_lang` | `AppShellComponent` / `ConfigPanelComponent` | Selected language | `'en'` or `'ar'` |

### 🔄 Persistence Flow

- **Cart:** Loaded from `localStorage` on service construction → written back via Angular `effect()` on every signal change
- **Theme:** Read on `ThemeService` construction → `.dark-theme` class applied to `document.body` → written on toggle
- **Language:** Read in `AppShellComponent` constructor → `translate.use()` called + `dir`/`lang` attributes set → written on toggle

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

## 📦 Bulk Upload (CSV)

### 📝 Workflow

1. **Download Template** — Click "Download Template" to get a pre-formatted `.csv` file (generated client-side with BOM for Excel compatibility)
2. **Fill Data** — Populate rows with: `ItemCode`, `NameEN`, `NameAR`, `Category`, `Price`, `VatPercentage`
3. **Upload** — Select the completed `.csv` file
4. **Parse & Insert** — Client-side CSV parsing → rows inserted via `supabase.from('items').insert(rows)`
5. **Results** — Success count displayed; any errors shown in the Material Snackbar

> No server-side processing needed — the Angular app parses CSV directly and inserts via the Supabase SDK.

---

## 🌱 Seed Data

The `supabase/002_seed_data.sql` script includes **90+ product templates** across **12 Saudi-market categories**:

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

1. Open **Supabase Dashboard → SQL Editor**
2. Paste and run `supabase/002_seed_data.sql`
3. Products appear instantly in the storefront

> Each seeded item includes an Unsplash product image URL, realistic pricing in SAR, bilingual names, and appropriate VAT classification (0 % or 15 %).

---

## 🚀 Deployment

### 📦 Build for Production

```bash
cd frontend
npx ng build --base-href /order_manegment/
```

Output: `frontend/dist/order-management-ui/browser/`

### 🌍 Deploy to GitHub Pages

```bash
# 1. Clean the deploy directory
cd _deploy
rm -rf *  # (keep .git/)

# 2. Copy build output
cp -r ../frontend/dist/order-management-ui/browser/* .

# 3. Add SPA routing support
touch .nojekyll
cp index.html 404.html

# 4. Push to gh-pages
git add -A
git commit -m "deploy: production build"
git push origin gh-pages --force
```

The site is live at **`https://hossam1104.github.io/order_manegment/`** within minutes.

### 📋 Deployment Checklist

- [ ] Supabase SQL migrations executed (`001`, `002`, `003`)
- [ ] Environment files configured with Supabase URL + anon key
- [ ] `ng build --base-href /order_manegment/` succeeds
- [ ] `.nojekyll` file present in deploy root
- [ ] `404.html` is a copy of `index.html` (SPA routing)
- [ ] `gh-pages` branch pushed to GitHub

---

<div align="center">

**Built with** 💜 **using Angular 18 · Supabase · PostgreSQL · Material Design 3**

**Hosted on** GitHub Pages — **Zero servers, zero cost**

</div>
