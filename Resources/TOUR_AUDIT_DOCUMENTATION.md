# Tour System Audit Documentation

## Tour Coverage Matrix

| Tour ID | Tour Name | Target Page(s) | Roles | Steps Desktop | Steps Mobile | Status |
|---------|-----------|----------------|-------|---------------|--------------|--------|
| welcome-tour | Welcome to SolidForm | Sidebar/Bottom Nav/Assigned | Admin, User | Admin: 6 / User: 4 | Admin: 6 / User: 4 | ✅ Active |
| dashboard-tour | Dashboard Overview | Dashboard | Admin only | 2 | 2 | ✅ Active |
| form-builder-tour | Form Builder | Build Form (via Forms page) | Admin only | 4 | 4 | ✅ Active |
| filling-forms-tour | Filling Assigned Forms | Forms → Assigned tab | User only | 3 | 3 | ✅ Active |
| submissions-tour | Form Submissions | Forms → Published → Submissions | Admin only | 4 | 4 | ✅ Active |
| settings-tour | Settings & Configuration | Global Settings | Admin only | 3 | 3 | ✅ Active |
| forms-library-tour | Forms Library | Forms | Admin only | 3 | 3 | ✅ Active |
| reports-tour | Reports & Analytics | Reports | Admin only | 1 | 1 | ✅ Active |

---

## Role-Based Access Control (RBAC)

### Admin Role
- **Full access**: Dashboard, Forms (Drafts/Published/Assigned), Reports, Global Settings, Help
- **Can**: Create forms, edit, publish with ADFS/email distribution, view submissions, generate custom reports
- **Tours available**: Welcome, Dashboard, Form Builder, Submissions, Settings, Forms Library, Reports
- **Assigned tab**: Admin can also fill forms assigned to them via the "Assigned" tab in Forms

### User Role
- **Limited access**: Forms (Assigned tab only), Help
- **Can**: View assigned forms, fill and submit forms
- **Cannot**: Access Dashboard, Reports, Settings, create/edit/publish forms
- **Tours available**: Welcome (focused on Assigned section), Filling Assigned Forms

---

## Navigation Structure

### Admin Navigation
1. **Dashboard** - Analytics and overview (admin only)
2. **Forms** - Form library with 3 tabs: Drafts, Published, Assigned
3. **Reports** - Report generation and customization (admin only)
4. **Global Settings** - Language, branding, developer options (admin only)
5. **Help** - Guided tours and quick tips
6. **Resources** - Developer documentation (visible only when developer toggle is enabled in Settings)

### User Navigation
1. **Forms** - Shows only "Assigned Forms" view with "Fill Form" buttons
2. **Help** - User-specific guided tours and tips

### Key Workflow Changes
- **Submissions** are accessed per-form via a "Submissions" button on each published form card (admin only)
- **Form creation** is accessed through the Forms page via "+ New Form" and "Templates" buttons (admin only)
- **Form distribution**: When publishing, admins can distribute via ADFS groups or email lists
- **Assigned tab**: Both admin and user roles can fill forms assigned to them
- **Dashboard and Reports** are completely hidden for user role
- After saving a draft or publishing a form, the admin is redirected to the Forms page

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
| Logical Name | data-tour-id | Component | Visible To |
|--------------|--------------|-----------|------------|
| Brand Logo | `brand-logo` | AppSidebar | All |
| Dashboard Nav | `nav-dashboard` | AppSidebar | Admin |
| Forms Nav | `nav-forms` | AppSidebar | All |
| Reports Nav | `nav-reports` | AppSidebar | Admin |
| Settings Nav | `nav-settings` | AppSidebar | Admin |
| Help Nav | `nav-help` | AppSidebar | All |
| Resources Nav | `nav-resources` | AppSidebar | Admin (dev flag) |

### Mobile Navigation Elements (MobileBottomNav.tsx, MobileHeader.tsx)
| Logical Name | data-tour-id | Component | Visible To |
|--------------|--------------|-----------|------------|
| Mobile Brand/Title | `mobile-brand-logo` | MobileHeader | All |
| Mobile Menu Button | `mobile-menu-button` | MobileHeader | All |
| Mobile Dashboard | `mobile-nav-dashboard` | MobileBottomNav | Admin |
| Mobile Forms | `mobile-nav-forms` | MobileBottomNav | All |
| Mobile Reports | `mobile-nav-reports` | MobileBottomNav | Admin |
| Mobile More | `mobile-nav-more` | MobileBottomNav | All |

### Dashboard Page (Analytics.tsx) - Admin Only
| Logical Name | data-tour-id | Component |
|--------------|--------------|-----------|
| Statistics Cards | `dashboard-stats` | Analytics |
| Charts Section | `dashboard-charts` | Analytics |

