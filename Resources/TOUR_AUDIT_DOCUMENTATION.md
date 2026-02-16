# Tour System Audit Documentation

## Tour Coverage Matrix

| Tour ID | Tour Name | Target Page(s) | Roles | Steps (Admin/User) Desktop | Steps (Admin/User) Mobile | Status |
|---------|-----------|----------------|-------|---------------------------|--------------------------|--------|
| welcome-tour | Welcome to SolidForm | Dashboard (sidebar/bottom nav) | Admin, User | 6 / 5 | 6 / 6 | ✅ Active |
| dashboard-tour | Dashboard Overview | Dashboard | Admin, User | 2 / 2 | 2 / 2 | ✅ Active |
| form-builder-tour | Form Builder | Build Form (via Forms page) | Admin, User | 4 / 4 | 4 / 4 | ✅ Active |
| submissions-tour | Form Submissions | Forms → Published → Submissions | Admin, User | 4 / 3 | 4 / 3 | ✅ Active |
| settings-tour | Settings & Configuration | Global Settings | Admin | 3 / N/A | 3 / N/A | ✅ Active |
| forms-library-tour | Forms Library | Forms | Admin, User | 3 / 2 | 3 / 2 | ✅ Active |
| reports-tour | Reports & Analytics | Reports | Admin, User | 1 / 1 | 1 / 1 | ✅ Active |

---

## Navigation Structure (Updated)

The sidebar and mobile navigation follow this order:
1. **Dashboard** - Analytics and overview
2. **Forms** - Form library (Templates, Drafts, Published) with per-form submissions
3. **Reports** - Report generation and customization
4. **Global Settings** - Language, branding, developer options (Admin only)
5. **Help** - Guided tours and quick tips
6. **Resources** - Developer documentation (visible only when developer toggle is enabled)

### Key Workflow Changes
- **Review Submissions** has been removed from the sidebar. Submissions are now accessed per-form via a "Submissions" button on each published form card.
- **Build Form** has been removed from the sidebar. Form creation is accessed through the Forms page via "+ New Form" and "Templates" buttons.
- **Reports** is now a top-level navigation item in the sidebar.
- After saving a draft or publishing a form, the user is redirected to the Forms page.

---

## Layout-Aware Tour System

The tour system supports **layout-specific steps** that adapt to desktop or mobile viewports.

### Layout Modes
- **desktop**: Steps shown only on viewports ≥768px
- **mobile**: Steps shown only on viewports <768px
- **both**: Steps shown on all viewports

### How It Works
1. `TourContext` detects viewport width and sets `layoutMode`
2. Steps are filtered by both `roles` AND `layout` before display
3. Step content uses layout-appropriate language (e.g., "Click sidebar" vs "Tap bottom bar")

---

## Data Tour ID Registry

This registry is the **single source of truth** for all `data-tour-id` attributes.

### Desktop Navigation Elements (Sidebar - AppSidebar.tsx)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Brand Logo | `brand-logo` | AppSidebar | Logo and product name in sidebar header |
| Dashboard Nav | `nav-dashboard` | AppSidebar | Dashboard navigation item |
| Forms Nav | `nav-forms` | AppSidebar | Forms navigation item |
| Reports Nav | `nav-reports` | AppSidebar | Reports navigation item |
| Settings Nav | `nav-settings` | AppSidebar | Global Settings navigation item |
| Help Nav | `nav-help` | AppSidebar | Help & Tours navigation item |
| Resources Nav | `nav-resources` | AppSidebar | Resources navigation item (dev flag) |

### Mobile Navigation Elements (MobileBottomNav.tsx, MobileHeader.tsx)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Mobile Brand/Title | `mobile-brand-logo` | MobileHeader | App title in mobile header |
| Mobile Menu Button | `mobile-menu-button` | MobileHeader | Hamburger menu button |
| Mobile Dashboard | `mobile-nav-dashboard` | MobileBottomNav | Dashboard bottom nav icon |
| Mobile Forms | `mobile-nav-forms` | MobileBottomNav | Forms bottom nav icon |
| Mobile Reports | `mobile-nav-reports` | MobileBottomNav | Reports bottom nav icon |
| Mobile More | `mobile-nav-more` | MobileBottomNav | More options bottom nav icon |

