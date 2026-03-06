# stock_management — Project Plan
**Version:** 2.0 | Phase 1  
**Stack:** .NET 9 Web API · Angular 18+ (Standalone) · SQL Server (SQL Auth) · EF Core 9  
**Local Data Path:** `D:\stock_managment\` (database MDF/LDF + assets subfolder for images)

---

## 1. Project Overview

A multi-phase stock and order management system. Phase 1 delivers the Item Management module: full CRUD for inventory items with bilingual support (EN/AR), image upload, VAT calculation, stock tracking, a shopping cart, and a runtime configuration panel — all presented in a premium, dark/light-mode bilingual UI.

---

## 2. Technology Stack

| Layer             | Technology                         | Notes                                          |
| ----------------- | ---------------------------------- | ---------------------------------------------- |
| Backend API       | ASP.NET Core 9 Web API             | Minimal API + Controllers hybrid               |
| ORM               | Entity Framework Core 9            | Code-first, SQL Server provider                |
| Database          | SQL Server (SQL Auth)              | Server: `.` · User: `sa` · Pass: `P@ssw0rd`    |
| DB Files Location | `D:\stock_managment\`              | MDF + LDF stored here                          |
| Image Storage     | `D:\stock_managment\assets\items\` | Local filesystem, served as static files       |
| Frontend          | Angular 18+ Standalone Components  | No NgModules                                   |
| UI Library        | Angular Material 18                | Premium theming, RTL support                   |
| Localization      | @ngx-translate/core                | EN / AR runtime switching                      |
| RTL Support       | Angular CDK Bidi                   | Automatic layout flip for Arabic               |
| Theming           | Angular Material custom theme      | Dark / Light toggle, persisted in localStorage |
| API Docs          | Scalar UI                          | Dev-only, replaces Swagger UI                  |

---

## 3. Solution Structure

```
stock_management/
├── backend/
│   └── StockManagement.API/
│       ├── Controllers/
│       │   ├── ItemsController.cs
│       │   └── ConfigurationController.cs
│       ├── Models/
│       │   ├── Item.cs
│       │   └── AppConfiguration.cs
│       ├── Data/
│       │   └── AppDbContext.cs
│       ├── DTOs/
│       │   ├── ItemDto.cs
│       │   ├── CreateItemRequest.cs
│       │   └── UpdateItemRequest.cs
│       ├── Services/
│       │   ├── ItemService.cs
│       │   └── FileStorageService.cs
│       ├── Middleware/
│       │   └── GlobalExceptionMiddleware.cs
│       ├── appsettings.json
│       └── Program.cs
│
└── frontend/
    └── stock-management-ui/
        └── src/app/
            ├── core/
            │   ├── services/
            │   │   ├── item.service.ts
            │   │   ├── config.service.ts
            │   │   ├── cart.service.ts
            │   │   └── theme.service.ts
            │   └── interceptors/
            │       └── error.interceptor.ts
            ├── shared/
            │   ├── components/
            │   │   ├── confirm-dialog/
            │   │   └── image-preview/
            │   └── pipes/
            │       └── net-total.pipe.ts
            └── features/
                ├── items/
                │   ├── item-list/
                │   ├── item-form/
                │   └── items.routes.ts
                ├── cart/
                │   ├── cart-sidebar/
                │   └── cart.routes.ts
                └── configuration/
                    ├── config-panel/
                    └── config.routes.ts
```

---

## 4. Database Design

### 4.1 SQL Server Connection String
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=StockManagementDB;User Id=sa;Password=P@ssw0rd;TrustServerCertificate=True;AttachDbFilename=D:\\stock_managment\\StockManagementDB.mdf;"
}
```

> `AttachDbFilename` ensures MDF/LDF are created at `D:\stock_managment\`.  
> The folder **must exist** before first migration. API startup auto-creates it via `Directory.CreateDirectory`.

---

### 4.2 Items Table

```sql
CREATE TABLE Items (
    Id                  UNIQUEIDENTIFIER    NOT NULL DEFAULT NEWSEQUENTIALID()
                            CONSTRAINT PK_Items PRIMARY KEY CLUSTERED,
    ItemCode            NVARCHAR(50)        NOT NULL,
    NameEN              NVARCHAR(200)       NOT NULL,
    NameAR              NVARCHAR(200)       NOT NULL,
    ImagePath           NVARCHAR(500)       NULL,
    Price               DECIMAL(18,2)       NOT NULL,
    VatPercentage       DECIMAL(5,2)        NOT NULL DEFAULT 0,
    NetTotal            AS (Price + (Price * VatPercentage / 100)) PERSISTED,
    AvailableStock      INT                 NOT NULL DEFAULT 0,
    CreatedAt           DATETIME2           NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt           DATETIME2           NULL,
    IsDeleted           BIT                 NOT NULL DEFAULT 0,

    CONSTRAINT UQ_Items_ItemCode        UNIQUE (ItemCode),
    CONSTRAINT CK_Items_Price           CHECK (Price >= 0),
    CONSTRAINT CK_Items_VatPercentage   CHECK (VatPercentage IN (0, 15)),
    CONSTRAINT CK_Items_AvailableStock  CHECK (AvailableStock >= 0)
);

