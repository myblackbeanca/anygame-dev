'use client';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  deriveStats,
  classifySendResult,
  ROLES,
  REGIONS,
  type Subscriber,
} from '@/lib/newsletter';

const TOKEN_KEY = 'anygame_admin_token';
const WORKER_URL = 'https://anygame-newsletter.alet8891.workers.dev';

// Tailwind classes per role so the badges read as a quick visual legend.
const ROLE_STYLES: Record<string, string> = {
  founder: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  developer: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  designer: 'bg-pink-100 text-pink-700 border-pink-200',
  publisher: 'bg-amber-100 text-amber-700 border-amber-200',
  investor: 'bg-violet-100 text-violet-700 border-violet-200',
  press: 'bg-sky-100 text-sky-700 border-sky-200',
  academic: 'bg-teal-100 text-teal-700 border-teal-200',
  student: 'bg-slate-100 text-slate-700 border-slate-200',
  other: 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function AdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('anygame.dev Newsletter');
  const [loading, setLoading] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');

  // Manual-add form (Radix Select doesn't post via FormData, so track in state).
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('founder');
  const [newCompany, setNewCompany] = useState('');
  const [newRegion, setNewRegion] = useState('North America');

  const stats = useMemo(() => deriveStats(subscribers), [subscribers]);

  const post = (action: string, extra: Record<string, unknown> = {}) =>
    fetch(`${WORKER_URL}/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ action, ...extra }),
    });

  const fetchSubscribers = async () => {
    setError('');
    try {
      const res = await post('list');
      if (res.status === 401) {
        setAuthed(false);
        setError('Invalid admin token.');
        // Drop the stored token so a remount doesn't auto-retry the dead value
        // in a 401 loop; keep it in the input field for correction.
        localStorage.removeItem(TOKEN_KEY);
        toast.error('Authentication failed');
        return;
      }
      const data = await res.json();
      setSubscribers(data.subscribers || []);
      setAuthed(true);
      localStorage.setItem(TOKEN_KEY, token);
      toast.success('Authenticated');
    } catch (e) {
      setError('Failed to fetch subscribers: ' + e);
      toast.error('Failed to fetch subscribers');
    }
  };

  const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setAuthed(false);
    setError('');
    setSubscribers([]);
    toast.info('Logged out');
  };

  useEffect(() => {
    if (token) fetchSubscribers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await post('subscribe', {
        email: newEmail,
        role: newRole,
        company: newCompany,
        region: newRegion,
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.alreadySubscribed ? 'Already subscribed' : 'Subscriber added');
        setNewEmail('');
        setNewCompany('');
        fetchSubscribers();
      } else {
        toast.error(data.error || 'Subscription failed');
      }
    } catch (err) {
      // A worker cold-start / non-JSON 5xx would otherwise throw an unhandled
      // rejection and freeze the form with no feedback.
      toast.error('Failed to add subscriber: ' + err);
    }
  };

  const handleSend = async () => {
    if (!content) {
      toast.error('Please enter newsletter content');
      return;
    }
    setLoading(true);
    try {
      const res = await post('send', { subject, content });
      const data = await res.json();
      setLoading(false);
      if (res.status === 401) {
        clearToken();
        toast.error('Session expired — re-enter your admin token.');
        return;
      }
      // classifySendResult honors the worker's aborted/failed/errors so a total
      // send outage isn't reported as a green success. (unit-tested)
      setSentCount(data.sent || 0);
      const { level, message } = classifySendResult(data);
      toast[level](message);
    } catch (e) {
      setLoading(false);
      toast.error('Failed to send newsletter: ' + e);
    }
  };

  // --- Auth gate -----------------------------------------------------------
  if (!authed) {
    return (
      <div className="theme-light min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <h1 className="text-xl font-semibold">anygame.dev admin</h1>
            <CardDescription>Enter your admin token to manage the newsletter.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Admin token</Label>
              <Input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchSubscribers()}
                placeholder="Enter admin token"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button className="min-h-11 w-full" onClick={fetchSubscribers} disabled={!token}>
              Unlock
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- Dashboard -----------------------------------------------------------
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">anygame.dev</h1>
            <p className="text-sm text-muted-foreground">Newsletter admin</p>
          </div>
          <Button variant="outline" size="sm" onClick={clearToken}>
            Log out
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Stat cards */}
        {stats.length > 0 && (
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label}>
                <CardHeader className="pb-2">
                  <CardDescription>{s.label}</CardDescription>
                  <CardTitle className="text-3xl tabular-nums">{s.value}</CardTitle>
                </CardHeader>
                {s.hint && (
                  <CardContent className="pt-0 text-xs text-muted-foreground">{s.hint}</CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        <Tabs defaultValue="subscribers">
          <TabsList>
            <TabsTrigger value="subscribers">Subscribers ({subscribers.length})</TabsTrigger>
            <TabsTrigger value="compose">Compose</TabsTrigger>
          </TabsList>

          {/* Subscribers tab */}
          <TabsContent value="subscribers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">All subscribers</CardTitle>
                <CardDescription>{subscribers.length} on the list</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead className="text-right">Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscribers.map((sub) => (
                      <TableRow key={sub.email}>
                        <TableCell className="font-medium">{sub.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={ROLE_STYLES[sub.role] || ROLE_STYLES.other}
                          >
                            {sub.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{sub.company}</TableCell>
                        <TableCell className="text-muted-foreground">{sub.region}</TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleDateString() : ''}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {subscribers.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">No subscribers yet</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add subscriber manually</CardTitle>
                <CardDescription>Insert someone who signed up off-site.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribe} className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      required
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select value={newRole} onValueChange={setNewRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((r) => (
                          <SelectItem key={r} value={r} className="capitalize">
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select value={newRegion} onValueChange={setNewRegion}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {REGIONS.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit">Add subscriber</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compose tab */}
          <TabsContent value="compose">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Compose newsletter</CardTitle>
                <CardDescription>
                  Sends an HTML email to all {subscribers.length} subscribers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Newsletter title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content (HTML allowed)</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    className="font-mono text-sm"
                    placeholder="<h1>Newsletter title</h1><p>Content here...</p>"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button onClick={handleSend} disabled={loading}>
                    {loading ? 'Sending…' : 'Send newsletter'}
                  </Button>
                  {sentCount > 0 && (
                    <span className="text-sm text-muted-foreground">
                      Sent to {sentCount} subscribers
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
