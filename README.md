<p align="center">
  <img src="https://img.shields.io/badge/Angular-18-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/.NET-9.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" />
  <img src="https://img.shields.io/badge/Material%20Design-3-757575?style=for-the-badge&logo=materialdesign&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/SQL%20Server-2019+-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-Ready-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" />
</p>

<h1 align="center">🛒 Order Management System</h1>

<p align="center">
  <strong>A premium full-stack B2B order & inventory management platform built for the Saudi Arabian market</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/Phase-1%20Complete-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" />
  <img src="https://img.shields.io/badge/i18n-EN%20%7C%20AR-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/RTL-Supported-purple?style=flat-square" />
</p>

<p align="center">
  <a href="https://hossam1104.github.io/order_manegment/">🌐 Live Demo</a> &nbsp;•&nbsp;
  <a href="#-features">✨ Features</a> &nbsp;•&nbsp;
  <a href="#-tech-stack">🧰 Tech Stack</a> &nbsp;•&nbsp;
  <a href="#-getting-started">🚀 Getting Started</a> &nbsp;•&nbsp;
  <a href="#-api-reference">📡 API Reference</a>
</p>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🧰 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔐 Authentication](#-authentication)
- [🛣️ Routing & Navigation](#️-routing--navigation)
- [📡 API Reference](#-api-reference)
- [🗄️ Database Schema](#️-database-schema)
- [🌍 Internationalization](#-internationalization)
- [🎨 Theming System](#-theming-system)
- [📦 Seed Data](#-seed-data)
- [🖼️ Screenshots](#️-screenshots)

---

## 🌟 Overview

**Order Management** is a modern, full-featured B2B order and inventory management platform with a **dual-interface architecture** — providing separate experiences for **Admin** and **Customer** users within a single application.

Designed specifically for the **Saudi Arabian market**, it supports bilingual content (English/Arabic), RTL layouts, VAT-compliant pricing (0% & 15%), and culturally relevant product categories.

| 🏪 Customer Storefront | 🔧 Admin Dashboard |
|:-----------------------:|:------------------:|
| Browse products | Manage inventory |
| Add to cart | Add / Edit / Delete items |
| View cart & totals | Bulk upload via Excel |
| No login required | Protected by authentication |

---

## ✨ Features

### 🛍️ Customer Storefront
| Feature | Description |
|:--------|:------------|
| 🏠 **Product Grid** | Responsive card layout (1-4 columns) with hero section |
| 🔍 **Quick View** | Modal product detail with large image preview |
| 🛒 **Shopping Cart** | Persistent cart with quantity controls & live totals |
| 💰 **VAT Calculation** | Automatic subtotal, VAT amount, and grand total |
| 📱 **Responsive** | Mobile-first design with collapsible sidebar |
| 🆓 **Open Access** | No login required for browsing and shopping |

### 🔧 Admin Dashboard
| Feature | Description |
|:--------|:------------|
| 📊 **Item Management** | Full data table with sort, search, pagination |
| ➕ **Add/Edit Items** | Dialog form with image upload & live preview |
| 🗑️ **Soft Delete** | Safe deletion with confirmation dialog |
| 📤 **Bulk Upload** | Import items via Excel (.xlsx) template |
| 📥 **Template Download** | Pre-formatted Excel template generation |
| ⚙️ **Configuration** | Database, theme, and language settings |
| 🔒 **Protected Routes** | Admin guard with session-based auth |

### 🌐 Platform Features
| Feature | Description |
|:--------|:------------|
| 🌍 **Bilingual (EN/AR)** | Full translation with 100+ string keys |
| ↔️ **RTL Support** | Automatic layout flipping for Arabic |
| 🌙 **Dark / Light Mode** | Smooth theme switching with persistence |
| 🎨 **Material Design 3** | Premium glassmorphism & gradient effects |
| ⚡ **Lazy Loading** | All feature components loaded on demand |
| 📶 **Signals** | Reactive state management (Angular Signals) |
| 🔔 **Error Handling** | Centralized HTTP error interceptor + snackbar |
| ⬆️ **Scroll to Top** | Floating button appears on scroll > 300px |
| 🖨️ **Invoice Preview** | Print-ready cart summary |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     🖥️  FRONTEND (Angular 18)                │
│                                                             │
│  ┌──────────────────┐       ┌───────────────────────┐       │
│  │  🔧 Admin Shell   │       │  🛍️ Customer Shell     │       │
│  │  ┌──────────────┐│       │  ┌─────────────────┐  │       │
│  │  │ 📊 Items     ││       │  │ 🏪 Product Grid │  │       │
│  │  │ ⚙️ Config    ││       │  │ 🛒 Cart Page    │  │       │
│  │  │ 🛒 Cart      ││       │  └─────────────────┘  │       │
│  │  │ 🏪 Store     ││       └───────────────────────┘       │
│  │  └──────────────┘│                                       │
│  └──────────────────┘       ┌───────────────────────┐       │
│         🔒 Admin Guard ◄────│  🔑 Login Page         │       │
│                             └───────────────────────┘       │
├─────────────────────────────────────────────────────────────┤
│                     📡 HTTP / REST API                       │
├─────────────────────────────────────────────────────────────┤
│                  ⚙️  BACKEND (.NET 9 Web API)                │
│                                                             │
│  ┌──────────────┐ ┌───────────────┐ ┌──────────────────┐   │
│  │ 📦 Items API  │ │ ⚙️ Config API  │ │ 🛡️ Middleware     │   │
│  │  Controller   │ │  Controller   │ │  Global Error    │   │
│  └──────┬───────┘ └───────┬───────┘ └──────────────────┘   │
│         │                 │                                  │
│  ┌──────┴─────────────────┴───────┐                         │
│  │        📋 Service Layer         │                         │
│  │  ItemService • FileStorage     │                         │
│  │  SeedDataGenerator             │                         │
│  └──────────────┬─────────────────┘                         │
│                 │                                            │
│  ┌──────────────┴─────────────────┐                         │
│  │    🗄️ Entity Framework Core 9   │                         │
│  │         AppDbContext            │                         │
│  └──────────────┬─────────────────┘                         │
├─────────────────┼───────────────────────────────────────────┤
│            🗄️ SQL Server / 🟢 Supabase (Phase 2)             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧰 Tech Stack

### 🖥️ Frontend

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| <img src="https://img.shields.io/badge/-Angular-DD0031?style=flat-square&logo=angular&logoColor=white" /> | 18.2 | Component framework (standalone) |
| <img src="https://img.shields.io/badge/-Material_UI-757575?style=flat-square&logo=materialdesign&logoColor=white" /> | 18.2 | UI component library (M3) |
| <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" /> | 5.5 | Type-safe JavaScript |
| <img src="https://img.shields.io/badge/-SCSS-CC6699?style=flat-square&logo=sass&logoColor=white" /> | — | Premium styling system |
| <img src="https://img.shields.io/badge/-RxJS-B7178C?style=flat-square&logo=reactivex&logoColor=white" /> | 7.8 | Reactive streams |
| <img src="https://img.shields.io/badge/-ngx--translate-orange?style=flat-square" /> | 15.0 | i18n (EN/AR) |
| <img src="https://img.shields.io/badge/-Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white" /> | 2.98 | Cloud DB client (Phase 2) |

### ⚙️ Backend

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| <img src="https://img.shields.io/badge/-.NET-512BD4?style=flat-square&logo=dotnet&logoColor=white" /> | 9.0 | Web API framework |
| <img src="https://img.shields.io/badge/-EF_Core-512BD4?style=flat-square&logo=dotnet&logoColor=white" /> | 9.0.3 | ORM / database layer |
| <img src="https://img.shields.io/badge/-SQL_Server-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white" /> | 2019+ | Relational database |
| <img src="https://img.shields.io/badge/-ClosedXML-217346?style=flat-square&logo=microsoftexcel&logoColor=white" /> | 0.104 | Excel generation & parsing |
| <img src="https://img.shields.io/badge/-Scalar-000000?style=flat-square" /> | 2.13 | API documentation UI |

---

## 📁 Project Structure

```
order_manegment/
│
├── 🔵 backend/                          # .NET 9 Web API
│   ├── 📂 Controllers/
│   │   ├── 📄 ItemsController.cs        # 9 REST endpoints for items
│   │   └── 📄 ConfigurationController.cs # 3 config endpoints
│   ├── 📂 Models/
│   │   ├── 📄 Item.cs                   # Item entity (GUID PK, soft delete)
│   │   └── 📄 AppConfiguration.cs       # Singleton config entity
│   ├── 📂 DTOs/
│   │   ├── 📄 ItemDto.cs                # Item response DTO
│   │   ├── 📄 CreateItemRequest.cs      # Create validation model
│   │   ├── 📄 UpdateItemRequest.cs      # Update validation model
│   │   ├── 📄 ConfigurationDto.cs       # Config response (masked password)
│   │   ├── 📄 ApiResponse.cs            # Unified response envelope
│   │   └── 📄 BulkUploadResult.cs       # Bulk import response
│   ├── 📂 Services/
│   │   ├── 📄 ItemService.cs            # Business logic (CRUD, search, bulk)
│   │   ├── 📄 FileStorageService.cs     # Image upload/validation (5MB, JPG/PNG)
│   │   └── 📄 SeedDataGenerator.cs      # 96 Saudi products seeder
│   ├── 📂 Data/
│   │   └── 📄 AppDbContext.cs            # EF Core 9 context
│   ├── 📂 Middleware/
│   │   └── 📄 GlobalExceptionMiddleware.cs # Centralized error handling
│   ├── 📂 Migrations/                   # EF Core migrations
│   └── 📄 Program.cs                    # DI, CORS, middleware pipeline
│
├── 🔴 frontend/                         # Angular 18 SPA
│   └── 📂 src/
│       ├── 📂 app/
│       │   ├── 📂 core/
│       │   │   ├── 📂 services/
│       │   │   │   ├── 📄 item.service.ts      # API communication
│       │   │   │   ├── 📄 cart.service.ts       # Signal-based cart state
│       │   │   │   ├── 📄 auth.service.ts       # Admin authentication
│       │   │   │   ├── 📄 theme.service.ts      # Dark/Light mode
│       │   │   │   ├── 📄 supabase.service.ts   # Supabase client
│       │   │   │   └── 📄 config.service.ts     # App configuration
│       │   │   ├── 📂 models/                   # TypeScript interfaces
│       │   │   ├── 📂 guards/
│       │   │   │   └── 📄 admin.guard.ts        # Route protection
│       │   │   └── 📂 interceptors/
│       │   │       └── 📄 error.interceptor.ts  # HTTP error handling
│       │   ├── 📂 layout/
│       │   │   ├── 📂 app-shell/                # 🔧 Admin shell + sidebar
│       │   │   ├── 📂 customer-shell/           # 🛍️ Customer shell + sidebar
│       │   │   └── 📂 top-navbar/               # 🔝 Shared top navigation
│       │   ├── 📂 features/
│       │   │   ├── 📂 admin-login/              # 🔑 Login page
│       │   │   ├── 📂 items/                    # 📊 Item management (CRUD)
│       │   │   │   ├── 📄 item-list.component   #    Data table + actions
│       │   │   │   ├── 📄 item-form.component   #    Add/Edit dialog
│       │   │   │   └── 📄 bulk-upload.component #    Excel import wizard
│       │   │   ├── 📂 store/                    # 🏪 Product storefront
│       │   │   │   ├── 📄 product-grid          #    Responsive card grid
│       │   │   │   ├── 📄 product-card          #    Individual card
│       │   │   │   └── 📄 product-detail-modal  #    Quick view modal
│       │   │   ├── 📂 cart/                     # 🛒 Shopping cart
│       │   │   │   ├── 📄 cart-page             #    Full checkout page
│       │   │   │   └── 📄 cart-sidebar          #    Slide-out cart drawer
│       │   │   └── 📂 configuration/            # ⚙️ Settings panel
│       │   ├── 📂 shared/
│       │   │   ├── 📂 components/               # Reusable dialogs
│       │   │   └── 📂 animations/               # Page & list animations
│       │   ├── 📄 app.routes.ts                 # Dual-URL routing config
│       │   ├── 📄 app.config.ts                 # Provider setup
│       │   └── 📄 app.component.ts              # Root component
│       ├── 📂 assets/
│       │   └── 📂 i18n/
│       │       ├── 📄 en.json                   # 🇬🇧 English (100+ keys)
│       │       └── 📄 ar.json                   # 🇸🇦 Arabic (100+ keys)
│       ├── 📂 environments/                     # Dev & Prod config
│       └── 📂 styles/
│           ├── 📄 _variables.scss               # 🎨 Design tokens
│           └── 📄 _mixins.scss                  # SCSS utilities
│
├── 🟢 supabase/                         # Cloud database (Phase 2)
│   ├── 📄 001_schema.sql                # PostgreSQL tables & functions
│   ├── 📄 002_seed_data.sql             # 96 product INSERT statements
│   └── 📄 003_rls_storage.sql           # Row-Level Security policies
│
├── 📄 order_management.sln              # .NET solution file
├── 📄 project_plan.md                   # Project requirements
└── 📄 README.md                         # 📖 You are here
```

---

## 🚀 Getting Started

### 📋 Prerequisites

| Requirement | Version | Download |
|:------------|:--------|:---------|
| 🟢 Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| 🔵 .NET SDK | 9.0 | [dotnet.microsoft.com](https://dotnet.microsoft.com/download/dotnet/9.0) |
| 🔴 SQL Server | 2019+ | [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) |
| 📦 Angular CLI | 18.x | `npm install -g @angular/cli@18` |

### ⚡ Quick Start

#### 1️⃣ Clone the repository
```bash
git clone https://github.com/Hossam1104/order_manegment.git
cd order_manegment
```

#### 2️⃣ Start the Backend
```bash
cd backend
dotnet restore
dotnet run --launch-profile http
```
> 🟢 Backend runs at `http://localhost:5050`
> 📚 API docs at `http://localhost:5050/swagger`

#### 3️⃣ Start the Frontend
```bash
cd frontend
npm install
ng serve
```
> 🔴 Frontend runs at `http://localhost:4200`

#### 4️⃣ Open in Browser
| URL | Interface |
|:----|:----------|
| `http://localhost:4200/shop` | 🛍️ Customer Storefront |
| `http://localhost:4200/login` | 🔑 Admin Login |
| `http://localhost:4200/` | 🔧 Admin Dashboard (after login) |

---

## 🔐 Authentication

The admin panel is protected by a **session-based authentication** system.

### 🔑 Default Credentials

| Field | Value |
|:------|:------|
| 👤 **Username** | `Admin` |
| 🔒 **Password** | `admin@123` |

### 🔄 Auth Flow

```
   ┌──────────┐      ┌──────────────┐      ┌─────────────┐
   │  User     │──►   │  /login      │──►   │  AuthService│
   │  visits / │      │  page shown  │      │  validates  │
   └──────────┘      └──────────────┘      └──────┬──────┘
                                                    │
                                         ┌──────────┴──────────┐
                                         │                     │
                                    ✅ Success            ❌ Failure
                                         │                     │
                                  ┌──────┴──────┐    ┌────────┴────────┐
                                  │ sessionStorage│    │ Error message   │
                                  │ om_admin_auth │    │ shown on form   │
                                  │ = "true"      │    └─────────────────┘
                                  └──────┬──────┘
                                         │
                                  ┌──────┴──────┐
                                  │ Redirect to │
                                  │ / (admin)   │
                                  └─────────────┘
```

### 🛡️ Route Guard

| Route Pattern | Guard | Access |
|:--------------|:------|:-------|
| `/login` | None | 🌐 Public |
| `/shop/**` | None | 🌐 Public |
| `/` (admin routes) | `adminGuard` | 🔒 Admin only |
| `/admin/**` | `adminGuard` | 🔒 Admin only |

---

## 🛣️ Routing & Navigation

### 🗺️ Route Map

```
🌐 Application Root
│
├── 🔑 /login                           → AdminLoginComponent
│
├── 🔧 / (Admin - Protected)            → AppShellComponent
│   ├── 🏪 / (default)                  → ProductGridComponent
│   ├── 📊 /admin                       → ItemListComponent
│   ├── ⚙️ /admin/configuration          → ConfigPanelComponent
│   └── 🛒 /cart                         → CartPageComponent
│
├── 🛍️ /shop (Customer - Public)         → CustomerShellComponent
│   ├── 🏪 / (default)                  → ProductGridComponent
│   └── 🛒 /cart                         → CartPageComponent
│
└── 🔄 /** (wildcard)                   → Redirect to /shop
```

### 🏛️ Dual Shell Architecture

| Shell | Purpose | Sidebar Links | Auth |
|:------|:--------|:--------------|:-----|
| 🔧 **AppShellComponent** | Admin dashboard | Store, Items, Config, Cart, Logout | ✅ Required |
| 🛍️ **CustomerShellComponent** | Public storefront | Store, Cart | ❌ Not required |

Both shells share the **TopNavbarComponent** which provides:
- 🏷️ App title/logo
- 🌍 Language toggle (EN ↔ AR)
- 🌙 Theme toggle (Light ↔ Dark)
- 🛒 Cart icon with live item count badge
- 📱 Mobile menu hamburger

---

## 📡 API Reference

> **Base URL**: `http://localhost:5050/api`

### 📦 Items Endpoints

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| 🟢 `GET` | `/items?page=1&size=10&search=` | 📋 Get paginated items with search |
| 🟢 `GET` | `/items/{id}` | 📄 Get single item by ID |
| 🟢 `GET` | `/items/check-code?code=X` | ✅ Check item code uniqueness |
| 🔵 `POST` | `/items` | ➕ Create new item |
| 🟡 `PUT` | `/items/{id}` | ✏️ Update existing item |
| 🔴 `DELETE` | `/items/{id}` | 🗑️ Soft-delete item |
| 🔵 `POST` | `/items/{id}/image` | 🖼️ Upload item image |
| 🟢 `GET` | `/items/image/{filename}` | 🖼️ Retrieve item image |
| 🟢 `GET` | `/items/bulk-upload/template` | 📥 Download Excel template |
| 🔵 `POST` | `/items/bulk-upload` | 📤 Bulk import from Excel |

### ⚙️ Configuration Endpoints

| Method | Endpoint | Description |
|:------:|:---------|:------------|
| 🟢 `GET` | `/configuration` | 📋 Get current configuration |
| 🟡 `PUT` | `/configuration` | ✏️ Update configuration |
| 🔵 `POST` | `/configuration/test-connection` | 🔌 Test database connection |

### 📨 Response Format

All API responses follow a unified envelope:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "errors": []
}
```

### 📊 Item Object

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "itemCode": "BEV-001",
  "nameEN": "Premium Arabic Coffee",
  "nameAR": "قهوة عربية فاخرة",
  "category": "Beverages",
  "price": 45.00,
  "vatPercentage": 15,
  "netTotal": 51.75,
  "imagePath": "items/abc123.jpg",
  "imageUrl": "http://localhost:5050/api/items/image/abc123.jpg",
  "createdAt": "2026-03-15T10:30:00Z",
  "updatedAt": null
}
```

### 📋 Status Codes

| Code | Meaning |
|:----:|:--------|
| `200` | ✅ Success |
| `201` | ✅ Created |
| `204` | ✅ Deleted (no content) |
| `400` | ❌ Validation error |
| `404` | ❌ Not found |
| `409` | ❌ Conflict (duplicate code) |
| `500` | ❌ Server error |

---

## 🗄️ Database Schema

### 📦 Items Table

```sql
┌──────────────────────────────────────────────────────┐
│                      📦 Items                         │
├──────────────────┬───────────────────────────────────┤
│ 🔑 Id            │ UNIQUEIDENTIFIER (PK, auto)       │
│ 🏷️ ItemCode      │ NVARCHAR(50) UNIQUE NOT NULL       │
│ 🇬🇧 NameEN       │ NVARCHAR(200) NOT NULL             │
│ 🇸🇦 NameAR       │ NVARCHAR(200) NOT NULL             │
│ 📁 Category      │ NVARCHAR(100)                      │
│ 🖼️ ImagePath     │ NVARCHAR(500) NULL                 │
│ 💰 Price         │ DECIMAL(18,2) ≥ 0                  │
│ 📊 VatPercentage │ DECIMAL(5,2) IN (0, 15)            │
│ 💵 NetTotal      │ COMPUTED (Price + Price×VAT/100)   │
│ 📅 CreatedAt     │ DATETIME2 (auto)                   │
│ 📅 UpdatedAt     │ DATETIME2 NULL                     │
│ 🗑️ IsDeleted     │ BIT (soft delete flag)             │
└──────────────────┴───────────────────────────────────┘
```

### ⚙️ AppConfigurations Table

```sql
┌──────────────────────────────────────────────────────┐
│                ⚙️ AppConfigurations                    │
├──────────────────┬───────────────────────────────────┤
│ 🔑 Id            │ INT (PK, singleton = 1)            │
│ 🖥️ ServerName    │ NVARCHAR(200) DEFAULT '.'          │
│ 🗄️ DatabaseName  │ NVARCHAR(200)                      │
│ 👤 DbUsername    │ NVARCHAR(100)                      │
│ 🔒 DbPassword   │ NVARCHAR(200) (masked in response) │
│ 📅 UpdatedAt     │ DATETIME2 NULL                     │
│ 🌱 SeedEnabled   │ BIT DEFAULT 0                      │
│ 🔢 SeedCount     │ INT DEFAULT 100                    │
│ 📁 SeedCategory  │ NVARCHAR(100) DEFAULT 'All'        │
└──────────────────┴───────────────────────────────────┘
```

---

## 🌍 Internationalization

### 🗣️ Supported Languages

| Language | Code | Direction | Font |
|:---------|:-----|:----------|:-----|
| 🇬🇧 English | `en` | ➡️ LTR | Roboto |
| 🇸🇦 Arabic | `ar` | ⬅️ RTL | Cairo |

### 🔤 Translation Categories

| Section | Keys | Example |
|:--------|:-----|:--------|
| 🧭 Navigation | `NAV.*` | `NAV.ITEMS` → "Items" / "المنتجات" |
| 🏪 Store | `STORE.*` | `STORE.HERO_TITLE` → "Welcome" / "مرحباً" |
| 📊 Items | `ITEMS.*` | `ITEMS.ADD` → "Add Item" / "إضافة منتج" |
| 🛒 Cart | `CART.*` | `CART.GRAND_TOTAL` → "Grand Total" / "الإجمالي" |
| 📝 Forms | `FORM.*` | `FORM.REQUIRED` → "Required" / "مطلوب" |
| ⚙️ Config | `CONFIG.*` | `CONFIG.DARK_MODE` → "Dark Mode" / "الوضع الداكن" |
| ❌ Errors | `ERRORS.*` | `ERRORS.LOAD` → "Failed to load" / "فشل التحميل" |
| 📤 Bulk | `BULK_UPLOAD.*` | `BULK_UPLOAD.TITLE` → "Bulk Upload" / "رفع مجمع" |
| 🔑 Login | `LOGIN.*` | `LOGIN.TITLE` → "Admin Login" / "تسجيل دخول المسؤول" |

### ⚡ Switching Languages

Language persists across sessions via `localStorage` key `om_lang`.
Switching language instantly:
- ↔️ Flips document direction (`ltr` ↔ `rtl`)
- 🔤 Updates all visible strings
- 🔄 Swaps font family (Roboto ↔ Cairo)

---

## 🎨 Theming System

### 🌈 Color Palette

#### ☀️ Light Mode

| Token | Color | Usage |
|:------|:------|:------|
| `--color-primary` | 🟣 `#635BFF` | Buttons, links, accents |
| `--color-tertiary` | 🔵 `#0EA5E9` | Secondary accents |
| `--color-bg` | ⬜ `#F8FAFC` | Page background |
| `--color-surface` | ⬜ `#FFFFFF` | Cards, panels |
| `--color-text-main` | ⬛ `#0F172A` | Primary text |
| `--color-text-muted` | 🔘 `#64748B` | Secondary text |

#### 🌙 Dark Mode

| Token | Color | Usage |
|:------|:------|:------|
| `--color-bg` | ⬛ `#0F172A` | Page background |
| `--color-surface` | ⬛ `#1E293B` | Cards, panels |
| `--color-text-main` | ⬜ `#F1F5F9` | Primary text |
| `--color-text-muted` | 🔘 `#94A3B8` | Secondary text |

### ✨ Premium Effects

| Effect | Description |
|:-------|:------------|
| 🪟 **Glassmorphism** | Backdrop blur panels with transparency |
| 🌊 **Gradient Primary** | 135° violet → cyan gradient |
| 💫 **Smooth Transitions** | 250ms cubic-bezier easing |
| ✨ **Material Ripple** | Shimmer on interactive elements |
| 🏔️ **Shadow Elevation** | Multi-level shadow system |

### 🔄 Toggle

Theme persists via `localStorage` key `om_theme` (`"dark"` or `"light"`).

---

## 📦 Seed Data

The backend includes a **SeedDataGenerator** that produces **96 culturally relevant products** for the Saudi market:

| Category | Items | Examples |
|:---------|:-----:|:--------|
| ☕ Beverages | 8 | Arabic Coffee, Herbal Tea, Fresh Juices |
| 🍯 Dates & Sweets | 8 | Premium Ajwa Dates, Baklava, Halawa |
| 🪷 Oud & Perfumes | 8 | Premium Oud Oil, Bakhoor, Body Lotion |
| 📱 Electronics | 8 | iPhone 15, Samsung Galaxy, Gaming Console |
| 👔 Fashion | 8 | Premium Thobe, Shimagh, Abaya, Shoes |
| 🛒 Groceries | 8 | Fresh Milk, Basmati Rice, Olive Oil |
| 🏠 Home & Living | 8 | Majlis Cushions, Prayer Mat, Lanterns |
| 💊 Health & Care | 8 | Black Seed Oil, Sidr Honey, Argan Oil |
| 🚗 Automotive | 8 | Car Perfume, Dash Cam, Sun Shade |
| 🎮 Toys & Kids | 8 | Puzzle Set, Quran Tablet, Building Blocks |
| ⚽ Sports & Outdoors | 8 | Football, Camping Tent, Yoga Mat |
| 📝 Stationery & Office | 8 | Quran Stand, Premium Pen Set, Organizer |

> All items include bilingual names (EN/AR), Saudi-market pricing, and correct VAT rates (0% for exempt food items, 15% for standard goods).

---

## 🖼️ Screenshots

> 🚧 _Screenshots coming soon..._
>
> Visit the [Live Demo](https://hossam1104.github.io/order_manegment/) to explore the application.

### Available Views:

| Page | Route | Description |
|:-----|:------|:------------|
| 🛍️ Customer Store | `/shop` | Product grid with cards |
| 🛒 Shopping Cart | `/shop/cart` | Cart with totals |
| 🔑 Admin Login | `/login` | Authentication page |
| 📊 Item Management | `/admin` | Data table with CRUD |
| ⚙️ Configuration | `/admin/configuration` | App settings |

---

## 🔧 Services Overview

### Frontend Services

| Service | Key | Persistence | Purpose |
|:--------|:----|:------------|:--------|
| 🛒 **CartService** | `om_cart` | localStorage | Cart state with signals |
| 🎨 **ThemeService** | `om_theme` | localStorage | Dark/Light mode toggle |
| 🔐 **AuthService** | `om_admin_auth` | sessionStorage | Admin session management |
| 🌍 **TranslateService** | `om_lang` | localStorage | Language preference |
| 📦 **ItemService** | — | — | API communication layer |
| ☁️ **SupabaseService** | — | — | Cloud DB client (Phase 2) |

### Backend Services

| Service | Responsibility |
|:--------|:---------------|
| 📦 **ItemService** | CRUD, search, pagination, bulk upload, Excel generation |
| 🖼️ **FileStorageService** | Image upload validation (MIME, size), disk storage |
| 🌱 **SeedDataGenerator** | Generate 96 sample products for demo/testing |

---

## 📄 Image Upload

### 🖼️ Specifications

| Property | Value |
|:---------|:------|
| 📏 **Max Size** | 5 MB |
| 🎨 **Formats** | `image/jpeg`, `image/png` |
| 📂 **Storage** | `D:\order_managment\assets\items\` |
| 🏷️ **Naming** | `{GUID}.{ext}` (collision-free) |
| 🌐 **Access** | `GET /api/items/image/{filename}` |

### 📤 Upload Flow

```
📱 Client selects image
      │
      ▼
🖼️ Preview shown instantly (client-side FileReader)
      │
      ▼
💾 On save → POST /api/items/{id}/image (multipart)
      │
      ▼
🛡️ Server validates MIME type & file size
      │
      ▼
📁 Saved to disk as {GUID}.{ext}
      │
      ▼
✅ Relative path stored in database
```

---

## 📊 Bulk Upload

### 📥 Excel Template

Download the pre-formatted template via `GET /api/items/bulk-upload/template`:

| Column | Type | Required | Notes |
|:-------|:-----|:--------:|:------|
| ItemCode | Text | ✅ | Unique identifier |
| NameEN | Text | ✅ | English name |
| NameAR | Text | ✅ | Arabic name |
| Category | Text | ❌ | Product category |
| Price | Number | ✅ | Must be ≥ 0 |
| VatPercentage | Number | ✅ | Must be 0 or 15 |

### 📤 Import Process

```
📥 Download template → ✏️ Fill data → 📤 Upload .xlsx
      │
      ▼
🔍 Row-by-row validation (all rows checked)
      │
      ├── ✅ All valid → Atomic bulk insert
      │
      └── ❌ Any errors → Detailed per-row error report
            {
              "successCount": 0,
              "errorCount": 3,
              "rowErrors": [
                { "row": 2, "errors": ["ItemCode is required"] },
                { "row": 5, "errors": ["Price must be >= 0"] }
              ]
            }
```

---

## 🚀 Deployment

### 🌐 GitHub Pages (Frontend)

The frontend is deployed to GitHub Pages:

```bash
# Build for production
cd frontend
ng build --base-href /order_manegment/

# Deploy output from dist/order-management-ui/browser/
```

> 🔗 **Live URL**: [https://hossam1104.github.io/order_manegment/](https://hossam1104.github.io/order_manegment/)

### 🖥️ Backend Deployment

The .NET backend can be deployed to:
- 🅰️ **Azure App Service**
- 🐳 **Docker Container**
- 🖥️ **IIS (Windows Server)**
- ☁️ **Any .NET 9 compatible host**

---

## 🗺️ Roadmap

| Phase | Status | Description |
|:------|:------:|:------------|
| **Phase 1** | ✅ Complete | Item Management, Cart, Dual Shell, Auth, i18n |
| **Phase 2** | 🔄 Planned | Supabase migration, cloud storage, RLS |
| **Phase 3** | 📋 Planned | Order processing, payment integration |
| **Phase 4** | 📋 Planned | Multi-tenant, domain separation, analytics |

---

<p align="center">
  <strong>Built with ❤️ for the Saudi market</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made_with-Angular_18-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/Powered_by-.NET_9-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" />
</p>
