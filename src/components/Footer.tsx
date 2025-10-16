import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p className="mb-2">
              <strong>Disclaimer:</strong> For educational purposes only. Not financial advice.
            </p>
            <p>© {new Date().getFullYear()} FinAware. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-primary" />
            <a
              href="mailto:abhijeetmore6969@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              abhijeetmore6969@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;