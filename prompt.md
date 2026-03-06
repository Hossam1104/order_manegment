# stock_management — AI Execution Prompt
**Phase:** 1 — Item Management  
**Stack:** .NET 9 Web API · Angular 18 Standalone · SQL Server (SQL Auth) · EF Core 9  
**Purpose:** Feed this prompt to Claude Code, Cursor, or Copilot to scaffold and implement Phase 1 completely.

---

## Master System Prompt
> Prepend this to every coding session before any phase prompt.

```
You are a senior .NET 9 + Angular 18 full-stack engineer implementing "stock_management" — a B2B stock and order management system.

ARCHITECTURE RULES — always enforce:
- Backend: single-project ASP.NET Core 9 Web API. No Clean Architecture layers in Phase 1 — keep it pragmatic: Controllers, Models, DTOs, Services, Data, Middleware in one project.
- All C# types must be explicitly declared — never use var.
- All API responses must be wrapped in ApiResponse<T>:
  public class ApiResponse<T> { public bool Success; public T Data; public string Message; public List<string> Errors; }
- HTTP status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 409 Conflict (duplicate code), 500 (global handler only).
- EF Core: code-first, SQL Server provider, NEWSEQUENTIALID() for all Guid PKs.
- Soft delete: Items table has IsDeleted bit. Global query filter: modelBuilder.Entity<Item>().HasQueryFilter(i => !i.IsDeleted).
- UpdatedAt: always set in SaveChangesAsync override.
- Images: saved locally to D:\stock_managment\assets\items\{newGuid}.{ext}. DB stores relative path only: items/{guid}.ext.
- Connection string uses SQL Server authentication (not Windows auth):
  Server=.; User Id=sa; Password=P@ssw0rd; TrustServerCertificate=True; AttachDbFilename=D:\stock_managment\StockManagementDB.mdf
- On startup: auto-create D:\stock_managment\ and D:\stock_managment\assets\items\ if they don't exist.

ANGULAR RULES — always enforce:
- Angular 18 standalone components only. Zero NgModules.
- Angular Material 18 for all UI components.
- @ngx-translate/core for EN/AR bilingual support. All user-visible strings must use translate pipe — no hardcoded text.
- Angular Signals for all state (ThemeService, ConfigService, CartService).
- Reactive Forms for all forms — no template-driven forms.
- HttpClient with typed responses using ApiResponse<T> interface.
- Never use localStorage directly in components — always via a service.
- All icon buttons must have matTooltip with translated label.
```

---

## Phase 1 — Prompt A: Backend Scaffold + Database

```
TASK: Scaffold the backend for stock_management Phase 1.

PROJECT SETUP:
Create ASP.NET Core 9 Web API project named StockManagement.API.
Install these NuGet packages:
- Microsoft.EntityFrameworkCore.SqlServer (9.x)
- Microsoft.EntityFrameworkCore.Tools (9.x)
- Microsoft.EntityFrameworkCore.Design (9.x)
- Scalar.AspNetCore
- Microsoft.Data.SqlClient

APPSETTINGS.JSON — create with this exact content:
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=StockManagementDB;User Id=sa;Password=P@ssw0rd;TrustServerCertificate=True;AttachDbFilename=D:\\stock_managment\\StockManagementDB.mdf;"
  },
  "FileStorage": {
    "BasePath": "D:\\stock_managment\\assets\\items"
  },
  "AllowedHosts": "*"
}

MODELS — create in /Models/:

Item.cs:
public class Item
{
    public Guid Id { get; set; }
    public string ItemCode { get; set; } = string.Empty;
    public string NameEN { get; set; } = string.Empty;
    public string NameAR { get; set; } = string.Empty;
    public string? ImagePath { get; set; }
    public decimal Price { get; set; }
    public decimal VatPercentage { get; set; }
    // NetTotal is a computed column in DB — map as read-only
    public decimal NetTotal { get; set; }
    public int AvailableStock { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsDeleted { get; set; }
}

AppConfiguration.cs:
public class AppConfiguration
{
    public int Id { get; set; }
    public string ServerName { get; set; } = ".";
    public string DatabaseName { get; set; } = "StockManagementDB";
    public string DbUsername { get; set; } = "sa";
    public string DbPassword { get; set; } = string.Empty;
    public bool StockControl { get; set; } = true;
    public DateTime? UpdatedAt { get; set; }
}

APIRESPONSE WRAPPER — create in /Models/ApiResponse.cs:
public class ApiResponse<T>
{
    public bool Success { get; set; }
    public T? Data { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<string> Errors { get; set; } = new();

    public static ApiResponse<T> Ok(T data, string message = "Success") =>
        new() { Success = true, Data = data, Message = message };

    public static ApiResponse<T> Fail(string message, List<string>? errors = null) =>
        new() { Success = false, Message = message, Errors = errors ?? new() };
}

DBCONTEXT — create Data/AppDbContext.cs:
- Extends DbContext
- DbSet<Item> Items
- DbSet<AppConfiguration> AppConfigurations
- OnModelCreating:
  - Item: HasKey, HasQueryFilter(!IsDeleted), NetTotal mapped as .ValueGeneratedOnAddOrUpdate().HasComputedColumnSql("Price + (Price * VatPercentage / 100)", stored: true)
  - Item: Unique index on ItemCode
  - Item: CHECK constraints on Price >= 0, VatPercentage IN (0,15), AvailableStock >= 0
  - AppConfiguration: HasKey, seed row: Id=1, StockControl=true, ServerName=".", DatabaseName="StockManagementDB", DbUsername="sa", DbPassword="P@ssw0rd"
- Override SaveChangesAsync: set UpdatedAt = DateTime.UtcNow for all modified entities that have UpdatedAt property

STARTUP — Program.cs:
1. Create directories D:\stock_managment\ and D:\stock_managment\assets\items\ if not exist (Directory.CreateDirectory — safe to call if exists)
2. Register DbContext with SQL Server provider using DefaultConnection
3. Register ItemService, FileStorageService as scoped
4. Add CORS policy allowing http://localhost:4200, all headers, all methods
5. Add GlobalExceptionMiddleware
6. In development: add Scalar UI
7. Apply pending EF migrations on startup: using scope, context.Database.MigrateAsync()
8. Correct middleware order: UseHttpsRedirection → UseCors → UseStaticFiles → UseRouting → MapControllers

GLOBAL EXCEPTION MIDDLEWARE — Middleware/GlobalExceptionMiddleware.cs:
- Catch all unhandled exceptions
- Log to console with timestamp
- Return 500 with ApiResponse<object>.Fail("An unexpected error occurred") as JSON

MIGRATION:
Generate EF Core migration named "InitialCreate" that creates Items and AppConfiguration tables.
The migration must NOT include VatPercentage check as enum — use raw SQL CHECK constraint via Sql() in Up().
```

---

## Phase 1 — Prompt B: Items Controller + File Storage Service

```
TASK: Implement ItemsController and FileStorageService for stock_management.

FILESTORAGE SERVICE — Services/FileStorageService.cs:
Interface IFileStorageService:
  Task<string> SaveImageAsync(IFormFile file);
  void DeleteImage(string relativePath); // soft: log only, don't physically delete
  string GetAbsolutePath(string relativePath);

Implementation FileStorageService:
- Constructor: inject IConfiguration, read "FileStorage:BasePath"
- SaveImageAsync:
  1. Validate MIME: only image/jpeg, image/png. If invalid → throw ArgumentException("Only JPG and PNG files are allowed.")
  2. Validate size: max 5MB (5 * 1024 * 1024). If too large → throw ArgumentException("Image must be under 5MB.")
  3. Generate filename: {Guid.NewGuid()}.{extension}
  4. Save to: Path.Combine(basePath, filename)
  5. Return relative path: "items/{filename}"
- GetAbsolutePath: return Path.Combine(basePath, relativePath.Replace("items/", ""))

DTOS — create in /DTOs/:

ItemDto.cs (response):
{ Id, ItemCode, NameEN, NameAR, ImagePath, ImageUrl, Price, VatPercentage, NetTotal, AvailableStock, CreatedAt, UpdatedAt }
Note: ImageUrl = $"/api/items/image/{filename extracted from ImagePath}"

CreateItemRequest.cs:
{ ItemCode (required, max 50), NameEN (required, max 200), NameAR (required, max 200), Price (required, >= 0), VatPercentage (required, 0 or 15), AvailableStock (required, >= 0) }
With DataAnnotations validation attributes on each field.

UpdateItemRequest.cs: same fields as CreateItemRequest plus optional ImagePath

ITEM SERVICE — Services/ItemService.cs:
Interface IItemService:
  Task<(List<ItemDto> items, int totalCount)> GetItemsAsync(int page, int size, string? search);
  Task<ItemDto?> GetItemByIdAsync(Guid id);
  Task<bool> IsCodeUniqueAsync(string code, Guid? excludeId = null);
  Task<ItemDto> CreateItemAsync(CreateItemRequest request);
  Task<ItemDto?> UpdateItemAsync(Guid id, UpdateItemRequest request);
  Task<bool> DeleteItemAsync(Guid id);
  Task<string> UploadImageAsync(Guid id, IFormFile file);

Implementation ItemService:
- GetItemsAsync: search filters on ItemCode, NameEN, NameAR (contains, case-insensitive). Returns page of ItemDto mapped from Item. Include total count for pagination.
- IsCodeUniqueAsync: checks DB excluding soft-deleted. If excludeId provided, skip that item (for edit scenario).
- CreateItemAsync: validate unique code → throw if duplicate → save → return DTO
- UpdateItemAsync: find item → apply changes → save → return updated DTO. Return null if not found.
- DeleteItemAsync: find → set IsDeleted = true → save → return true. False if not found.
- UploadImageAsync: find item → call FileStorageService.SaveImageAsync → update item.ImagePath → save → return new ImagePath

ITEMS CONTROLLER — Controllers/ItemsController.cs:
[ApiController] [Route("api/items")]

Endpoints:
GET /api/items?page=1&size=10&search=
  → calls GetItemsAsync → returns ApiResponse with { items: [], totalCount, page, size }

GET /api/items/{id}
  → 404 if null

GET /api/items/check-code?code=X&excludeId=optional-guid
  → returns ApiResponse<bool> { data: true } if unique

POST /api/items
  → validate ModelState → check code unique (409 if duplicate) → CreateItemAsync → 201

PUT /api/items/{id}
  → validate → check code unique excluding self → UpdateItemAsync → 200 or 404

DELETE /api/items/{id}
  → DeleteItemAsync → 204 or 404

POST /api/items/{id}/image
  → [FromForm] IFormFile file → UploadImageAsync → returns { imagePath, imageUrl }

GET /api/items/image/{filename}
  → PhysicalFile from FileStorageService.GetAbsolutePath("items/{filename}")
  → 404 if file not found on disk

CONFIGURATION CONTROLLER — Controllers/ConfigurationController.cs:
[ApiController] [Route("api/configuration")]

GET /api/configuration
  → read AppConfiguration Id=1 → return DTO with DbPassword masked as "***"

PUT /api/configuration
  → body: { serverName, databaseName, dbUsername, dbPassword, stockControl }
  → update AppConfiguration Id=1 → save → return updated (password still masked)

POST /api/configuration/test-connection
  → body: { serverName, databaseName, dbUsername, dbPassword }
  → build connection string dynamically
  → open SqlConnection → return { success: true/false, message: "Connection successful" or error message }
  → never throw — catch all exceptions and return failure response
```

---

## Phase 1 — Prompt C: Angular Scaffold + Core Services

