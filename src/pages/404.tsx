
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">404 - الصفحة غير موجودة</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">
        عذرًا، الصفحة التي تبحث عنها غير موجودة.
      </p>
      <p className="text-gray-500 text-center">
        سيتم إعادة توجيهك إلى الصفحة الرئيسية خلال ثوانٍ...
      </p>
      <button 
        onClick={() => navigate('/')} 
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        العودة للصفحة الرئيسية
      </button>
    </div>
  );
};

export default NotFoundPage;