CREATE INDEX IX_Items_IsDeleted ON Items (IsDeleted);
CREATE INDEX IX_Items_CreatedAt ON Items (CreatedAt DESC);
```

**Column Reference:**

| Column           | Type             | Constraint / Rule                                             |
| ---------------- | ---------------- | ------------------------------------------------------------- |
| `Id`             | UNIQUEIDENTIFIER | PK, `NEWSEQUENTIALID()` — sequential for clustered index perf |
| `ItemCode`       | NVARCHAR(50)     | Required · Unique · Max 50                                    |
| `NameEN`         | NVARCHAR(200)    | Required · Max 200                                            |
| `NameAR`         | NVARCHAR(200)    | Required · Max 200                                            |
| `ImagePath`      | NVARCHAR(500)    | Nullable · Relative path e.g. `items/abc.jpg`                 |
| `Price`          | DECIMAL(18,2)    | Required · ≥ 0                                                |
| `VatPercentage`  | DECIMAL(5,2)     | Must be exactly `0` or `15`                                   |
| `NetTotal`       | DECIMAL(18,2)    | **Computed + persisted**: `Price + (Price × VAT% / 100)`      |
| `AvailableStock` | INT              | Required · ≥ 0 · Default 0                                    |
| `CreatedAt`      | DATETIME2        | Auto UTC on insert                                            |
| `UpdatedAt`      | DATETIME2        | Auto UTC on EF SaveChanges                                    |
| `IsDeleted`      | BIT              | Soft delete — global EF query filter excludes `IsDeleted = 1` |

---

### 4.3 AppConfiguration Table

```sql
CREATE TABLE AppConfiguration (
    Id              INT             NOT NULL CONSTRAINT PK_AppConfiguration PRIMARY KEY,
    ServerName      NVARCHAR(200)   NOT NULL DEFAULT '.',
    DatabaseName    NVARCHAR(200)   NOT NULL DEFAULT 'StockManagementDB',
    DbUsername      NVARCHAR(200)   NOT NULL DEFAULT 'sa',
    DbPassword      NVARCHAR(500)   NOT NULL,
    StockControl    BIT             NOT NULL DEFAULT 1,
    UpdatedAt       DATETIME2       NULL
);

-- Seed: single row, Id = 1 always
INSERT INTO AppConfiguration (Id, ServerName, DatabaseName, DbUsername, DbPassword, StockControl)
VALUES (1, '.', 'StockManagementDB', 'sa', 'P@ssw0rd', 1);
```

| Field                       | Type     | Meaning                                                  |
| --------------------------- | -------- | -------------------------------------------------------- |
| `ServerName`                | NVARCHAR | SQL Server instance name                                 |
| `DatabaseName`              | NVARCHAR | Target DB name                                           |
| `DbUsername` / `DbPassword` | NVARCHAR | SQL Auth credentials                                     |
| `StockControl`              | BIT      | `1` = enforce stock check on cart · `0` = unlimited cart |

---

## 5. API Endpoint Map

### Items Endpoints

| Method | Route                   | Auth           | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/items`            | None           | Paged list. Query: `?page=1&size=10&search=` |
| GET    | `/api/items/{id}`       | None           | Single item                                  |
| GET    | `/api/items/check-code` | None           | `?code=X` → unique check for async validator |
| POST   | `/api/items`            | None (Phase 1) | Create item                                  |
| PUT    | `/api/items/{id}`       | None (Phase 1) | Full update                                  |
| DELETE | `/api/items/{id}`       | None (Phase 1) | Soft delete → `IsDeleted = 1`                |
| POST   | `/api/items/{id}/image` | None (Phase 1) | Upload image, returns `{ imagePath }`        |

### Configuration Endpoints

| Method | Route                                | Description                                                |
| ------ | ------------------------------------ | ---------------------------------------------------------- |
| GET    | `/api/configuration`                 | Returns config (password masked as `***`)                  |
| PUT    | `/api/configuration`                 | Update all config fields                                   |
| POST   | `/api/configuration/test-connection` | Tests provided credentials, returns `{ success, message }` |

### Response Envelope (All Endpoints)
```json
{
  "success": true,
  "data": { },
  "message": "Operation successful",
  "errors": []
}
```

---

## 6. Angular UI Specification