```
TASK: Scaffold the Angular 18 frontend for stock_management with theming, localization, and core services.

SCAFFOLD:
ng new stock-management-ui --standalone --routing --style=scss
cd stock-management-ui
ng add @angular/material@18
npm install @ngx-translate/core @ngx-translate/http-loader

ANGULAR MATERIAL THEME — src/styles.scss:
Create dual theme using Angular Material M3:
- Light theme: primary #1565C0, accent #FFB300
- Dark theme: primary #00BCD4, accent #FFB300
Apply theme class .dark-theme to <body> for dark mode.
Import Cairo (Arabic) and Roboto (English) from Google Fonts in styles.scss.
Add base transitions: body { transition: background-color 0.3s ease, color 0.3s ease; }

TRANSLATION FILES:

src/assets/i18n/en.json — include all keys:
{
  "APP_TITLE": "stock_management",
  "NAV": { "ITEMS": "Items", "CART": "Cart", "CONFIGURATION": "Configuration" },
  "THEME": { "DARK": "Dark Mode", "LIGHT": "Light Mode" },
  "LANG": { "EN": "EN", "AR": "AR" },
  "ITEMS": {
    "TITLE": "Item Management",
    "ADD": "Add Item",
    "EDIT": "Edit Item",
    "DELETE": "Delete Item",
    "DELETE_CONFIRM": "Are you sure you want to delete this item?",
    "CODE": "Item Code", "NAME_EN": "Name (EN)", "NAME_AR": "Name (AR)",
    "IMAGE": "Image", "PRICE": "Price", "VAT": "VAT %",
    "NET_TOTAL": "Net Total", "STOCK": "Available Stock", "CREATED": "Created",
    "ACTIONS": "Actions", "ADD_TO_CART": "Add to Cart",
    "NO_STOCK": "Out of stock — cannot add to cart",
    "SEARCH": "Search items...",
    "EMPTY": "No items found. Add your first item."
  },
  "FORM": {
    "SAVE": "Save", "CANCEL": "Cancel", "UPLOAD_IMAGE": "Upload Image",
    "REQUIRED": "This field is required",
    "MAX_LENGTH": "Maximum {{max}} characters",
    "MIN_VALUE": "Minimum value is {{min}}",
    "CODE_TAKEN": "This item code is already in use",
    "IMAGE_TYPE": "Only JPG and PNG files are allowed",
    "IMAGE_SIZE": "Image must be under 5MB",
    "CODE_CHECKING": "Checking availability..."
  },
  "CART": {
    "TITLE": "Cart", "EMPTY": "Your cart is empty",
    "QUANTITY": "Qty", "UNIT_PRICE": "Unit Price", "LINE_TOTAL": "Total",
    "SUBTOTAL": "Subtotal", "VAT_AMOUNT": "VAT", "GRAND_TOTAL": "Grand Total",
    "CLEAR": "Clear Cart", "PROCEED": "Proceed (Phase 2)",
    "STOCK_LIMIT": "Quantity cannot exceed available stock"
  },
  "CONFIG": {
    "TITLE": "Configuration", "DB_SECTION": "Database Connection",
    "SERVER": "Server", "DATABASE": "Database Name",
    "USERNAME": "Username", "PASSWORD": "Password",
    "TEST": "Test Connection", "SAVE": "Save",
    "TEST_SUCCESS": "Connection successful",
    "TEST_FAIL": "Connection failed",
    "STOCK_SECTION": "Stock Settings",
    "STOCK_CONTROL": "Enable Stock Control",
    "STOCK_ON": "ON: Cart respects available stock",
    "STOCK_OFF": "OFF: Unlimited cart additions"
  },
  "ERRORS": { "LOAD": "Failed to load data", "SAVE": "Failed to save", "DELETE": "Failed to delete", "UPLOAD": "Failed to upload image" },
  "CONFIRM": { "YES": "Yes", "NO": "No" }
}

src/assets/i18n/ar.json — full Arabic translation of all above keys.
Key differences: right-to-left phrasing, Arabic numerals optional.

APP CONFIG — src/app/app.config.ts:
import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './core/services/config.service';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { routes } from './app.routes';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom(TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
      defaultLang: 'en'
    })),
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigService], multi: true }
  ]
};

CORE SERVICES:

ThemeService (src/app/core/services/theme.service.ts):
- Signal: isDark = signal(localStorage.getItem('sm_theme') === 'dark')
- toggle(): flip signal, add/remove .dark-theme on document.body, save to localStorage
- On construction: apply initial theme class

ConfigService (src/app/core/services/config.service.ts):
- Signal: stockControl = signal(true)
- Signal: config = signal<AppConfig | null>(null)
- loadConfig(): GET /api/configuration → set signals (called in APP_INITIALIZER)
- updateConfig(config): PUT /api/configuration → update signal
- testConnection(credentials): POST /api/configuration/test-connection
- updateStockControl(value: boolean): PUT /api/configuration with just stockControl changed → update signal

CartService (src/app/core/services/cart.service.ts):
- Signal: cartItems = signal<CartItem[]>([])
- Inject ConfigService for stockControl signal
- addItem(item: ItemDto): 
    If stockControl() === true AND item.availableStock === 0 → throw Error('OUT_OF_STOCK')
    If item already in cart → increment qty (cap at stock if stockControl)
    Else add with qty=1
- removeItem(itemId: Guid)
- updateQuantity(itemId, qty): cap at stock if stockControl
- clearCart()
- Computed signals: itemCount, subtotal, vatAmount, grandTotal

ItemService (src/app/core/services/item.service.ts):
- All typed with ApiResponse<T> interface
- getItems(page, size, search): GET /api/items
- getItem(id): GET /api/items/{id}
- checkCode(code, excludeId?): GET /api/items/check-code
- createItem(req): POST /api/items
- updateItem(id, req): PUT /api/items/{id}
- deleteItem(id): DELETE /api/items/{id}
- uploadImage(id, file): POST /api/items/{id}/image (FormData)
- getImageUrl(imagePath): returns /api/items/image/{filename}

ERROR INTERCEPTOR (src/app/core/interceptors/error.interceptor.ts):
- Functional interceptor
- On HTTP error: extract message from ApiResponse error body if available, fallback to HTTP status message
- Show MatSnackBar with translated error message
- Re-throw error for component-level handling

APP ROUTES (src/app/app.routes.ts):
const routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', loadComponent: () => import('./features/items/item-list/item-list.component') },
  { path: 'configuration', loadComponent: () => import('./features/configuration/config-panel/config-panel.component') }
];

APP COMPONENT (src/app/app.component.ts) — standalone:
- Inject TranslateService, ThemeService
- Template: MatToolbar with app title, nav links (Items, Cart badge, Config), dark/light toggle button, EN/AR toggle button
- MatSidenav layout: sidenav = cart sidebar, main content = router-outlet
- Apply [dir]="currentDir" based on active language ('ar' → 'rtl', else 'ltr') on host element
- On language change: update document.documentElement.dir and document.documentElement.lang

DELIVER:
- Full project scaffold with all files listed above
- Both translation JSON files with 100% key coverage
- All services with complete implementation
- App component with working toolbar
- Styles.scss with both themes defined
```

---

## Phase 1 — Prompt D: Items Feature (Grid + Form)

```
TASK: Implement the Items feature for stock_management — data grid and add/edit form dialog.

ITEM LIST COMPONENT (src/app/features/items/item-list/item-list.component.ts):
Standalone. Imports: MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, MatInputModule, MatTooltipModule, MatChipsModule, MatProgressBarModule, MatBadgeModule, TranslateModule.

Template layout:
1. Header row: h2 translate="ITEMS.TITLE" | spacer | search input | Add button (MatIcon add)
2. MatProgressBar [mode]="'indeterminate'" *ngIf="loading()"
3. MatTable [dataSource]="items()" matSort (matSortChange)="onSortChange($event)":

   Column: image → <img [src]="item.imageUrl || 'assets/no-image.png'" width="48" height="48" style="object-fit:cover;border-radius:4px" (click)="openImagePreview(item)">
   Column: itemCode → {{ item.itemCode }}
   Column: name → {{ currentLang() === 'ar' ? item.nameAR : item.nameEN }}
   Column: price → {{ item.price | number:'1.2-2' }}
   Column: vatPercentage → MatChip [color]="item.vatPercentage === 0 ? 'primary' : 'warn'": {{ item.vatPercentage }}%
   Column: netTotal → <strong>{{ item.netTotal | number:'1.2-2' }}</strong>
   Column: availableStock → colored badge span: [class.stock-ok]="item.availableStock >= 10" [class.stock-warn]="item.availableStock > 0 && item.availableStock < 10" [class.stock-zero]="item.availableStock === 0"
   Column: createdAt → {{ item.createdAt | date:'dd/MM/yyyy HH:mm' }}
   Column: actions →
     - Add to Cart button: MatIconButton, icon=add_shopping_cart, [disabled]="isCartDisabled(item)", [matTooltip]="isCartDisabled(item) ? ('ITEMS.NO_STOCK' | translate) : ('ITEMS.ADD_TO_CART' | translate)", (click)="addToCart(item)"
     - Edit button: MatIconButton, icon=edit, (click)="openEditDialog(item)"
     - Delete button: MatIconButton, icon=delete, color=warn, (click)="confirmDelete(item)"

4. MatPaginator: [length]="totalCount()" [pageSize]="pageSize()" [pageSizeOptions]="[10,25,50]" (page)="onPageChange($event)"
5. Empty state div: *ngIf="!loading() && items().length === 0": icon inventory_2 + translate="ITEMS.EMPTY"

Logic (signals-based):
- items = signal<ItemDto[]>([])
- loading = signal(false)
- totalCount = signal(0)
- page = signal(1)
- pageSize = signal(10)
- searchQuery = signal('')
- currentLang = computed from TranslateService current lang
- isCartDisabled(item): configService.stockControl() === true && item.availableStock === 0
- loadItems(): sets loading=true, calls itemService.getItems(), updates items + totalCount, loading=false
- addToCart(item): try cartService.addItem(item), catch OUT_OF_STOCK → show snackbar
- openEditDialog(item): open ItemFormComponent as MatDialog with { data: item }
- openAddDialog(): open ItemFormComponent as MatDialog with { data: null }
- confirmDelete(item): open ConfirmDialogComponent → on confirm → deleteItem → reload → snackbar
- Search: debounceTime(300) on search input, reset page to 1, reload

ITEM FORM COMPONENT (src/app/features/items/item-form/item-form.component.ts):
Standalone. Opens as MatDialog. Receives optional Item via MAT_DIALOG_DATA.

Reactive form with FormBuilder:
itemCode: [existingValue, [Validators.required, Validators.maxLength(50)], [uniqueCodeValidator(itemService, existingId)]]
nameEN: [existingValue, [Validators.required, Validators.maxLength(200)]]
nameAR: [existingValue, [Validators.required, Validators.maxLength(200)]]
price: [existingValue, [Validators.required, Validators.min(0)]]
vatPercentage: [existingValue, [Validators.required]]  
availableStock: [existingValue, [Validators.required, Validators.min(0)]]

NetTotal computed display:
- Listen: this.form.valueChanges.pipe(map(() => this.computeNetTotal()))
- computeNetTotal(): price + (price * vat / 100), show in a readonly MatInput

Image handling:
- selectedFile: File | null = null
- imagePreviewUrl: string | null = null (existing item's image or selected file preview)
- onFileSelected(event): validate MIME + size client-side → show inline error or set preview
- FileReader for preview URL

Async unique code validator (uniqueCodeValidator):
- AsyncValidatorFn factory
- debounceTime(400), distinctUntilChanged
- calls itemService.checkCode(code, excludeId)
- returns null if unique, { codeTaken: true } if not
- shows FORM.CODE_CHECKING while pending

Template:
- MatDialogTitle: translate="ITEMS.ADD" or "ITEMS.EDIT"
- MatDialogContent: form with all fields using matFormField + matInput
- NameAR field: add dir="rtl" attribute
- VatPercentage: MatSelect with options 0 and 15
- Image: file input (hidden) + MatButton to trigger it + img preview thumbnail
- NetTotal: readonly MatInput showing computed value
- All fields: mat-error with translated validation messages
- MatDialogActions: Cancel + Save buttons. Save [disabled]="form.invalid || form.pending || saving"

onSave():
1. If selectedFile → uploadImage(id, file) first (for edit) or save item then upload image (for create)
2. For create: POST item → get new ID → if image selected → upload → show snackbar → close dialog
3. For edit: PUT item → if new image selected → upload → show snackbar → close dialog
4. On error: show snackbar, keep dialog open

CONFIRM DIALOG COMPONENT (src/app/shared/components/confirm-dialog/):
- Standalone, receives { message: string } via MAT_DIALOG_DATA
- Returns true on confirm, false on cancel
- Uses translate pipe for Yes/No buttons

CSS for item-list:
.stock-ok { color: #2e7d32; font-weight: 600; }
.stock-warn { color: #e65100; font-weight: 600; }
.stock-zero { color: #c62828; font-weight: 600; }
tr.mat-row:hover { background: rgba(0,0,0,0.04); }
.dark-theme tr.mat-row:hover { background: rgba(255,255,255,0.04); }

DELIVER:
- Full ItemListComponent with all 9 columns and behaviors
- Full ItemFormComponent with async validator and image upload
- ConfirmDialogComponent
- All components correctly wired to routes
- Working EN/AR column name switching
```

---

## Phase 1 — Prompt E: Cart Sidebar + Configuration Tab

```
TASK: Implement CartSidebar and ConfigPanel components for stock_management.

CART SIDEBAR COMPONENT (src/app/features/cart/cart-sidebar/cart-sidebar.component.ts):
Standalone. Used as MatSidenav content in AppComponent.
Inject CartService, ConfigService, TranslateService.

Template:
- Header: icon shopping_cart + translate="CART.TITLE" + close button (MatIconButton, icon=close, emits closeCart event)
- Empty state: *ngIf="cartService.itemCount() === 0": icon remove_shopping_cart + translate="CART.EMPTY"
- Item list: *ngFor="let cartItem of cartService.cartItems()":
    MatCard: image 40x40 | name (lang-aware) | unit price | quantity MatInputNumber with +/- buttons | line total | MatIconButton delete
    Quantity constraints: [max]="configService.stockControl() ? cartItem.item.availableStock : 9999"
    On qty change → cartService.updateQuantity(cartItem.id, newQty) → if exceeds stock: show inline warn
- Divider
- Summary section:
    Row: translate="CART.SUBTOTAL" | {{ cartService.subtotal() | number:'1.2-2' }}
    Row: translate="CART.VAT_AMOUNT" | {{ cartService.vatAmount() | number:'1.2-2' }}
    Row bold: translate="CART.GRAND_TOTAL" | {{ cartService.grandTotal() | number:'1.2-2' }}
- Action buttons: 
    MatButton warn "CART.CLEAR" → open confirm dialog → cartService.clearCart()
    MatButton primary "CART.PROCEED" (disabled, matTooltip="Coming in Phase 2")

CONFIGURATION PANEL COMPONENT (src/app/features/configuration/config-panel/config-panel.component.ts):
Standalone. Inject ConfigService, TranslateService, MatSnackBar.

Template — two MatCard sections:

Section 1 — Database Connection (matCardTitle: "CONFIG.DB_SECTION"):
Reactive form with fields:
  server: [config.serverName, Validators.required]
  databaseName: [config.databaseName, Validators.required]  
  username: [config.dbUsername, Validators.required]
  password: ['', Validators.required]  ← never pre-fill, user must re-enter to change
  
Each field: matFormField + matInput with label from translate pipe.
Password field: [type]="showPassword ? 'text' : 'password'" + MatIconButton suffix to toggle showPassword.

Buttons row:
  MatButton outlined: translate="CONFIG.TEST" (click)="testConnection()" [disabled]="testing"
  MatButton primary: translate="CONFIG.SAVE" (click)="saveConfig()" [disabled]="saving || configForm.invalid"

testConnection():
  → set testing=true
  → configService.testConnection(form values)
  → show snackbar: success = "CONFIG.TEST_SUCCESS" (green), fail = "CONFIG.TEST_FAIL: {message}" (red)
  → testing=false

saveConfig():
  → set saving=true
  → configService.updateConfig({...form values, stockControl: currentStockControl})
  → on success: show success snackbar
  → saving=false

Section 2 — Stock Settings (matCardTitle: "CONFIG.STOCK_SECTION"):
- MatSlideToggle [(ngModel)]="stockControlValue" (change)="onStockControlChange($event)":
    Label: translate="CONFIG.STOCK_CONTROL"
- Info paragraph:
    *ngIf="stockControlValue": translate="CONFIG.STOCK_ON" (class: text-success)
    *ngIf="!stockControlValue": translate="CONFIG.STOCK_OFF" (class: text-warn)
- onStockControlChange: calls configService.updateStockControl(value) → success snackbar

On component init: load current config from configService.config() signal → pre-fill form (except password)

DELIVER:
- CartSidebarComponent complete with quantity controls and summary
- ConfigPanelComponent complete with test-connection and stock toggle
- Both components styled consistently with light/dark themes
- Both components fully translated (EN/AR)
- Wire cart sidenav toggle to toolbar cart button in AppComponent
```