### Dashboard Page (Analytics.tsx)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Statistics Cards | `dashboard-stats` | Analytics | Grid of overview stat cards |
| Charts Section | `dashboard-charts` | Analytics | Analytics tabs with charts |

### Form Builder Page (FormBuilder.tsx)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Field Palette | `field-palette` | FormBuilder | Left sidebar with field types (desktop) |
| Mobile Add Field | `mobile-add-field` | FormBuilder | Add field button (mobile) |
| Form Title Area | `form-title` | FormBuilder | Form title and description input |
| Form Canvas | `form-canvas` | FormBuilder | Main form editing area |
| Save Button | `save-form` | FormBuilder | Save form button |

### Per-Form Submissions (SubmissionReview.tsx via form-submissions tab)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Filters Section | `submission-filters` | SubmissionReview | Search and filter controls |
| Submissions List | `submission-list` | SubmissionReview | List of submission cards |
| Actions Panel | `submission-actions` | SubmissionReview | Submission detail and actions |

### Reports Page (ReportGeneration.tsx)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Reports Section | `reports-section` | ReportGeneration | Report generation interface |

### Forms Library Page (Index.tsx - forms tab)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Tabs | `forms-tabs` | Index | Templates/Drafts/Published tabs |
| Forms List | `forms-list` | Index | Grid of form cards |
| Form Actions | `forms-actions` | Index | Edit/Publish/Delete/Submissions buttons |

### Global Settings Page (GlobalSettings.tsx)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Language Card | `language-settings` | GlobalSettings | Language selection card |
| Brand Card | `brand-settings` | GlobalSettings | Brand customization card |
| Developer Card | `developer-settings` | GlobalSettings | Developer options card |

---

## Step-by-Step Verification Matrix

### Welcome Tour - Desktop (Admin: 6 steps, User: 5 steps)

| Step | ID | Title | Target | Layout | Content Summary | Admin | User |
|------|----|-------|--------|--------|-----------------|-------|------|
| 1 | welcome-1-desktop | Welcome to SolidForm | brand-logo | desktop | Introduction to platform | ✅ | ✅ |
| 2 | welcome-2-desktop | Dashboard | nav-dashboard | desktop | View analytics | ✅ | ✅ |
| 3 | welcome-3-desktop | Forms | nav-forms | desktop | Forms, templates, per-form submissions | ✅ | ✅ |
| 4 | welcome-4-desktop | Reports | nav-reports | desktop | Generate reports | ✅ | ✅ |
| 5 | welcome-5-desktop | Global Settings | nav-settings | desktop | Configure settings | ✅ | N/A |
| 6 | welcome-6-desktop | Help & Support | nav-help | desktop | Access help resources | ✅ | ✅ |

### Welcome Tour - Mobile (Admin/User: 6 steps)

| Step | ID | Title | Target | Layout | Content Summary | Admin | User |
|------|----|-------|--------|--------|-----------------|-------|------|
| 1 | welcome-1-mobile | Welcome to SolidForm | mobile-brand-logo | mobile | Introduction | ✅ | ✅ |
| 2 | welcome-2-mobile | Dashboard | mobile-nav-dashboard | mobile | Tap to view analytics | ✅ | ✅ |
| 3 | welcome-3-mobile | Forms | mobile-nav-forms | mobile | Access forms and submissions | ✅ | ✅ |
| 4 | welcome-4-mobile | Reports | mobile-nav-reports | mobile | Generate reports | ✅ | ✅ |
| 5 | welcome-5-mobile | More Options | mobile-nav-more | mobile | Access Settings/Help | ✅ | ✅ |
| 6 | welcome-6-mobile | Navigation Menu | mobile-menu-button | mobile | Open full nav drawer | ✅ | ✅ |

### Dashboard Tour (Both Layouts: 2 steps)

| Step | ID | Title | Target | Layout | Content Summary | Admin | User |
|------|----|-------|--------|--------|-----------------|-------|------|
| 1 | dash-1 | Key Statistics | dashboard-stats | both | Overview metrics | ✅ | ✅ |
| 2 | dash-2 | Analytics Charts | dashboard-charts | both | Visual insights | ✅ | ✅ |

