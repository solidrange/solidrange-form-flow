# Tour System Audit Documentation

## Tour Coverage Matrix

| Tour ID | Tour Name | Target Page(s) | Roles | Steps (Admin/User) | Status |
|---------|-----------|----------------|-------|-------------------|--------|
| welcome-tour | Welcome to SolidForm | Dashboard (sidebar nav) | Admin, User | 7 / 6 | ✅ Active |
| dashboard-tour | Dashboard Overview | Dashboard | Admin, User | 2 / 2 | ✅ Active |
| form-builder-tour | Form Builder | Build Form | Admin, User | 4 / 4 | ✅ Active |
| submissions-tour | Submission Review | Review Submissions | Admin, User | 3 / 2 | ✅ Active |
| settings-tour | Settings & Configuration | Global Settings | Admin | 3 / N/A | ✅ Active |
| forms-library-tour | Forms Library | Forms | Admin, User | 3 / 2 | ✅ Active |

---

## Data Tour ID Registry

This registry is the **single source of truth** for all `data-tour-id` attributes. When defining tour steps, always use IDs from this registry.

### Navigation Elements (Sidebar - AppSidebar.tsx)
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

### Dashboard Page (Analytics.tsx)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Statistics Cards | `dashboard-stats` | Analytics | Grid of overview stat cards |
| Charts Section | `dashboard-charts` | Analytics | Analytics tabs with charts |

### Form Builder Page (FormBuilder.tsx)
| Logical Name | data-tour-id | Component | Description |
|--------------|--------------|-----------|-------------|
| Field Palette | `field-palette` | FormBuilder | Left sidebar with field types |
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

### Welcome Tour (Admin: 7 steps, User: 6 steps)

| Step | ID | Title | Expected Route | Expected Target | Content Summary | Admin | User | Last Verified |
|------|----|----|----------------|-----------------|-----------------|-------|------|---------------|
| 1 | welcome-1 | Welcome to SolidForm | dashboard | brand-logo | Introduction to platform | ✅ | ✅ | 2026-02-02 |
| 2 | welcome-2 | Dashboard | dashboard | nav-dashboard | Analytics and metrics | ✅ | ✅ | 2026-02-02 |
| 3 | welcome-3 | Review Submissions | dashboard | nav-review | Manage submissions | ✅ | ✅ | 2026-02-02 |
| 4 | welcome-4 | Forms Library | dashboard | nav-forms | Access all forms | ✅ | ✅ | 2026-02-02 |
| 5 | welcome-5 | Form Builder | dashboard | nav-build | Create/customize forms | ✅ | ✅ | 2026-02-02 |
| 6 | welcome-6 | Global Settings | dashboard | nav-settings | Configure settings | ✅ | N/A | 2026-02-02 |
| 7 | welcome-7 | Help & Support | dashboard | nav-help | Access help resources | ✅ | ✅ | 2026-02-02 |

### Dashboard Tour (Admin: 2 steps, User: 2 steps)

| Step | ID | Title | Expected Route | Expected Target | Content Summary | Admin | User | Last Verified |
|------|----|----|----------------|-----------------|-----------------|-------|------|---------------|
| 1 | dash-1 | Key Statistics | dashboard | dashboard-stats | Overview metrics | ✅ | ✅ | 2026-02-02 |
| 2 | dash-2 | Analytics Charts | dashboard | dashboard-charts | Visual insights | ✅ | ✅ | 2026-02-02 |

### Form Builder Tour (Admin: 4 steps, User: 4 steps)

| Step | ID | Title | Expected Route | Expected Target | Content Summary | Admin | User | Last Verified |
|------|----|----|----------------|-----------------|-----------------|-------|------|---------------|
| 1 | builder-1 | Field Palette | build-form | field-palette | Field types | ✅ | ✅ | 2026-02-02 |
| 2 | builder-2 | Form Title | build-form | form-title | Title/description | ✅ | ✅ | 2026-02-02 |
| 3 | builder-3 | Form Canvas | build-form | form-canvas | Main editing area | ✅ | ✅ | 2026-02-02 |
| 4 | builder-4 | Save Form | build-form | save-form | Save options | ✅ | ✅ | 2026-02-02 |

### Submissions Tour (Admin: 3 steps, User: 2 steps)

| Step | ID | Title | Expected Route | Expected Target | Content Summary | Admin | User | Last Verified |
|------|----|----|----------------|-----------------|-----------------|-------|------|---------------|
| 1 | sub-1 | Filter & Search | review-submissions | submission-filters | Search controls | ✅ | ✅ | 2026-02-02 |
| 2 | sub-2 | Submission List | review-submissions | submission-list | Browse submissions | ✅ | ✅ | 2026-02-02 |
| 3 | sub-3 | Review & Actions | review-submissions | submission-actions | Take actions | ✅ | N/A | 2026-02-02 |

### Settings Tour (Admin only: 3 steps)

| Step | ID | Title | Expected Route | Expected Target | Content Summary | Admin | User | Last Verified |
|------|----|----|----------------|-----------------|-----------------|-------|------|---------------|
| 1 | set-1 | Language Settings | global-settings | language-settings | Language config | ✅ | N/A | 2026-02-02 |
| 2 | set-2 | Brand Identity | global-settings | brand-settings | Branding options | ✅ | N/A | 2026-02-02 |
| 3 | set-3 | Developer Settings | global-settings | developer-settings | Dev resources toggle | ✅ | N/A | 2026-02-02 |

### Forms Library Tour (Admin: 3 steps, User: 2 steps)

