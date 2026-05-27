# Parabolic Capital Ltd.

Corporate website for Parabolic Capital Ltd., an operating investment company with interests across legal infrastructure, hospitality, property, local commerce, civic data, wellness, events, SME systems, and group operating platforms.

## Open Locally

Open `index.html` directly in a browser.

## Structure

- `index.html` contains the page content and portfolio taxonomy.
- `styles.css` contains the full responsive visual system.
- `script.js` handles the mobile menu, scroll reveals, header state, year, and portfolio filtering.

## Portfolio Logic

Portfolio entries are grouped by `data-sector`:

- `legal`
- `commerce`
- `operations`
- `public`

Update the filter buttons and row attributes together if the taxonomy changes.

## Contact Endpoint

The contact form is wired for an external API endpoint. Set the endpoint in `script.js`:

```js
const CONTACT_ENDPOINT = "https://your-api.example.com/contact";
```

The form sends a `POST` request with `Content-Type: application/json`:

```json
{
  "name": "Visitor name",
  "organization": "Company or organization",
  "email": "visitor@example.com",
  "opportunityType": "Strategic partnership",
  "message": "Message body",
  "source": "parabolic-capital-website",
  "submittedAt": "2026-05-25T10:00:00.000Z"
}
```

Expected success response: any `2xx` status. Non-`2xx` responses show the user an error state.
