
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ProfileForm from '@/components/profile/ProfileForm';
import { useProfile } from '@/hooks/useProfile';
import PageHeader from '@/components/layout/PageHeader';
import PageFooter from '@/components/layout/PageFooter';
import BackButton from '@/components/layout/BackButton';

const Profile = () => {
  const {
    user,
    name,
    setName,
    avatarUrl,
    uploadingAvatar,
    errors,
    isLoading,
    isSaving,
    handleAvatarUpload,
    handleSaveProfile,
    handleLogout
  } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg border border-white/30">
          <div className="text-center">
            <p className="text-white text-lg font-medium">جاري تحميل الملف الشخصي...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <PageHeader className="mb-8" />
        
        <Card className="bg-white/20 backdrop-blur-lg border border-white/30 p-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <BackButton to="/dashboard" />
              <h1 className="text-2xl font-bold text-white">الملف الشخصي</h1>
            </div>
          </CardHeader>
          
          <Separator className="bg-white/20 my-2" />
          
          <CardContent className="pt-6">
            {user && (
              <ProfileForm
                name={name}
                setName={setName}
                email={user.email}
                avatarUrl={avatarUrl}
                uploadingAvatar={uploadingAvatar}
                errors={errors}
                isSaving={isSaving}
                userName={user.name}
                userRole={user.role}
                handleAvatarUpload={handleAvatarUpload}
                handleSaveProfile={handleSaveProfile}
              />
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col pt-6">
            <Separator className="bg-white/20 mb-6" />
            <Button 
              variant="outline" 
              className="w-full border-white/30 text-white hover:bg-red-500/20 hover:text-red-200 hover:border-red-500/40 transition-all duration-300 font-medium"
              onClick={handleLogout}
            >
              تسجيل الخروج
            </Button>
          </CardFooter>
        </Card>
        
        <PageFooter className="mt-8" />
      </div>
    </div>
  );
};

export default Profile;