| Step | ID | Title | Expected Route | Expected Target | Content Summary | Admin | User | Last Verified |
|------|----|----|----------------|-----------------|-----------------|-------|------|---------------|
| 1 | lib-1 | Forms Organization | forms | forms-tabs | Tab navigation | ✅ | ✅ | 2026-02-02 |
| 2 | lib-2 | Form Cards | forms | forms-list | Form grid | ✅ | ✅ | 2026-02-02 |
| 3 | lib-3 | Form Actions | forms | forms-actions | Edit/publish/delete | ✅ | N/A | 2026-02-02 |

---

## Manual Audit Checklist

Before each release, verify the following for each tour:

### Pre-Flight Checks
- [ ] Help panel opens from sidebar
- [ ] Role selector switches between Admin/User correctly
- [ ] Tour list displays appropriate tours for each role
- [ ] LocalStorage is cleared to test fresh state

### Per-Tour Verification
For each tour, run through with "Start Tour" and verify:

1. **Navigation**
   - [ ] Tour navigates to correct page for first step
   - [ ] Page transitions work between steps (if applicable)
   
2. **Element Highlighting**
   - [ ] Spotlight appears around target element
   - [ ] Element is scrolled into view if needed
   - [ ] No "Element not found" warning appears

3. **Content-Target Alignment** ⚠️ CRITICAL
   - [ ] Step title matches the highlighted element's label
   - [ ] Step description describes the highlighted element, not another
   - [ ] Current screen is the one described in step text

4. **Overlay Card**
   - [ ] Card is positioned correctly (not off-screen)
   - [ ] Card doesn't overlap/cover the highlighted element
   - [ ] Text matches current UI labels

5. **Controls**
   - [ ] "Next" advances to next step
   - [ ] "Back" returns to previous step
   - [ ] "Skip" advances without error
   - [ ] "Pause" hides overlay and shows in Help panel
   - [ ] "Resume" continues from paused step
   - [ ] "X" closes tour

6. **Completion**
   - [ ] Final step shows "Complete Tour" button
   - [ ] Feedback dialog appears on completion
   - [ ] Tour marked as complete in Help panel
   - [ ] "Restart Tour" works after completion

---

## Role-Based Access Verification

### Admin Role Tours
All tours should be accessible:
- ✅ Welcome to SolidForm (7 steps)
- ✅ Dashboard Overview (2 steps)
- ✅ Form Builder (4 steps)
- ✅ Submission Review (3 steps)
- ✅ Settings & Configuration (3 steps)
- ✅ Forms Library (3 steps)

### User Role Tours
Limited tours visible (no Settings tour):
- ✅ Welcome to SolidForm (6 steps - excludes Settings step)
- ✅ Dashboard Overview (2 steps)
- ✅ Form Builder (4 steps)
- ✅ Submission Review (2 steps - excludes Actions step)
- ❌ Settings & Configuration (not available)
- ✅ Forms Library (2 steps - excludes Actions step)

---

## Governance Rules

### When Modifying UI Elements with Tour IDs

1. **Before making changes**, check if the element has a `data-tour-id` attribute
2. **If it does**, update `src/data/tourSteps.ts` to match any label/position changes
3. **Test affected tours** after the change
4. **Update this document** if tours are added, removed, or significantly modified

### PR Checklist for Tour-Related Changes

Add these items to your PR checklist when modifying navigation, labels, or layouts:

- [ ] Does this change affect any element with `data-tour-id`?
- [ ] If yes, have tour steps in `tourSteps.ts` been updated?
- [ ] Has the verification matrix been updated with new verification date?
- [ ] Have you run the Welcome tour and confirmed text/target alignment?

### Preventing Content-Target Mismatch

The most common tour bug is **misaligned content and target**. To prevent this:

1. **Always use the registry**: When defining a step, use `data-tour-id` values from the registry above
2. **Verify route matches screen**: The `route` property must match where the target element exists
3. **Read your step aloud**: "The [title] step describes [element] on the [route] page" - all three must align
4. **Role filtering awareness**: When filtering steps by role, verify step indices don't shift unexpectedly

### How to Add or Modify a Tour Step

1. **Choose target element** from the Data Tour ID Registry above
2. **Specify the correct route** where the element exists
3. **Write step content** that describes ONLY that element
4. **Define role access** (which roles can see this step)
5. **Update the verification matrix** with the new step
6. **Test the tour** for both Admin and User roles

---

## Known Limitations

1. **Removed Tours**: Reports tour was removed as reports functionality is integrated into Analytics
2. **Developer Resources**: Resources tour not included since section is hidden behind developer flag
3. **Form Preview**: Preview tour not included as it requires published form context

---

## Troubleshooting Common Issues

### "Element not found" during tour
- Check if `data-tour-id` exists in the component
- Verify the `route` property is correct
- Element may be conditionally rendered (check permissions)

### Step content doesn't match highlighted element
- Verify step's `targetSelector` uses correct `data-tour-id`
- Check role-based filtering isn't shifting step indices
- Compare step order in config vs rendered order

### Tour resets unexpectedly
- Check for localStorage issues
- Role change during tour will reset it (expected behavior)
- Verify no duplicate tour IDs exist

### Stale tour state
- Clear localStorage keys: `solidform_tour_state`, `solidform_tour_analytics`, `solidform_user_role`
- Restart the tour from Help panel

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-02 | Initial tour system implementation |
| 1.1.0 | 2026-02-02 | Added verification matrix, governance rules, and data-tour-id registry |
