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

## Data Tour ID Registry

### Navigation Elements (Always Visible)
| Element | data-tour-id | Component | Description |
|---------|--------------|-----------|-------------|
| Brand Logo | brand-logo | AppSidebar | Logo and product name in sidebar header |
| Dashboard Nav | nav-dashboard | AppSidebar | Dashboard navigation item |
| Review Nav | nav-review | AppSidebar | Review Submissions navigation item |
| Forms Nav | nav-forms | AppSidebar | Forms Library navigation item |
| Build Nav | nav-build | AppSidebar | Build Form navigation item |
| Settings Nav | nav-settings | AppSidebar | Global Settings navigation item |
| Help Nav | nav-help | AppSidebar | Help & Tours navigation item |

### Dashboard Page
| Element | data-tour-id | Component | Description |
|---------|--------------|-----------|-------------|
| Statistics Cards | dashboard-stats | Analytics | Grid of overview stat cards |
| Charts Section | dashboard-charts | Analytics | Analytics tabs with charts |

### Form Builder Page
| Element | data-tour-id | Component | Description |
|---------|--------------|-----------|-------------|
| Field Palette | field-palette | FormBuilder | Left sidebar with field types |
| Form Title Area | form-title | FormBuilder | Form title and description input |
| Form Canvas | form-canvas | FormBuilder | Main form editing area |
| Save Button | save-form | FormBuilder | Save form button |

### Review Submissions Page
| Element | data-tour-id | Component | Description |
|---------|--------------|-----------|-------------|
| Filters Section | submission-filters | SubmissionReview | Search and filter controls |
| Submissions List | submission-list | SubmissionReview | List of submission cards |
| Actions Panel | submission-actions | SubmissionReview | Submission detail and actions |

### Forms Library Page
| Element | data-tour-id | Component | Description |
|---------|--------------|-----------|-------------|
| Tabs | forms-tabs | Index (forms section) | Drafts/Published tabs |
| Forms List | forms-list | Index (forms section) | Grid of form cards |
| Form Actions | forms-actions | Index (forms section) | Edit/Publish/Delete buttons |

### Global Settings Page
| Element | data-tour-id | Component | Description |
|---------|--------------|-----------|-------------|
| Language Card | language-settings | GlobalSettings | Language selection card |
| Brand Card | brand-settings | GlobalSettings | Brand customization card |
| Developer Card | developer-settings | GlobalSettings | Developer options card |

## Manual Audit Checklist

Before each release, verify the following for each tour:

### Pre-Flight Checks
- [ ] Help panel opens from sidebar
- [ ] Role selector switches between Admin/User correctly
- [ ] Tour list displays appropriate tours for each role

### Per-Tour Verification
For each tour, run through with "Start Tour" and verify:

1. **Navigation**
   - [ ] Tour navigates to correct page for first step
   - [ ] Page transitions work between steps (if applicable)
   
2. **Element Highlighting**
   - [ ] Spotlight appears around target element
   - [ ] Element is scrolled into view if needed
   - [ ] No "Element not found" warning appears

3. **Overlay Card**
   - [ ] Card is positioned correctly (not off-screen)
   - [ ] Card doesn't overlap/cover the highlighted element
   - [ ] Text matches current UI labels

4. **Controls**
   - [ ] "Next" advances to next step
   - [ ] "Back" returns to previous step
   - [ ] "Skip" advances without error
   - [ ] "Pause" hides overlay and shows in Help panel
   - [ ] "Resume" continues from paused step
   - [ ] "X" closes tour

5. **Completion**
   - [ ] Final step shows "Complete Tour" button
   - [ ] Feedback dialog appears on completion
   - [ ] Tour marked as complete in Help panel
   - [ ] "Restart Tour" works after completion

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

## Known Limitations

1. **Removed Tours**: Reports tour was removed as reports functionality is integrated into Analytics
2. **Developer Resources**: Resources tour not included since section is hidden behind developer flag
3. **Form Preview**: Preview tour not included as it requires published form context

## Governance Rules

### When Modifying UI Elements with Tour IDs

1. **Before making changes**, check if the element has a `data-tour-id` attribute
2. **If it does**, update `src/data/tourSteps.ts` to match any label/position changes
3. **Test affected tours** after the change
4. **Update this document** if tours are added, removed, or significantly modified

### Adding New Tours

1. Define tour in `src/data/tourSteps.ts` with unique ID
2. Add `data-tour-id` attributes to target elements
3. Add tour to coverage matrix above
4. Run through full audit checklist
5. Document any role restrictions

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-02 | Initial tour system implementation |
