
import React from 'react';
import { User, Mail, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormError from '@/components/auth/FormError';
import { AlertCircle } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';

interface ProfileFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  avatarUrl: string | null;
  uploadingAvatar: boolean;
  errors: {
    name?: string;
    avatar?: string;
    general?: string;
  };
  isSaving: boolean;
  userName: string;
  userRole?: string;
  handleAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveProfile: (e: React.FormEvent) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  name,
  setName,
  email,
  avatarUrl,
  uploadingAvatar,
  errors,
  isSaving,
  userName,
  userRole,
  handleAvatarUpload,
  handleSaveProfile
}) => {
  return (
    <form onSubmit={handleSaveProfile} className="space-y-4">
      {errors.general && (
        <FormError message={errors.general} />
      )}
      
      <ProfileAvatar 
        avatarUrl={avatarUrl}
        userName={userName}
        userRole={userRole}
        uploadingAvatar={uploadingAvatar}
        error={errors.avatar}
        onAvatarUpload={handleAvatarUpload}
      />
      
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white font-medium">الاسم الكامل</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
          <Input 
            id="name" 
            type="text" 
            placeholder="أدخل اسمك الكامل" 
            className="pl-10 text-white bg-white/20 border-white/30"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errors.name && (
          <p className="text-red-300 text-sm flex items-center mt-1 font-medium">
            <AlertCircle className="h-3 w-3 mr-1" />
            {errors.name}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white font-medium">البريد الإلكتروني</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
          <Input 
            id="email" 
            type="email" 
            value={email}
            readOnly
            className="pl-10 text-white bg-white/20 border-white/30 opacity-80 cursor-not-allowed"
          />
        </div>
        <p className="text-white/80 text-xs">لا يمكن تغيير البريد الإلكتروني</p>
      </div>
    
      <Button 
        type="submit" 
        className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium"
        disabled={isSaving}
      >
        <Save className="mr-2 h-4 w-4" />
        {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
      </Button>
    </form>
  );
};

export default ProfileForm;
