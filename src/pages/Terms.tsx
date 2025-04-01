
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="metaverse-card p-8 backdrop-blur-lg bg-white/10 border border-white/20">
          <div className="flex items-center mb-6">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/10 p-0 mr-4">
                <ArrowLeft className="h-5 w-5 mr-2" />
                العودة
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gradient">شروط الخدمة</h1>
          </div>
          
          <div className="text-white/90 space-y-6 leading-relaxed">
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">1. مقدمة</h2>
              <p>
                مرحباً بك في منصة SapidFood. من خلال الوصول إلى أو استخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. 
                يُرجى قراءتها بعناية.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">2. استخدام الخدمة</h2>
              <p>
                أنت توافق على استخدام خدماتنا فقط للأغراض المسموح بها وفقاً لهذه الشروط وأي قوانين وأنظمة معمول بها أو ممارسات مقبولة 
                عموماً أو إرشادات في الاختصاصات ذات الصلة.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>يجب أن تكون 18 عاماً على الأقل لاستخدام خدماتنا.</li>
                <li>أنت مسؤول عن الحفاظ على سرية بيانات اعتماد حسابك.</li>
                <li>توافق على عدم مشاركة معلومات الحساب مع أي شخص آخر.</li>
              </ul>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">3. المحتوى والملكية الفكرية</h2>
              <p>
                جميع المحتويات المتاحة من خلال خدماتنا، مثل النصوص والرسومات والشعارات والصور والمقاطع الصوتية والفيديو وجميع الملكية 
                الفكرية الأخرى، هي ملك لـ SapidFood أو جهات الترخيص التابعة لها.
              </p>
              <p className="mt-2">
                يتم منحك ترخيصاً محدوداً وغير حصري وغير قابل للتنازل وغير قابل للترخيص من الباطن وقابل للإلغاء للوصول إلى الخدمة واستخدامها 
                للأغراض الشخصية غير التجارية.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">4. المحظورات</h2>
              <p>
                لا يجوز لك:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>استخدام خدماتنا لأي غرض غير قانوني أو محظور.</li>
                <li>انتهاك حقوق الملكية الفكرية لـ SapidFood أو أي طرف ثالث.</li>
                <li>محاولة الوصول إلى حسابات المستخدمين الآخرين أو الشبكات أو الأنظمة المتصلة بالخدمة بطريقة غير مصرح بها.</li>
                <li>نشر أو نقل أي محتوى ضار أو مسيء أو غير قانوني.</li>
              </ul>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">5. إخلاء المسؤولية وتحديد المسؤولية</h2>
              <p>
                يتم توفير خدماتنا "كما هي" و"كما هي متاحة" دون أي ضمانات، صريحة أو ضمنية.
              </p>
              <p className="mt-2">
                لن تكون SapidFood مسؤولة عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو خاصة أو تبعية أو تأديبية تنشأ عن استخدامك لخدماتنا.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">6. التعديلات على الشروط</h2>
              <p>
                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر النسخة المحدثة على هذه الصفحة مع تاريخ التحديث.
                من مسؤوليتك مراجعة هذه الشروط بشكل دوري. استمرارك في استخدام خدماتنا بعد نشر أي تغييرات يشكل قبولاً لتلك التغييرات.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">7. القانون الحاكم</h2>
              <p>
                تخضع هذه الشروط والأحكام للقوانين المعمول بها، دون اعتبار لتعارض مبادئ القوانين.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">8. التواصل معنا</h2>
              <p>
                إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى التواصل معنا عبر:
              </p>
              <p className="mt-2">البريد الإلكتروني: support@sapid.com</p>
            </section>
            
            <div className="border-t border-white/20 pt-4 mt-8">
              <p className="text-sm text-white/60">آخر تحديث: 20 مايو 2025</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
