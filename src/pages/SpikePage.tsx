import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Cpu, BookOpen, Wrench, CheckCircle2, Cog, Bluetooth, Gauge, Zap } from "lucide-react";
import spikeIcon from "@/assets/spike-icon.png";

const SpikePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-[hsl(var(--spike-color)/.1)] border-b border-[hsl(var(--spike-color)/.2)]">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-spike transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> На главную
          </button>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[hsl(var(--spike-color)/.15)] flex items-center justify-center flex-shrink-0">
              <img src={spikeIcon} alt="Spike Prime" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
            </div>
            <div>
              <span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-spike text-primary-foreground mb-2">
                3–4 класс
              </span>
              <h1 className="font-display text-2xl md:text-4xl font-extrabold text-foreground">
                Spike Prime
              </h1>
              <p className="font-body text-muted-foreground text-sm md:text-base mt-1">
                Продвинутая робототехника и программирование
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-14 space-y-14">
        {/* Детали набора */}
        <section id="details">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--spike-color)/.15)] flex items-center justify-center">
              <Package className="w-4 h-4 text-spike" />
            </div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Детали набора
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Программируемый хаб", desc: "Центральный блок с цветным LED-дисплеем 5×5, 6 портами ввода/вывода, встроенным гироскопом/акселерометром и динамиком." },
              { title: "2 больших мотора", desc: "Мощные моторы с встроенным датчиком вращения для точного управления движением робота." },
              { title: "1 средний мотор", desc: "Компактный мотор для вспомогательных механизмов: захватов, рычагов, поворотных платформ." },
              { title: "Датчик расстояния", desc: "Ультразвуковой датчик для определения расстояния до объектов и обнаружения препятствий." },
              { title: "Датчик цвета", desc: "Определяет 8 цветов, интенсивность отражённого света и окружающего освещения." },
              { title: "Датчик силы нажатия", desc: "Измеряет силу нажатия и касание. Подходит для создания интерактивных кнопок и бамперов." },
              { title: "500+ деталей Technic", desc: "Балки, оси, шестерни, коннекторы, колёса и гусеницы для создания сложных конструкций." },
              { title: "Аккумулятор", desc: "Перезаряжаемая литий-ионная батарея. Зарядка через Micro-USB, хватает на ~4 часа работы." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-spike mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-bold text-foreground text-sm">{item.title}</h3>
                    <p className="font-body text-muted-foreground text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Тех. часть */}
        <section id="tech">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--spike-color)/.15)] flex items-center justify-center">
              <Cpu className="w-4 h-4 text-spike" />
            </div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Технические характеристики
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: <Bluetooth className="w-5 h-5" />, label: "Подключение", value: "Bluetooth + USB" },
              { icon: <Cog className="w-5 h-5" />, label: "Моторы", value: "2 больших + 1 средний" },
              { icon: <Gauge className="w-5 h-5" />, label: "Датчики", value: "Расстояние, цвет, сила" },
              { icon: <Cpu className="w-5 h-5" />, label: "Процессор", value: "ARM Cortex-M4" },
              { icon: <Zap className="w-5 h-5" />, label: "Питание", value: "Li-Ion аккумулятор" },
              { icon: <BookOpen className="w-5 h-5" />, label: "Язык", value: "Scratch / Python" },
            ].map((spec, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg bg-[hsl(var(--spike-color)/.1)] flex items-center justify-center text-spike mb-3">
                  {spec.icon}
                </div>
                <p className="font-body text-xs text-muted-foreground">{spec.label}</p>
                <p className="font-display font-bold text-foreground text-sm mt-0.5">{spec.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Курс */}
        <section id="course">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--spike-color)/.15)] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-spike" />
            </div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Программа курса
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { num: 1, title: "Введение в Spike Prime", desc: "Знакомство с хабом, подключение, интерфейс программирования." },
              { num: 2, title: "Моторы и движение", desc: "Управление скоростью и направлением, танковый поворот, движение по дуге." },
              { num: 3, title: "Работа с датчиками", desc: "Датчик цвета, расстояния, силы нажатия. Условия и циклы." },
              { num: 4, title: "Продвинутые механизмы", desc: "Захваты, подъёмники, рулевое управление, шагающие роботы." },
              { num: 5, title: "Программирование на Python", desc: "Переход от блочного к текстовому программированию, переменные, функции." },
              { num: 6, title: "Проект «Робот-сортировщик»", desc: "Робот, распознающий цвета и сортирующий объекты по категориям." },
              { num: 7, title: "Проект «Автономный транспорт»", desc: "Робот с навигацией по линии и объездом препятствий." },
              { num: 8, title: "Финальный проект", desc: "Свободный проект: ученик придумывает и реализует своего робота." },
            ].map((lesson) => (
              <div key={lesson.num} className="flex gap-4 items-start rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-spike text-primary-foreground flex items-center justify-center font-display font-extrabold text-sm flex-shrink-0">
                  {lesson.num}
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground text-sm">{lesson.title}</h3>
                  <p className="font-body text-muted-foreground text-sm mt-0.5">{lesson.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Сборки */}
        <section id="builds">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--spike-color)/.15)] flex items-center justify-center">
              <Wrench className="w-4 h-4 text-spike" />
            </div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Инструкции по сборке
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Базовая тележка", difficulty: "Начальный" },
              { name: "Робот-захватчик", difficulty: "Средний" },
              { name: "Шагающий робот", difficulty: "Продвинутый" },
              { name: "Гоночный болид", difficulty: "Средний" },
              { name: "Робот-художник", difficulty: "Продвинутый" },
              { name: "Сортировщик цветов", difficulty: "Продвинутый" },
              { name: "Кран", difficulty: "Средний" },
              { name: "Танцующий робот", difficulty: "Начальный" },
              { name: "Гусеничный вездеход", difficulty: "Продвинутый" },
            ].map((build, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--spike-color)/.1)] flex items-center justify-center text-spike mb-3 group-hover:bg-[hsl(var(--spike-color)/.2)] transition-colors">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-foreground text-sm">{build.name}</h3>
                <span className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                  build.difficulty === "Начальный" ? "bg-accent/20 text-accent" :
                  build.difficulty === "Средний" ? "bg-secondary/20 text-secondary" :
                  "bg-destructive/20 text-destructive"
                }`}>
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

export default SpikePage;
