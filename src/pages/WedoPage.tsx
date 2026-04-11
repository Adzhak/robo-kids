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
  Code2,
  Play,
  RotateCcw,
  Volume2,
  Timer,
  MousePointer,
  X,
  Check,
  Circle,
} from "lucide-react";
import wedoIcon from "@/assets/wedo-icon.png";

/* === ИМПОРТ PDF === */
import miloPdf from "@/pdf/milo.pdf";
import tractionPdf from "@/pdf/traction.pdf";
import raceCarPdf from "@/pdf/race-car.pdf";
import beePdf from "@/pdf/bee.pdf";
import heliPdf from "@/pdf/helicopter.pdf";
import gruzPdf from "@/pdf/gruz.pdf";

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

/* === ДАННЫЕ СБОРКИ === */
const builds = [
  {
    id: "milo",
    name: "Майло — научный вездеход",
    difficulty: "Начальный",
    pdf: miloPdf,
  },
  {
    id: "traction",
    name: "Тяга",
    difficulty: "Начальный",
    pdf: tractionPdf,
  },
  {
    id: "race-car",
    name: "Гоночная машина",
    difficulty: "Средний",
    pdf: raceCarPdf,
  },
  {
    id: "bee",
    name: "Пчелка",
    difficulty: "Средний",
    pdf: beePdf,
  },
  {
    id: "helicopter",
    name: "Вертолет",
    difficulty: "Продвинутый",
    pdf: heliPdf,
  },
  {
    id: "gruz",
    name: "Грузовик",
    difficulty: "Продвинутый",
    pdf: gruzPdf,
  },
];

const quizQuestions = [
  {
    id: "q1",
    title: "Задача 1",
    program:
      "Начало → Мотор вперёд → Ожидание 2 сек → Мотор выкл.",
    options: [
      "Робот поедет вперёд 2 секунды и остановится",
      "Робот будет ехать назад без остановки",
      "Робот только издаст звук",
    ],
    correctIndex: 0,
    explanation: "Сначала мотор включается вперёд, через 2 секунды выключается.",
  },
  {
    id: "q2",
    title: "Задача 2",
    program:
      "Начало → Ждать, пока объект ближе 10 см → Мотор выкл.",
    options: [
      "Робот сразу начнёт ехать вперёд",
      "Робот остановится, когда объект подойдёт близко",
      "Робот начнёт мигать и крутиться",
    ],
    correctIndex: 1,
    explanation: "Программа ждёт сигнал датчика движения, а затем выключает мотор.",
  },
];

const STORAGE_KEY = "wedo-build-progress-v1";

