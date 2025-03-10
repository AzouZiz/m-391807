import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Flame, 
  ChefHat, 
  Star, 
  Bookmark, 
  Share, 
  ThumbsUp,
  View, 
  MessageSquare, 
  Award,
  Printer 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RecipeDetail = () => {
  // Replace this with actual data fetching logic
  const { id } = useParams<{ id: string }>();
  const recipe = {
    id: id,
    title: "Delicious Chocolate Cake",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prepTime: "20 mins",
    cookTime: "35 mins",
    servings: "8 servings",
    author: "Jane Doe",
    authorAvatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 124,
    views: 530,
    shares: 68,
    rating: 4.7,
    reviewCount: 89,
    ingredients: [
      "2 cups all-purpose flour",
      "2 cups sugar",
      "¾ cup unsweetened cocoa powder",
      "1 ½ teaspoons baking powder",
      "1 ½ teaspoons baking soda",
      "1 teaspoon salt",
      "1 cup buttermilk",
      "½ cup vegetable oil",
      "2 large eggs",
      "2 teaspoons vanilla extract",
      "1 cup boiling water"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease and flour a 9x13 inch pan.",
      "In a large bowl, whisk together flour, sugar, cocoa, baking powder, baking soda, and salt.",
      "Add buttermilk, oil, eggs, and vanilla extract to the dry ingredients. Beat with an electric mixer on medium speed for 2 minutes.",
      "Stir in boiling water (batter will be thin).",
      "Pour batter into prepared pan and bake for 30-35 minutes, or until a wooden skewer inserted into the center comes out clean.",
      "Let cool in the pan for 10 minutes before frosting."
    ],
    nutrition: {
      calories: "350 kcal",
      carbohydrates: "50g",
      protein: "5g",
      fat: "15g"
    },
    reviews: [
      {
        id: "1",
        author: "Alice Smith",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b8d21c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 5,
        comment: "This cake is absolutely divine! The best chocolate cake I've ever made.",
        date: "2 days ago"
      },
      {
        id: "2",
        author: "Bob Johnson",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd8b401e0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4,
        comment: "Very good recipe. I reduced the sugar a bit and it was perfect for my taste.",
        date: "5 days ago"
      }
    ]
  };

  return (
    <div className="container py-12">
      <Card className="overflow-hidden">
        <img src={recipe.imageUrl} alt={recipe.title} className="aspect-video w-full object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              Prep: {recipe.prepTime}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Flame className="h-4 w-4" />
              Cook: {recipe.cookTime}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              {recipe.servings}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <img src={recipe.authorAvatarUrl} alt={recipe.author} className="rounded-full" />
              </Avatar>
              <div className="text-sm">
                By {recipe.author}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bookmark className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-bold">{recipe.rating}</span>
                <span className="text-muted-foreground">({recipe.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
                {recipe.likes}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <View className="h-4 w-4" />
                {recipe.views}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                {recipe.shares}
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients">
              <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="instructions">
              <h2 className="text-2xl font-bold mb-2">Instructions</h2>
              <ol className="list-decimal list-inside">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </TabsContent>
            <TabsContent value="nutrition">
              <h2 className="text-2xl font-bold mb-2">Nutrition Facts</h2>
              <p>Calories: {recipe.nutrition.calories}</p>
              <p>Carbohydrates: {recipe.nutrition.carbohydrates}</p>
              <p>Protein: {recipe.nutrition.protein}</p>
              <p>Fat: {recipe.nutrition.fat}</p>
            </TabsContent>
            <TabsContent value="reviews">
              <h2 className="text-2xl font-bold mb-2">Reviews</h2>
              {recipe.reviews.map(review => (
                <Card key={review.id} className="mb-4">
                  <div className="flex items-start gap-4 p-4">
                    <Avatar>
                      <img src={review.avatarUrl} alt={review.author} className="rounded-full" />
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{review.author}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500" />
                          ))}
                        </div>
                        <span className="text-muted-foreground text-sm">{review.date}</span>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default RecipeDetail;
