
import React from 'react';
import { Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertCircle } from 'lucide-react';

interface ProfileAvatarProps {
  avatarUrl: string | null;
  userName: string;
  userRole?: string;
  uploadingAvatar: boolean;
  error?: string;
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatarUrl,
  userName,
  userRole,
  uploadingAvatar,
  error,
  onAvatarUpload
}) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative">
        <Avatar className="h-24 w-24 border-2 border-white/50">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={userName || ''} />
          ) : null}
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-3xl font-bold">
            {userName?.charAt(0).toUpperCase() || ''}
          </AvatarFallback>
        </Avatar>
        
        <div className="absolute -bottom-2 -right-2">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
              <Camera className="h-4 w-4 text-white" />
            </div>
            <input 
              id="avatar-upload" 
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onAvatarUpload}
              disabled={uploadingAvatar}
            />
          </label>
        </div>
        
        {userRole === 'admin' && (
          <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
            مسؤول
          </span>
        )}
      </div>
      
      {error && (
        <p className="text-center text-red-300 text-sm flex items-center justify-center mt-1 font-medium">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </p>
      )}
      
      {uploadingAvatar && (
        <p className="text-center text-white/80 text-sm mt-1">
          جاري تحميل الصورة...
        </p>
      )}
    </div>
  );
};

export default ProfileAvatar;
