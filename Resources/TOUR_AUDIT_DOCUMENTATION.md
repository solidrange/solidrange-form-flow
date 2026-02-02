# Tour System Audit Documentation

## Tour Coverage Matrix

| Tour ID | Tour Name | Target Page(s) | Roles | Steps (Admin/User) Desktop | Steps (Admin/User) Mobile | Status |
|---------|-----------|----------------|-------|---------------------------|--------------------------|--------|
| welcome-tour | Welcome to SolidForm | Dashboard (sidebar/bottom nav) | Admin, User | 7 / 6 | 7 / 6 | ✅ Active |
| dashboard-tour | Dashboard Overview | Dashboard | Admin, User | 2 / 2 | 2 / 2 | ✅ Active |
| form-builder-tour | Form Builder | Build Form | Admin, User | 4 / 4 | 4 / 4 | ✅ Active |
| submissions-tour | Submission Review | Review Submissions | Admin, User | 3 / 2 | 3 / 2 | ✅ Active |
| settings-tour | Settings & Configuration | Global Settings | Admin | 3 / N/A | 3 / N/A | ✅ Active |
| forms-library-tour | Forms Library | Forms | Admin, User | 3 / 2 | 3 / 2 | ✅ Active |

---

## Layout-Aware Tour System

The tour system now supports **layout-specific steps** that adapt to desktop or mobile viewports.

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

This registry is the **single source of truth** for all `data-tour-id` attributes. When defining tour steps, always use IDs from this registry.

### Desktop Navigation Elements (Sidebar - AppSidebar.tsx)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Brand Logo | `brand-logo` | AppSidebar | Logo and product name in sidebar header |
| Dashboard Nav | `nav-dashboard` | AppSidebar | Dashboard navigation item |
| Review Nav | `nav-review` | AppSidebar | Review Submissions navigation item |
| Forms Nav | `nav-forms` | AppSidebar | Forms Library navigation item |
| Build Nav | `nav-build` | AppSidebar | Build Form navigation item |
| Settings Nav | `nav-settings` | AppSidebar | Global Settings navigation item |
| Resources Nav | `nav-resources` | AppSidebar | Resources navigation item (dev flag) |
| Help Nav | `nav-help` | AppSidebar | Help & Tours navigation item |

### Mobile Navigation Elements (MobileBottomNav.tsx, MobileHeader.tsx)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Mobile Brand/Title | `mobile-brand-logo` | MobileHeader | App title in mobile header |
| Mobile Menu Button | `mobile-menu-button` | MobileHeader | Hamburger menu button |
| Mobile Dashboard | `mobile-nav-dashboard` | MobileBottomNav | Dashboard bottom nav icon |
| Mobile Review | `mobile-nav-review` | MobileBottomNav | Review Submissions bottom nav icon |
| Mobile Forms | `mobile-nav-forms` | MobileBottomNav | Forms Library bottom nav icon |
| Mobile Build | `mobile-nav-build` | MobileBottomNav | Build Form bottom nav icon |
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

### Review Submissions Page (SubmissionReview.tsx)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Filters Section | `submission-filters` | SubmissionReview | Search and filter controls |
| Submissions List | `submission-list` | SubmissionReview | List of submission cards |
| Actions Panel | `submission-actions` | SubmissionReview | Submission detail and actions |

### Forms Library Page (Index.tsx - forms tab)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Tabs | `forms-tabs` | Index | Templates/Drafts/Published tabs |
| Forms List | `forms-list` | Index | Grid of form cards |
| Form Actions | `forms-actions` | Index | Edit/Publish/Delete buttons |

### Global Settings Page (GlobalSettings.tsx)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Language Card | `language-settings` | GlobalSettings | Language selection card |
| Brand Card | `brand-settings` | GlobalSettings | Brand customization card |
| Developer Card | `developer-settings` | GlobalSettings | Developer options card |

---

## Step-by-Step Verification Matrix

