import { Phone, RefreshCw, Calendar } from 'lucide-react';




interface HeaderProps {
  dates: string[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  dateLabel?: string;
}

const Header = ({ dates, selectedDate, onDateChange, dateLabel }: HeaderProps) => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="glass-card p-6 mb-8 animate-slide-up">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
            <Phone className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">
              <span className="gradient-text">PM-SVANidhi</span>
              <span className="text-foreground"> Voice Agent Analytics</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Tranche 1 - Call Summary Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              className="px-5 py-2 rounded-xl text-sm font-semibold text-[#0A3146]
               bg-[#D2F3FF] border border-[#77D7FF]
               shadow-sm focus:outline-none cursor-pointer
               transition-all hover:bg-[#c8ecff] appearance-none"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
            >
              <option value="All days" className="bg-[#0B182B]  text-white">All days</option>
              {dates.map((d) => (
                <option key={d} value={d} className="bg-[#0B182B] text-white">
                  {d}
                </option>
              ))}
            </select>

            {/* Dropdown arrow icon */}
            <span className="pointer-events-none absolute right-2 pl-2 top-2.5 text-[#0A3146] text-xs">
              ▼
            </span>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