### 6.1 App Shell Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  [≡]  stock_management          [Items] [Cart 🛒(n)] [Config]   │
│                                              [🌙 Dark] [EN | AR] │
└──────────────────────────────────────────────────────────────────┘
│                        <router-outlet>                           │
└──────────────────────────────────────────────────────────────────┘
```

### 6.2 Items Tab — Data Grid

**Columns:**

| #   | Column    | Display Notes                                    |
| --- | --------- | ------------------------------------------------ |
| 1   | Image     | 48×48 thumbnail. Click → fullscreen dialog       |
| 2   | Item Code | Monospace font                                   |
| 3   | Name      | Shows EN or AR based on active language          |
| 4   | Price     | `1,234.50` formatted                             |
| 5   | VAT %     | Chip: green = 0%, orange = 15%                   |
| 6   | Net Total | Bold, highlighted background                     |
| 7   | Stock     | Colored badge: green ≥ 10 · orange 1–9 · red = 0 |
| 8   | Created   | `dd/MM/yyyy HH:mm`                               |
| 9   | Actions   | ➕ Add to Cart · ✏️ Edit · 🗑️ Delete                |

**Grid Features:**
- MatPaginator: 10 / 25 / 50 rows per page
- MatSort on all columns
- Search bar: client-side filter (debounced 300ms)
- Add to Cart button: `disabled` + MatTooltip explaining why when stock = 0 and StockControl = true
- Loading skeleton rows (MatProgressBar at top) while fetching

### 6.3 Item Form — Add / Edit (MatDialog or Right Drawer)

| Field           | Control              | Validation                                         |
| --------------- | -------------------- | -------------------------------------------------- |
| Item Code       | MatInput             | Required · Max 50 · Async unique check (debounced) |
| Name (EN)       | MatInput             | Required · Max 200                                 |
| Name (AR)       | MatInput dir="rtl"   | Required · Max 200                                 |
| Image           | File input + preview | Optional · JPG/PNG · Max 5MB (client check)        |
| Price           | MatInput type=number | Required · ≥ 0 · 2dp                               |
| VAT %           | MatSelect            | Options: 0% / 15%                                  |
| Net Total       | MatInput readonly    | Live computed: `Price + (Price × VAT / 100)`       |
| Available Stock | MatInput type=number | Required · Integer · ≥ 0                           |

- All validation errors shown inline with translated messages
- Image thumbnail preview before submission
- Submit blocked while async validator is pending
- Edit mode: pre-fills form, image shows current thumbnail
- Save: uploads image first (if changed), then POST/PUT item

### 6.4 Cart Sidebar (MatSidenav)

- Opens from Cart icon in toolbar (slides in from right, or left in RTL)
- Cart badge shows item count
- Per-line: image · name (localized) · unit price · quantity spinner · line net total · remove icon
- Quantity max enforced by stock if `StockControl = true`
- Footer: Subtotal · VAT Amount · Grand Total
- "Clear Cart" button with confirm
- "Proceed" button (placeholder for Phase 2 Work Request)

### 6.5 Configuration Tab

**Section A — Database Connection**

| Field               | Control                                               |
| ------------------- | ----------------------------------------------------- |
| Server              | MatInput, default `.`                                 |
| Database Name       | MatInput                                              |
| Username            | MatInput                                              |
| Password            | MatInput type=password + show/hide icon               |
| [ Test Connection ] | MatButton → POST `/api/configuration/test-connection` |
| [ Save ]            | MatButton → PUT `/api/configuration`                  |

**Section B — Stock Settings**

| Control                               | Behavior                                                                    |
| ------------------------------------- | --------------------------------------------------------------------------- |
| MatSlideToggle "Enable Stock Control" | PUT on change, immediate save                                               |
| Info text below toggle                | Bilingual: "ON: cart respects stock levels · OFF: unlimited cart additions" |

---

## 7. UI/UX Design Requirements

### 7.1 Theming

| Mode  | Primary               | Accent            | Background | Surface   |
| ----- | --------------------- | ----------------- | ---------- | --------- |
| Light | `#1565C0` (deep blue) | `#FFB300` (amber) | `#F5F5F5`  | `#FFFFFF` |
| Dark  | `#00BCD4` (cyan)      | `#FFB300` (amber) | `#121212`  | `#1E1E1E` |

- Toggle stored in `localStorage` key `sm_theme`
- CSS `transition: background-color 0.3s, color 0.3s` on all major containers
- Custom Angular Material M3 theme file (`_theme.scss`)

### 7.2 Bilingual

- `@ngx-translate/core` with `TranslateModule` in shared
- `assets/i18n/en.json` and `assets/i18n/ar.json` — complete key coverage
- Language toggle stored in `localStorage` key `sm_lang`
- Arabic: `dir="rtl"` applied to `<html>` tag dynamically; layout mirrors automatically
- Fonts: **Cairo** for AR (Google Fonts), **Roboto** for EN