### Welcome Tour - Desktop (Admin: 7 steps, User: 6 steps)

| Step | ID | Title | Target | Layout | Content Summary | Admin | User |
|------|----|-------|--------|--------|-----------------|-------|------|
| 1 | welcome-1-desktop | Welcome to SolidForm | brand-logo | desktop | Introduction to platform | ✅ | ✅ |
| 2 | welcome-2-desktop | Dashboard | nav-dashboard | desktop | Click sidebar to view analytics | ✅ | ✅ |
| 3 | welcome-3-desktop | Review Submissions | nav-review | desktop | Manage submissions | ✅ | ✅ |
| 4 | welcome-4-desktop | Forms Library | nav-forms | desktop | Access all forms | ✅ | ✅ |
| 5 | welcome-5-desktop | Form Builder | nav-build | desktop | Create/customize forms | ✅ | ✅ |
| 6 | welcome-6-desktop | Global Settings | nav-settings | desktop | Configure settings | ✅ | N/A |
| 7 | welcome-7-desktop | Help & Support | nav-help | desktop | Access help resources | ✅ | ✅ |

### Welcome Tour - Mobile (Admin: 7 steps, User: 6 steps)

| Step | ID | Title | Target | Layout | Content Summary | Admin | User |
|------|----|-------|--------|--------|-----------------|-------|------|
| 1 | welcome-1-mobile | Welcome to SolidForm | mobile-brand-logo | mobile | Introduction | ✅ | ✅ |
| 2 | welcome-2-mobile | Dashboard | mobile-nav-dashboard | mobile | Tap to view analytics | ✅ | ✅ |
| 3 | welcome-3-mobile | Review Submissions | mobile-nav-review | mobile | Tap to manage submissions | ✅ | ✅ |
| 4 | welcome-4-mobile | Forms Library | mobile-nav-forms | mobile | Access forms | ✅ | ✅ |
| 5 | welcome-5-mobile | Form Builder | mobile-nav-build | mobile | Create forms | ✅ | ✅ |
| 6 | welcome-6-mobile | More Options | mobile-nav-more | mobile | Access Settings/Help | ✅ | ✅ |
| 7 | welcome-7-mobile | Navigation Menu | mobile-menu-button | mobile | Open full nav drawer | ✅ | ✅ |

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
| 4 | builder-4 | Save Form | save-form | both | Save options | ✅ | ✅ |

### Submissions Tour

| Step | ID | Title | Target | Layout | Content Summary | Admin | User |
|------|----|-------|--------|--------|-----------------|-------|------|
| 1 | sub-1 | Filter & Search | submission-filters | both | Search controls | ✅ | ✅ |
| 2 | sub-2 | Submission List | submission-list | both | Browse submissions | ✅ | ✅ |
| 3 | sub-3-desktop | Review & Actions | submission-actions | desktop | Take actions (desktop) | ✅ | N/A |
| 3 | sub-3-mobile | Review & Actions | submission-actions | mobile | Tap to take actions | ✅ | N/A |

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
| 2 | lib-2 | Form Cards | forms-list | both | Form grid | ✅ | ✅ |
| 3 | lib-3-desktop | Form Actions | forms-actions | desktop | Edit/publish/delete (desktop) | ✅ | N/A |
| 3 | lib-3-mobile | Form Actions | forms-actions | mobile | Tap action button | ✅ | N/A |

---

## Manual Audit Checklist

Before each release, verify the following for each tour:

### Pre-Flight Checks
- [ ] Help panel opens from sidebar (desktop) or More sheet (mobile)
- [ ] Layout mode indicator shows correct mode in Help panel
- [ ] Role selector switches between Admin/User correctly
- [ ] Tour list displays appropriate tours for each role
- [ ] LocalStorage is cleared to test fresh state

### Desktop Verification (viewport ≥768px)
For each tour, run through with "Start Tour" and verify:

