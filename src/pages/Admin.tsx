import { useState, useEffect } from 'react';
import { RefreshCw, Database, Users, BookOpen, Server, CheckCircle, XCircle, Trash2, Plus, Sparkles, MessageSquare, GraduationCap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { coursesApi, contactApi, healthApi, Course, ContactSubmission } from '@/lib/api';

const Admin = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [serverStatus, setServerStatus] = useState<{ status: string; timestamp: string } | null>(null);
  const [loading, setLoading] = useState({ courses: true, contacts: true, server: true });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'contacts'>('courses');

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const fetchAll = async () => {
    setLoading({ courses: true, contacts: true, server: true });
    setError(null);

    // Fetch server status
    try {
      const health = await healthApi.check();
      setServerStatus({ status: health.status, timestamp: health.timestamp });
    } catch {
      setServerStatus(null);
    }
    setLoading(prev => ({ ...prev, server: false }));

    // Fetch courses
    try {
      const coursesRes = await coursesApi.getAll();
      setCourses(coursesRes.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
    setLoading(prev => ({ ...prev, courses: false }));

    // Fetch contacts
    try {
      const contactsRes = await contactApi.getAll();
      setContacts(contactsRes.data);
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    }
    setLoading(prev => ({ ...prev, contacts: false }));
  };

  const seedCourses = async () => {
    try {
      setLoading(prev => ({ ...prev, courses: true }));
      await coursesApi.seed();
      await fetchAll();
      showSuccess('Sample courses added successfully!');
    } catch (err) {
      setError('Failed to seed courses. Make sure the backend is running.');
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await contactApi.delete(id);
      setContacts(prev => prev.filter(c => c._id !== id));
      showSuccess('Contact deleted successfully!');
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await coursesApi.delete(id);
      setCourses(prev => prev.filter(c => c._id !== id));
      showSuccess('Course deleted successfully!');
    } catch (err) {
      setError('Failed to delete course');
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Admin Dashboard
                </span>
              </h1>
              <p className="text-muted-foreground">
                Manage your data stored in the database
              </p>
            </div>
            <Button onClick={fetchAll} variant="outline" className="mt-4 md:mt-0 gap-2">
              <RefreshCw className={`w-4 h-4 ${loading.server ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>

          {/* Notifications */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-center gap-3">
              <XCircle className="w-5 h-5 flex-shrink-0" />
              {error}
              <button onClick={() => setError(null)} className="ml-auto text-red-300 hover:text-red-100">×</button>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              {successMessage}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Server Status */}
            <Card className={`p-6 bg-card/50 backdrop-blur-sm border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
              serverStatus ? 'border-green-500/30 hover:border-green-500/50' : 'border-red-500/30 hover:border-red-500/50'
            }`} onClick={fetchAll}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                  serverStatus ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  <Server className={`w-7 h-7 ${serverStatus ? 'text-green-400' : 'text-red-400'}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">API Server</p>
                  <div className="flex items-center gap-2">
                    {loading.server ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : serverStatus ? (
                      <span className="font-bold text-lg text-green-400">Online</span>
                    ) : (
                      <span className="font-bold text-lg text-red-400">Offline</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Port 5001</p>
                </div>
              </div>
            </Card>

            {/* Courses Count */}
            <Card 
              className={`p-6 bg-card/50 backdrop-blur-sm border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                activeTab === 'courses' ? 'border-primary/50' : 'border-border/50 hover:border-primary/30'
              }`}
              onClick={() => setActiveTab('courses')}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Courses</p>
                  <p className="text-3xl font-bold">
                    {loading.courses ? <RefreshCw className="w-6 h-6 animate-spin" /> : courses.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Click to manage</p>
                </div>
              </div>
            </Card>

            {/* Contacts Count */}
            <Card 
              className={`p-6 bg-card/50 backdrop-blur-sm border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                activeTab === 'contacts' ? 'border-accent/50' : 'border-border/50 hover:border-accent/30'
              }`}
              onClick={() => setActiveTab('contacts')}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Messages</p>
                  <p className="text-3xl font-bold">
                    {loading.contacts ? <RefreshCw className="w-6 h-6 animate-spin" /> : contacts.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Click to manage</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tab Content */}
          {activeTab === 'courses' && (
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Course Management</h2>
                </div>
                <Button onClick={seedCourses} className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <Sparkles className="w-4 h-4" />
                  Add Sample Courses
                </Button>
              </div>

              {loading.courses ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <RefreshCw className="w-12 h-12 animate-spin text-primary mb-4" />
                  <span className="text-muted-foreground">Loading courses from database...</span>
                </div>
              ) : courses.length === 0 ? (
                <div className="text-center py-16">
                  <Database className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
                  <p className="text-muted-foreground mb-6">Get started by adding some sample courses to your database</p>
                  <Button onClick={seedCourses} size="lg" className="gap-2">
                    <Plus className="w-5 h-5" />
                    Add Sample Courses
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {courses.map((course) => (
                    <div 
                      key={course._id} 
                      className="p-8 bg-muted/10 rounded-xl border border-border/50 hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">{course.title}</h3>
                            <Badge variant="secondary">{course.level}</Badge>
                            {course.price && (
                              <Badge variant="outline" className="text-primary border-primary/30">
                                ${course.price}
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {course.topics?.map((topic, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-primary/10 rounded-full text-primary">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          onClick={() => deleteCourse(course._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {activeTab === 'contacts' && (
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold">Contact Messages</h2>
              </div>

              {loading.contacts ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <RefreshCw className="w-12 h-12 animate-spin text-accent mb-4" />
                  <span className="text-muted-foreground">Loading messages from database...</span>
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-16">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="text-xl font-semibold mb-2">No Messages Yet</h3>
                  <p className="text-muted-foreground mb-6">When visitors submit the contact form, messages will appear here</p>
                  <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                    Go to Contact Page
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div 
                      key={contact._id} 
                      className="p-5 bg-muted/10 rounded-xl border border-border/50 hover:border-accent/30 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-lg">{contact.name}</span>
                            <Badge variant={contact.status === 'pending' ? 'destructive' : 'secondary'}>
                              {contact.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-accent mb-1">{contact.email}</p>
                          <p className="font-semibold mb-2">{contact.subject}</p>
                          <p className="text-muted-foreground text-sm bg-muted/20 p-3 rounded-lg">{contact.message}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          onClick={() => deleteContact(contact._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* Tech Stack Info */}
          <div className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">MERN Stack Architecture</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-background/50 rounded-lg text-center">
                <div className="text-2xl mb-2">🍃</div>
                <p className="font-semibold">MongoDB</p>
                <p className="text-xs text-muted-foreground">Database</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg text-center">
                <div className="text-2xl mb-2">⚡</div>
                <p className="font-semibold">Express.js</p>
                <p className="text-xs text-muted-foreground">Backend API</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg text-center">
                <div className="text-2xl mb-2">⚛️</div>
                <p className="font-semibold">React</p>
                <p className="text-xs text-muted-foreground">Frontend</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg text-center">
                <div className="text-2xl mb-2">💚</div>
                <p className="font-semibold">Node.js</p>
                <p className="text-xs text-muted-foreground">Runtime</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
