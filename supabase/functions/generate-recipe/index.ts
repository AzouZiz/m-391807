
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      ingredients, 
      diet = '', 
      cuisine = '', 
      excludeIngredients = '',
      query = '',
      model = 'gpt-4o-mini' // Default to GPT-4o Mini for faster responses
    } = await req.json();

    // بناء المطالبة بناءً على المدخلات المتوفرة
    let prompt = "أنت طاهٍ محترف وخبير مختص في إعداد الوصفات. ";
    
    if (query) {
      prompt += `المستخدم يطلب: ${query}. `;
    }
    
    if (ingredients && ingredients.length > 0) {
      prompt += `المكونات المتوفرة هي: ${ingredients}. `;
    }
    
    if (diet) {
      prompt += `النظام الغذائي المطلوب هو: ${diet}. `;
    }
    
    if (cuisine) {
      prompt += `يجب أن تكون الوصفة من المطبخ ${cuisine}. `;
    }
    
    if (excludeIngredients) {
      prompt += `لا تستخدم المكونات التالية: ${excludeIngredients}. `;
    }
    
    prompt += `قم بإنشاء 3 وصفات مختلفة وشهية، وقدم كل وصفة بالتنسيق التالي:
    العنوان: (عنوان الوصفة)
    الوصف: (وصف موجز للوصفة)
    الفئة: (تصنيف الوصفة مثل: أطباق رئيسية، مقبلات، حلويات، إلخ)
    الصعوبة: (سهل، متوسط، أو صعب)
    الوقت: (وقت التحضير بالدقائق)
    المكونات: (قائمة بالمكونات المطلوبة)
    طريقة التحضير: (خطوات التحضير مفصلة ومرقمة)
    
    لا تكتب أي شيء آخر غير الوصفات بالتنسيق المطلوب.`;

    // طلب إلى OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'أنت مساعد مختص في إنشاء وصفات الطعام باللغة العربية، تقدم وصفات دقيقة وشهية.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    // تحليل النص المنشأ إلى كائنات وصفات منظمة
    const recipes = parseRecipes(generatedText);

    console.log(`Generated ${recipes.length} recipes`);

    return new Response(JSON.stringify({ recipes }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-recipe function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// وظيفة لتحليل نص الوصفات وتحويله إلى كائنات منظمة
function parseRecipes(text) {
  const recipes = [];
  const recipeRegex = /العنوان:(.+?)(?=\nالعنوان:|$)/gs;
  const recipeMatches = text.matchAll(recipeRegex);

  for (const match of recipeMatches) {
    const recipeText = match[0];
    
    const title = extractValue(recipeText, 'العنوان:');
    const description = extractValue(recipeText, 'الوصف:');
    const category = extractValue(recipeText, 'الفئة:');
    const difficulty = extractValue(recipeText, 'الصعوبة:');
    const time = extractValue(recipeText, 'الوقت:');
    
    // استخراج المكونات كمصفوفة
    const ingredientsText = extractValue(recipeText, 'المكونات:');
    const ingredients = ingredientsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // استخراج خطوات التحضير كمصفوفة
    const instructionsText = extractValue(recipeText, 'طريقة التحضير:');
    const instructions = instructionsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const recipe = {
      id: 'ai-' + (recipes.length + 1),
      title: title || 'وصفة بدون عنوان',
      description: description || '',
      category: category || 'أطباق متنوعة',
      difficulty: difficulty || 'متوسط',
      time: time || '30 دقيقة',
      ingredients: ingredients.length ? ingredients : ['لم يتم تحديد المكونات'],
      instructions: instructions.length ? instructions : ['لم يتم تحديد خطوات التحضير'],
      image: getRandomFoodImage(category)
    };
    
    recipes.push(recipe);
  }
  
  return recipes;
}

// وظيفة مساعدة لاستخراج قيمة خاصية من النص
function extractValue(text, property) {
  const regex = new RegExp(`${property}\\s*(.+?)(?=\\n\\w+:|$)`, 's');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}

// وظيفة لإرجاع رابط صورة عشوائية بناءً على نوع الطعام
function getRandomFoodImage(category) {
  const categoryLower = (category || '').toLowerCase();
  
  const foodImages = {
    default: [
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=2072',
      'https://images.unsplash.com/photo-1592282373868-f2b5bc8c498d?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1615937691194-97dbd4f0e22a?auto=format&fit=crop&q=80&w=2070'
    ],
    'أطباق رئيسية': [
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1593161705398-2f00f97de46e?auto=format&fit=crop&q=80&w=2071',
      'https://images.unsplash.com/photo-1577303935007-0d306ee638cf?auto=format&fit=crop&q=80&w=2080'
    ],
    'حلويات': [
      'https://images.unsplash.com/photo-1505826759037-406b40feb4cd?auto=format&fit=crop&q=80&w=2072',
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=2064',
      'https://images.unsplash.com/photo-1616518015080-ce8034516176?auto=format&fit=crop&q=80&w=1974',
      'https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&q=80&w=1886',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=2078'
    ],
    'مقبلات': [
      'https://images.unsplash.com/photo-1607098665874-fd193397547b?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1695438272113-f86c6dae77c1?auto=format&fit=crop&q=80&w=1951',
      'https://images.unsplash.com/photo-1679518310647-47a2e0771dc9?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1621963297653-13c0aa535fdd?auto=format&fit=crop&q=80&w=2070'
    ],
    'سلطات': [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1640719028782-8230f1bdc434?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&q=80&w=2078',
      'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=2064'
    ],
    'عربي': [
      'https://images.unsplash.com/photo-1610634639305-63cc5ea43445?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1573500883495-6c9b16d88d8c?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1544681280-d257afc2ff80?auto=format&fit=crop&q=80&w=2066',
      'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1550715089-be54df6c4e7b?auto=format&fit=crop&q=80&w=2070'
    ]
  };
  
  // تحديد فئة الصور المناسبة
  let categoryImages = foodImages.default;
  
  for (const [key, images] of Object.entries(foodImages)) {
    if (categoryLower.includes(key.toLowerCase())) {
      categoryImages = images;
      break;
    }
  }
  
  // اختيار صورة عشوائية من الفئة المحددة
  const randomIndex = Math.floor(Math.random() * categoryImages.length);
  return categoryImages[randomIndex];
}