1. **Navigation**
   - [ ] Tour navigates to correct page for first step
   - [ ] Page transitions work between steps (if applicable)
   
2. **Element Highlighting**
   - [ ] Spotlight appears around target element
   - [ ] Element is scrolled into view if needed
   - [ ] No "Element not found" warning appears

3. **Content-Target Alignment** ⚠️ CRITICAL
   - [ ] Step references "sidebar", "click", desktop UI language
   - [ ] Step targets desktop-specific elements (nav-*, brand-logo)

4. **Overlay Card**
   - [ ] Card is positioned correctly (not off-screen)
   - [ ] Card width is 380px
   - [ ] Text is readable

### Mobile Verification (viewport <768px)
For each tour, run through with "Start Tour" and verify:

1. **Navigation**
   - [ ] Tour navigates to correct page for first step
   - [ ] Bottom navigation responds to tour navigation
   
2. **Element Highlighting**
   - [ ] Spotlight appears around target element
   - [ ] Spotlight has smaller padding (6px vs 8px)
   - [ ] No "Element not found" warning appears
   - [ ] Longer wait times handle drawer/sheet animations

3. **Content-Target Alignment** ⚠️ CRITICAL
   - [ ] Step references "tap", "bottom bar", mobile UI language
   - [ ] Step targets mobile-specific elements (mobile-nav-*, mobile-menu-button)
   - [ ] No references to "sidebar" or "click" on mobile

4. **Overlay Card**
   - [ ] Card is full-width with 16px margin
   - [ ] Card positioned at bottom (above bottom nav) when possible
   - [ ] Touch targets ≥44px for all buttons
   - [ ] Abbreviated button labels (no "Back", "Skip" text on very small screens)

5. **Controls**
   - [ ] "Next" advances to next step
   - [ ] "Back" returns to previous step
   - [ ] "Skip" advances without error
   - [ ] "Pause" hides overlay and shows in Help panel
   - [ ] "Resume" continues from paused step
   - [ ] "X" closes tour

---

## Mobile-Specific Considerations

### Wait Times
- Desktop: 150ms between retries, 200ms initial delay
- Mobile: 200ms between retries, 300ms initial delay (for drawer/sheet animations)

### Touch Targets
All tour controls must have minimum 44x44px tap targets:
- Next/Back/Skip buttons: min-h-[44px]
- Close (X) button: h-8 w-8 minimum
- Feedback buttons: min-h-[44px]

### Positioning
- Mobile cards positioned at bottom when space allows
- Cards avoid overlapping bottom navigation (80px clearance)
- Centered horizontally with max-width of 340px

---

## Governance Rules

### When Modifying UI Elements with Tour IDs

1. **Before making changes**, check if the element has a `data-tour-id` attribute
2. **If it does**, update `src/data/tourSteps.ts` to match any label/position changes
3. **Check BOTH desktop and mobile steps** for the affected tour
4. **Test affected tours** at both breakpoints after the change
5. **Update this document** if tours are added, removed, or significantly modified

### PR Checklist for Tour-Related Changes

Add these items to your PR checklist when modifying navigation, labels, or layouts:

- [ ] Does this change affect any element with `data-tour-id`?
- [ ] If yes, have tour steps in `tourSteps.ts` been updated?
- [ ] Has the step's `layout` field been set correctly?
- [ ] Have you tested the tour at BOTH desktop (≥768px) and mobile (<768px)?
- [ ] Has the verification matrix been updated?

### Preventing Content-Target Mismatch

The most common tour bug is **misaligned content and target**. To prevent this:

1. **Always use the registry**: When defining a step, use `data-tour-id` values from the registry above
2. **Set correct layout**: Use `layout: 'desktop'` for sidebar elements, `layout: 'mobile'` for bottom nav
3. **Use layout-appropriate language**:
   - Desktop: "Click", "sidebar", "left panel"
   - Mobile: "Tap", "bottom bar", "menu icon"
