import { Phone, RefreshCw, Calendar } from 'lucide-react';

const Header = () => {
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
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span>{currentDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
