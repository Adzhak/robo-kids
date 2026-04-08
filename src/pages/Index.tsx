import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import CourseCard, { wedoCourse, spikeCourse } from "@/components/CourseCard";
import wedoIcon from "@/assets/wedo-icon.png";
import spikeIcon from "@/assets/spike-icon.png";
import { GraduationCap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSlider />

      <section id="courses" className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold font-display mb-4">
            <GraduationCap className="w-4 h-4" />
            Наши курсы
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground">
            Выберите программу обучения
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-5">
          <CourseCard {...wedoCourse} icon={wedoIcon} />
          <CourseCard {...spikeCourse} icon={spikeIcon} />
        </div>
      </section>

      <section id="about" className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground">О нас</h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-4 font-body text-muted-foreground text-sm md:text-base leading-relaxed">
          <p>
            <strong className="text-foreground">РобоСтарт</strong> — это онлайн-школа робототехники для детей 1–4 классов.
            Мы обучаем конструированию и программированию на базе наборов LEGO Education WeDo 2.0 и SPIKE Prime.
          </p>
          <p>
            Наши занятия развивают логическое мышление, навыки командной работы и интерес к инженерным профессиям.
            Каждый урок включает теорию, практическую сборку и программирование модели.
          </p>
          <p>
            Преподаватели — сертифицированные педагоги с опытом работы в STEM-образовании.
            Занятия проходят онлайн в удобное время, в малых группах до 6 человек.
          </p>
        </div>
      </section>

      <footer id="contacts" className="border-t border-border bg-muted/50 py-8">
        <div className="container mx-auto px-4 text-center font-body text-sm text-muted-foreground space-y-2">
          <p className="font-display font-bold text-foreground">Контакты</p>
          <p>Email: info@robostart.ru · Телефон: +7 (999) 123-45-67</p>
          <p>© 2026 РобоСтарт — Онлайн-школа робототехники для детей</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
