import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ExternalLink, Package, Cpu, BookOpen, Wrench } from "lucide-react";

interface CourseLink {
  label: string;
  url: string;
  icon: React.ReactNode;
}

interface CourseCardProps {
  title: string;
  subtitle: string;
  grades: string;
  description: string;
  icon: string;
  color: "wedo" | "spike";
  details: string[];
  links: CourseLink[];
}

const colorMap = {
  wedo: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    activeBorder: "border-primary",
    badge: "bg-primary text-primary-foreground",
    iconBg: "bg-primary/15",
  },
  spike: {
    bg: "bg-[hsl(var(--spike-color)/.1)]",
    border: "border-[hsl(var(--spike-color)/.3)]",
    activeBorder: "border-spike",
    badge: "bg-spike text-primary-foreground",
    iconBg: "bg-[hsl(var(--spike-color)/.15)]",
  },
};

const CourseCard = ({
  title,
  subtitle,
  grades,
  description,
  icon,
  color,
  details,
  links,
}: CourseCardProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const c = colorMap[color];

  return (
    <div
      className={`group rounded-2xl border-2 ${open ? c.activeBorder : c.border} ${c.bg} transition-all duration-300 cursor-pointer overflow-hidden`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-4 p-5 md:p-6">
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl ${c.iconBg} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
          <img src={icon} alt={title} className="w-12 h-12 md:w-16 md:h-16 object-contain" loading="lazy" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${c.badge}`}>{grades}</span>
          </div>
          <h3 className="font-display text-lg md:text-xl font-extrabold text-foreground">{title}</h3>
          <p className="font-body text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 space-y-4">
          <p className="font-body text-sm text-foreground/80 leading-relaxed">{description}</p>

          <div>
            <h4 className="font-display text-sm font-bold text-foreground mb-2 flex items-center gap-2">
              <Package className="w-4 h-4" /> Что входит в набор
            </h4>
            <ul className="space-y-1">
              {details.map((d, i) => (
                <li key={i} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {links.map((link, i) => (
              <button
                key={i}
                onClick={() => navigate(link.url)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${c.badge} hover:opacity-90`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

export const wedoCourse: CourseCardProps = {
  title: "WeDo 2.0",
  subtitle: "Первые шаги в робототехнике",
  grades: "1–2 класс",
  description:
    "Курс на базе набора LEGO Education WeDo 2.0. Дети изучают основы механики, программирования и научного метода через увлекательные проекты с роботами.",
  icon: "",
  color: "wedo",
  details: [
    "Смарт-хаб (микрокомпьютер) с Bluetooth",
    "Мотор среднего размера",
    "Датчик движения и датчик наклона",
    "280+ деталей LEGO для конструирования",
    "Лоток-сортировщик и наклейки",
  ],
  links: [
    { label: "Детали набора", url: "/wedo#details", icon: <Package className="w-3 h-3" /> },
    { label: "Тех. характеристики", url: "/wedo#tech", icon: <Cpu className="w-3 h-3" /> },
    { label: "Перейти к курсу", url: "/wedo#course", icon: <BookOpen className="w-3 h-3" /> },
    { label: "Инструкции сборки", url: "/wedo#builds", icon: <Wrench className="w-3 h-3" /> },
  ],
};

export const spikeCourse: CourseCardProps = {
  title: "Spike Prime",
  subtitle: "Продвинутая робототехника",
  grades: "3–4 класс",
  description:
    "Курс на базе набора LEGO Education SPIKE Prime. Ученики создают сложные модели роботов, учатся работать с датчиками и осваивают блочное и текстовое программирование.",
  icon: "",
  color: "spike",
  details: [
    "Программируемый хаб с цветным дисплеем",
    "2 больших и 1 средний мотор",
    "Датчик расстояния, цвета и силы нажатия",
    "500+ деталей LEGO Technic",
    "Перезаряжаемая батарея",
  ],
  links: [
    { label: "Детали набора", url: "/spike#details", icon: <Package className="w-3 h-3" /> },
    { label: "Тех. характеристики", url: "/spike#tech", icon: <Cpu className="w-3 h-3" /> },
    { label: "Перейти к курсу", url: "/spike#course", icon: <BookOpen className="w-3 h-3" /> },
    { label: "Инструкции сборки", url: "/spike#builds", icon: <Wrench className="w-3 h-3" /> },
  ],
};
