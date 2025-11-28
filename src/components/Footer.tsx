```tsx
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto px-4 sm:px-6 lg:px-8 pb-10">
      <div className="max-w-6xl mx-auto glass-panel px-6 py-6 sm:py-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">Stay informed</p>
              <p className="text-lg font-semibold text-slate-900">Weekly insights straight to your inbox</p>
            </div>
            <a
              href="mailto:abhijeetmore6969@gmail.com"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-primary/40 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              abhijeetmore6969@gmail.com
            </a>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-slate-500">
            <p>
              <strong className="text-slate-900">Disclaimer:</strong> FinAware is an educational companion and does not
              provide financial advice.
            </p>
            <p>© {new Date().getFullYear()} FinAware. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```
