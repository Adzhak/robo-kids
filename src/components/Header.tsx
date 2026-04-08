import { Bot, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (hash: string) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + hash);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <button onClick={() => navigate("/")} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="text-left">
            <h1 className="font-display text-xl font-extrabold leading-tight text-foreground">
              РобоСтарт
            </h1>
            <p className="text-xs text-muted-foreground leading-none">Онлайн-школа робототехники</p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8 font-body text-sm font-medium text-muted-foreground">
          <button onClick={() => handleNav("#courses")} className="hover:text-primary transition-colors">Курсы</button>
          <button onClick={() => handleNav("#about")} className="hover:text-primary transition-colors">О нас</button>
          <button onClick={() => handleNav("#contacts")} className="hover:text-primary transition-colors">Контакты</button>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-card px-4 py-4 flex flex-col gap-4 font-body text-sm font-medium text-muted-foreground">
          <button onClick={() => handleNav("#courses")} className="text-left hover:text-primary transition-colors">Курсы</button>
          <button onClick={() => handleNav("#about")} className="text-left hover:text-primary transition-colors">О нас</button>
          <button onClick={() => handleNav("#contacts")} className="text-left hover:text-primary transition-colors">Контакты</button>
        </nav>
      )}
    </header>
  );
};

export default Header;