### Form Builder Tour

| Step | ID | Title | Target | Layout | Content Summary | Admin | User |
|------|----|-------|--------|--------|-----------------|-------|------|
| 1 | builder-1-desktop | Field Palette | field-palette | desktop | Field types sidebar | ✅ | ✅ |
| 1 | builder-1-mobile | Add Fields | mobile-add-field | mobile | Add field button | ✅ | ✅ |
| 2 | builder-2 | Form Title | form-title | both | Title/description | ✅ | ✅ |
| 3 | builder-3 | Form Canvas | form-canvas | both | Main editing area | ✅ | ✅ |
| 4 | builder-4 | Save Form | save-form | both | Save → returns to Forms page | ✅ | ✅ |

### Submissions Tour (Per-Form)

| Step | ID | Title | Target | Layout | Content Summary | Admin | User |
|------|----|-------|--------|--------|-----------------|-------|------|
| 1 | sub-0 | Find Published Forms | forms-tabs | both | Navigate to Published tab | ✅ | ✅ |
| 2 | sub-1 | Filter & Search | submission-filters | both | Search controls | ✅ | ✅ |
| 3 | sub-2 | Submission List | submission-list | both | Browse form submissions | ✅ | ✅ |
| 4 | sub-3-desktop | Review & Actions | submission-actions | desktop | Take actions (desktop) | ✅ | N/A |
| 4 | sub-3-mobile | Review & Actions | submission-actions | mobile | Tap to take actions | ✅ | N/A |

### Reports Tour

| Step | ID | Title | Target | Layout | Content Summary | Admin | User |
|------|----|-------|--------|--------|-----------------|-------|------|
| 1 | rep-1 | Report Generation | reports-section | both | Generate reports | ✅ | ✅ |

### Settings Tour (Admin only: 3 steps, both layouts)

| Step | ID | Title | Target | Layout | Content Summary | Admin | User |
|------|----|-------|--------|--------|-----------------|-------|------|
| 1 | set-1 | Language Settings | language-settings | both | Language config | ✅ | N/A |
| 2 | set-2 | Brand Identity | brand-settings | both | Branding options | ✅ | N/A |
| 3 | set-3 | Developer Settings | developer-settings | both | Dev resources toggle | ✅ | N/A |

### Forms Library Tour

| Step | ID | Title | Target | Layout | Content Summary | Admin | User |
|------|----|-------|--------|--------|-----------------|-------|------|
| 1 | lib-1 | Forms Organization | forms-tabs | both | Tab navigation | ✅ | ✅ |
| 2 | lib-2 | Form Cards | forms-list | both | Form grid with submissions button | ✅ | ✅ |
| 3 | lib-3-desktop | Form Actions | forms-actions | desktop | Actions + submissions (desktop) | ✅ | N/A |
| 3 | lib-3-mobile | Form Actions | forms-actions | mobile | Tap action button | ✅ | N/A |

---

## Governance Rules

### When Modifying UI Elements with Tour IDs

1. **Before making changes**, check if the element has a `data-tour-id` attribute
2. **If it does**, update `src/data/tourSteps.ts` to match any label/position changes
3. **Check BOTH desktop and mobile steps** for the affected tour
4. **Test affected tours** at both breakpoints after the change
5. **Update this document** if tours are added, removed, or significantly modified

---

## Known Limitations

1. **Per-Form Submissions**: Submissions tour starts from the Forms page since submissions are accessed per-form, not globally
2. **Developer Resources**: Resources tour not included since section is hidden behind developer flag
3. **Form Preview**: Preview tour not included as it requires published form context
4. **Reports Tour**: Currently a single step; will expand as report features grow

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-02 | Initial tour system implementation |
| 1.1.0 | 2026-02-02 | Added verification matrix, governance rules, and data-tour-id registry |
| 2.0.0 | 2026-02-02 | Added mobile-aware tours: layout detection, mobile-specific steps, responsive overlay |
| 2.1.0 | 2026-02-02 | Fixed mobile FormBuilder data-tour-ids |
| 3.0.0 | 2026-02-16 | Updated for new nav order (Dashboard→Forms→Reports→Settings→Help), per-form submissions, removed Review Submissions and Build Form from sidebar, added Reports tour |