### Form Builder Page (FormBuilder.tsx) - Admin Only
| Logical Name | data-tour-id | Component |
|--------------|--------------|-----------|
| Field Palette | `field-palette` | FormBuilder |
| Mobile Add Field | `mobile-add-field` | FormBuilder |
| Form Title Area | `form-title` | FormBuilder |
| Form Canvas | `form-canvas` | FormBuilder |
| Save Button | `save-form` | FormBuilder |

### Forms Library Page (Index.tsx - forms tab)
| Logical Name | data-tour-id | Component | Visible To |
|--------------|--------------|-----------|------------|
| Tabs | `forms-tabs` | Index | Admin (3-tab: Drafts/Published/Assigned) |
| Forms List | `forms-list` | Index | Admin |
| Form Actions | `forms-actions` | Index | Admin |
| Assigned Forms | `assigned-forms` | Index | User (standalone), Admin (tab) |

### Per-Form Submissions (SubmissionReview.tsx) - Admin Only
| Logical Name | data-tour-id | Component |
|--------------|--------------|-----------|
| Filters Section | `submission-filters` | SubmissionReview |
| Submissions List | `submission-list` | SubmissionReview |
| Actions Panel | `submission-actions` | SubmissionReview |

### Reports Page (ReportGeneration.tsx) - Admin Only
| Logical Name | data-tour-id | Component |
|--------------|--------------|-----------|
| Reports Section | `reports-section` | ReportGeneration |

### Global Settings Page (GlobalSettings.tsx) - Admin Only
| Logical Name | data-tour-id | Component |
|--------------|--------------|-----------|
| Language Card | `language-settings` | GlobalSettings |
| Brand Card | `brand-settings` | GlobalSettings |
| Developer Card | `developer-settings` | GlobalSettings |

---

## Step-by-Step Verification Matrix

### Welcome Tour - Desktop

**Admin (6 steps):**
| Step | ID | Title | Target | Content Summary |
|------|----|-------|--------|-----------------|
| 1 | welcome-1-desktop-admin | Welcome | brand-logo | Introduction to platform |
| 2 | welcome-2-desktop-admin | Dashboard | nav-dashboard | View analytics |
| 3 | welcome-3-desktop-admin | Forms | nav-forms | Drafts, Published, Assigned tabs |
| 4 | welcome-4-desktop-admin | Reports | nav-reports | Generate reports |
| 5 | welcome-5-desktop-admin | Settings | nav-settings | Configure settings |
| 6 | welcome-6-desktop-admin | Help | nav-help | Access help resources |

**User (4 steps):**
| Step | ID | Title | Target | Content Summary |
|------|----|-------|--------|-----------------|
| 1 | welcome-1-desktop-user | Welcome | brand-logo | Introduction |
| 2 | welcome-2-desktop-user | Assigned Forms | nav-forms | Navigate to Assigned tab |
| 3 | welcome-3-desktop-user | Fill Forms | assigned-forms | Cards with Fill Form button |
| 4 | welcome-4-desktop-user | Help | nav-help | Access help |

### Welcome Tour - Mobile

**Admin (6 steps):**
| Step | ID | Title | Target | Content Summary |
|------|----|-------|--------|-----------------|
| 1 | welcome-1-mobile-admin | Welcome | mobile-brand-logo | Introduction |
| 2 | welcome-2-mobile-admin | Dashboard | mobile-nav-dashboard | Tap for analytics |
| 3 | welcome-3-mobile-admin | Forms | mobile-nav-forms | Access forms |
| 4 | welcome-4-mobile-admin | Reports | mobile-nav-reports | Generate reports |
| 5 | welcome-5-mobile-admin | More | mobile-nav-more | Settings/Help |
| 6 | welcome-6-mobile-admin | Menu | mobile-menu-button | Full nav drawer |

**User (4 steps):**
| Step | ID | Title | Target | Content Summary |
|------|----|-------|--------|-----------------|
| 1 | welcome-1-mobile-user | Welcome | mobile-brand-logo | Introduction |
| 2 | welcome-2-mobile-user | Assigned Forms | mobile-nav-forms | Tap for Assigned tab |
| 3 | welcome-3-mobile-user | Your Forms | assigned-forms | Form cards to fill |
| 4 | welcome-4-mobile-user | More | mobile-nav-more | Help and sign out |

### Filling Assigned Forms Tour (User only, 3 steps, both layouts)
| Step | ID | Title | Target | Content Summary |
|------|----|-------|--------|-----------------|
| 1 | fill-1 | Navigate to Assigned | forms-tabs | Click Assigned tab |
| 2 | fill-2 | Your Assigned Forms | assigned-forms | Form cards overview |
| 3 | fill-3 | Fill a Form | assigned-forms | Click Fill Form, complete, submit |

