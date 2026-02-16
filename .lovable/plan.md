

# Login Page with Role-Based Access Control

## Overview
Add a login page with demo credentials for Admin and User roles. Users can only fill forms assigned to them, while Admins have full access (creating forms, managing submissions, settings, etc.). The help/tour system will be updated to reflect role-specific capabilities.

## What You Will See

**Login Page:**
- A branded login form with email and password fields
- Demo credentials displayed on the page:
  - Admin: admin@solidform.com / admin123
  - User: user@solidform.com / user123
- SolidForm branding and logo

**Admin Experience (full access):**
- Dashboard, Forms, Reports, Settings, Help (unchanged from current)
- Can create, edit, publish, delete forms
- Can view submissions, manage forms, generate reports
- Can access Global Settings and Developer Resources

**User Experience (limited access):**
- Dashboard (read-only analytics)
- Forms page showing only "Assigned Forms" to fill out
- No "New Form", "Templates", or form builder access
- No Global Settings or Developer Resources
- Reports section (read-only)
- Help section with user-specific tours and tips

## Technical Plan

### 1. Create Auth Context (`src/contexts/AuthContext.tsx`)
- Store logged-in user info (role, email, name) in React state
- Provide `login()`, `logout()`, `isAuthenticated`, `currentUser` via context
- Demo credential validation (no Supabase auth -- purely client-side demo)
- Persist session in localStorage

### 2. Create Login Page (`src/pages/Login.tsx`)
- Branded login form with email/password inputs
- Demo credentials section showing both accounts
- Form validation with error messages
- Redirect to main app on successful login

### 3. Update App Router (`src/App.tsx`)
- Add `/login` route
- Wrap `Index` route with auth guard -- redirect to `/login` if not authenticated
- Add `AuthProvider` to the provider tree

### 4. Update Index Page (`src/pages/Index.tsx`)
- Import `useAuth` to get current user role
- Conditionally hide admin-only UI:
  - Hide "New Form" and "Templates" buttons for users
  - Hide form builder tab for users
  - Hide "Manage", "Move to Draft", "Delete" actions on published forms for users
  - Show a "Fill Form" button instead of "Submissions" for user role
  - Hide Global Settings tab for users
- Add logout button to header
- Sync `TourContext` user role with auth role

### 5. Update Sidebar (`src/components/AppSidebar.tsx`)
- Hide "Global Settings" for user role
- Add user avatar/name display and logout button at bottom
- Pass auth role to conditionally render nav items

### 6. Update Mobile Navigation
- `MobileBottomNav.tsx`: Remove Settings from bottom nav for users
- `MobileNavDrawer.tsx`: Hide Settings, show logout option
- `MobileMoreSheet.tsx`: Adjust available options per role

### 7. Update Tour & Help System (`src/data/tourSteps.ts`)
- Add a new tour: "Filling Assigned Forms" (user-only)
- Update existing tours:
  - Welcome tour: differentiate admin vs user welcome messaging
  - Forms Library tour: user version focuses on finding and filling assigned forms
  - Remove settings tour from user role access
- Add new help tips:
  - "Assigned Forms": "Your assigned forms appear on the Forms page. Click 'Fill Form' to start."
  - "Submitting Responses": "Complete all required fields and click Submit to send your response."
  - "Login & Logout": "Use the logout button in the sidebar to switch accounts."
- Update existing tips to clarify admin-only features
- Sync tour role with authenticated role automatically (remove manual role switcher for non-admin)

### 8. Update Help Panel (`src/components/tour/HelpPanel.tsx`)
- Auto-set role from auth context instead of manual toggle
- Only show role switcher for admin users (for testing purposes)
- Update role descriptions to match new capabilities

### 9. Create Assigned Forms View
- In the Forms tab for user role, show published forms assigned to them
- Each form card shows a "Fill Form" button that opens the form in preview/fill mode
- Add a simple form-filling experience using existing `FormPreview` component
- Add a "Submit" action that records the submission

