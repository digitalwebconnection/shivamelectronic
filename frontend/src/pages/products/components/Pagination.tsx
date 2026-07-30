import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: (page: number | ((p: number) => number)) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  setCurrentPage
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-between gap-4 border-t border-slate-200 pt-6 flex-wrap">
      <span className="text-xs font-bold text-slate-500">
        Showing <strong className="text-slate-800">{(currentPage - 1) * itemsPerPage + 1}</strong>–<strong className="text-slate-800">{Math.min(currentPage * itemsPerPage, totalItems)}</strong> of <strong className="text-slate-800">{totalItems}</strong> products
      </span>
      
      <div className="flex items-center gap-1.5">
        {/* Prev Button */}
        <button
          onClick={() => {
            setCurrentPage((p: number) => Math.max(1, p - 1));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={currentPage === 1}
          className="px-3.5 py-2 rounded-md text-xs font-black border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer select-none"
        >
          ‹ Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
          .reduce<(number | 'ellipsis')[]>((acc, p, idx, arr) => {
            if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('ellipsis');
            acc.push(p);
            return acc;
          }, [])
          .map((item, idx) =>
            item === 'ellipsis' ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 text-xs font-bold select-none">…</span>
            ) : (
              <button
                key={item}
                onClick={() => {
                  setCurrentPage(item as number);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-9 h-9 rounded-md text-xs font-black border transition-all cursor-pointer select-none ${
                  currentPage === item
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                {item}
              </button>
            )
          )
        }

        {/* Next Button */}
        <button
          onClick={() => {
            setCurrentPage((p: number) => Math.min(totalPages, p + 1));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={currentPage === totalPages}
          className="px-3.5 py-2 rounded-md text-xs font-black border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer select-none"
        >
          Next ›
        </button>
      </div>
    </div>
  );
};