### Dashboard Tour (Admin only, 2 steps, both layouts)
| Step | ID | Title | Target | Content Summary |
|------|----|-------|--------|-----------------|
| 1 | dash-1 | Key Statistics | dashboard-stats | Overview metrics |
| 2 | dash-2 | Analytics Charts | dashboard-charts | Visual insights |

### Form Builder Tour (Admin only)
| Step | ID | Title | Target | Layout | Content Summary |
|------|----|-------|--------|--------|-----------------|
| 1 | builder-1-desktop | Field Palette | field-palette | desktop | Field types sidebar |
| 1 | builder-1-mobile | Add Fields | mobile-add-field | mobile | Add field button |
| 2 | builder-2 | Form Title | form-title | both | Title/description |
| 3 | builder-3 | Form Canvas | form-canvas | both | Main editing area |
| 4 | builder-4 | Save Form | save-form | both | Save with distribution options |

### Submissions Tour (Admin only)
| Step | ID | Title | Target | Layout | Content Summary |
|------|----|-------|--------|--------|-----------------|
| 1 | sub-0 | Find Published Forms | forms-tabs | both | Navigate to Published tab |
| 2 | sub-1 | Filter & Search | submission-filters | both | Search controls |
| 3 | sub-2 | Submission List | submission-list | both | Browse submissions |
| 4 | sub-3-desktop | Review & Actions | submission-actions | desktop | Take actions |
| 4 | sub-3-mobile | Review & Actions | submission-actions | mobile | Tap to take actions |

### Settings Tour (Admin only, 3 steps, both layouts)
| Step | ID | Title | Target | Content Summary |
|------|----|-------|--------|-----------------|
| 1 | set-1 | Language Settings | language-settings | Language config |
| 2 | set-2 | Brand Identity | brand-settings | Branding options |
| 3 | set-3 | Developer Settings | developer-settings | Dev resources toggle |

### Forms Library Tour (Admin only)
| Step | ID | Title | Target | Layout | Content Summary |
|------|----|-------|--------|--------|-----------------|
| 1 | lib-1 | Forms Organization | forms-tabs | both | Tab navigation (Drafts/Published/Assigned) |
| 2 | lib-2 | Form Cards | forms-list | both | Form grid with actions |
| 3 | lib-3-desktop | Form Actions | forms-actions | desktop | Actions + submissions |
| 3 | lib-3-mobile | Form Actions | forms-actions | mobile | Tap action button |

### Reports Tour (Admin only, 1 step, both layouts)
| Step | ID | Title | Target | Content Summary |
|------|----|-------|--------|-----------------|
| 1 | rep-1 | Report Generation | reports-section | Generate customized reports |

---

## Governance Rules

### When Modifying UI Elements with Tour IDs

1. **Before making changes**, check if the element has a `data-tour-id` attribute
2. **If it does**, update `src/data/tourSteps.ts` to match any label/position changes
3. **Check BOTH desktop and mobile steps** for the affected tour
4. **Verify role filtering**: Ensure steps have correct `roles` arrays
5. **Test affected tours** at both breakpoints and for both roles after the change
6. **Update this document** if tours are added, removed, or significantly modified

---

## Known Limitations

1. **Per-Form Submissions**: Submissions tour starts from Forms page since submissions are accessed per-form
2. **Developer Resources**: Resources tour not included since section is hidden behind developer flag
3. **Form Preview**: Preview tour not included as it requires published form context
4. **Reports Tour**: Currently a single step; will expand as report features grow
5. **Assigned Forms**: Currently shows all published forms; future enhancement to filter by actual assignment

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-02 | Initial tour system implementation |
| 1.1.0 | 2026-02-02 | Added verification matrix, governance rules, and data-tour-id registry |
| 2.0.0 | 2026-02-02 | Added mobile-aware tours: layout detection, mobile-specific steps, responsive overlay |
| 2.1.0 | 2026-02-02 | Fixed mobile FormBuilder data-tour-ids |
| 3.0.0 | 2026-02-16 | Updated for new nav order, per-form submissions, removed Review/Build from sidebar |
| 4.0.0 | 2026-02-16 | RBAC: Login system with Admin/User roles, role-specific tours and navigation |
| 4.1.0 | 2026-02-16 | Removed Dashboard/Reports for users, admin form distribution (ADFS/email), Assigned tab |
| 4.2.0 | 2026-02-16 | User tours focused on Assigned section, admin tours unchanged, updated all documentation |
