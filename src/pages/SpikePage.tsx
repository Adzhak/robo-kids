import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
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
  Zap,
  Code2,
  Play,
  RotateCcw,
  Variable,
  Braces,
  GitBranch,
  Repeat,
  Terminal,
  X,
  Check,
  Circle,
} from "lucide-react";
import spikeIcon from "@/assets/spike-icon.png";

/* === ИМПОРТ PDF === */
import breakDancerPdf from "@/pdf/spike/break-dancer.pdf";
import deliveryRobotPdf from "@/pdf/spike/delivery-robot.pdf";
import windmillPdf from "@/pdf/spike/windmill.pdf";
import blasterPdf from "@/pdf/spike/blaster.pdf";
import airplanePdf from "@/pdf/spike/airplane.pdf";
import towerCranePdf from "@/pdf/spike/tower-crane.pdf";

/* === ДАННЫЕ СБОРКИ === */
const builds = [
  {
    id: "break-dancer",
    name: "Брейк-дансер",
    difficulty: "Начальный",
    pdf: breakDancerPdf,
  },
  {
    id: "delivery-robot",
    name: "Робот-доставщик",
    difficulty: "Начальный",
    pdf: deliveryRobotPdf,
  },
  {
    id: "windmill",
    name: "Ветряк",
    difficulty: "Начальный",
    pdf: windmillPdf,
  },
  {
    id: "blaster",
    name: "Пушка",
    difficulty: "Средний",
    pdf: blasterPdf,
  },
  {
    id: "airplane",
    name: "Самолет",
    difficulty: "Продвинутый",
    pdf: airplanePdf,
  },
  {
    id: "tower-crane",
    name: "Башенный кран",
    difficulty: "Продвинутый",
    pdf: towerCranePdf,
  },
];

const quizQuestions = [
  {
    id: "q1",
    title: "Задача 1",
    program:
      "Старт → Цикл 4 раза: ехать вперёд 20 см → повернуть вправо на 90°",
    options: [
      "Робот поедет по кругу",
      "Робот проедет квадрат",
      "Робот остановится сразу",
    ],
    correctIndex: 1,
    explanation:
      "Четыре одинаковых участка с поворотом на 90° образуют квадратный маршрут.",
  },
  {
    id: "q2",
    title: "Задача 2",
    program:
      "Старт → Если расстояние меньше 15 см, то моторы назад, иначе моторы вперёд",
    options: [
      "Робот всегда едет назад",
      "Робот останавливается при препятствии",
      "Робот отъезжает назад, когда объект слишком близко",
    ],
    correctIndex: 2,
    explanation:
      "Когда датчик видит объект ближе 15 см, выполняется ветка 'назад'. Иначе робот едет вперёд.",
  },
  {
    id: "q3",
    title: "Задача 3",
    program:
      "Python:\ncolor = color_sensor.color(port.A)\nif color == 'red':\n    motor.run(port.B, 90)\nelif color == 'blue':\n    motor.run(port.B, -90)",
    options: [
      "Мотор всегда крутится только вперёд",
      "Красный и синий цвет запускают мотор в разные стороны",
      "Программа считает расстояние до объекта",
    ],
    correctIndex: 1,
    explanation:
      "Для красного выполняется вращение в одну сторону, для синего — в другую.",
  },
  {
    id: "q4",
    title: "Задача 4",
    program:
      "Python:\nwhile True:\n    dist = distance_sensor.distance(port.C)\n    if dist < 100:\n        motor_pair.steer(50)\n    else:\n        motor_pair.move(200)",
    options: [
      "Если впереди близко препятствие, робот меняет направление",
      "Робот едет только прямо и никогда не поворачивает",
      "Программа включает звук, когда расстояние меньше 100",
    ],
    correctIndex: 0,
    explanation:
      "При близком препятствии выполняется команда steer, то есть робот меняет курс. Иначе движется прямо.",
  },
];

const STORAGE_KEY = "spike-build-progress-v1";