### 7.3 Quality Touches
- Gradient toolbar: `linear-gradient(135deg, primary, primary-dark)`
- MatCard elevation on grid container
- Row highlight animation on new item inserted (CSS `@keyframes highlight-row`)
- MatTooltip on all icon buttons (translated)
- Empty state: illustrated placeholder when no items exist
- Error state: snackbar (MatSnackBar) for all API errors

---

## 8. File Storage Specification

```
D:\stock_managment\
├── StockManagementDB.mdf
├── StockManagementDB_log.ldf
└── assets\
    └── items\
        ├── {uuid}.jpg
        └── {uuid}.png
```

- `FileStorageService` saves to absolute path `D:\stock_managment\assets\items\{newGuid}.{ext}`
- DB stores relative path only: `items/{guid}.ext`
- Images served via: `GET /api/items/image/{filename}` — reads from base path config
- On item soft-delete: image file **retained** (no physical deletion)
- On image update: new GUID filename generated, old file retained

---

## 9. Validation Rules — Complete Reference

### Backend Validation (DataAnnotations + custom checks)

| Field          | Rule                                         |
| -------------- | -------------------------------------------- |
| ItemCode       | Required · MaxLength(50) · Unique (DB query) |
| NameEN         | Required · MaxLength(200)                    |
| NameAR         | Required · MaxLength(200)                    |
| Price          | Required · >= 0 · Decimal precision          |
| VatPercentage  | Must be `0` or `15` exactly                  |
| AvailableStock | Required · Integer · >= 0                    |
| Image (upload) | MIME: `image/jpeg` or `image/png` · Max 5MB  |

### Frontend Validation (Angular Reactive Forms)

- All required fields: error shown on `blur` + on submit attempt
- `ItemCode`: async validator → `GET /api/items/check-code?code=X` (400ms debounce, skipped in edit mode for own code)
- `Price`: pattern `^\d+(\.\d{1,2})?$`
- `AvailableStock`: integer-only, min validator 0
- `Image`: client-side `File.size > 5_242_880` check before upload, shows inline error
- `NetTotal`: reactive `valueChanges` on Price + VatPercentage → computed display (no API call)

### Cart Stock Enforcement

| Scenario              | StockControl ON              | StockControl OFF |
| --------------------- | ---------------------------- | ---------------- |
| Stock = 0, try to add | ❌ Button disabled            | ✅ Allowed        |
| Stock = 3, add qty 5  | ❌ Capped at 3, warning shown | ✅ Qty 5 allowed  |
| Stock = 10, add qty 3 | ✅ Allowed                    | ✅ Allowed        |

---

## 10. Phase 1 Delivery Checklist

### Backend
- [ ] `D:\stock_managment\` + `assets\items\` auto-created on startup
- [ ] `appsettings.json` has connection string with `AttachDbFilename`
- [ ] EF Core migration `InitialCreate` → creates `Items` + `AppConfiguration` at `D:\stock_managment\`
- [ ] Seed: one `AppConfiguration` row (Id=1) with defaults
- [ ] Soft delete global query filter on `Items` (`IsDeleted = false`)
- [ ] `ItemsController` — GET (paged), GET by ID, GET check-code, POST, PUT, DELETE, POST image
- [ ] `ConfigurationController` — GET, PUT, POST test-connection
- [ ] `FileStorageService` — save/serve from `D:\stock_managment\assets\items\`
- [ ] `GlobalExceptionMiddleware` — ApiResponse envelope on all errors
- [ ] CORS: `http://localhost:4200`
- [ ] Scalar UI in development only

### Frontend
- [ ] Angular 18 standalone project scaffolded
- [ ] Angular Material 18 + dual light/dark custom theme
- [ ] `@ngx-translate/core` wired, `en.json` + `ar.json` complete
- [ ] RTL/LTR switches dynamically with language
- [ ] `ThemeService` — signals-based toggle, localStorage persist
- [ ] `ConfigService` — loads config on `APP_INITIALIZER`, exposes `stockControl` signal
- [ ] `CartService` — in-memory, respects `stockControl` signal
- [ ] `ItemService` — all 7 API calls wired with typed responses
- [ ] Items grid: all 9 columns, sort, paginate, search
- [ ] Item form: all fields, live NetTotal, image upload + preview, async unique validator
- [ ] Confirm delete dialog
- [ ] Cart sidebar: items, qty control, totals, clear
- [ ] Configuration tab: DB fields, test connection button, stock toggle
- [ ] Full EN + AR translation coverage

---

## 11. Phase 2+ Scope (Future)

- Customer registration + admin approval
- Work Request creation from cart
- Admin Work Order management
- Driver delivery module
- GRN + auto Invoice generation
- Reporting dashboard (Cash vs Credit)
- Role-based access (Admin / Customer / Driver)
- JWT authentication across all modules