const WedoPage = () => {
  const navigate = useNavigate();

  const [selectedBuild, setSelectedBuild] = useState<(typeof builds)[number] | null>(null);
  const [completedBuildIds, setCompletedBuildIds] = useState<string[]>([]);

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({
    q1: null,
    q2: null,
  });
  const [quizChecked, setQuizChecked] = useState<Record<string, boolean>>({
    q1: false,
    q2: false,
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
    });
    setQuizChecked({
      q1: false,
      q2: false,
    });
  };

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
              {
                title: "Смарт-хаб",
                desc: "Программируемый микрокомпьютер с Bluetooth Low Energy для беспроводного подключения к планшету или компьютеру.",
              },
              {
                title: "Мотор",
                desc: "Средний мотор для приведения моделей в движение. Поддерживает управление скоростью и направлением вращения.",
              },
              {
                title: "Датчик движения",
                desc: "Инфракрасный датчик для обнаружения объектов на расстоянии до 15 см. Позволяет роботу реагировать на препятствия.",
              },
              {
                title: "Датчик наклона",
                desc: "Определяет наклон в 6 положениях: вверх, вниз, влево, вправо, наклон и отсутствие наклона.",
              },
              {
                title: "280+ деталей LEGO",
                desc: "Кирпичики, балки, оси, шестерёнки, колёса и другие элементы для конструирования разнообразных моделей.",
              },
              {
                title: "Лоток-сортировщик",
                desc: "Удобный лоток для хранения и сортировки деталей по типу и размеру. Наклейки для маркировки.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
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
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Технические характеристики
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: <Bluetooth className="w-5 h-5" />,
                label: "Подключение",
                value: "Bluetooth Low Energy 4.1",
              },
              {
                icon: <Cog className="w-5 h-5" />,
                label: "Мотор",
                value: "1 средний, ~110 об/мин",
              },
              {
                icon: <Gauge className="w-5 h-5" />,
                label: "Датчики",
                value: "Движения + наклона",
              },
              {
                icon: <Cpu className="w-5 h-5" />,
                label: "Питание",
                value: "2 × AA батарейки",
              },
              {
                icon: <Package className="w-5 h-5" />,
                label: "Деталей",
                value: "280+",
              },
              {
                icon: <BookOpen className="w-5 h-5" />,
                label: "Среда",
                value: "WeDo 2.0 Software",
              },
            ].map((spec, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
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
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Программа курса
            </h2>
          </div>
          <div className="space-y-3">
            {[
              {
                num: 1,
                title: "Знакомство с набором",
                desc: "Изучение деталей, подключение смарт-хаба, первая программа.",
              },
              {
                num: 2,
                title: "Механизмы и передачи",
                desc: "Зубчатые передачи, ременные передачи, червячные механизмы.",
              },
              {
                num: 3,
                title: "Датчики и обратная связь",
                desc: "Работа с датчиком движения и наклона, условные конструкции.",
              },
              {
                num: 4,
                title: "Проект «Вездеход- Майло»",
                desc: "Сборка и программирование вездехода.",
              },
              {
                num: 5,
                title: "Проект «Гоночная машина»",
                desc: "Создание машины с датчиком расстояния для объезда препятствий.",
              },
              {
                num: 6,
                title: "Проект «Спец-техника»",
                desc: "Финальный проект: Сложные сборки спец- техники: вертолет и грузовик",
              },
            ].map((lesson) => (
              <div
                key={lesson.num}
                className="flex gap-4 items-start rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-extrabold text-sm flex-shrink-0">
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
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
              Программирование
            </h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-bold text-foreground mb-3">
                Среда программирования WeDo 2.0
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                Программирование в WeDo 2.0 осуществляется через специальное приложение LEGO Education WeDo 2.0 Software.
                Интерфейс основан на drag-and-drop — ребёнок перетаскивает блоки-команды на рабочую область и составляет
                из них последовательности (программы). Это визуальный язык, похожий на Scratch, но адаптированный для младших школьников.
              </p>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                Также WeDo 2.0 полностью совместим со <strong className="text-foreground">Scratch 3.0</strong> — бесплатной средой программирования от MIT.
                Через расширение LEGO Education WeDo 2.0 в Scratch можно управлять мотором, считывать данные с датчиков и создавать
                интерактивные проекты с анимацией и звуком.
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-foreground mb-3">
                Основные блоки программирования
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    icon: <Play className="w-4 h-4" />,
                    title: "Блок «Начало»",
                    desc: "Запускает выполнение программы. Может реагировать на нажатие кнопки, получение сообщения или наклон датчика.",
                  },
                  {
                    icon: <Cog className="w-4 h-4" />,
                    title: "Блок «Мотор»",
                    desc: "Управление мотором: включение, выключение, задание направления вращения (по часовой / против часовой) и мощности (1–10).",
                  },
                  {
                    icon: <MousePointer className="w-4 h-4" />,
                    title: "Блок «Датчик движения»",
                    desc: "Считывает расстояние до объекта. Позволяет задавать условия: «если объект ближе / дальше заданного значения».",
                  },
                  {
                    icon: <RotateCcw className="w-4 h-4" />,
                    title: "Блок «Датчик наклона»",
                    desc: "Определяет наклон хаба в 6 положениях: вверх, вниз, влево, вправо, любой наклон и отсутствие наклона.",
                  },
                  {
                    icon: <Volume2 className="w-4 h-4" />,
                    title: "Блок «Звук»",
                    desc: "Воспроизведение встроенных звуков или записанных аудио. Используется для озвучивания действий робота.",
                  },
                  {
                    icon: <Timer className="w-4 h-4" />,
                    title: "Блок «Ожидание»",
                    desc: "Пауза в выполнении программы на заданное время (в секундах). Необходим для последовательных действий.",
                  },
                  {
                    icon: <RotateCcw className="w-4 h-4" />,
                    title: "Блок «Цикл»",
                    desc: "Повторяет набор команд заданное количество раз или бесконечно. Основа для автономного поведения робота.",
                  },
                  {
                    icon: <Code2 className="w-4 h-4" />,
                    title: "Блок «Отображение»",
                    desc: "Вывод текста или числа на экран устройства. Используется для отладки и отображения данных датчиков.",
                  },
                ].map((block, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
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

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-bold text-foreground mb-3">
                Примеры программ
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: "«Вперёд-назад»",
                    desc: "Блок начала → Мотор вкл. (направление: вперёд, мощность: 5) → Ожидание 2 сек → Мотор вкл. (направление: назад) → Ожидание 2 сек → Мотор выкл.",
                  },
                  {
                    title: "«Умный стоп»",
                    desc: "Блок начала → Мотор вкл. → Ожидание датчика движения (ближе 10 см) → Мотор выкл. → Звук «гудок».",
                  },
                  {
                    title: "«Качели»",
                    desc: "Блок начала → Цикл (бесконечно): Мотор вправо 1 сек → Мотор влево 1 сек. Модель раскачивается непрерывно.",
                  },
                ].map((example, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-display font-bold text-foreground text-sm">
                        {example.title}
                      </h4>
                      <p className="font-body text-muted-foreground text-xs mt-0.5">
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
                    Выберите правильный ответ для каждой программы.
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

                      <div className="rounded-lg bg-primary/5 border border-primary/10 px-4 py-3 mb-4">
                        <p className="font-body text-sm text-foreground leading-relaxed">
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
                            optionClass += "border-primary bg-primary/10 text-foreground";
                          } else if (checked && isSelected && !isRightOption) {
                            optionClass += "border-destructive bg-destructive/10 text-foreground";
                          } else if (isSelected) {
                            optionClass += "border-primary bg-primary/5 text-foreground";
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
                          className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        >
                          Проверить
                        </button>

                        {checked && (
                          <div
                            className={`text-sm font-medium ${
                              isCorrect ? "text-primary" : "text-destructive"
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
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Wrench className="w-4 h-4 text-primary" />
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
                  className="h-full bg-primary transition-all"
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
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary/20 transition-colors">
                      <Wrench className="w-5 h-5" />
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display font-bold text-foreground text-sm">
                        {build.name}
                      </h3>

                      {completed ? (
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
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
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
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
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
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

export default WedoPage;