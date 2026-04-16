"use client";

const TABS = [
  {
    id: "lectures",
    label: "Lectures",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    id: "homelie",
    label: "Homélie",
    icon: (active) => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round">
        {active ? (
          <path d="M10 2 h4 v4 h5 v4 h-5 v12 h-4 v-12 h-5 v-4 h5 z" />
        ) : (
          <>
            <line x1="12" y1="2" x2="12" y2="22" strokeWidth="2" />
            <line x1="5" y1="8" x2="19" y2="8" strokeWidth="2" />
          </>
        )}
      </svg>
    ),
  },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8D9B5] flex justify-around items-center h-16 z-50 max-w-xl mx-auto">
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 ${
              isActive ? "text-cardinal" : "text-[#B09880]"
            }`}
          >
            {tab.icon(isActive)}
            <span className="text-[10px] font-semibold tracking-wide uppercase">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
