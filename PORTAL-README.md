# SpireX Foundation Student Internship Portal

## Project architecture

The portal is a static, multi-page SPA-style experience built with HTML5, CSS3, and Vanilla JavaScript.

- `index.html` — landing page, categories, statistics, and featured roles
- `internships.html` — search, filtering, sorting, pagination/load-more, and bookmarks
- `internship-details.html` — complete role details and application modal
- `login.html` / `register.html` — demo client-side authentication
- `dashboard.html` — application metrics, statuses, tracking timeline, and saved roles
- `profile.html` — editable student profile and completion indicator
- `admin.html` — internship CRUD and application-status administration
- `css/style.css` — design tokens, layout, components, dashboard, and states
- `css/responsive.css` — tablet and mobile adaptations
- `js/data.js` — seed internship data
- `js/storage.js` — safe LocalStorage wrapper and initialization
- `js/auth.js` — demo login, registration, logout, and route guard
- `js/main.js` — shared navigation, notifications, toast, and confirmation helpers
- `js/internships.js`, `applications.js`, `dashboard.js`, `admin.js`, `profile.js`, `landing.js`, `auth-pages.js` — page modules

## Design system

- Primary: `#5b5bd6`
- Ink: `#172033`
- Text: `#252b3a`
- Muted: `#70778b`
- Surface: `#ffffff`
- Background: `#f7f8fc`
- Cards use 16px radii, 1px borders, and restrained shadows
- Core layout uses CSS Grid and Flexbox
- Interfaces include hover, focus, loading, empty, success, error, and confirmation states

## Run locally in VS Code

1. Open the project folder in Visual Studio Code.
2. Install the VS Code **Live Server** extension.
3. Right-click `student-internship-portal/index.html`.
4. Select **Open with Live Server**.
5. Use the address shown by Live Server, normally `http://127.0.0.1:5500`.

Do not open the files using `file://`; Live Server provides reliable navigation and script loading.

## Demo accounts and authentication

Demo login:

- Email: `aarav@example.com`
- Password: `demo123`

Registration creates a browser-only demo account. Authentication is explicitly frontend-only and is not secure production authentication. User, internship, saved, application, and notification data remain in browser LocalStorage.

To reset demo data, run this in browser developer console:

```js
localStorage.clear();
location.reload();
```

## Testing checklist

- [ ] Landing page loads, statistics and featured jobs render
- [ ] Category cards navigate to the explorer with a domain filter
- [ ] Hero search forwards to the internship explorer
- [ ] Search matches title, company, domain, location, and skill
- [ ] Domain, location, type, and stipend filters work
- [ ] Newest, stipend, and relevance sorting work
- [ ] Load-more reveals additional internships
- [ ] Clear filters restores all opportunities
- [ ] Save/unsave updates cards and dashboard saved jobs
- [ ] Internship details show all required information
- [ ] Registration validation rejects invalid fields
- [ ] Login succeeds with demo credentials
- [ ] Applying requires login and blocks duplicate applications
- [ ] Application form validates phone, URL, email, and text
- [ ] Dashboard shows application metrics and statuses
- [ ] Application timeline renders status history
- [ ] Profile completion updates with each filled field
- [ ] Profile edits persist after refresh
- [ ] Notifications open and contain updates
- [ ] Admin can add a listing
- [ ] Admin can edit a listing
- [ ] Delete requires confirmation
- [ ] Delete removes related applications
- [ ] Admin status updates appear in student dashboard
- [ ] Mobile navigation and sidebar open and close
- [ ] No page has broken navigation or console errors

## GitHub Pages deployment

1. Push the repository to GitHub.
2. Open **Settings > Pages**.
3. Choose **Deploy from a branch**.
4. Select the branch and `/ (root)` folder, or select the project folder if the pages repository layout requires it.
5. Save and open the Pages URL.

If hosting is at `/student-internship-portal/`, use the project folder as the repository publishing folder or configure Pages to publish it. Keep relative file links unchanged.

## Vercel static deployment

1. Import the GitHub repository in Vercel.
2. Leave the framework preset as **Other**.
3. Set root directory to `student-internship-portal` if it is not the repository root.
4. Set build command to empty and output directory to `.`.
5. Deploy.
