
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Privacy = () => {
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
            <h1 className="text-3xl font-bold text-gradient">سياسة الخصوصية</h1>
          </div>
          
          <div className="text-white/90 space-y-6 leading-relaxed">
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">1. المقدمة</h2>
              <p>
                تصف سياسة الخصوصية هذه كيفية جمع واستخدام معلوماتك الشخصية عند استخدام منصة SapidFood.
                نحن نلتزم بحماية خصوصيتك والمعلومات التي تشاركها معنا.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">2. المعلومات التي نجمعها</h2>
              <p>قد نجمع أنواعًا مختلفة من المعلومات، بما في ذلك:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li><strong>معلومات التعريف الشخصية:</strong> الاسم، البريد الإلكتروني، رقم الهاتف، العنوان.</li>
                <li><strong>بيانات الحساب:</strong> اسم المستخدم، كلمة المرور (مشفرة)، تفضيلات الحساب.</li>
                <li><strong>بيانات الاستخدام:</strong> كيفية تفاعلك مع تطبيقنا، الوصفات التي تستعرضها، تفضيلات الطعام.</li>
                <li><strong>معلومات الجهاز:</strong> نوع الجهاز، نظام التشغيل، معرّف الجهاز، عنوان IP.</li>
                <li><strong>معلومات الموقع:</strong> بناءً على موافقتك، قد نجمع معلومات عن موقعك لتقديم خدمات محسنة.</li>
              </ul>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">3. كيف نستخدم معلوماتك</h2>
              <p>نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>توفير وإدارة وتحسين خدماتنا.</li>
                <li>إنشاء وإدارة حسابك.</li>
                <li>معالجة طلباتك وتقديم دعم العملاء.</li>
                <li>إرسال إشعارات مهمة، مثل تحديثات شروط الخدمة أو سياسة الخصوصية.</li>
                <li>تخصيص تجربتك وتقديم محتوى وتوصيات مخصصة.</li>
                <li>تحليل كيفية استخدام المستخدمين لخدماتنا وتحسينها.</li>
              </ul>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">4. مشاركة المعلومات</h2>
              <p>قد نشارك معلوماتك في الظروف التالية:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li><strong>مقدمو الخدمة:</strong> نستعين بأطراف ثالثة لمساعدتنا في تشغيل تطبيقنا وتقديم الخدمات.</li>
                <li><strong>الامتثال القانوني:</strong> قد نفصح عن معلوماتك إذا كان ذلك مطلوباً بموجب القانون أو للرد على الإجراءات القانونية.</li>
                <li><strong>حماية الحقوق:</strong> قد نشارك المعلومات لحماية حقوق وسلامة SapidFood والمستخدمين الآخرين.</li>
                <li><strong>عمليات نقل الأعمال:</strong> في حالة الاندماج أو الاستحواذ أو بيع الأصول، قد يتم نقل معلوماتك.</li>
              </ul>
              <p className="mt-2">
                نحن لا نبيع معلوماتك الشخصية لأطراف ثالثة.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">5. أمان البيانات</h2>
              <p>
                نتخذ تدابير معقولة لحماية معلوماتك من الفقدان أو سوء الاستخدام أو الوصول غير المصرح به. 
                ومع ذلك، لا يمكن ضمان الأمان التام لعمليات نقل البيانات عبر الإنترنت.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">6. حقوقك وخياراتك</h2>
              <p>اعتماداً على موقعك، قد يكون لديك بعض أو كل الحقوق التالية:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>الوصول إلى معلوماتك الشخصية وتصحيحها.</li>
                <li>حذف بياناتك الشخصية.</li>
                <li>الاعتراض على معالجة بياناتك.</li>
                <li>نقل بياناتك.</li>
                <li>سحب موافقتك في أي وقت.</li>
              </ul>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">7. سياسة ملفات تعريف الارتباط</h2>
              <p>
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك. يمكنك إدارة تفضيلات ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">8. خصوصية الأطفال</h2>
              <p>
                خدماتنا غير موجهة للأشخاص دون سن 18 عامًا. لا نجمع عن علم معلومات شخصية من الأطفال دون سن 18 عامًا.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">9. التغييرات على سياسة الخصوصية</h2>
              <p>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر النسخة المحدثة على هذه الصفحة مع تاريخ التحديث.
                يُرجى مراجعة هذه السياسة بشكل دوري.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-white">10. اتصل بنا</h2>
              <p>
                إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يُرجى التواصل معنا عبر:
              </p>
              <p className="mt-2">البريد الإلكتروني: privacy@sapid.com</p>
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

export default Privacy;
