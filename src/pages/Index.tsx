
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ChefHat, 
  Search, 
  Utensils, 
  Brain, 
  Camera, 
  Globe, 
  Share2, 
  ArrowRight 
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 to-background pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
                SapidFood
                <span className="text-primary">.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up">
                منصة الذكاء الاصطناعي الشاملة للطعام مع تحكم مشرف متكامل وإضافات ثورية
              </p>
              <div className="flex flex-wrap gap-4 justify-center animate-slide-up">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    لوحة التحكم
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/explore">
                    استكشف الوصفات
                    <Search className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">ميزات رائعة مدعومة بالذكاء الاصطناعي</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              اكتشف مجموعة من الميزات المتقدمة التي تجمع بين الذكاء الاصطناعي وتجربة الطهي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="feature-icon mx-auto">
                <Brain />
              </div>
              <h3 className="text-xl font-semibold mb-3">توليد محتوى ذكي</h3>
              <p className="text-muted-foreground">
                مقالات ووصفات وصور وفيديوهات مخصصة باستخدام الذكاء الاصطناعي المتقدم
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="feature-icon mx-auto">
                <ChefHat />
              </div>
              <h3 className="text-xl font-semibold mb-3">المطبخ الافتراضي</h3>
              <p className="text-muted-foreground">
                استكشف الأطباق ثلاثية الأبعاد وتفاعل مع المكونات بتقنية الواقع المعزز
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="feature-icon mx-auto">
                <Camera />
              </div>
              <h3 className="text-xl font-semibold mb-3">التعرف على المكونات</h3>
              <p className="text-muted-foreground">
                امسح مكونات الثلاجة بكاميرا هاتفك واحصل على اقتراحات وصفات ذكية
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="feature-icon mx-auto">
                <Utensils />
              </div>
              <h3 className="text-xl font-semibold mb-3">مخطط النكهات التفاعلي</h3>
              <p className="text-muted-foreground">
                اكتشف تناغم النكهات واحصل على اقتراحات مبتكرة لدمج المكونات
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="feature-icon mx-auto">
                <Globe />
              </div>
              <h3 className="text-xl font-semibold mb-3">توثيق التراث الغذائي</h3>
              <p className="text-muted-foreground">
                حافظ على وصفات تراثية من مختلف الثقافات وشاركها مع العالم
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <div className="feature-icon mx-auto">
                <Share2 />
              </div>
              <h3 className="text-xl font-semibold mb-3">الطبخ الاجتماعي</h3>
              <p className="text-muted-foreground">
                شارك في جلسات طبخ افتراضية مع أصدقاء حول العالم بتقنية الواقع المعزز
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              انضم إلى مستقبل الطعام الآن
            </h2>
            <p className="text-muted-foreground mb-8">
              استكشف عالم الامكانيات اللامحدودة مع منصة SapidFood للذكاء الاصطناعي وثورة عالم الطعام
            </p>
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link to="/signup">
                ابدأ الآن
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold">
                SapidFood<span className="text-primary">.</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                حيث تُبتكر النكهات، تُحفظ الثقافات، وتُحطم قواعد المطبخ التقليدية!
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                من نحن
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                اتصل بنا
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                سياسة الخصوصية
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                الشروط والأحكام
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-sm text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SapidFood. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