---

## Reusable Fix Prompts

### Fix Validation Error
```
In stock_management frontend, the field [fieldName] in ItemFormComponent is showing incorrect validation: [describe issue].
Expected: [describe correct behavior].
Fix using Angular Reactive Forms validators. Do not change other fields or form structure.
```

### Add Translation Key
```
Add missing translation key "[KEY.PATH]" to both en.json and ar.json in stock_management frontend.
English value: "[value]"
Arabic value: "[value]"
Then use it in [ComponentName] with the translate pipe.
```

### Fix EF Core Migration
```
In stock_management backend, the EF Core migration [MigrationName] has issue: [describe].
Fix the migration Up() and Down() methods. Do not change the model — only fix the migration SQL.
```

### Add New Column to Items
```
In stock_management, add a new column [ColumnName] of type [SqlType] to the Items table.
Rules: [describe constraints].
Update: Item.cs model, CreateItemRequest.cs, UpdateItemRequest.cs, ItemDto.cs, ItemService.cs mapping, en.json + ar.json translation keys, ItemFormComponent form field and grid column.
Generate new EF Core migration named "Add[ColumnName]ToItems".
```

---

## Phase 1 Acceptance Criteria

| #   | Scenario                               | Pass Condition                                                                        |
| --- | -------------------------------------- | ------------------------------------------------------------------------------------- |
| 1   | API startup                            | `D:\stock_managment\` and `assets\items\` created. DB migrated. Config row seeded.    |
| 2   | Add item (all fields valid)            | Item appears in grid. NetTotal = Price + VAT correctly.                               |
| 3   | Add item (ItemCode duplicate)          | 409 from API. Frontend shows "Code already in use" inline error.                      |
| 4   | Add item (Price = -1)                  | 400 validation error.                                                                 |
| 5   | Upload image (PNG, 2MB)                | Image saved to `D:\stock_managment\assets\items\{guid}.png`. Thumbnail shown in grid. |
| 6   | Upload image (PDF file)                | Rejected with "Only JPG and PNG" error. No file saved.                                |
| 7   | Edit item                              | Changes reflected immediately in grid. DB updated.                                    |
| 8   | Delete item                            | Row removed from grid. `IsDeleted = 1` in DB. Image file still on disk.               |
| 9   | Add to cart, StockControl=ON, Stock=0  | Button disabled. Tooltip shows "Out of stock" message.                                |
| 10  | Add to cart, StockControl=OFF, Stock=0 | Button enabled. Item added to cart.                                                   |
| 11  | Cart qty > stock, StockControl=ON      | Qty capped at stock level. Warning shown.                                             |
| 12  | Switch language EN→AR                  | Grid column names, form labels, tooltips all switch to Arabic. Layout flips RTL.      |
| 13  | Switch Dark mode                       | Background and text switch smoothly. All components adapt. Persists on reload.        |
| 14  | Config: Test Connection                | Success/fail snackbar based on actual SQL Server connectivity.                        |
| 15  | Config: Toggle Stock Control           | Toggle state saved to DB. Cart behavior changes immediately without page reload.      |
| 16  | NetTotal live calculation              | Changing Price or VAT in form updates NetTotal display instantly.                     |

----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------

# order_management — Full Refactor Prompt
**Type:** Project-wide rename + feature removal + folder restructure
**Scope:** Backend (.NET 9 Web API) + Frontend (Angular 18 Standalone) + Database (SQL Server)
**Changes Applied:**
1. Every occurrence of the word "stock" in any casing → replaced with "order" (matching casing)
2. `AvailableStock` column and every line of stock-related logic removed from every file
3. Project folder structure flattened: `backend/` and `frontend/` contain all files directly — no subfolders

---

## MASTER REFACTOR PROMPT
> Copy everything inside this block and feed it as a single prompt to Claude Code, Cursor, or Copilot.
> Do not split it across sessions. Apply all changes in one pass.

```
You are performing a full refactor of the order_management project (previously called stock_management).
Apply every instruction below across every file in the project without exception.
Do not skip any file. Do not leave any partial reference. Do not summarize — implement every change explicitly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 0 — FOLDER STRUCTURE RESTRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The final project must have this exact flat structure:

  order_management/
  ├── backend/
  │   ├── Program.cs
  │   ├── AppDbContext.cs
  │   ├── Item.cs
  │   ├── AppConfiguration.cs
  │   ├── ApiResponse.cs
  │   ├── ItemDto.cs
  │   ├── CreateItemRequest.cs
  │   ├── UpdateItemRequest.cs
  │   ├── ItemService.cs
  │   ├── IItemService.cs
  │   ├── FileStorageService.cs
  │   ├── IFileStorageService.cs
  │   ├── ItemsController.cs
  │   ├── ConfigurationController.cs
  │   ├── GlobalExceptionMiddleware.cs
  │   ├── OrderManagement.API.csproj
  │   └── appsettings.json
  │
  └── frontend/
      ├── app.component.ts
      ├── app.component.html
      ├── app.component.scss
      ├── app.config.ts
      ├── app.routes.ts
      ├── item.service.ts
      ├── config.service.ts
      ├── cart.service.ts
      ├── theme.service.ts
      ├── error.interceptor.ts
      ├── item-list.component.ts
      ├── item-list.component.html
      ├── item-list.component.scss
      ├── item-form.component.ts
      ├── item-form.component.html
      ├── item-form.component.scss
      ├── cart-sidebar.component.ts
      ├── cart-sidebar.component.html
      ├── cart-sidebar.component.scss
      ├── config-panel.component.ts
      ├── config-panel.component.html
      ├── config-panel.component.scss
      ├── confirm-dialog.component.ts
      ├── confirm-dialog.component.html
      ├── styles.scss
      ├── main.ts
      ├── index.html
      ├── en.json
      ├── ar.json
      ├── angular.json
      ├── package.json
      └── tsconfig.json

RULES FOR FLAT STRUCTURE:
- All backend .cs files go directly inside backend/ — no Controllers/, Models/, DTOs/, Services/, Data/, Middleware/ subfolders
- All frontend .ts, .html, .scss files go directly inside frontend/ — no app/, core/, features/, shared/ subfolders
- en.json and ar.json go directly inside frontend/ — no assets/i18n/ subfolder
- All TypeScript imports must use relative paths pointing to the same flat directory (e.g., import { ItemService } from './item.service')
- angular.json must be updated: set "root": "frontend", "sourceRoot": "frontend", and adjust all asset/style paths accordingly
- en.json and ar.json are loaded from './en.json' and './ar.json' in the TranslateHttpLoader factory
- All C# namespaces: OrderManagement.API (single namespace for all files, no sub-namespaces)
- .csproj file must use <RootNamespace>OrderManagement.API</RootNamespace>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — GLOBAL WORD REPLACEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scan every single file in the project. For every occurrence of the word "stock" in any form,
apply the replacement below. Match exact casing.

  "stock"              →  "order"
  "Stock"              →  "Order"
  "STOCK"              →  "ORDER"
  "stock_management"   →  "order_management"
  "StockManagement"    →  "OrderManagement"
  "STOCK_MANAGEMENT"   →  "ORDER_MANAGEMENT"
  "StockManagementDB"  →  "OrderManagementDB"
  "StockControl"       →  "OrderControl"
  "stockControl"       →  "orderControl"
  "STOCK_CONTROL"      →  "ORDER_CONTROL"
  "sm_theme"           →  "om_theme"
  "sm_lang"            →  "om_lang"

Apply this replacement inside ALL of the following:

CSHARP FILES (.cs):
  - Every namespace declaration: namespace StockManagement.API → namespace OrderManagement.API
  - Every using statement that references a stock namespace
  - Every class name: public class StockManagementController → public class OrderManagementController
  - Every interface name: IStockService → IOrderService
  - Every method name: GetStockItems() → GetOrderItems()
  - Every variable name: stockItem → orderItem, stockList → orderList
  - Every property name: StockCount → OrderCount
  - Every string literal: "Stock" → "Order", "stock" → "order"
  - Every XML doc comment: /// <summary>Manages stock</summary> → /// <summary>Manages order</summary>
  - Every inline comment: // stock check → // order check
  - Every exception message: throw new Exception("Stock not found") → throw new Exception("Order not found")
  - Every log message: _logger.LogInformation("Stock loaded") → _logger.LogInformation("Order loaded")
  - Every constraint name in EF config: "CK_Items_StockCount" → "CK_Items_OrderCount"
  - Every index name: "IX_Items_Stock" → "IX_Items_Order"

PROJECT FILE (.csproj):
  - <AssemblyName>StockManagement.API</AssemblyName> → <AssemblyName>OrderManagement.API</AssemblyName>
  - <RootNamespace>StockManagement.API</RootNamespace> → <RootNamespace>OrderManagement.API</RootNamespace>
  - File renamed: StockManagement.API.csproj → OrderManagement.API.csproj

APPSETTINGS.JSON:
  - Connection string Database=StockManagementDB → Database=OrderManagementDB
  - AttachDbFilename path D:\\stock_managment\\ → D:\\order_managment\\
  - Any key named "Stock..." → "Order..."
  - Any value containing "stock" → replace with "order"
  - "FileStorage" base path: D:\\stock_managment\\assets\\items → D:\\order_managment\\assets\\items

TYPESCRIPT FILES (.ts):
  - Every class name: StockService → OrderService
  - Every interface name: IStockItem → IOrderItem
  - Every method name: loadStock() → loadOrder()
  - Every variable name: stockItems → orderItems, stockControl → orderControl
  - Every property name in interfaces and classes
  - Every signal name: stockControl = signal() → orderControl = signal()
  - Every string literal: 'stock' → 'order', "stock" → "order"
  - Every localStorage key: 'sm_theme' → 'om_theme', 'sm_lang' → 'om_lang'
  - Every import path that references a file with "stock" in the name
  - Every comment: // stock service → // order service
  - Every template reference variable: #stockForm → #orderForm

HTML TEMPLATES (.html):
  - Every translate key value: translate="ITEMS.STOCK" → translate="ITEMS.ORDER"
  - Every [matTooltip] string containing "stock"
  - Every CSS class reference: class="stock-badge" → class="order-badge"
  - Every *ngIf, [disabled], or binding that uses a variable with "stock" in the name
  - Every aria-label containing "stock"
  - Every id attribute containing "stock"
  - Every placeholder text containing "stock"

SCSS FILES (.scss):
  - Every class selector: .stock-ok → .order-ok, .stock-warn → .order-warn, .stock-zero → .order-zero
  - Every comment: // stock colors → // order colors
  - Every CSS variable: --stock-color → --order-color

JSON TRANSLATION FILES (en.json and ar.json):
  - Every key containing "STOCK": replace "STOCK" with "ORDER"
  - Every key containing "Stock": replace "Stock" with "Order"
  - Every value (string) containing the word "stock": replace with "order"
  - Every value (string) containing the word "Stock": replace with "Order"
  - Every value (string) containing "STOCK": replace with "ORDER"

ANGULAR.JSON:
  - Project name: "stock-management" → "order-management"
  - Any path containing "stock": replace with "order"
  - outputPath, sourceRoot, root: update to point to frontend/ flat structure

PACKAGE.JSON:
  - "name": "stock-management-ui" → "order-management-ui"
  - Any script, description, or key containing "stock" → replace with "order"

INDEX.HTML:
  - <title>Stock Management</title> → <title>Order Management</title>
  - Any meta tag content containing "stock" → replace with "order"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — REMOVE AvailableStock FROM EVERY FILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Remove every reference to AvailableStock (and its camelCase form availableStock) from every file.
This is a complete deletion — no renaming, no replacement, no placeholder. The field does not exist.

── FILE: Item.cs ─────────────────────────────────────

REMOVE this entire line:
  public int AvailableStock { get; set; }