const SpikePage = () => {
  const navigate = useNavigate();

  const [selectedBuild, setSelectedBuild] = useState<(typeof builds)[number] | null>(null);
  const [completedBuildIds, setCompletedBuildIds] = useState<string[]>([]);

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
  });

  const [quizChecked, setQuizChecked] = useState<Record<string, boolean>>({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setCompletedBuildIds(parsed);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedBuildIds));
  }, [completedBuildIds]);

  useEffect(() => {
    if (!selectedBuild) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedBuild(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedBuild]);

  const completedCount = completedBuildIds.length;
  const progressPercent = useMemo(
    () => Math.round((completedCount / builds.length) * 100),
    [completedCount]
  );

  const isCompleted = (buildId: string) => completedBuildIds.includes(buildId);

  const toggleCompleted = (buildId: string) => {
    setCompletedBuildIds((prev) =>
      prev.includes(buildId)
        ? prev.filter((id) => id !== buildId)
        : [...prev, buildId]
    );
  };

  const setQuizAnswer = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));

    setQuizChecked((prev) => ({
      ...prev,
      [questionId]: false,
    }));
  };

  const checkQuizAnswer = (questionId: string) => {
    if (quizAnswers[questionId] === null) return;

    setQuizChecked((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  const resetQuiz = () => {
    setQuizAnswers({
      q1: null,
      q2: null,
      q3: null,
      q4: null,
    });
    setQuizChecked({
      q1: false,
      q2: false,
      q3: false,
      q4: false,
    });
  };

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
              <img
                src={spikeIcon}
                alt="Spike Prime"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
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
              {
                title: "Программируемый хаб",
                desc: "Центральный блок с цветным LED-дисплеем 5×5, 6 портами ввода/вывода, встроенным гироскопом/акселерометром и динамиком.",
              },
              {
                title: "2 больших мотора",
                desc: "Мощные моторы с встроенным датчиком вращения для точного управления движением робота.",
              },
              {
                title: "1 средний мотор",
                desc: "Компактный мотор для вспомогательных механизмов: захватов, рычагов, поворотных платформ.",
              },
              {
                title: "Датчик расстояния",
                desc: "Ультразвуковой датчик для определения расстояния до объектов и обнаружения препятствий.",
              },
              {
                title: "Датчик цвета",
                desc: "Определяет 8 цветов, интенсивность отражённого света и окружающего освещения.",
              },
              {
                title: "Датчик силы нажатия",
                desc: "Измеряет силу нажатия и касание. Подходит для создания интерактивных кнопок и бамперов.",
              },
              {
                title: "500+ деталей Technic",
                desc: "Балки, оси, шестерни, коннекторы, колёса и гусеницы для создания сложных конструкций.",
              },
              {
                title: "Аккумулятор",
                desc: "Перезаряжаемая литий-ионная батарея. Зарядка через Micro-USB, хватает на ~4 часа работы.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-spike mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-bold text-foreground text-sm">
                      {item.title}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm mt-1">
                      {item.desc}
                    </p>
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
                <p className="font-display font-bold text-foreground text-sm mt-0.5">
                  {spec.value}
                </p>
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
              { num: 6, title: "Проект «Робот-доставщик»", desc: "Робот, доставляющий больщие грузы." },
              { num: 7, title: "Проект «Башеный кран»", desc: "Робот с системой крана для передвижения болших объектов." },
              { num: 8, title: "Финальный проект", desc: "Свободный проект: ученик придумывает и реализует своего робота." },
            ].map((lesson) => (
              <div
                key={lesson.num}
                className="flex gap-4 items-start rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-spike text-primary-foreground flex items-center justify-center font-display font-extrabold text-sm flex-shrink-0">
                  {lesson.num}
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground text-sm">
                    {lesson.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm mt-0.5">
                    {lesson.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Программирование */}
        <section id="programming">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--spike-color)/.15)] flex items-center justify-center">
              <Code2 className="w-4 h-4 text-spike" />
            </div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Программирование
            </h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-bold text-foreground mb-3">
                Среда программирования SPIKE App
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                SPIKE Prime поддерживает два режима программирования в приложении LEGO Education SPIKE App:
                <strong className="text-foreground"> блочный (Word Blocks)</strong> на основе Scratch и
                <strong className="text-foreground"> текстовый (Python)</strong>. Блочный режим идеален для начинающих —
                дети перетаскивают визуальные блоки, составляя алгоритмы. Текстовый режим на MicroPython позволяет
                писать полноценный код и готовит к «взрослому» программированию.
              </p>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                Приложение доступно на Windows, macOS, ChromeOS, iOS и Android. Программы загружаются
                на хаб по Bluetooth или USB и выполняются автономно.
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-foreground mb-3">
                Блочное программирование (Scratch)
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: <Play className="w-4 h-4" />, title: "Блоки событий", desc: "Запуск программы по нажатию кнопки хаба, при получении сообщения, по таймеру или при изменении датчика." },
                  { icon: <Cog className="w-4 h-4" />, title: "Блоки моторов", desc: "Управление 3 моторами: задание скорости (%), угла поворота, количества оборотов, синхронное управление парой моторов." },
                  { icon: <GitBranch className="w-4 h-4" />, title: "Блоки условий", desc: "«Если — то — иначе», сравнение значений датчиков, логические операторы И/ИЛИ/НЕ для сложных условий." },
                  { icon: <Repeat className="w-4 h-4" />, title: "Блоки циклов", desc: "Повтор N раз, бесконечный цикл, цикл «пока выполняется условие». Вложенные циклы для сложных алгоритмов." },
                  { icon: <Variable className="w-4 h-4" />, title: "Переменные и списки", desc: "Создание переменных для хранения данных: счётчик очков, показания датчиков, состояние робота." },
                  { icon: <Braces className="w-4 h-4" />, title: "Мои блоки (функции)", desc: "Создание собственных блоков-подпрограмм для повторяющихся действий. Помогает структурировать код." },
                ].map((block, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[hsl(var(--spike-color)/.1)] flex items-center justify-center text-spike flex-shrink-0 mt-0.5">
                        {block.icon}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-foreground text-sm">
                          {block.title}
                        </h4>
                        <p className="font-body text-muted-foreground text-xs mt-1">
                          {block.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-foreground mb-3">
                Программирование на Python
              </h3>
              <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  SPIKE Prime использует <strong className="text-foreground">MicroPython</strong> — облегчённую версию Python,
                  оптимизированную для микроконтроллеров. Ученики пишут код в текстовом редакторе приложения SPIKE App
                  с подсветкой синтаксиса, автодополнением и встроенной документацией.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: <Terminal className="w-4 h-4" />, title: "Базовый синтаксис", desc: "Переменные, типы данных (int, float, str), арифметика, print() для вывода на дисплей хаба." },
                    { icon: <GitBranch className="w-4 h-4" />, title: "Управляющие конструкции", desc: "if/elif/else, циклы for и while, операторы сравнения и логические операторы." },
                    { icon: <Braces className="w-4 h-4" />, title: "Функции", desc: "def для создания функций, параметры и возвращаемые значения, модульность программ." },
                    { icon: <Code2 className="w-4 h-4" />, title: "Библиотеки SPIKE", desc: "import hub, motor, color_sensor, distance_sensor — готовые модули для управления оборудованием." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[hsl(var(--spike-color)/.1)] flex items-center justify-center text-spike flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-foreground text-sm">
                          {item.title}
                        </h4>
                        <p className="font-body text-muted-foreground text-xs mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-bold text-foreground mb-3">
                Примеры программ
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: "Движение по квадрату (блоки)",
                    desc: "Цикл 4 раза: Пара моторов вперёд на 20 см → Поворот на 90° вправо. Робот чертит квадратный маршрут.",
                  },
                  {
                    title: "Следование за рукой (блоки)",
                    desc: "Бесконечный цикл: если расстояние < 15 см → ехать назад, если > 30 см → ехать вперёд, иначе → стоп.",
                  },
                  {
                    title: "Сортировщик цветов (Python)",
                    desc: "color = color_sensor.color(port.A)\nif color == 'red': motor.run(port.B, 90)\nelif color == 'blue': motor.run(port.B, -90)",
                  },
                  {
                    title: "Автономная навигация (Python)",
                    desc: "while True:\n  dist = distance_sensor.distance(port.C)\n  if dist < 100: motor_pair.steer(50)\n  else: motor_pair.move(200)",
                  },
                ].map((example, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-spike mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-display font-bold text-foreground text-sm">
                        {example.title}
                      </h4>
                      <p className="font-body text-muted-foreground text-xs mt-0.5 whitespace-pre-line">
                        {example.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Мини-викторина */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                <div>
                  <h3 className="font-display font-bold text-foreground">
                    Мини-викторина: что сделает робот?
                  </h3>
                  <p className="font-body text-muted-foreground text-sm mt-1">
                    4 задачи по логике, датчикам, циклам и Python.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetQuiz}
                  className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Пройти заново
                </button>
              </div>

              <div className="space-y-5">
                {quizQuestions.map((question) => {
                  const selected = quizAnswers[question.id];
                  const checked = quizChecked[question.id];
                  const isCorrect = selected === question.correctIndex;

                  return (
                    <div
                      key={question.id}
                      className="rounded-xl border border-border bg-background p-4"
                    >
                      <h4 className="font-display font-bold text-foreground text-sm mb-2">
                        {question.title}
                      </h4>

                      <div className="rounded-lg bg-[hsl(var(--spike-color)/.08)] border border-[hsl(var(--spike-color)/.15)] px-4 py-3 mb-4">
                        <p className="font-body text-sm text-foreground leading-relaxed whitespace-pre-line">
                          {question.program}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = selected === optionIndex;
                          const isRightOption = question.correctIndex === optionIndex;

                          let optionClass =
                            "w-full text-left rounded-lg border px-3 py-3 text-sm transition-colors ";

                          if (checked && isRightOption) {
                            optionClass += "border-spike bg-[hsl(var(--spike-color)/.12)] text-foreground";
                          } else if (checked && isSelected && !isRightOption) {
                            optionClass += "border-destructive bg-destructive/10 text-foreground";
                          } else if (isSelected) {
                            optionClass += "border-spike bg-[hsl(var(--spike-color)/.08)] text-foreground";
                          } else {
                            optionClass += "border-border hover:bg-muted text-foreground";
                          }

                          return (
                            <button
                              key={optionIndex}
                              type="button"
                              onClick={() => setQuizAnswer(question.id, optionIndex)}
                              className={optionClass}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4 flex items-center gap-3 flex-wrap">
                        <button
                          type="button"
                          onClick={() => checkQuizAnswer(question.id)}
                          disabled={selected === null}
                          className="inline-flex items-center justify-center rounded-lg bg-spike text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        >
                          Проверить
                        </button>

                        {checked && (
                          <div
                            className={`text-sm font-medium ${
                              isCorrect ? "text-spike" : "text-destructive"
                            }`}
                          >
                            {isCorrect ? "Верно!" : "Неправильно"}
                          </div>
                        )}
                      </div>

                      {checked && (
                        <p className="text-sm text-muted-foreground mt-3">
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Сборки */}
        <section id="builds">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[hsl(var(--spike-color)/.15)] flex items-center justify-center">
                <Wrench className="w-4 h-4 text-spike" />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
                Инструкции по сборке
              </h2>
            </div>

            <div className="min-w-[260px] rounded-xl border border-border bg-card px-4 py-3">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-sm font-medium text-foreground">Прогресс ученика</span>
                <span className="text-sm text-muted-foreground">
                  {completedCount} / {builds.length}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-spike transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Завершено {progressPercent}%
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {builds.map((build) => {
              const completed = isCompleted(build.id);

              return (
                <div
                  key={build.id}
                  className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow group"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedBuild(build)}
                    className="w-full text-left cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[hsl(var(--spike-color)/.1)] flex items-center justify-center text-spike mb-3 group-hover:bg-[hsl(var(--spike-color)/.2)] transition-colors">
                      <Wrench className="w-5 h-5" />
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display font-bold text-foreground text-sm">
                        {build.name}
                      </h3>

                      {completed ? (
                        <CheckCircle2 className="w-5 h-5 text-spike flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>

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

                    <p className="text-xs text-muted-foreground mt-3">
                      Нажмите, чтобы открыть инструкцию
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCompleted(build.id)}
                    className={`mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      completed
                        ? "bg-spike text-primary-foreground hover:opacity-90"
                        : "bg-[hsl(var(--spike-color)/.1)] text-spike hover:bg-[hsl(var(--spike-color)/.2)]"
                    }`}
                  >
                    {completed ? (
                      <>
                        <Check className="w-4 h-4" />
                        Пройдено
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Отметить как пройдено
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* PDF MODAL */}
      {selectedBuild && (
        <div
          className="fixed inset-0 z-50 bg-black/70 p-3 md:p-6"
          onClick={() => setSelectedBuild(null)}
        >
          <div
            className="mx-auto h-full max-w-6xl rounded-2xl bg-background border border-border shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
              <div>
                <h3 className="font-display font-bold text-foreground text-base md:text-lg">
                  {selectedBuild.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Пошаговая инструкция в PDF
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleCompleted(selectedBuild.id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isCompleted(selectedBuild.id)
                      ? "bg-spike text-primary-foreground hover:opacity-90"
                      : "bg-[hsl(var(--spike-color)/.1)] text-spike hover:bg-[hsl(var(--spike-color)/.2)]"
                  }`}
                >
                  <Check className="w-4 h-4" />
                  {isCompleted(selectedBuild.id) ? "Пройдено" : "Отметить как пройдено"}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBuild(null)}
                  className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
                  aria-label="Закрыть"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-muted/30 min-h-[70vh]">
              <iframe
                src={selectedBuild.pdf}
                title={selectedBuild.name}
                className="w-full h-full min-h-[70vh]"
              />
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-border bg-muted/50 py-8">
        <div className="container mx-auto px-4 text-center font-body text-sm text-muted-foreground">
          © 2026 РобоСтарт — Онлайн-школа робототехники для детей
        </div>
      </footer>
    </div>
  );
};

export default SpikePage;