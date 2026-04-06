import { HiChevronLeft, HiChevronRight, HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2'

/**
 * Reusable pagination component.
 * Props:
 *  - total   : total number of items
 *  - page    : current page (1-based)
 *  - perPage : items per page
 *  - onChange : (page) => void
 */
export default function AdminPagination({ total, page, perPage, onChange }) {
  if (total <= perPage) return null

  const totalPages = Math.ceil(total / perPage)
  const from = (page - 1) * perPage + 1
  const to   = Math.min(page * perPage, total)

  // Generate visible page numbers (max 5 around current)
  const getPages = () => {
    const pages = []
    let start = Math.max(1, page - 2)
    let end   = Math.min(totalPages, page + 2)
    if (end - start < 4) {
      if (start === 1) end   = Math.min(totalPages, start + 4)
      else             start = Math.max(1, end - 4)
    }
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  return (
    <div className="admin-pagination">
      <span className="pagination-info">{from}–{to} sur {total}</span>

      <div className="pagination-btns">
        <button
          className="pag-btn"
          disabled={page === 1}
          onClick={() => onChange(1)}
          title="Première page"
        >
          <HiChevronDoubleLeft />
        </button>
        <button
          className="pag-btn"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          title="Page précédente"
        >
          <HiChevronLeft />
        </button>

        {getPages()[0] > 1 && (
          <>
            <button className="pag-btn" onClick={() => onChange(1)}>1</button>
            {getPages()[0] > 2 && <span className="pag-ellipsis">…</span>}
          </>
        )}

        {getPages().map(p => (
          <button
            key={p}
            className={`pag-btn ${p === page ? 'active' : ''}`}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ))}

        {getPages().at(-1) < totalPages && (
          <>
            {getPages().at(-1) < totalPages - 1 && <span className="pag-ellipsis">…</span>}
            <button className="pag-btn" onClick={() => onChange(totalPages)}>{totalPages}</button>
          </>
        )}

        <button
          className="pag-btn"
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          title="Page suivante"
        >
          <HiChevronRight />
        </button>
        <button
          className="pag-btn"
          disabled={page === totalPages}
          onClick={() => onChange(totalPages)}
          title="Dernière page"
        >
          <HiChevronDoubleRight />
        </button>
      </div>
    </div>
  )
}