The final Item.cs must contain exactly these properties and no others:
  public Guid Id { get; set; }
  public string ItemCode { get; set; } = string.Empty;
  public string NameEN { get; set; } = string.Empty;
  public string NameAR { get; set; } = string.Empty;
  public string? ImagePath { get; set; }
  public decimal Price { get; set; }
  public decimal VatPercentage { get; set; }
  public decimal NetTotal { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime? UpdatedAt { get; set; }
  public bool IsDeleted { get; set; }

── FILE: CreateItemRequest.cs ────────────────────────

REMOVE this entire property and its annotations:
  [Required]
  [Range(0, int.MaxValue, ErrorMessage = "...")]
  public int AvailableStock { get; set; }

The final CreateItemRequest.cs must contain exactly these properties:
  public string ItemCode { get; set; }
  public string NameEN { get; set; }
  public string NameAR { get; set; }
  public decimal Price { get; set; }
  public decimal VatPercentage { get; set; }
  public int AvailableStock { get; set; }   ← REMOVE THIS LINE

── FILE: UpdateItemRequest.cs ────────────────────────

REMOVE: public int AvailableStock { get; set; } and all its annotations.
The UpdateItemRequest.cs must not contain AvailableStock in any form.

── FILE: ItemDto.cs ──────────────────────────────────

REMOVE: public int AvailableStock { get; set; }
The ItemDto.cs must not contain AvailableStock in any form.
Remove also from any mapping expression:
  REMOVE: AvailableStock = item.AvailableStock,

── FILE: AppDbContext.cs ─────────────────────────────

REMOVE every line referencing AvailableStock:
  REMOVE: .Property(i => i.AvailableStock).HasDefaultValue(0);
  REMOVE: .HasCheckConstraint("CK_Items_AvailableStock", "AvailableStock >= 0");
  REMOVE: .HasIndex(i => i.AvailableStock)... (if present)
  REMOVE: any seed data line that sets AvailableStock = ...

The Items entity configuration must not mention AvailableStock anywhere.

── FILE: ItemService.cs ──────────────────────────────

REMOVE every line that reads, writes, or evaluates AvailableStock:

  REMOVE from CreateItemAsync mapping:
    AvailableStock = request.AvailableStock,

  REMOVE from UpdateItemAsync mapping:
    existingItem.AvailableStock = request.AvailableStock;

  REMOVE from any ItemDto mapping:
    AvailableStock = item.AvailableStock,

  REMOVE any method or logic block that checks:
    if (item.AvailableStock <= 0) { ... }
    item.AvailableStock -= quantity;
    item.AvailableStock = 0;

  REMOVE the IsOrderDisabled() or IsCartDisabled() method if it references AvailableStock.

  REMOVE any GetItemsAsync filter or sort by AvailableStock.

── FILE: IItemService.cs ─────────────────────────────

REMOVE any method signature that takes or returns AvailableStock:
  REMOVE: Task<bool> CheckOrderAvailabilityAsync(Guid id, int quantity);
  REMOVE: Task UpdateOrderCountAsync(Guid id, int newCount);
  REMOVE: any method where AvailableStock is a parameter or return field

── FILE: ItemsController.cs ──────────────────────────

REMOVE every reference to AvailableStock in all endpoints:
  REMOVE: any [FromBody] or [FromQuery] parameter named availableStock or AvailableStock
  REMOVE: any response property mapping AvailableStock
  REMOVE: any action method that exists solely to read or update AvailableStock
  REMOVE: any endpoint logic that checks stock before allowing cart operations:
    REMOVE: if (item.AvailableStock == 0) return BadRequest(...)
    REMOVE: if (quantity > item.AvailableStock) return BadRequest(...)

── FILE: ConfigurationController.cs ─────────────────

REMOVE from the GET endpoint response DTO:
  REMOVE: OrderControl (or StockControl) property from the response object

REMOVE from the PUT endpoint request DTO:
  REMOVE: OrderControl (or StockControl) property from the request body

REMOVE any method:
  REMOVE: Task<IActionResult> UpdateOrderControl(bool value)
  REMOVE: any endpoint that toggles OrderControl or StockControl independently

── FILE: AppConfiguration.cs ────────────────────────

REMOVE this property entirely:
  public bool StockControl { get; set; } = true;
  (or after rename: public bool OrderControl { get; set; } = true;)

The final AppConfiguration.cs must contain exactly these properties:
  public int Id { get; set; }
  public string ServerName { get; set; } = ".";
  public string DatabaseName { get; set; } = "OrderManagementDB";
  public string DbUsername { get; set; } = "sa";
  public string DbPassword { get; set; } = string.Empty;
  public DateTime? UpdatedAt { get; set; }

── FILE: AppDbContext.cs (AppConfiguration seed) ────

REMOVE OrderControl / StockControl from the HasData seed:
  BEFORE: new AppConfiguration { Id = 1, ServerName = ".", ..., StockControl = true }
  AFTER:  new AppConfiguration { Id = 1, ServerName = ".", ..., UpdatedAt = null }
  (Remove StockControl / OrderControl from seed entirely)

── FILE: GlobalExceptionMiddleware.cs ────────────────

REMOVE any catch block, log statement, or error message that contains the word "stock".
Replace with "order" equivalents if the message is still meaningful; otherwise delete the line.

── FILE: item.service.ts ─────────────────────────────

REMOVE from the ItemDto TypeScript interface:
  availableStock?: number;
  availableStock: number;

REMOVE from CreateItemRequest TypeScript interface:
  availableStock: number;

REMOVE from UpdateItemRequest TypeScript interface:
  availableStock?: number;

REMOVE any method in ItemService that checks or updates stock:
  REMOVE: checkOrderAvailability(id: string, qty: number): Observable<...>
  REMOVE: updateOrderCount(id: string, count: number): Observable<...>
  REMOVE: any method body line that reads item.availableStock

── FILE: config.service.ts ──────────────────────────

REMOVE these signals entirely:
  orderControl = signal<boolean>(true);
  stockControl = signal<boolean>(true);

REMOVE these methods entirely:
  updateOrderControl(value: boolean): Observable<...> { ... }
  updateStockControl(value: boolean): Observable<...> { ... }

REMOVE from AppConfig interface:
  orderControl?: boolean;
  stockControl?: boolean;

REMOVE from loadConfig() method:
  Any line that reads config.orderControl or config.stockControl and sets a signal

The final loadConfig() must only load: serverName, databaseName, dbUsername, dbPassword.
No stock or order control signal is loaded, stored, or exposed.

── FILE: cart.service.ts ────────────────────────────

REMOVE from addItem() method — delete these blocks entirely:
  if (configService.orderControl() === true && item.availableStock === 0) {
    throw new Error('OUT_OF_ORDER');
  }
  (also remove any variant: stockControl, OUT_OF_STOCK, availableStock check)

REMOVE from addItem() — delete any cap logic:
  const maxQty = configService.orderControl() ? item.availableStock : Infinity;
  if (existingItem.quantity >= maxQty) { return; }
  (any version of this cap)

REMOVE from updateQuantity() method — delete any upper bound:
  const max = configService.orderControl() ? item.availableStock : 9999;
  if (newQty > max) newQty = max;
  (any version of this cap)

REMOVE from CartItem interface:
  maxQty?: number;
  availableStock?: number;
  (any property derived from availableStock)

REMOVE the inject(ConfigService) from CartService if it was only injected for stock/order control.
If ConfigService is used for nothing else in CartService, remove the injection entirely.

The final addItem() must be unconditional:
  addItem(item: ItemDto): void {
    const items = this.cartItems();
    const existing = items.find(i => i.item.id === item.id);
    if (existing) {
      this.cartItems.set(items.map(i =>
        i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      this.cartItems.set([...items, { item, quantity: 1 }]);
    }
  }

The final updateQuantity() must accept any positive integer with no upper bound:
  updateQuantity(itemId: string, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(itemId);
      return;
    }
    this.cartItems.set(
      this.cartItems().map(i =>
        i.item.id === itemId ? { ...i, quantity } : i
      )
    );
  }

── FILE: item-list.component.ts ─────────────────────

REMOVE from displayedColumns array:
  'availableStock'   (or 'stock' or any variant)

REMOVE this method entirely:
  isCartDisabled(item: ItemDto): boolean {
    return this.configService.orderControl() && item.availableStock === 0;
  }
  (also remove any variant: isStockDisabled, isOutOfOrder, isOutOfStock)

REMOVE any inject(ConfigService) in this component if it was only used for the above method.

REMOVE any signal or computed value derived from availableStock:
  REMOVE: stockBadgeClass(item) or orderBadgeClass(item) methods
  REMOVE: getOrderStatusColor(item) or getStockStatusColor(item) methods

── FILE: item-list.component.html ───────────────────

REMOVE the entire Available Stock column definition:
  <ng-container matColumnDef="availableStock">
    ...entire block including <th mat-header-cell> and <td mat-cell>...
  </ng-container>
  (remove every line of this column, including the closing </ng-container>)

REMOVE the stock badge span and all its bindings:
  <span [class.stock-ok]="..." [class.stock-warn]="..." [class.stock-zero]="...">
    {{ item.availableStock }}
  </span>
  (remove completely)

REMOVE [disabled] binding from the Add to Cart button:
  BEFORE: <button mat-icon-button [disabled]="isCartDisabled(item)" [matTooltip]="...">
  AFTER:  <button mat-icon-button [matTooltip]="'ITEMS.ADD_TO_CART' | translate">
  The button must have no [disabled] attribute. Remove it entirely.

REMOVE stock-related matTooltip content:
  REMOVE: [matTooltip]="isCartDisabled(item) ? ('ITEMS.NO_ORDER' | translate) : ('ITEMS.ADD_TO_CART' | translate)"
  REPLACE WITH: [matTooltip]="'ITEMS.ADD_TO_CART' | translate"

── FILE: item-list.component.scss ───────────────────

REMOVE these CSS classes entirely — every line of each:
  .stock-ok { ... }
  .stock-warn { ... }
  .stock-zero { ... }
  .order-ok { ... }
  .order-warn { ... }
  .order-zero { ... }

REMOVE any CSS variable or mixin that references stock or order count coloring.

── FILE: item-form.component.ts ─────────────────────

REMOVE from the FormGroup / FormBuilder initialization:
  availableStock: [0, [Validators.required, Validators.min(0)]]
  (remove this FormControl entirely — do not replace it)

REMOVE any reference to availableStock in the form:
  REMOVE: this.form.get('availableStock')?.setValue(...)
  REMOVE: this.form.value.availableStock
  REMOVE: request.availableStock = this.form.value.availableStock
  REMOVE: patchValue({ availableStock: item.availableStock })

── FILE: item-form.component.html ───────────────────

REMOVE the entire Available Stock form field block:
  <mat-form-field>
    <mat-label>{{ 'ITEMS.ORDER' | translate }}</mat-label>
    <input matInput type="number" formControlName="availableStock" ... />
    <mat-error *ngIf="...">...</mat-error>
  </mat-form-field>
  (remove every line of this field)

── FILE: cart-sidebar.component.ts ──────────────────

REMOVE any inject(ConfigService) if it was only used for order/stock control.
REMOVE any computed value that reads configService.orderControl().
REMOVE any method that checks or caps quantity against availableStock:
  REMOVE: getMaxQty(item: ItemDto): number { return this.configService.orderControl() ? item.availableStock : 9999; }
  REMOVE: isQtyAtMax(cartItem: CartItem): boolean { ... }

── FILE: cart-sidebar.component.html ────────────────

REMOVE [max] binding from the quantity input:
  BEFORE: <input type="number" [max]="getMaxQty(cartItem.item)" ...>
  AFTER:  <input type="number" min="1" ...>

REMOVE stock limit warning message:
  <p *ngIf="isQtyAtMax(cartItem)" class="warn-text">
    {{ 'CART.ORDER_LIMIT' | translate }}
  </p>
  (remove entirely)

REMOVE any *ngIf on the + button that checked stock:
  BEFORE: <button [disabled]="cartItem.quantity >= getMaxQty(cartItem.item)">+</button>
  AFTER:  <button>+</button>

── FILE: config-panel.component.ts ──────────────────

REMOVE these properties entirely:
  orderControlValue: boolean = true;
  stockControlValue: boolean = true;
  showOrderControl: boolean;

REMOVE this method entirely:
  onOrderControlChange(event: MatSlideToggleChange): void {
    this.configService.updateOrderControl(event.checked);
    ...
  }
  (also remove any variant: onStockControlChange)

REMOVE any subscription or effect that watches orderControl or stockControl.

REMOVE from the form initialization any field named orderControl or stockControl.

REMOVE from saveConfig():
  Any line that sends orderControl or stockControl to the API:
    REMOVE: orderControl: this.orderControlValue,
    REMOVE: stockControl: this.stockControlValue,

── FILE: config-panel.component.html ────────────────

REMOVE the entire Section 2 "Order Settings" MatCard block:
  <mat-card>
    <mat-card-header>
      <mat-card-title>{{ 'CONFIG.ORDER_SECTION' | translate }}</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <mat-slide-toggle ...>{{ 'CONFIG.ORDER_CONTROL' | translate }}</mat-slide-toggle>
      <p *ngIf="orderControlValue">{{ 'CONFIG.ORDER_ON' | translate }}</p>
      <p *ngIf="!orderControlValue">{{ 'CONFIG.ORDER_OFF' | translate }}</p>
    </mat-card-content>
  </mat-card>
  (remove every line of this entire MatCard — opening tag to closing tag)

The config-panel.component.html must contain only one MatCard: Section 1 Database Connection.

── FILE: en.json ─────────────────────────────────────

REMOVE these keys entirely from the JSON object (delete the key-value pair, fix trailing commas):
  "ITEMS": {
    REMOVE KEY: "STOCK": "Available Order"      ← was "Available Stock"
    REMOVE KEY: "NO_STOCK": "..."               ← was "Out of stock — cannot add to cart"
                                                   (also remove after rename: "NO_ORDER": "...")
  }
  "CART": {
    REMOVE KEY: "STOCK_LIMIT": "..."            ← was "Quantity cannot exceed available stock"
                                                   (also remove after rename: "ORDER_LIMIT": "...")
  }
  "CONFIG": {
    REMOVE KEY: "ORDER_SECTION": "..."          ← was "Stock Settings"
    REMOVE KEY: "ORDER_CONTROL": "..."          ← was "Enable Stock Control"
    REMOVE KEY: "ORDER_ON": "..."               ← was "ON: Cart respects available stock"
    REMOVE KEY: "ORDER_OFF": "..."              ← was "OFF: Unlimited cart additions"
  }
  "FORM": {
    REMOVE KEY: "MIN_VALUE": "..."              ← only if this key was used exclusively for stock field
  }

After removals, scan all remaining en.json values for the word "stock":
  Replace any remaining value text containing "stock" (case-insensitive) with "order" equivalent.

── FILE: ar.json ─────────────────────────────────────

REMOVE the exact same keys listed above for en.json.
Apply all the same rules to Arabic translation values.
After removals, scan all remaining ar.json values for any Arabic text that translates "stock":
  Replace with Arabic equivalent of "order".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — DATABASE MIGRATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate three EF Core migrations. Place migration files directly inside backend/ alongside all other .cs files.

MIGRATION 1 — "RenameProjectToOrderManagement"
Up():
  // Rename database objects from Stock to Order naming convention
  // No table renames needed (Items and AppConfiguration tables keep same names)
  // Rename constraints that contain "Stock":
  migrationBuilder.Sql("EXEC sp_rename 'CK_Items_AvailableStock', 'CK_Items_AvailableOrder'");
  // (only if constraint exists — wrap in IF EXISTS check)
  migrationBuilder.Sql(@"
    IF EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_Items_AvailableStock')
      EXEC sp_rename 'CK_Items_AvailableStock', 'CK_Items_AvailableOrder'
  ");
Down():
  migrationBuilder.Sql(@"
    IF EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_Items_AvailableOrder')
      EXEC sp_rename 'CK_Items_AvailableOrder', 'CK_Items_AvailableStock'
  ");

MIGRATION 2 — "RemoveAvailableStockColumn"
Up():
  // Drop the CHECK constraint first (SQL Server requires this before dropping column)
  migrationBuilder.Sql(@"
    IF EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_Items_AvailableStock')
      ALTER TABLE Items DROP CONSTRAINT CK_Items_AvailableStock;
    IF EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_Items_AvailableOrder')
      ALTER TABLE Items DROP CONSTRAINT CK_Items_AvailableOrder;
  ");
  migrationBuilder.DropColumn(name: "AvailableStock", table: "Items");
Down():
  migrationBuilder.AddColumn<int>(
    name: "AvailableStock",
    table: "Items",
    type: "int",
    nullable: false,
    defaultValue: 0);
  migrationBuilder.Sql(
    "ALTER TABLE Items ADD CONSTRAINT CK_Items_AvailableOrder CHECK (AvailableStock >= 0)");

MIGRATION 3 — "RemoveOrderControlFromConfig"
Up():
  // Drop StockControl if it was never renamed (ran before migration 1)
  migrationBuilder.Sql(@"
    IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('AppConfiguration') AND name = 'StockControl')
      ALTER TABLE AppConfiguration DROP COLUMN StockControl;
    IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('AppConfiguration') AND name = 'OrderControl')
      ALTER TABLE AppConfiguration DROP COLUMN OrderControl;
  ");
Down():
  migrationBuilder.AddColumn<bool>(
    name: "OrderControl",
    table: "AppConfiguration",
    type: "bit",
    nullable: false,
    defaultValue: true);

Run in Package Manager Console from the backend/ folder:
  Add-Migration RenameProjectToOrderManagement
  Add-Migration RemoveAvailableStockColumn
  Add-Migration RemoveOrderControlFromConfig
  Update-Database

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — IMPORT PATH CORRECTIONS (FLAT STRUCTURE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After moving all files to their flat locations, update every TypeScript import path.
Every import must use './' prefix pointing to the same directory. No subdirectory paths.

In app.config.ts:
  CHANGE: import { ConfigService } from './core/services/config.service'
  TO:     import { ConfigService } from './config.service'

  CHANGE: import { errorInterceptor } from './core/interceptors/error.interceptor'
  TO:     import { errorInterceptor } from './error.interceptor'

  CHANGE: TranslateHttpLoader(http, './assets/i18n/', '.json')
  TO:     TranslateHttpLoader(http, './', '.json')

In app.routes.ts:
  CHANGE: import('./features/items/item-list/item-list.component')
  TO:     import('./item-list.component')

  CHANGE: import('./features/configuration/config-panel/config-panel.component')
  TO:     import('./config-panel.component')

  CHANGE: import('./features/cart/cart-sidebar/cart-sidebar.component')
  TO:     import('./cart-sidebar.component')

In app.component.ts:
  CHANGE: import { ThemeService } from './core/services/theme.service'
  TO:     import { ThemeService } from './theme.service'
  CHANGE: import { ConfigService } from './core/services/config.service'
  TO:     import { ConfigService } from './config.service'
  CHANGE: import { CartService } from './core/services/cart.service'
  TO:     import { CartService } from './cart.service'
  CHANGE: import { CartSidebarComponent } from './features/cart/...'
  TO:     import { CartSidebarComponent } from './cart-sidebar.component'

In item-list.component.ts:
  CHANGE: import { ItemService } from '../../../core/services/item.service'
  TO:     import { ItemService } from './item.service'
  CHANGE: import { CartService } from '../../../core/services/cart.service'
  TO:     import { CartService } from './cart.service'
  CHANGE: import { ItemFormComponent } from '../item-form/item-form.component'
  TO:     import { ItemFormComponent } from './item-form.component'
  CHANGE: import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/...'
  TO:     import { ConfirmDialogComponent } from './confirm-dialog.component'

In item-form.component.ts:
  CHANGE: import { ItemService } from '../../../core/services/item.service'
  TO:     import { ItemService } from './item.service'

In cart-sidebar.component.ts:
  CHANGE: import { CartService } from '../../../core/services/cart.service'
  TO:     import { CartService } from './cart.service'

In config-panel.component.ts:
  CHANGE: import { ConfigService } from '../../../core/services/config.service'
  TO:     import { ConfigService } from './config.service'

In all .ts files:
  CHANGE: import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component'
  TO:     import { ConfirmDialogComponent } from './confirm-dialog.component'

In angular.json — update all paths for the flat structure:
  "root": "frontend",
  "sourceRoot": "frontend",
  "index": "frontend/index.html",
  "main": "frontend/main.ts",
  "styles": ["frontend/styles.scss"],
  "assets": ["frontend/en.json", "frontend/ar.json"]
  (remove any reference to src/, assets/i18n/, or subdirectory paths)

In C# files — update namespaces after moving to flat backend/ folder:
  All files must use single namespace: namespace OrderManagement.API
  Remove any sub-namespace like OrderManagement.API.Controllers, OrderManagement.API.Models, etc.
  Remove all using statements that imported from sub-namespaces of the same project.
  (e.g., REMOVE: using OrderManagement.API.Models; — not needed in flat structure)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — COMPLETE STATE OF EACH FILE AFTER REFACTOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After applying all changes, each file must match this specification exactly.

── backend/Item.cs ───────────────────────────────────
namespace OrderManagement.API;
public class Item
{
    public Guid Id { get; set; }
    public string ItemCode { get; set; } = string.Empty;
    public string NameEN { get; set; } = string.Empty;
    public string NameAR { get; set; } = string.Empty;
    public string? ImagePath { get; set; }
    public decimal Price { get; set; }
    public decimal VatPercentage { get; set; }
    public decimal NetTotal { get; set; }           // persisted computed column
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsDeleted { get; set; }
}
// NO AvailableStock property. NO StockControl reference. NO stock word anywhere.

── backend/AppConfiguration.cs ──────────────────────
namespace OrderManagement.API;
public class AppConfiguration
{
    public int Id { get; set; }
    public string ServerName { get; set; } = ".";
    public string DatabaseName { get; set; } = "OrderManagementDB";
    public string DbUsername { get; set; } = "sa";
    public string DbPassword { get; set; } = string.Empty;
    public DateTime? UpdatedAt { get; set; }
}
// NO StockControl. NO OrderControl. NO stock word anywhere.

── backend/appsettings.json ──────────────────────────
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=OrderManagementDB;User Id=sa;Password=P@ssw0rd;TrustServerCertificate=True;AttachDbFilename=D:\\order_managment\\OrderManagementDB.mdf;"
  },
  "FileStorage": {
    "BasePath": "D:\\order_managment\\assets\\items"
  },
  "AllowedHosts": "*"
}
// NO stock word anywhere in this file.

── frontend/item-list.component.ts (key parts) ───────
// displayedColumns must be exactly:
displayedColumns: string[] = ['image', 'itemCode', 'name', 'price', 'vatPercentage', 'netTotal', 'createdAt', 'actions'];
// NO 'availableStock' or 'stock' in this array.
// NO isCartDisabled() method.
// NO isOrderDisabled() method.
// NO configService injection for stock/order control.
// Add to Cart button: always calls cartService.addItem(item) with no condition.

── frontend/cart.service.ts (addItem method) ─────────
addItem(item: ItemDto): void {
  const items = this.cartItems();
  const existing = items.find(i => i.item.id === item.id);
  if (existing) {
    this.cartItems.set(items.map(i =>
      i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    ));
  } else {
    this.cartItems.set([...items, { item, quantity: 1 }]);
  }
}
// NO stock check. NO orderControl check. NO configService. NO throw. NO cap.

── frontend/config.service.ts (signals) ──────────────
// The service must expose ONLY:
config = signal<AppConfig | null>(null);
// NO orderControl signal. NO stockControl signal. NO updateOrderControl method.
// AppConfig interface: { serverName, databaseName, dbUsername, dbPassword } ONLY.

── frontend/config-panel.component.html ──────────────
// Must contain exactly ONE MatCard section: Database Connection.
// NO second MatCard for Order/Stock settings.
// NO MatSlideToggle anywhere in this template.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6 — FINAL VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Run these checks after all changes are applied. Every check must pass.

BACKEND CHECKS:
  □ Run: grep -ri "stock" backend/
    Expected result: ZERO matches
  □ Run: dotnet build from backend/
    Expected result: Build succeeded with 0 errors
  □ Open backend/Item.cs — confirm no AvailableStock property exists
  □ Open backend/AppConfiguration.cs — confirm no StockControl or OrderControl property
  □ Open backend/appsettings.json — confirm "OrderManagementDB" and "D:\\order_managment\\"
  □ Open backend/AppDbContext.cs — confirm no AvailableStock in entity config or seed data
  □ Open backend/ItemsController.cs — confirm no endpoint reads or writes availableStock
  □ Open backend/ConfigurationController.cs — confirm no OrderControl / StockControl in DTOs
  □ Confirm all .cs files use namespace OrderManagement.API (no sub-namespaces)
  □ Confirm all migration files are in backend/ (no Migrations/ subfolder)

FRONTEND CHECKS:
  □ Run: grep -ri "stock" frontend/
    Expected result: ZERO matches
  □ Run: ng build from frontend/
    Expected result: Build succeeded with 0 errors and 0 warnings
  □ Open frontend/item-list.component.ts — confirm displayedColumns has no 'availableStock'
  □ Open frontend/item-list.component.html — confirm no availableStock column ng-container exists
  □ Open frontend/item-list.component.html — confirm Add to Cart button has no [disabled] attribute
  □ Open frontend/cart.service.ts — confirm addItem() has no conditional logic
  □ Open frontend/cart.service.ts — confirm updateQuantity() has no upper bound
  □ Open frontend/config.service.ts — confirm no orderControl or stockControl signal exists
  □ Open frontend/config-panel.component.html — confirm only one MatCard section exists
  □ Open frontend/config-panel.component.ts — confirm no onOrderControlChange method
  □ Open frontend/en.json — grep for "stock": ZERO matches in keys and values
  □ Open frontend/ar.json — grep for "stock": ZERO matches in keys and values
  □ Confirm all .ts imports use './' relative paths (no subdirectory paths)
  □ Confirm angular.json sourceRoot points to "frontend" and all asset paths are correct

DATABASE CHECKS:
  □ After Update-Database: query INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Items'
    Expected: NO column named AvailableStock
  □ After Update-Database: query INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='AppConfiguration'
    Expected: NO column named StockControl or OrderControl
  □ Database name in SQL Server: OrderManagementDB
  □ MDF file location: D:\order_managment\OrderManagementDB.mdf

FOLDER STRUCTURE CHECKS:
  □ backend/ contains all .cs and .csproj and .json files directly — NO subfolders
  □ frontend/ contains all .ts, .html, .scss, .json files directly — NO subfolders
  □ No folder named: Controllers, Models, DTOs, Services, Data, Middleware
  □ No folder named: app, core, features, shared, assets, i18n


----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------

# order_management — Structure Cleanup, Dead Code Removal & Error Fix Prompt
**Type:** Project restructure + dead code elimination + full error resolution
**Scope:** Backend (.NET 9 Web API) + Frontend (Angular 18 Standalone)
**Root cause of errors diagnosed:**
  1. TypeScript files are sitting in the wrong location (flat `frontend/` root instead of inside the Angular project at `frontend/order-management-ui/src/app/...`), so `node_modules` is unreachable from their current paths — causing every `Cannot find module '@angular/core'` error
  2. Some files were generated targeting a wrong/older Angular API surface (`signal`, `OnInit`, `Output`, `ReactiveFormsModule`, `FormBuilder` imported incorrectly for the installed Angular version)
  3. Untyped lambda parameters (`any` implicit types) throughout — `strict` mode enabled but types not applied
  4. Inline styles and missing accessibility labels (axe/forms) throughout HTML templates
  5. Old project folder `stock-management-ui/` still exists alongside the new structure causing duplicate diagnostics
  6. `tsconfig.json` missing `forceConsistentCasingInFileNames: true`

---

## MASTER PROMPT
> Copy everything inside this block and feed it as a single instruction to Claude Code, Cursor, or Copilot.
> Apply every section in order without skipping any step.

```
You are fixing, cleaning, and restructuring the order_management project.
The project is at: D:\AI Tools\order_manegment\
Apply every instruction in order. Do not skip any file. Do not leave any error unresolved.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 0 — IMMEDIATE CLEANUP: DELETE WRONG LOCATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

These files and folders exist in the wrong place and must be deleted immediately
before any other work. Their presence causes duplicate diagnostics and path confusion.

DELETE this entire folder and everything inside it:
  D:\AI Tools\order_manegment\stock-management-ui\
  (This is the old Angular project folder — it has been superseded and must go entirely)

DELETE these misplaced files from the flat frontend/ root
(they belong inside the Angular project, not at root level):
  D:\AI Tools\order_manegment\frontend\app.component.ts
  D:\AI Tools\order_manegment\frontend\app.component.html
  D:\AI Tools\order_manegment\frontend\app.component.scss
  D:\AI Tools\order_manegment\frontend\app.config.ts
  D:\AI Tools\order_manegment\frontend\app.routes.ts
  D:\AI Tools\order_manegment\frontend\cart.service.ts
  D:\AI Tools\order_manegment\frontend\cart-sidebar.component.ts
  D:\AI Tools\order_manegment\frontend\cart-sidebar.component.html
  D:\AI Tools\order_manegment\frontend\cart-sidebar.component.scss
  D:\AI Tools\order_manegment\frontend\config.service.ts
  D:\AI Tools\order_manegment\frontend\config-panel.component.ts
  D:\AI Tools\order_manegment\frontend\config-panel.component.html
  D:\AI Tools\order_manegment\frontend\config-panel.component.scss
  D:\AI Tools\order_manegment\frontend\item.service.ts
  D:\AI Tools\order_manegment\frontend\item-list.component.ts
  D:\AI Tools\order_manegment\frontend\item-list.component.html
  D:\AI Tools\order_manegment\frontend\item-list.component.scss
  D:\AI Tools\order_manegment\frontend\item-form.component.ts
  D:\AI Tools\order_manegment\frontend\item-form.component.html
  D:\AI Tools\order_manegment\frontend\item-form.component.scss
  D:\AI Tools\order_manegment\frontend\confirm-dialog.component.ts
  D:\AI Tools\order_manegment\frontend\confirm-dialog.component.html
  D:\AI Tools\order_manegment\frontend\theme.service.ts
  D:\AI Tools\order_manegment\frontend\error.interceptor.ts
  D:\AI Tools\order_manegment\frontend\tsconfig.spec.json
  (Delete any other loose .ts, .html, .scss file directly inside frontend\ root)

KEEP at frontend\ root level ONLY:
  frontend\order-management-ui\   (the Angular project folder — keep everything inside it)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — TARGET FOLDER STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The final project must match this exact structure.
All files must exist at their listed paths. No file outside this tree.

order_management/                            ← D:\AI Tools\order_manegment\
│
├── backend/
│   └── OrderManagement.API/
│       ├── Controllers/
│       │   ├── ItemsController.cs
│       │   └── ConfigurationController.cs
│       ├── Data/
│       │   └── AppDbContext.cs
│       ├── DTOs/
│       │   ├── ApiResponse.cs
│       │   ├── ItemDto.cs
│       │   ├── CreateItemRequest.cs
│       │   └── UpdateItemRequest.cs
│       ├── Migrations/
│       │   └── (EF Core auto-generated files — do not touch)
│       ├── Models/
│       │   ├── Item.cs
│       │   └── AppConfiguration.cs
│       ├── Middleware/
│       │   └── GlobalExceptionMiddleware.cs
│       ├── Services/
│       │   ├── IFileStorageService.cs
│       │   ├── FileStorageService.cs
│       │   ├── IItemService.cs
│       │   └── ItemService.cs
│       ├── appsettings.json
│       ├── appsettings.Development.json
│       ├── OrderManagement.API.csproj
│       └── Program.cs
│
└── frontend/
    └── order-management-ui/
        ├── src/
        │   ├── app/
        │   │   ├── core/
        │   │   │   ├── interceptors/
        │   │   │   │   └── error.interceptor.ts
        │   │   │   └── services/
        │   │   │       ├── cart.service.ts
        │   │   │       ├── config.service.ts
        │   │   │       ├── item.service.ts
        │   │   │       └── theme.service.ts
        │   │   ├── features/
        │   │   │   ├── cart/
        │   │   │   │   └── cart-sidebar/
        │   │   │   │       ├── cart-sidebar.component.html
        │   │   │   │       ├── cart-sidebar.component.scss
        │   │   │   │       └── cart-sidebar.component.ts
        │   │   │   ├── configuration/
        │   │   │   │   └── config-panel/
        │   │   │   │       ├── config-panel.component.html
        │   │   │   │       ├── config-panel.component.scss
        │   │   │   │       └── config-panel.component.ts
        │   │   │   └── items/
        │   │   │       ├── item-form/
        │   │   │       │   ├── item-form.component.html
        │   │   │       │   ├── item-form.component.scss
        │   │   │       │   └── item-form.component.ts
        │   │   │       └── item-list/
        │   │   │           ├── item-list.component.html
        │   │   │           ├── item-list.component.scss
        │   │   │           └── item-list.component.ts
        │   │   ├── shared/
        │   │   │   └── components/
        │   │   │       └── confirm-dialog/
        │   │   │           ├── confirm-dialog.component.html
        │   │   │           └── confirm-dialog.component.ts
        │   │   ├── app.component.html
        │   │   ├── app.component.scss
        │   │   ├── app.component.ts
        │   │   ├── app.config.ts
        │   │   └── app.routes.ts
        │   ├── assets/
        │   │   └── i18n/
        │   │       ├── en.json
        │   │       └── ar.json
        │   ├── environments/
        │   │   ├── environment.ts
        │   │   └── environment.prod.ts
        │   ├── index.html
        │   ├── main.ts
        │   └── styles.scss
        ├── angular.json
        ├── package.json
        ├── tsconfig.json
        └── tsconfig.app.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — FIX: NODE_MODULES NOT FOUND (ROOT CAUSE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The errors "Cannot find module '@angular/core'" and "Cannot find module 'rxjs'" etc.
are caused by TypeScript files being placed in frontend\ root, which has no node_modules.
The Angular project's node_modules lives at:
  frontend\order-management-ui\node_modules\

STEP 1 — Verify node_modules exists and is complete:
  Check: does frontend\order-management-ui\node_modules\@angular\core\ exist?
  If YES: node_modules is intact — proceed to Section 3.
  If NO:  Run from frontend\order-management-ui\:
            npm install
          Wait for completion, then verify @angular/core exists.

STEP 2 — Verify the Angular version installed:
  Run: node -e "const p=require('./frontend/order-management-ui/node_modules/@angular/core/package.json');console.log(p.version)"
  The version must be 18.x.x.
  If it is NOT 18.x.x (e.g., it shows 15.x, 16.x, 17.x):
    Run from frontend\order-management-ui\:
      npm install @angular/core@18 @angular/common@18 @angular/forms@18 @angular/router@18 @angular/material@18 @angular/cdk@18 @angular/animations@18 @angular/platform-browser@18 @angular/platform-browser-dynamic@18 --save
      npm install @angular-devkit/build-angular@18 @angular/compiler@18 @angular/compiler-cli@18 --save-dev
    Then re-verify version.

STEP 3 — Verify tsconfig.json paths resolve to node_modules:
  Open frontend\order-management-ui\tsconfig.json
  Confirm it does NOT have a custom "paths" or "baseUrl" pointing away from the project root.
  The file must have:
    "compilerOptions": {
      "baseUrl": "",
      "paths": {}       ← empty or absent, do NOT add custom paths
    }
  If baseUrl is set to something like "../../" or "../", reset it to "" or remove it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — FIX: WRONG ANGULAR IMPORTS (SIGNAL, ONINIT, OUTPUT, FORMS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

These errors show the code was generated using incorrect import syntax.
Apply every fix below to the affected file.

── ERROR: signal not exported from @angular/core ─────
Affected files: app.component.ts, config-panel.component.ts, item-form.component.ts

CAUSE: The code imports signal from @angular/core using a syntax only valid in Angular 16+
but the TypeScript is reading from a version that doesn't expose it, OR the import is malformed.

FIX in EVERY .ts file that uses signal():
  CORRECT import:
    import { Component, signal, computed, inject } from '@angular/core';
  
  If the installed Angular version is confirmed as 18.x, signal IS exported from @angular/core.
  The error means the IDE is reading from the wrong node_modules (the flat frontend/ root has no node_modules).
  Once files are moved to their correct locations inside order-management-ui/src/app/..., this resolves automatically.
  
  After moving files (Section 1), verify the import is:
    import { Component, signal, computed, inject } from '@angular/core';
  NOT:
    import { Component } from '@angular/core';
    import { signal } from '@angular/core/primitives/signals';   ← WRONG, delete this line
    import { signal } from 'signal-polyfill';                    ← WRONG, delete this line

── ERROR: OnInit not exported from @angular/core ─────
Affected files: config-panel.component.ts, item-form.component.ts

CAUSE: OnInit WAS exported from @angular/core in all versions. This error means the module
cannot be found at all (wrong path issue). Once files are in the correct location, this resolves.

However, also check each affected file: if it declares implements OnInit but never uses ngOnInit(),
remove the interface entirely to eliminate the dependency:

  config-panel.component.ts:
    CHANGE: export class ConfigPanelComponent implements OnInit {
    TO:     export class ConfigPanelComponent {
    REMOVE: import { ..., OnInit, ... } from '@angular/core'  ← remove OnInit from this import
    REMOVE: ngOnInit(): void { }  ← if body is empty, delete the method
    
    IF ngOnInit() has a body (real initialization code):
      KEEP the method, but change the import to:
        import { Component, OnInit, signal, inject } from '@angular/core';

  item-form.component.ts:
    Apply the same rule: if ngOnInit() body is empty → remove it + remove OnInit import.
    If it has real code → keep it with correct import.

── ERROR: Output not exported from @angular/core ──────
Affected file: cart-sidebar.component.ts

CAUSE: Same wrong-path issue. Once moved to correct location, resolves.
Also verify the import. In Angular 18, Output is still exported from @angular/core:
  CORRECT: import { Component, Output, EventEmitter, inject } from '@angular/core';

If the component uses output() (the new functional API in Angular 17.3+):
  CORRECT: import { Component, output, inject } from '@angular/core';
  USAGE:   closeCart = output<void>();

Pick ONE approach and be consistent. Recommended for Angular 18: use the new functional output():
  CHANGE: @Output() closeCart = new EventEmitter<void>();
  TO:     closeCart = output<void>();
  And remove Output, EventEmitter from the import line.

── ERROR: ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidationErrors ──
Affected files: config-panel.component.ts, item-form.component.ts

CAUSE: These are all exported from @angular/forms — the import path is correct but
the module resolution fails because the file is in the wrong location (no node_modules nearby).
Once files are moved, this resolves.

Verify each import is:
  import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, AsyncValidatorFn } from '@angular/forms';

Do NOT import from '@angular/forms/reactive';  ← that path does not exist.

── ERROR: FormsModule not exported from @angular/forms ──
Affected files: cart-sidebar.component.ts, config-panel.component.ts

CAUSE: These components import FormsModule but use ReactiveFormsModule (or no forms at all).

FIX: In cart-sidebar.component.ts:
  Check if the template uses [(ngModel)] anywhere.
  If YES: keep FormsModule import.
  If NO:  REMOVE FormsModule from both the import statement and the imports[] array.

FIX: In config-panel.component.ts:
  Uses ReactiveFormsModule — formGroup, formControlName.
  REMOVE FormsModule from imports and the import statement.
  KEEP ReactiveFormsModule.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — FIX: "Object is of type 'unknown'" (TS2571)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This error appears massively across app.component.ts, cart-sidebar.component.ts,
config-panel.component.ts, item-form.component.ts.

ROOT CAUSE: HttpClient calls return Observable<unknown> when not typed. The response
is then accessed as if it has known properties, which TypeScript strict mode rejects.

FIX PATTERN — apply to every HttpClient call in every service and component:

WRONG (produces TS2571):
  this.http.get('/api/items').subscribe(response => {
    this.items = response.data;   ← ERROR: response is unknown
  });

CORRECT:
  this.http.get<ApiResponse<ItemDto[]>>('/api/items').subscribe((response: ApiResponse<ItemDto[]>) => {
    this.items = response.data ?? [];
  });

DEFINE the ApiResponse interface in a shared types file or inline in each service:
  Create file: src/app/core/models/api-response.model.ts
  Content:
    export interface ApiResponse<T> {
      success: boolean;
      data: T;
      message: string;
      errors: string[];
    }

  Import it in every service and component that makes HTTP calls:
    import { ApiResponse } from '../../core/models/api-response.model';
    (adjust relative path based on file location)

── Apply to item.service.ts ──────────────────────────

Every method must be typed. Replace ALL untyped HttpClient calls:

  WRONG:  getItems(page: number, size: number, search: string) { return this.http.get(...) }
  CORRECT: getItems(page: number, size: number, search: string): Observable<ApiResponse<PagedResult<ItemDto>>> {
             return this.http.get<ApiResponse<PagedResult<ItemDto>>>(`${this.apiUrl}/items?page=${page}&size=${size}&search=${search}`);
           }

Define PagedResult interface in the same models file:
  export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    page: number;
    size: number;
  }

All service methods must declare explicit return types: Observable<ApiResponse<T>>.
No method may return Observable<unknown> or Observable<any>.

── Apply to config.service.ts ────────────────────────

Define AppConfig interface:
  export interface AppConfig {
    serverName: string;
    databaseName: string;
    dbUsername: string;
    dbPassword: string;
  }

Define TestConnectionResult interface:
  export interface TestConnectionResult {
    success: boolean;
    message: string;
  }

All methods:
  loadConfig(): Observable<ApiResponse<AppConfig>>
  updateConfig(config: AppConfig): Observable<ApiResponse<AppConfig>>
  testConnection(credentials: Partial<AppConfig>): Observable<ApiResponse<TestConnectionResult>>

── Apply to cart-sidebar.component.ts ────────────────

Import CartItem and ItemDto types. Define CartItem interface in cart.service.ts:
  export interface CartItem {
    item: ItemDto;
    quantity: number;
  }

In cart-sidebar.component.ts, all references to cart items must use CartItem type:
  WRONG:  this.cartService.cartItems().map(ci => ci.item.price * ci.quantity)
  Errors at lines 46, 54, 66, 70, 73, 74, 80 are all caused by ci or item being unknown.

  FIX: In cart.service.ts, ensure cartItems signal is typed:
    cartItems = signal<CartItem[]>([]);

  Once cartItems is typed as CartItem[], all .item and .quantity accesses resolve.

── Apply to config-panel.component.ts ────────────────

Errors at lines 48, 50, 68, 71, 76, 77, 83, 104, 105, 107 are all from untyped HTTP responses.

FIX: Every this.configService method call must be typed:
  WRONG:  this.configService.loadConfig().subscribe(result => {
            this.form.patchValue(result.data);   ← result is unknown
          });
  CORRECT: this.configService.loadConfig().subscribe((result: ApiResponse<AppConfig>) => {
             if (result.success && result.data) {
               this.form.patchValue(result.data);
             }
           });

── Apply to item-form.component.ts ───────────────────

Errors at lines 59, 72, 97, 99, 120, 125, 154, 155, 160, 161, 177, 178, 183, 184, 197, 201, 205, 206, 210, 211, 217 are all untyped responses.

FIX: Every subscribe callback that receives an HTTP response must be typed:
  WRONG:  this.itemService.createItem(request).subscribe(response => {
            this.dialogRef.close(response.data);   ← response is unknown
          });
  CORRECT: this.itemService.createItem(request).subscribe((response: ApiResponse<ItemDto>) => {
             if (response.success) {
               this.dialogRef.close(response.data);
             }
           });

  WRONG:  .subscribe(response => {
            const imageUrl = response.imagePath;   ← response is unknown
          });
  CORRECT: .subscribe((response: ApiResponse<{ imagePath: string; imageUrl: string }>) => {
             const imageUrl = response.data?.imageUrl ?? '';
           });

── Apply to item-list.component.ts ───────────────────

Errors at lines 91, 93 (untyped response/item):
  WRONG:  this.itemService.getItems(...).subscribe(response => {
            this.items.set(response.data.items.map(item => item));
          });
  CORRECT: this.itemService.getItems(this.page(), this.pageSize(), this.searchQuery())
             .subscribe((response: ApiResponse<PagedResult<ItemDto>>) => {
               if (response.success) {
                 this.items.set(response.data.items);
                 this.totalCount.set(response.data.totalCount);
               }
             });

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — FIX: IMPLICIT 'any' PARAMETERS (TS7006)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every lambda parameter that TypeScript cannot infer must be explicitly typed.
Apply every fix below to every affected file.

── cart.service.ts — lines 10, 13, 17, 25, 27, 36, 45 ──

These are lambda parameters in .reduce() and .map() calls on cartItems arrays.

WRONG:
  this.cartItems().reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0)
  (sum and ci are untyped because cartItems() returns unknown[])

FIX by typing the signal first (see Section 4), then:
  this.cartItems().reduce((sum: number, ci: CartItem) => sum + ci.item.price * ci.quantity, 0)

ALL reduce/map/filter callbacks in cart.service.ts must have typed parameters:
  (sum: number, ci: CartItem)  for reduce calls
  (i: CartItem)                for map/filter calls
  (ci: CartItem)               for find/findIndex calls

── item-list.component.ts — lines 73, 91, 93, 136, 149, 165 ──

  Line 73  — search pipe: (search: string) => ...
  Line 91  — HTTP response: (response: ApiResponse<PagedResult<ItemDto>>) => ...
  Line 93  — map callback: (item: ItemDto) => ...
  Line 136 — dialog result: (result: ItemDto | undefined) => ...
  Line 149 — dialog result: (result: ItemDto | undefined) => ...
  Line 165 — confirmed: (confirmed: boolean) => ...

Apply explicit types to every lambda at each line.

── cart-sidebar.component.ts — line 78 ──

  Line 78 — confirmed parameter:
  WRONG:  .subscribe(confirmed => { if (confirmed) ... })
  CORRECT:.subscribe((confirmed: boolean) => { if (confirmed) { this.cartService.clearCart(); } })

── item-form.component.ts — lines 155, 178 ──

  Line 155 — response parameter:
  WRONG:  .subscribe(response => { this.dialogRef.close(response.data); })
  CORRECT:.subscribe((response: ApiResponse<ItemDto>) => { if (response.success) { this.dialogRef.close(response.data); } })

  Line 178 — response parameter:
  WRONG:  .subscribe(response => { ... })
  CORRECT:.subscribe((response: ApiResponse<{ imagePath: string; imageUrl: string }>) => { ... })

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6 — FIX: ACCESSIBILITY ERRORS (axe/forms)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every <input> element that lacks a label must have one. These appear in:
  - cart-sidebar.component.html (line 32)
  - config-panel.component.html (lines 15, 23, 31, 39)
  - item-form.component.html (lines 10, 28, 40, 53, 78)
  - item-list.component.html (line 8)

RULE: Every <input matInput> inside a <mat-form-field> is already labeled via <mat-label>.
The axe error fires when a raw <input> is used WITHOUT a wrapping <mat-form-field> + <mat-label>.

FIX PATTERN — wrap every bare input in a proper Angular Material form field:

WRONG (bare input, no label):
  <input type="number" formControlName="quantity" />

CORRECT (mat-form-field with label):
  <mat-form-field appearance="outline">
    <mat-label>{{ 'CART.QUANTITY' | translate }}</mat-label>
    <input matInput type="number" formControlName="quantity" min="1" />
  </mat-form-field>

If a quantity input in cart-sidebar must be compact (no full form field), use aria-label instead:
  <input type="number"
         [value]="cartItem.quantity"
         (change)="updateQty(cartItem, $event)"
         min="1"
         [attr.aria-label]="('CART.QUANTITY' | translate) + ' ' + cartItem.item.nameEN"
         class="qty-input" />

── cart-sidebar.component.html — line 32 ────────────

  Locate the bare <input> at line 32 (quantity input).
  Add aria-label attribute:
    [attr.aria-label]="('CART.QUANTITY' | translate)"
  Move any inline style to cart-sidebar.component.scss (fixes no-inline-styles warning at line 22 too).

── config-panel.component.html — lines 15, 23, 31, 39 ──

  Every input in the DB connection form must be inside <mat-form-field> with <mat-label>.
  Verify each field follows this pattern exactly:

  <mat-form-field appearance="outline" class="full-width">
    <mat-label>{{ 'CONFIG.SERVER' | translate }}</mat-label>
    <input matInput formControlName="server" />
  </mat-form-field>

  If any input is outside mat-form-field: wrap it. Do not add title attributes as a shortcut.

── item-form.component.html — lines 10, 28, 40, 53, 78 ──

  Same fix: ensure every input is inside <mat-form-field appearance="outline"> with <mat-label>.
  
  Line 90 also has: "Images must have alternative text"
  FIX: Add alt attribute to the image preview element:
    WRONG: <img [src]="imagePreviewUrl" style="..." />
    CORRECT: <img [src]="imagePreviewUrl" [alt]="'FORM.IMAGE_PREVIEW' | translate" class="img-preview" />
  Add to en.json: "IMAGE_PREVIEW": "Item image preview"
  Add to ar.json: "IMAGE_PREVIEW": "معاينة صورة الصنف"

── item-list.component.html — line 8 ────────────────

  The search input at line 8 lacks a label.
  FIX: It should already be inside a mat-form-field. If not, wrap it:
    <mat-form-field appearance="outline">
      <mat-label>{{ 'ITEMS.SEARCH' | translate }}</mat-label>
      <mat-icon matPrefix>search</mat-icon>
      <input matInput [placeholder]="'ITEMS.SEARCH' | translate" (input)="onSearch($event)" />
    </mat-form-field>
  Adding matInput directive to the input inside mat-form-field satisfies the axe label rule.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7 — FIX: INLINE STYLES (no-inline-styles warning)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Move every inline style="" attribute to its component's .scss file.

── cart-sidebar.component.html — line 22 ────────────

  Find the element at line 22 that has style="...".
  Move ALL its CSS properties to cart-sidebar.component.scss under a new class .cart-item-img or similar.
  Replace: style="width:48px; height:48px; object-fit:cover;"
  With:    class="cart-item-img"
  In cart-sidebar.component.scss add:
    .cart-item-img {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border-radius: 4px;
    }

── item-form.component.html — line 90 ───────────────

  Find the <img> element at line 90 with inline style.
  Replace: style="max-width:200px; max-height:150px;"
  With:    class="img-preview"
  In item-form.component.scss add:
    .img-preview {
      max-width: 200px;
      max-height: 150px;
      object-fit: contain;
      border: 1px solid var(--mat-divider-color);
      border-radius: 4px;
      margin-top: 8px;
    }

── item-list.component.html — line 28 ───────────────

  Find element at line 28 with inline style (likely the thumbnail <img>).
  Replace: style="width:48px; height:48px; object-fit:cover; border-radius:4px;"
  With:    class="item-thumb"
  In item-list.component.scss add:
    .item-thumb {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border-radius: 4px;
    }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 8 — FIX: TSCONFIG ERRORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

── FIX: forceConsistentCasingInFileNames ─────────────

Affected files:
  frontend\order-management-ui\tsconfig.json
  frontend\order-management-ui\tsconfig.app.json

In BOTH files, add or set under "compilerOptions":
  "forceConsistentCasingInFileNames": true

Final tsconfig.json must include:
  {
    "compilerOptions": {
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "noImplicitReturns": true,
      "esModuleInterop": true,
      "target": "ES2022",
      "module": "ES2022",
      "moduleResolution": "bundler",
      "useDefineForClassFields": false,
      "experimentalDecorators": true,
      "lib": ["ES2022", "dom"]
    }
  }

── FIX: tsconfig.spec.json ───────────────────────────

The flat frontend\tsconfig.spec.json (the misplaced one) was deleted in Section 0.
The one at frontend\order-management-ui\tsconfig.spec.json: delete it entirely.
Reason: all *.spec.ts files are deleted in this project (no tests in Phase 1).
angular.json must have its "test" architect target removed too.
In angular.json, under "projects" > "order-management-ui" > "architect":
  REMOVE the entire "test": { ... } block.

── FIX: stock-management-ui tsconfig.json — "No inputs found" ──

The error "No inputs were found in config file stock-management-ui/tsconfig.json" is resolved
by deleting the stock-management-ui\ folder entirely (done in Section 0).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 9 — BACKEND DEAD CODE REMOVAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Apply to every .cs file in backend\OrderManagement.API\.

REMOVE unused using statements:
  Run: dotnet build
  For every CS8019 warning "unnecessary using directive": remove that using statement.
  Repeat until dotnet build shows 0 warnings.

REMOVE default scaffold files (if they still exist):
  DELETE: WeatherForecast.cs
  DELETE: WeatherForecastController.cs
  DELETE: any *.http file in the project folder
  DELETE: Properties\launchSettings.json (not needed — IIS Express config)

REMOVE from Program.cs every line that is:
  A scaffold comment: // Add services to the container. → DELETE
  A scaffold comment: // Configure the HTTP request pipeline. → DELETE
  builder.Services.AddRazorPages() → DELETE (pure API project)
  app.MapRazorPages() → DELETE
  builder.Services.AddControllersWithViews() → DELETE
  app.UseStaticFiles() → DELETE if not serving wwwroot files
  Any builder.Services registration for a class that doesn't exist in the project

REMOVE unreachable methods:
  Any private method in any .cs file that is never called: DELETE entirely
  Any public method in a Controller that maps to no route (no [Http...] attribute): DELETE

REMOVE NetTotal calculation from C# code:
  If any .cs file contains: price + (price * vatPercentage / 100) → DELETE that line
  NetTotal must only come from the SQL Server persisted computed column. Never calculated in C#.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 10 — FRONTEND DEAD CODE REMOVAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Apply to every .ts, .html, .scss file in frontend\order-management-ui\src\.

REMOVE all console.log / console.warn / console.error used for debugging:
  grep -rn "console.log" src\ → delete every match
  Exception: keep console.error in error.interceptor.ts only if it logs structured error data

REMOVE all commented-out code blocks:
  // old code lines
  // disabled logic
  // TODO stubs with no implementation
  Delete every block of consecutive commented-out code.

REMOVE all *.spec.ts files:
  Delete every file ending in .spec.ts anywhere in src\

REMOVE unused CSS classes:
  For each .scss file, check each class name against the corresponding .html template.
  Delete any class that has no matching usage in the template.
  Specifically delete: .stock-ok, .stock-warn, .stock-zero, .order-ok, .order-warn, .order-zero
  (These were stock-related badge classes — feature removed)

REMOVE unused signals and computed values:
  Any signal() that is never read in template or other computed(): DELETE
  Any computed() that is never used: DELETE

REMOVE from package.json:
  "axios": any version → DELETE (project uses HttpClient only)
  "karma": any version → DELETE (no tests)
  "karma-chrome-launcher": → DELETE
  "karma-coverage": → DELETE
  "karma-jasmine": → DELETE
  "karma-jasmine-html-reporter": → DELETE
  "jasmine-core": → DELETE
  "@types/jasmine": → DELETE
  After editing package.json, run: npm install

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 11 — IMPORT PATH CORRECTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After all files are in their correct locations, fix every relative import path.
Use the file's actual location to compute the correct relative path.

app.config.ts  (at: src/app/)
  import { ConfigService }    from './core/services/config.service';
  import { errorInterceptor } from './core/interceptors/error.interceptor';
  TranslateHttpLoader:         new TranslateHttpLoader(http, './assets/i18n/', '.json')

app.routes.ts  (at: src/app/)
  import('./features/items/item-list/item-list.component')
  import('./features/configuration/config-panel/config-panel.component')

app.component.ts  (at: src/app/)
  import { ThemeService }         from './core/services/theme.service';
  import { CartService }          from './core/services/cart.service';
  import { CartSidebarComponent } from './features/cart/cart-sidebar/cart-sidebar.component';

item-list.component.ts  (at: src/app/features/items/item-list/)
  import { ItemService }           from '../../../core/services/item.service';
  import { CartService }           from '../../../core/services/cart.service';
  import { ItemFormComponent }     from '../item-form/item-form.component';
  import { ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
  import { ApiResponse, PagedResult } from '../../../core/models/api-response.model';
  import { ItemDto }               from '../../../core/models/item.model';

item-form.component.ts  (at: src/app/features/items/item-form/)
  import { ItemService }           from '../../../core/services/item.service';
  import { ApiResponse }           from '../../../core/models/api-response.model';
  import { ItemDto }               from '../../../core/models/item.model';

cart-sidebar.component.ts  (at: src/app/features/cart/cart-sidebar/)
  import { CartService, CartItem } from '../../../core/services/cart.service';

config-panel.component.ts  (at: src/app/features/configuration/config-panel/)
  import { ConfigService }         from '../../../core/services/config.service';
  import { ApiResponse }           from '../../../core/models/api-response.model';
  import { AppConfig }             from '../../../core/services/config.service';

item.service.ts  (at: src/app/core/services/)
  import { ApiResponse, PagedResult } from '../models/api-response.model';
  import { ItemDto, CreateItemRequest, UpdateItemRequest } from '../models/item.model';

config.service.ts  (at: src/app/core/services/)
  import { ApiResponse } from '../models/api-response.model';

error.interceptor.ts  (at: src/app/core/interceptors/)
  No local imports needed unless it references a model.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 12 — CREATE MISSING MODEL FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create these files if they do not already exist. They are required to resolve type errors.

CREATE: src/app/core/models/api-response.model.ts
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    errors: string[];
  }

  export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    page: number;
    size: number;
  }

CREATE: src/app/core/models/item.model.ts
  export interface ItemDto {
    id: string;
    itemCode: string;
    nameEN: string;
    nameAR: string;
    imagePath: string | null;
    imageUrl: string | null;
    price: number;
    vatPercentage: number;
    netTotal: number;
    createdAt: string;
    updatedAt: string | null;
  }

  export interface CreateItemRequest {
    itemCode: string;
    nameEN: string;
    nameAR: string;
    price: number;
    vatPercentage: number;
  }

  export interface UpdateItemRequest {
    itemCode: string;
    nameEN: string;
    nameAR: string;
    price: number;
    vatPercentage: number;
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 13 — FINAL VERIFICATION CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Run every check below. Every item must pass.

── STRUCTURE ─────────────────────────────────────────
  □ D:\AI Tools\order_manegment\stock-management-ui\ does NOT exist
  □ D:\AI Tools\order_manegment\frontend\ contains ONLY order-management-ui\ subfolder
  □ No .ts or .html file sits directly at frontend\ root level
  □ All component files are inside order-management-ui\src\app\features\ subfolders
  □ All service files are inside order-management-ui\src\app\core\services\
  □ All model files are inside order-management-ui\src\app\core\models\
  □ No *.spec.ts file exists anywhere
  □ No karma.conf.js exists

── NODE_MODULES ──────────────────────────────────────
  □ frontend\order-management-ui\node_modules\@angular\core\ exists
  □ Angular version is 18.x (run: node -e "console.log(require('./node_modules/@angular/core/package.json').version)" from order-management-ui\)
  □ frontend\order-management-ui\node_modules\@angular\material\ exists
  □ frontend\order-management-ui\node_modules\@ngx-translate\core\ exists
  □ frontend\order-management-ui\node_modules\rxjs\ exists

── TYPESCRIPT BUILD ──────────────────────────────────
  □ Run: ng build from frontend\order-management-ui\
    → Result: 0 errors, 0 warnings
  □ Zero TS2307 errors (Cannot find module)
  □ Zero TS2571 errors (Object is of type 'unknown')
  □ Zero TS2724 errors (has no exported member named 'signal')
  □ Zero TS2305 errors (Module has no exported member)
  □ Zero TS7006 errors (Parameter implicitly has 'any' type)
  □ Zero TS18046 errors (is of type 'unknown')

── ACCESSIBILITY ─────────────────────────────────────
  □ Zero axe/forms "Form elements must have labels" errors in any .html file
  □ Zero axe/text-alternatives "Images must have alternative text" errors
  □ Zero no-inline-styles warnings in any .html file (all styles moved to .scss)

── TSCONFIG ──────────────────────────────────────────
  □ tsconfig.json contains "forceConsistentCasingInFileNames": true
  □ tsconfig.app.json contains "forceConsistentCasingInFileNames": true
  □ tsconfig.spec.json does NOT exist (deleted)
  □ angular.json has no "test" architect target

── BACKEND BUILD ─────────────────────────────────────
  □ Run: dotnet build from backend\OrderManagement.API\
    → Result: Build succeeded, 0 Error(s), 0 Warning(s)
  □ Zero CS8019 warnings (unnecessary using)
  □ WeatherForecast.cs does NOT exist
  □ WeatherForecastController.cs does NOT exist
  □ Program.cs contains no scaffold comments
  □ No .cs file calculates price + (price * vat / 100)
```


----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------

Act as a senior Angular UI/UX architect, product designer, and front-end engineer.

Your goal is to completely refactor the UI of an existing Angular application into a beautiful modern E-commerce interface while maintaining a clean internal management page for items.

The result should feel like a premium shopping experience similar to:

Apple Store
Stripe Storefront
Shopify Store
Vercel Marketplace
Notion design quality

The UI should feel:

• modern
• elegant
• animated
• responsive
• minimal but visually rich
• extremely smooth and interactive

This is NOT a basic CRUD dashboard.  
It should feel like a **real shopping website**.

----------------------------------------------------

APPLICATION STACK

Frontend
Angular (latest)
Angular Material
Typescript
SCSS

Backend
.NET API
MSSQL

Existing features

• Add items
• Manage items
• Upload images
• Add items to cart
• VAT calculation
• Shopping cart
• Order management

----------------------------------------------------

CURRENT UX PROBLEMS

1. UI feels empty and unstructured
2. No container layout
3. No visual hierarchy
4. Item list uses a boring table
5. Cart is awkward
6. Sidebar scroll behavior is wrong
7. Spacing and typography are weak
8. Design feels like internal tooling instead of a product
9. No animations
10. User experience feels static and lifeless

----------------------------------------------------

NEW APPLICATION EXPERIENCE

The application should behave like a **modern E-commerce website**.

Users should be able to:

Browse products visually  
Add products to cart  
View cart page  
Modify quantities  
Checkout

Meanwhile administrators can still access an **Items Management page**.

----------------------------------------------------

MAIN APPLICATION PAGES

1️⃣ Store Home Page

This is the main user experience.

It should display products as beautiful **product cards in a responsive grid**.

Layout:

Hero header  
Featured products section  
Products grid  
Floating cart access  

Product card design:

Image
Item name
Price
VAT included badge
Add to cart button
Quick view button

Card design:

Rounded corners
Soft shadow
Hover lift effect
Animated hover image zoom
Smooth button reveal

Grid behavior:

Desktop
4 cards per row

Tablet
2 cards per row

Mobile
1 card per row

----------------------------------------------------

PRODUCT CARD INTERACTIONS

When hovering a product card:

• Card lifts slightly
• Image zooms subtly
• Add to cart button animates into view
• Shadow deepens

When clicking add to cart:

• Button morphs to loading
• Item flies to cart animation
• Cart badge increments

----------------------------------------------------

PRODUCT DETAIL MODAL

Clicking a product opens a beautiful modal.

Layout:

Left side
Large product image

Right side
Product name
Price
VAT
Quantity selector
Add to cart button

Animation:

Modal fades and scales into view.

----------------------------------------------------

CART EXPERIENCE

There should be two cart interfaces:

1️⃣ Floating Cart Sidebar
2️⃣ Dedicated Cart Page

----------------------------------------------------

CART SIDEBAR

The cart sidebar should behave like a **modern e-commerce drawer**.

Requirements:

Fixed to right side  
Width 380px  
Full height  

Important:

The cart must NOT scroll the page.

Only the items inside the cart should scroll.

Structure:

Cart Header
Cart Items List
Cart Summary

Cart Header

Cart icon  
Title  
Close button

Cart Items

Product image
Product name
Price
Quantity stepper
Remove button

Cart Footer

Subtotal
VAT
Total
Checkout button

Animations

Opening cart
Slide from right

Adding item
Slide into list

Removing item
Fade out

Quantity change
Smooth number transition

----------------------------------------------------

CART PAGE

Create a separate cart page.

Layout:

Left side
Cart items list

Right side
Order summary card

Order summary card

Subtotal
VAT
Total
Checkout button

The summary card should remain sticky while scrolling.

----------------------------------------------------

ITEM MANAGEMENT PAGE

This page is for administrators.

The existing grid / table should move here.

This page should contain:

Search items
Add item
Edit item
Delete item

Design:

Card container
Modern data table
Floating add button

----------------------------------------------------

ADD ITEM DIALOG

Redesign the dialog.

Two column layout.

Left side

Image preview
Upload area

Right side

Item code
Name EN
Name AR
Price
VAT
Net total

UX features

Live VAT calculation
Live image preview
Inline validation

----------------------------------------------------

LAYOUT STRUCTURE

Create a modern layout shell.

AppShell

Top Navigation
Main Container
Cart Drawer

----------------------------------------------------

TOP NAVIGATION BAR

Sticky navigation.

Contains:

Logo
Search bar
Cart icon with badge
Theme toggle
Language toggle

----------------------------------------------------

CONTAINER DESIGN

Use a centered container.

Max width 1320px

Spacing

Padding 32px

Example

.container {
max-width: 1320px;
margin: auto;
padding: 32px;
}

----------------------------------------------------

VISUAL DESIGN SYSTEM

Spacing

Use an 8px spacing system.

Border radius

12px for cards

Shadow

Soft elevation shadows

Typography

Modern clean sans-serif

Strong hierarchy

Colors

Primary
Deep modern blue

Background
Light neutral gray

Cards
White

Hover
Subtle transitions

----------------------------------------------------

ANIMATIONS

Add rich micro-interactions throughout the UI.

Required animations:

Product card hover
Image zoom
Add to cart fly animation
Cart drawer slide
Quantity update animation
Modal open animation
Button ripple effect
Page transitions
Loading skeleton animations

Use Angular animation system.

Animations must be smooth and fast.

----------------------------------------------------

RESPONSIVE DESIGN

Desktop

Full product grid

Tablet

2 cards per row
Collapsible cart drawer

Mobile

Single column grid
Cart becomes bottom drawer

----------------------------------------------------

ANGULAR COMPONENT STRUCTURE

layout
  app-shell
  top-navbar
  container

store
  product-grid
  product-card
  product-detail-modal

cart
  cart-drawer
  cart-page
  cart-item

admin
  items-management
  add-item-dialog
  items-table

shared
  card
  button
  animations

----------------------------------------------------

SCROLL BEHAVIOR

The page should scroll normally.

The cart drawer should never move with page scroll.

Cart items list must have its own scroll area.

Use CSS strategies like:

height: 100vh
overflow hidden
overflow-y auto

----------------------------------------------------

DELIVERABLES

Provide:

1. Full UI architecture
2. Angular component tree
3. SCSS design system
4. Example HTML templates
5. Animation implementations
6. Cart logic
7. Product card component
8. Cart drawer implementation
9. Responsive layout strategy

----------------------------------------------------

IMPORTANT

The result must look like a **real modern e-commerce website**, not a CRUD admin panel.

Design quality should match modern SaaS products.

Focus heavily on:

visual hierarchy  
animations  
spacing  
interaction design  
cart experience

----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------



You are a senior .NET and Angular full-stack engineer. Implement a configurable database seeding feature for the order_management project.

Please execute the following requirements exactly:

1. Backend Updates (Data Models & EF Core)
Add Category to Item: Update the 
Item.cs
 model to include a public string Category { get; set; } = string.Empty; property.
Update AppConfiguration: Add the following properties to 
AppConfiguration.cs
 to manage seed data behavior from settings:
public bool SeedDataEnabled { get; set; } = false;
public int SeedDataCount { get; set; } = 100;
public string SeedDataCategory { get; set; } = "All";
EF Migrations: Generate and apply a new EF Core migration to add these columns to the database.
2. Backend Updates (Configuration API)
Update ConfigurationDto.cs and 
UpdateConfigurationRequest.cs
 to include SeedDataEnabled, SeedDataCount, and SeedDataCategory.
Update the 
ConfigurationController.cs
 (
UpdateConfiguration
 method) to apply the changes to these new fields in the DB.
3. Database Seeding Logic
In 
Program.cs
 (or via a scoped Seeder service invoked during startup), check if AppConfiguration.SeedDataEnabled is true.
If true, and the 
Items
 table is empty (or missing the seeded count), generate SeedDataCount fake items.
Saudi Market Context: The generated items MUST reflect realistic products and prices in Saudi Arabia (e.g., Arabic Coffee, Dates, Oud/Perfumes, Electronics popular in KSA, local fashion). Use real-sounding Arabic and English names.
Images (Unsplash hrefs ONLY): Assign relevant Unsplash URLs directly to the ImagePath property.
CRITICAL - Do Not Download Images: The current 
Program.cs
 has a block of code commented as // Download online images to local assets folder. You MUST modify or bypass this code so that it completely ignores seeded images. The frontend will render the Unsplash href directly. Do not download the images to the local disk.
4. Frontend Updates (Configuration Panel)
Settings UI: Update 
ConfigPanelComponent
 (
config-panel.component.ts
 and 
.html
) to add a new "Data Seeding Settings" section (mat-card).
Add form controls for:
Enable Seed Data (mat-slide-toggle)
Product Category (mat-form-field with input or select)
Seed Count (mat-form-field with numeric input)
Update ConfigService models (UpdateConfigRequest, ConfigDto) to include the new fields.
Ensure the save action properly sends these new flags to the backend.
Update 
en.json
 and 
ar.json
 with the new translation keys for these settings.
5. Frontend Updates (Item Display & Category)
Update the frontend ItemDto interface to include the category property.
Update 
item-list.component.html
 and 
item-list.component.ts
 to display the new Category column in the data table.
Update item-form.component.html, 
.ts
, and validators to support adding/editing the Category field.
6. MAINTAIN THE NEW RIYAL LOGO (.sar-icon)
The UI has already been meticulously updated to use an official custom SVG for the Saudi Riyal symbol via a CSS mask class (.sar-icon).

CRITICAL: Do NOT revert or change the price displays back to plain text, the currency pipe, or SAR.
Every price display in the application (Product Cards, Modal, Cart Page, Printed Invoice) currently looks like this: <span>{{ item.price | number:'1.0-0' }} <span class="sar-icon"></span></span>
Ensure that any changes you make to the UI strictly maintain this <span class="sar-icon"></span> structure. Do not remove the 
assets/icons/sar-symbol.svg
 file.