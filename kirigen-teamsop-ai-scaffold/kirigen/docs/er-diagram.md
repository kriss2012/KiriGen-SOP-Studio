# Entity-Relationship Diagram

See `prisma/schema.prisma` for the source of truth. Summary:

```mermaid
erDiagram
    ORGANIZATION ||--|{ TEAM : has
    ORGANIZATION ||--o| SUBSCRIPTION : has
    TEAM ||--|{ TEAMMEMBER : has
    USER ||--|{ TEAMMEMBER : belongs_to
    TEAM ||--|{ SOP : owns
    TEAM ||--|{ WORKFLOW : owns
    USER ||--|{ SOP : authors
    SOP ||--|{ CHECKLISTITEM : contains
    SOP ||--|{ COMMENT : has
    SOP ||--|{ SOPVERSION : snapshots
    SOP ||--|{ AUDITLOG : logs
    USER ||--|{ TRAININGRECORD : completes
    SOP ||--|{ TRAININGRECORD : tracked_by
```

Notes:

- `TeamMember` is the join table carrying `role` (ADMIN/EDITOR/REVIEWER/VIEWER) — this is where per-team permissions live.
- `SopVersion` is an immutable snapshot written on approve/publish, so a SOP's live `content` can keep changing without losing history.
- `AuditLog` is intentionally generic (`action: string` + `metadata: Json`) so new event types don't require a migration.
