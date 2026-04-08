import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Cpu, BookOpen, Wrench, CheckCircle2, Cog, Bluetooth, Gauge } from "lucide-react";
import wedoIcon from "@/assets/wedo-icon.png";

const tabData = [
  {
    id: "details",
    label: "Детали набора",
    icon: <Package className="w-4 h-4" />,
  },
  {
    id: "tech",
    label: "Тех. часть",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: "course",
    label: "Курс",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: "builds",
    label: "Сборки",
    icon: <Wrench className="w-4 h-4" />,
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
              <img src={wedoIcon} alt="WeDo 2.0" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
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
        {/* Детали набора */}
        <section id="details">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Package className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Детали набора
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Смарт-хаб", desc: "Программируемый микрокомпьютер с Bluetooth Low Energy для беспроводного подключения к планшету или компьютеру." },
              { title: "Мотор", desc: "Средний мотор для приведения моделей в движение. Поддерживает управление скоростью и направлением вращения." },
              { title: "Датчик движения", desc: "Инфракрасный датчик для обнаружения объектов на расстоянии до 15 см. Позволяет роботу реагировать на препятствия." },
              { title: "Датчик наклона", desc: "Определяет наклон в 6 положениях: вверх, вниз, влево, вправо, наклон и отсутствие наклона." },
              { title: "280+ деталей LEGO", desc: "Кирпичики, балки, оси, шестерёнки, колёса и другие элементы для конструирования разнообразных моделей." },
              { title: "Лоток-сортировщик", desc: "Удобный лоток для хранения и сортировки деталей по типу и размеру. Наклейки для маркировки." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
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
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Технические характеристики
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: <Bluetooth className="w-5 h-5" />, label: "Подключение", value: "Bluetooth Low Energy 4.1" },
              { icon: <Cog className="w-5 h-5" />, label: "Мотор", value: "1 средний, ~110 об/мин" },
              { icon: <Gauge className="w-5 h-5" />, label: "Датчики", value: "Движения + наклона" },
              { icon: <Cpu className="w-5 h-5" />, label: "Питание", value: "2 × AA батарейки" },
              { icon: <Package className="w-5 h-5" />, label: "Деталей", value: "280+" },
              { icon: <BookOpen className="w-5 h-5" />, label: "Среда", value: "WeDo 2.0 Software" },
            ].map((spec, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
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
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Программа курса
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { num: 1, title: "Знакомство с набором", desc: "Изучение деталей, подключение смарт-хаба, первая программа." },
              { num: 2, title: "Механизмы и передачи", desc: "Зубчатые передачи, ременные передачи, червячные механизмы." },
              { num: 3, title: "Датчики и обратная связь", desc: "Работа с датчиком движения и наклона, условные конструкции." },
              { num: 4, title: "Проект «Вентилятор»", desc: "Сборка и программирование вентилятора с регулировкой скорости." },
              { num: 5, title: "Проект «Гоночная машина»", desc: "Создание машины с датчиком расстояния для объезда препятствий." },
              { num: 6, title: "Проект «Робот-исследователь»", desc: "Финальный проект: автономный робот с несколькими датчиками." },
            ].map((lesson) => (
              <div key={lesson.num} className="flex gap-4 items-start rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-extrabold text-sm flex-shrink-0">
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
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Инструкции по сборке
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Майло — научный вездеход", difficulty: "Начальный" },
              { name: "Тяга", difficulty: "Начальный" },
              { name: "Гоночная машина", difficulty: "Средний" },
              { name: "Вентилятор", difficulty: "Начальный" },
              { name: "Землетрясение", difficulty: "Средний" },
              { name: "Робот-лягушка", difficulty: "Продвинутый" },
            ].map((build, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary/20 transition-colors">
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

export default WedoPage;
