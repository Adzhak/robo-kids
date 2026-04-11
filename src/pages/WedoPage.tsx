import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Cpu,
  BookOpen,
  Wrench,
  CheckCircle2,
  Cog,
  Bluetooth,
  Gauge,
  Code2,
  Play,
  RotateCcw,
  Volume2,
  Timer,
  MousePointer,
} from "lucide-react";
import wedoIcon from "@/assets/wedo-icon.png";

/* === ИМПОРТ PDF === */
import miloPdf from "@/pdf/milo.pdf";
import tractionPdf from "@/pdf/traction.pdf";
import raceCarPdf from "@/pdf/race-car.pdf";
import fanPdf from "@/pdf/fan.pdf";
import heliPdf from "@/pdf/helicopter.pdf";
import gruzPdf from "@/pdf/gruz.pdf";

/* === ДАННЫЕ СБОРКИ === */
const builds = [
  {
    name: "Майло — научный вездеход",
    difficulty: "Начальный",
    pdf: miloPdf,
  },
  {
    name: "Тяга",
    difficulty: "Начальный",
    pdf: tractionPdf,
  },
  {
    name: "Гоночная машина",
    difficulty: "Средний",
    pdf: raceCarPdf,
  },
  {
    name: "Вентилятор",
    difficulty: "Начальный",
    pdf: fanPdf,
  },
  {
    name: "Вертолет",
    difficulty: "Продвинутый",
    pdf: heliPdf,
  },
  {
    name: "Грузовик",
    difficulty: "Продвинутый",
    pdf: gruzPdf,
  },
];

const WedoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> На главную
          </button>

          <div className="flex items-center gap-5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
              <img
                src={wedoIcon}
                alt="WeDo 2.0"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </div>

            <div>
              <span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground mb-2">
                1–2 класс
              </span>

              <h1 className="font-display text-2xl md:text-4xl font-extrabold text-foreground">
                WeDo 2.0
              </h1>

              <p className="font-body text-muted-foreground text-sm md:text-base mt-1">
                Первые шаги в мир робототехники и программирования
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-14 space-y-14">

        {/* СБОРКИ */}
        <section id="builds">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-primary" />
            </div>

            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Инструкции по сборке
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {builds.map((build, i) => (
              <div
                key={i}
                onClick={() => window.open(build.pdf, "_blank")}
                className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary/20 transition-colors">
                  <Wrench className="w-5 h-5" />
                </div>

                <h3 className="font-display font-bold text-foreground text-sm">
                  {build.name}
                </h3>

                <span
                  className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                    build.difficulty === "Начальный"
                      ? "bg-accent/20 text-accent"
                      : build.difficulty === "Средний"
                      ? "bg-secondary/20 text-secondary"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {build.difficulty}
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>

      <footer className="border-t border-border bg-muted/50 py-8">
        <div className="container mx-auto px-4 text-center font-body text-sm text-muted-foreground">
          © 2026 РобоСтарт — Онлайн-школа робототехники для детей
        </div>
      </footer>
    </div>
  );
};

export default WedoPage;