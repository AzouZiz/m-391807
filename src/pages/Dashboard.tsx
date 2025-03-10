
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChefHat, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Image, 
  Video, 
  FileText, 
  Settings, 
  Plus, 
  TrendingUp, 
  Search, 
  Bell,
  User,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Gauge,
  Globe,
  Database,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('overview');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCreateContent = () => {
    toast({
      title: "Content Creator Launched",
      description: "Create new content with our advanced AI tools.",
    });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-secondary/30 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-gradient-to-b from-primary/5 to-accent/5 backdrop-blur-md border-r border-white/10 ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <Link to="/" className={`flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            {isSidebarOpen && (
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">SapidFood</span>
            )}
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-primary hover:bg-primary/10">
            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Button 
                variant={selectedMenu === 'overview' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'} ${selectedMenu === 'overview' ? 'bg-gradient-to-r from-primary to-accent text-white' : 'hover:bg-primary/10 hover:text-primary'}`}
                onClick={() => setSelectedMenu('overview')}
              >
                <Gauge className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">Dashboard</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'content' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'} ${selectedMenu === 'content' ? 'bg-gradient-to-r from-primary to-accent text-white' : 'hover:bg-primary/10 hover:text-primary'}`}
                onClick={() => setSelectedMenu('content')}
              >
                <FileText className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">Content</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'media' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'} ${selectedMenu === 'media' ? 'bg-gradient-to-r from-primary to-accent text-white' : 'hover:bg-primary/10 hover:text-primary'}`}
                onClick={() => setSelectedMenu('media')}
              >
                <Image className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">Media</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'users' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'} ${selectedMenu === 'users' ? 'bg-gradient-to-r from-primary to-accent text-white' : 'hover:bg-primary/10 hover:text-primary'}`}
                onClick={() => setSelectedMenu('users')}
              >
                <Users className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">Users</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'analytics' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'} ${selectedMenu === 'analytics' ? 'bg-gradient-to-r from-primary to-accent text-white' : 'hover:bg-primary/10 hover:text-primary'}`}
                onClick={() => setSelectedMenu('analytics')}
              >
                <TrendingUp className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">Analytics</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'messages' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'} ${selectedMenu === 'messages' ? 'bg-gradient-to-r from-primary to-accent text-white' : 'hover:bg-primary/10 hover:text-primary'}`}
                onClick={() => setSelectedMenu('messages')}
              >
                <MessageSquare className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">Messages</span>}
              </Button>
            </li>
            
            {isSidebarOpen && (
              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="text-xs text-muted-foreground mb-3">METAVERSE TOOLS</p>
              </div>
            )}
            
            <li>
              <Button 
                variant={selectedMenu === 'ai' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'} ${selectedMenu === 'ai' ? 'bg-gradient-to-r from-primary to-accent text-white' : 'hover:bg-primary/10 hover:text-primary'}`}
                onClick={() => setSelectedMenu('ai')}
              >
                <Brain className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">AI Hub</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'global' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'} ${selectedMenu === 'global' ? 'bg-gradient-to-r from-primary to-accent text-white' : 'hover:bg-primary/10 hover:text-primary'}`}
                onClick={() => setSelectedMenu('global')}
              >
                <Globe className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">Global Data</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant={selectedMenu === 'settings' ? 'default' : 'ghost'} 
                className={`w-full justify-${isSidebarOpen ? 'start' : 'center'} ${selectedMenu === 'settings' ? 'bg-gradient-to-r from-primary to-accent text-white' : 'hover:bg-primary/10 hover:text-primary'}`}
                onClick={() => setSelectedMenu('settings')}
              >
                <Settings className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">Settings</span>}
              </Button>
            </li>
          </ul>
        </nav>
        
        {isSidebarOpen && (
          <div className="p-4 border-t border-white/10">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-white/10 p-3">
              <p className="text-xs mb-2">Metaverse Mode: <span className="text-primary font-medium">Active</span></p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Data Sync: Real-time</div>
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
            </Card>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/5 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search..." className="pl-10 bg-white/5 border-white/10 focus:border-primary/50" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
            <Separator orientation="vertical" className="h-8 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Admin</p>
                <p className="text-muted-foreground text-xs">System Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {selectedMenu === 'overview' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">SapidFood Metaverse Dashboard</h1>
                  <p className="text-muted-foreground">Welcome to your AI-powered food platform control center</p>
                </div>
                <Button onClick={handleCreateContent} className="bg-gradient-to-r from-primary to-accent text-white">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Create Content
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-primary/20 transition-all duration-300">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-muted-foreground">Active Users</div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">2,543</div>
                    <div className="text-sm text-green-500 flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+12.5% this week</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-primary/20 transition-all duration-300">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-muted-foreground">Published Recipes</div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ChefHat className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">1,286</div>
                    <div className="text-sm text-green-500 flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+5.3% this week</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-primary/20 transition-all duration-300">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-muted-foreground">AI Articles</div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">428</div>
                    <div className="text-sm text-green-500 flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+18.2% this week</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-primary/20 transition-all duration-300">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-muted-foreground">AI Videos</div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Video className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">156</div>
                    <div className="text-sm text-green-500 flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+22.7% this week</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Activities */}
              <Card className="p-6 mb-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recent Activities</h2>
                  <Button variant="ghost" className="text-primary hover:bg-primary/10">
                    View All <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">New Article Created</h3>
                      <p className="text-sm text-muted-foreground">"Creative Date Recipes" was generated using AI</p>
                    </div>
                    <div className="text-sm text-muted-foreground">30 minutes ago</div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Image className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">New Images Generated</h3>
                      <p className="text-sm text-muted-foreground">5 images of Moroccan Couscous were created using DALL-E 4</p>
                    </div>
                    <div className="text-sm text-muted-foreground">1 hour ago</div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">New User Joined</h3>
                      <p className="text-sm text-muted-foreground">John Smith joined the platform and added 3 new recipes</p>
                    </div>
                    <div className="text-sm text-muted-foreground">3 hours ago</div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Video className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">New Video Created</h3>
                      <p className="text-sm text-muted-foreground">"How to Make Moroccan Bastilla" video was generated with native accent</p>
                    </div>
                    <div className="text-sm text-muted-foreground">5 hours ago</div>
                  </div>
                </div>
              </Card>

              {/* Content Generation Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 col-span-1 lg:col-span-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">AI Content Generator</h2>
                  <p className="text-muted-foreground mb-6">Enter a title or topic to generate comprehensive content with AI</p>
                  
                  <div className="space-y-4">
                    <Input placeholder="Enter a title like 'Creative Date Recipes'" className="bg-white/5 border-white/10" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button className="bg-gradient-to-r from-primary/80 to-primary text-white">
                        <FileText className="h-4 w-4 mr-2" />
                        Create Article
                      </Button>
                      <Button className="bg-gradient-to-r from-accent/80 to-accent text-white">
                        <Image className="h-4 w-4 mr-2" />
                        Create Images
                      </Button>
                      <Button className="bg-gradient-to-r from-primary to-accent text-white">
                        <Video className="h-4 w-4 mr-2" />
                        Create Video
                      </Button>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Platform Status</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">System Status</div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-green-500">Operational</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">AI Services</div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-green-500">Online</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Database</div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-green-500">Connected</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Storage</div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm text-yellow-500">72% Used</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Last Updated</div>
                        <div className="text-sm text-muted-foreground">2 minutes ago</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">AI Model Performance</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm">Text Generation</div>
                        <div className="text-sm text-primary">95%</div>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm">Image Generation</div>
                        <div className="text-sm text-primary">87%</div>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm">Video Generation</div>
                        <div className="text-sm text-primary">78%</div>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm">Audio Generation</div>
                        <div className="text-sm text-primary">92%</div>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-auto py-4 bg-white/5 hover:bg-primary/10 border border-white/10 text-left justify-start">
                      <div className="flex flex-col items-start">
                        <Database className="h-5 w-5 text-primary mb-2" />
                        <span className="font-medium">Backup Data</span>
                        <span className="text-xs text-muted-foreground mt-1">Last backup: 12 hours ago</span>
                      </div>
                    </Button>
                    
                    <Button className="h-auto py-4 bg-white/5 hover:bg-primary/10 border border-white/10 text-left justify-start">
                      <div className="flex flex-col items-start">
                        <Brain className="h-5 w-5 text-primary mb-2" />
                        <span className="font-medium">Train AI</span>
                        <span className="text-xs text-muted-foreground mt-1">Latest model: v2.3</span>
                      </div>
                    </Button>
                    
                    <Button className="h-auto py-4 bg-white/5 hover:bg-primary/10 border border-white/10 text-left justify-start">
                      <div className="flex flex-col items-start">
                        <Users className="h-5 w-5 text-primary mb-2" />
                        <span className="font-medium">Invite Users</span>
                        <span className="text-xs text-muted-foreground mt-1">50 invites available</span>
                      </div>
                    </Button>
                    
                    <Button className="h-auto py-4 bg-white/5 hover:bg-primary/10 border border-white/10 text-left justify-start">
                      <div className="flex flex-col items-start">
                        <Settings className="h-5 w-5 text-primary mb-2" />
                        <span className="font-medium">System Settings</span>
                        <span className="text-xs text-muted-foreground mt-1">Configure platform</span>
                      </div>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
          
          {selectedMenu !== 'overview' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Coming Soon</h2>
                <p className="text-muted-foreground mb-6 max-w-md">This section is currently under development. We're working to bring you innovative metaverse-powered food experiences.</p>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedMenu('overview')}
                  className="bg-gradient-to-r from-primary/10 to-accent/10 border-white/10 hover:bg-primary/20"
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
