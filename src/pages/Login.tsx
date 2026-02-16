import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BrandLogo } from '@/components/BrandLogo';
import { Lock, Mail, Shield, User, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate('/', { replace: true });
      } else {
        setError(result.error || 'Login failed');
      }
      setIsLoading(false);
    }, 400);
  };

  const fillCredentials = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <BrandLogo size="lg" showText />
          </div>
          <p className="text-sm text-muted-foreground">Enterprise Assessment Platform</p>
        </div>

        {/* Login Form */}
        <Card className="border-border shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-foreground">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="email">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    className="pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="password">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    className="pl-10 pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive font-medium">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="border-border bg-muted/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-foreground">Demo Credentials</CardTitle>
            <CardDescription className="text-xs">Click a card below to auto-fill credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              onClick={() => fillCredentials('admin@solidform.com', 'admin123')}
              className="w-full text-left p-3 rounded-lg border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Admin</span>
                <Badge variant="outline" className="text-xs">Full Access</Badge>
              </div>
              <p className="text-xs text-muted-foreground ml-6">admin@solidform.com / admin123</p>
            </button>

            <button
              onClick={() => fillCredentials('user@solidform.com', 'user123')}
              className="w-full text-left p-3 rounded-lg border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">User</span>
                <Badge variant="outline" className="text-xs">Form Filling</Badge>
              </div>
              <p className="text-xs text-muted-foreground ml-6">user@solidform.com / user123</p>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
