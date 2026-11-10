# AW11 Parts Exchange project brief

The app supports NZ to Sydney AW11 parts sourcing and order coordination. Track each physical unit separately and keep the owner's personal purchase separate from prospective group orders. Treat historical supplier statements and buyer interest as unconfirmed.

## Implemented features

These features are present in the recovered version-1 source. Presence in source is separate from the test evidence below.

- Searchable part records with one physical unit intended per record, fitment/side/part number, included/missing items, condition/defects and test evidence.
- Owner-scoped records, saved revisions and stale-edit rejection.
- Photo uploads and captions; authenticated photo reads scoped by owner. Accepted formats: JPG, PNG and WebP, up to 8 MB per file.
- Sourcing requests and shipment batches.
- Private supplier, buyer, cost, freight, fee, payment and approval-reference fields.
- Customer HTML catalogue export of non-archived parts explicitly marked `Catalogue`, with embedded photos and a fixed list of customer-facing fields. Search filters do not determine export selection.
- JSON backup of current records and individual revision downloads. The record backup is not a complete backup: image binaries and the full revision history are excluded. Retain original photos separately.
- Optional creation of six starter sourcing requests. These are demand records, not stock or availability claims.

## Current production data – read-only observation

Sites database inspection on 9 November 2026 found **six sourcing requests, zero part records and zero shipment batches**, with six revision-1 entries. The requests have no attached photos:

- RH power window regulator & motor
- LH power window motor
- Driver master window switch
- Passenger window switch
- LH door latch assembly
- Engine bay fuse box cover

The requests were already present when this continuation inspected the database. They were saved around 21:58 AEDT on 9 November. This confirms persisted request records and revisions; it does not verify the complete authenticated browser save/upload/export path. No production rows were created or changed by this continuation. No R2 object inventory was performed.

## Verification and remaining limits

| Check | Evidence and status |
| --- | --- |
| TypeScript and production build | Passed in this continuation: `./node_modules/.bin/tsc --noEmit` and `npm run build`, using the recovered version-1 application source; also reported passed in the handover |
| Local save/details/history UI | Passed, reported in the handover; not rerun here |
| API create/update/history, stale rejection, anonymous denial, photo owner isolation | Passed, reported in the handover; not rerun here |
| Existing deployment and audience | Verified in this continuation using Sites: active, version 1, owner-private |
| Hosted anonymous sign-in gate | Verified in this continuation: unauthenticated HTTPS request returned 401 and the platform “Sign in required” page |
| Existing production records/revisions | Verified read-only through Sites database tools; six requests and six revisions |
| Hosted authenticated create/edit/reload | Still pending end-to-end verification |
| Hosted upload, save and photo reload | Still pending end-to-end verification |
| Hosted customer HTML download, embedded photos and private-field exclusion | Still pending end-to-end verification |
| Android phone usability | Pending |

Subsequent browser checks reached the sign-in gate. Authenticated hosted verification is still pending. See [Hosted Verification](HOSTED_VERIFICATION.md).

## Planned work – not implemented

### Next: finish hosted verification

Restore access to the supported cloud browser and sign in as the owner if needed. Complete the hosted save/upload/export checks, retain the evidence and fix observed failures. Keep the dashboard private. Use clearly labelled test data and archive it after checks; do not modify the six sourcing requests just to test unrelated fields.

### Then: owner-operated supplier photo inbox

Reduce [SUPPLIER]'s photo/cataloguing workload by letting [OWNER] upload photos already received in Messenger. Initial uploads are unidentified, unverified leads and must not appear in customer catalogues as available stock.

Planned capabilities and acceptance criteria:

1. Batch upload into a private inbox with supplier/source, received date and original-photo references; report failed uploads without losing successful ones.
2. Group several photos into one possible unit and reference one photo from several distinct units. Stable IDs identify units; an image or filename is not a unit ID. Preserve original media and provenance.
3. Track unknown price/currency, availability and confirmation date, exact fitment, defects, missing hardware and test status explicitly.
4. Generate a consolidated enquiry draft with numbered thumbnails, stable IDs and concise unanswered questions. Review/download only; never automatically send.
5. Preserve dated seller responses and supporting evidence. Distinguish seller-reported working from independent testing.
6. Reconfirm availability before taking an order and record approval of the actual unit/revision and quoted amount. Manual records must not be described as automatic reservation enforcement.
7. Test access isolation, grouping without accidental duplication, interrupted uploads, and exclusion of unverified leads/private details from customer exports.

Proposed lead stages: **Photo received → Identified → Questions pending → Ready to quote → Reserved → Ordered → Collected**. These are a proposed workflow; the current record-stage list is different and has not been changed.

### Later: protected supplier upload link

A simple mobile link for [SUPPLIER] is a later access-control design and implementation task. It must grant only the intended upload capability and must not expose the owner dashboard, buyer data, costs or other suppliers' photos. Supplier portal, inbox grouping and enquiry builder are all still unbuilt.

### Other unbuilt capabilities

No online checkout, customer account flow, automatic reservation enforcement, automated carrier/payment tracking, electronic approval capture, or automatic tax/freight calculation. A full backup including photos and all revisions is also not implemented.

### Proposed: Polycam product views

[OWNER] confirmed that he has Polycam and suggested using it to advertise products. This is a proposed catalogue enhancement, not an implemented integration. No sample product scan has been reviewed, and his current Polycam plan, Android capture options, sharing/export permissions and embed support have not been checked. The existing verification and supplier-inbox priorities remain in place.

Start with a small pilot: scan one accessible, matte/textured part, such as a trim piece, and assess whether a buyer can usefully inspect its shape, mounting points and connectors on a phone. Capture overlapping views at several heights in even light, including the underside where practical. Reflective metal, shiny or very dark surfaces and thin components may reconstruct poorly; check the model against the actual part before using it in an advert.

Proposed catalogue treatment:

- Keep ordinary photos as the main listing view and offer an optional “View in 3D” link for the exact physical unit. Consider embedding or hosting a model only after verifying the available sharing/export options, mobile performance and access settings.
- Associate the scan with the stable unit ID and capture date. Mark any representative/example scan explicitly; do not present it as the buyer's actual unit.
- Retain close-up photos of defects, part numbers and connectors, plus separate test evidence. A reconstruction can omit or smooth detail, so it must not be the sole condition record or proof of working order.
- Record important dimensions from direct measurement. Do not claim fitment or dimensional accuracy from an unvalidated phone scan.
- Retain original photos and permitted model exports; verify that a customer-facing link exposes only intended product content. Do not expose the private operations workspace.

Decision pending: review one real sample, confirm the account's sharing options and decide whether the improvement justifies capture time for each type of part. This is intended as an optional advertising aid, not extra compulsory work for [SUPPLIER].

