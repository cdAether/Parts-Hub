# Hosted verification – pending

Target: <CURRENT_SITE_URL>

Prepared 9 November 2026 (Australia/Sydney). These are acceptance checks, **not a record of passed tests**. Record each result with date, live version, browser/device, test record ID/revision and evidence. Keep credentials and private data out of logs/screenshots.

## Prerequisite and current blocker

Use the owner account to run these checks. Preserve the authentication gate and use dedicated test records.

## Test data

Use a harmless, clearly labelled test image containing no personal information. Create a dedicated part titled `QA ONLY – upload and export verification`, marked `Draft`, with condition/fitment/availability explicitly unverified. It is a test fixture, not stock. Keep the six existing sourcing requests intact. Use obvious synthetic marker strings for buyer, supplier, costs, payment, approval and notes so export exclusion can be checked.

## Checks

| Check | Steps and expected result | Result |
| --- | --- | --- |
| Authenticated save | Create the dedicated test part, save, reload the page and reopen it. Same ID and saved fields must return. | Pending |
| Revision history | Edit a public description, save, reload and open history. Revision increments and old/new snapshots match their respective values. | Pending |
| Stale edit | Open the same revision in two tabs. Save in the first, then try saving the stale second. It must reject the overwrite; newest data must remain. | Pending |
| Photo roundtrip | Upload the harmless JPG/PNG/WebP, caption it, save, reload and open the full photo. The image and caption must persist; inspect the downloaded image if needed. | Pending |
| Upload errors | Try an unsupported format and a file over 8 MB. Confirm a clear error and preservation of the already saved record/photos. | Pending |
| Catalogue selection | With the fixture still Draft, it must not export. Mark only the fixture Catalogue, then export. Selection follows Catalogue visibility, not the search filter. | Pending |
| Standalone HTML | Open the downloaded HTML separately/offline. The correct unit ID, revision, condition, price text and captions appear; embedded photos load without a signed-in Site session. No broken authenticated image links remain. | Pending |
| Private-field exclusion | Inspect rendered output and HTML source for each synthetic private marker. Buyer, supplier, costs, freight, fee, payment, approval, notes and batch references must be absent. Intended customer fields remain. | Pending |
| Text escaping | Include harmless angle brackets/quotes in title or caption. Export must show literal text, not interpret it as markup. | Pending |
| Anonymous photo access | In a signed-out context, request the uploaded photo URL. It must not return the image. Do not grant another account access to the dashboard just for a test. | Pending |
| Phone check | On the Android phone, confirm file selection, upload, save/reload, modal controls and catalogue download work at the phone's viewport. | Pending |
| Cleanup | Return the fixture to Draft and set stage Archived. Confirm it is absent from customer export. The app has no delete UI; record its retained ID rather than claiming it was deleted. | Pending |

## Completion record

No hosted browser checks above have been executed in this continuation. Read-only Sites inspection confirms six existing sourcing requests and their revisions, but does not replace these tests. Update this document and `PROJECT_BRIEF.md` together when results become available.
