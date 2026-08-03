// Slugs of blogs that are MANAGED BY THE CMS.
//
// The public Blogs page merges CMS-published blogs with the old hardcoded
// static posts. Normally a CMS blog just overrides a static one with the same
// slug. But if a static blog has been *migrated* into the CMS and is later
// DELETED/unpublished from the CMS, the merge would otherwise fall back to the
// stale static copy and the blog would reappear publicly.
//
// Any slug listed here is treated as CMS-owned: the static copy is NEVER shown
// for it, even when the CMS has no published version. So deleting it from the
// CMS removes it from the site instead of resurrecting the old static article.
//
// When you migrate a static blog into the CMS (a separate, later task), add its
// slug here (and remove its hand-written entry from public/sitemap.xml). Static
// blogs that have NOT been migrated must stay OUT of this list so they keep
// rendering normally.
export const CMS_MANAGED_SLUGS: string[] = [];
