import React from 'react';
import { toast } from '@/hooks/use-toast';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Link as LinkIcon,
  Copy,
  MessageSquare,
  Share2
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'modern' | 'minimal';
}

const SocialShare = ({
  url = window.location.href,
  title,
  description = '',
  imageUrl = '',
  className = '',
  size = 'default',
  variant = 'default'
}: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');
  
  const iconSize = size === 'sm' ? 16 : size === 'default' ? 20 : 24;
  
  const socialPlatforms = [
    {
      name: 'فيسبوك',
      icon: <Facebook size={iconSize} />,
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2] hover:bg-[#1877F2]/90',
    },
    {
      name: 'تويتر',
      icon: <Twitter size={iconSize} />,
      shareUrl: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#1DA1F2] hover:bg-[#1DA1F2]/90',
    },
    {
      name: 'واتساب',
      icon: <MessageSquare size={iconSize} />,
      shareUrl: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-[#25D366] hover:bg-[#25D366]/90',
    },
    {
      name: 'لينكد إن',
      icon: <Linkedin size={iconSize} />,
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-[#0A66C2] hover:bg-[#0A66C2]/90',
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        toast({
          title: "تم نسخ الرابط",
          description: "تم نسخ رابط الصفحة إلى الحافظة بنجاح.",
        });
      })
      .catch((error) => {
        console.error('خطأ في نسخ الرابط:', error);
        toast({
          title: "حدث خطأ",
          description: "لم نتمكن من نسخ الرابط، يرجى المحاولة مرة أخرى.",
          variant: "destructive",
        });
      });
  };

  const handleSharePlatform = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: url,
      })
      .catch((error) => {
        console.error('خطأ في المشاركة:', error);
      });
    } else {
      copyToClipboard();
    }
  };

  if (variant === 'default') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {navigator.share && (
          <Button 
            variant="outline" 
            size={size} 
            className="flex items-center gap-2"
            onClick={nativeShare}
          >
            <Share2 size={iconSize} />
            <span className="hidden sm:inline">مشاركة</span>
          </Button>
        )}
        
        {socialPlatforms.map((platform) => (
          <TooltipProvider key={platform.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size={size} 
                  className="flex items-center gap-2"
                  onClick={() => handleSharePlatform(platform.shareUrl)}
                >
                  {platform.icon}
                  <span className="hidden sm:inline">{platform.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>مشاركة عبر {platform.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size={size} 
                className="flex items-center gap-2"
                onClick={copyToClipboard}
              >
                <Copy size={iconSize} />
                <span className="hidden sm:inline">نسخ الرابط</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>نسخ الرابط</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }
  
  if (variant === 'modern') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {navigator.share && (
          <Button 
            size={size}
            variant="outline"
            className="bg-gradient-to-r from-primary to-accent text-white rounded-full"
            onClick={nativeShare}
          >
            <Share2 size={iconSize} className="mr-2" />
            مشاركة
          </Button>
        )}
        
        <div className="flex flex-wrap gap-2">
          {socialPlatforms.map((platform) => (
            <TooltipProvider key={platform.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={`${platform.color} text-white p-2 rounded-full`}
                    onClick={() => handleSharePlatform(platform.shareUrl)}
                  >
                    {platform.icon}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>مشاركة عبر {platform.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full"
                  onClick={copyToClipboard}
                >
                  <Copy size={iconSize} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>نسخ الرابط</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {navigator.share && (
        <button 
          className="text-gray-600 hover:text-primary p-2"
          onClick={nativeShare}
        >
          <Share2 size={iconSize} />
        </button>
      )}
      
      {socialPlatforms.map((platform) => (
        <TooltipProvider key={platform.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="text-gray-600 hover:text-primary p-2"
                onClick={() => handleSharePlatform(platform.shareUrl)}
              >
                {platform.icon}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>مشاركة عبر {platform.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="text-gray-600 hover:text-primary p-2"
              onClick={copyToClipboard}
            >
              <Copy size={iconSize} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>نسخ الرابط</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SocialShare;