4. **Role filtering awareness**: When filtering steps by role AND layout, verify step indices don't shift unexpectedly

---

## Known Limitations

1. **Removed Tours**: Reports tour was removed as reports functionality is integrated into Analytics
2. **Developer Resources**: Resources tour not included since section is hidden behind developer flag
3. **Form Preview**: Preview tour not included as it requires published form context
4. **Orientation Changes**: Tour may need restart if user rotates device during tour

---

## Troubleshooting Common Issues

### "Element not found" during tour (mobile)
- Check if `data-tour-id` exists with `mobile-` prefix for mobile elements
- Verify the step has `layout: 'mobile'` (not 'desktop')
- Mobile elements may need longer wait times (drawer animations)

### "Element not found" during tour (desktop)
- Check if `data-tour-id` exists in the sidebar component
- Verify the step has `layout: 'desktop'` (not 'mobile')
- Ensure sidebar is expanded/visible

### Step content doesn't match highlighted element
- Verify step's `layout` field matches the current viewport
- Check that mobile steps use mobile-specific language
- Ensure desktop steps don't reference mobile UI

### Tour shows desktop steps on mobile (or vice versa)
- Check `getStepsForRoleAndLayout` is being called correctly
- Verify `layoutMode` is updating on resize
- Clear localStorage and restart tour

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-02 | Initial tour system implementation |
| 1.1.0 | 2026-02-02 | Added verification matrix, governance rules, and data-tour-id registry |
| 2.0.0 | 2026-02-02 | Added mobile-aware tours: layout detection, mobile-specific steps, responsive overlay |
| 2.1.0 | 2026-02-02 | Fixed mobile FormBuilder data-tour-ids (mobile-add-field, save-form), verified all desktop tours |

---

## Latest Verification Status

**Last Full Verification**: 2026-02-02

### Desktop Tours (Verified ✅)
| Tour | Role | Steps | Status |
|------|------|-------|--------|
| Welcome to SolidForm | Admin | 7 | ✅ PASS |
| Welcome to SolidForm | User | 6 | ✅ PASS |
| Dashboard Overview | Admin/User | 2 | ✅ PASS |
| Form Builder | Admin/User | 4 (desktop) | ✅ PASS |
| Submission Review | Admin | 3 | ✅ PASS |
| Settings & Configuration | Admin | 3 | ✅ PASS |
| Forms Library | Admin | 3 | ✅ PASS |

### Mobile Tours (Data-Tour-IDs Verified ✅)
| Tour | Role | Steps | Status |
|------|------|-------|--------|
| Welcome to SolidForm | Admin | 7 | ✅ IDs in place |
| Welcome to SolidForm | User | 6 | ✅ IDs in place |
| Dashboard Overview | Admin/User | 2 | ✅ Uses `both` layout |
| Form Builder | Admin/User | 4 (mobile) | ✅ mobile-add-field added |
| Submission Review | Admin | 3 | ✅ Uses `both` layout |
| Settings & Configuration | Admin | 3 | ✅ Uses `both` layout |
| Forms Library | Admin | 3 | ✅ Uses `both` layout |

### Mobile Component Data-Tour-IDs Registry
| Component | Element | data-tour-id | Status |
|-----------|---------|--------------|--------|
| MobileHeader | Menu Button | mobile-menu-button | ✅ |
| MobileHeader | Brand Title | mobile-brand-logo | ✅ |
| MobileBottomNav | Dashboard | mobile-nav-dashboard | ✅ |
| MobileBottomNav | Review | mobile-nav-review | ✅ |
| MobileBottomNav | Forms | mobile-nav-forms | ✅ |
| MobileBottomNav | Build | mobile-nav-build | ✅ |
| MobileBottomNav | More | mobile-nav-more | ✅ |
| FormBuilder (mobile) | Add Field Button | mobile-add-field | ✅ |
| FormBuilder (mobile) | Save Button | save-form | ✅ |
