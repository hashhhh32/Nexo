
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Mail, Eye, EyeOff, LogIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signupSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Auth = () => {
  const { user, signIn, signUp, signInWithGoogle, signInWithLinkedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, data.firstName, data.lastName);
      // We don't navigate here because signUp might require email verification
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleLinkedInSignIn = async () => {
    try {
      await signInWithLinkedIn();
    } catch (error) {
      console.error('LinkedIn sign in error:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Nexo Finance</CardTitle>
          <CardDescription className="text-center">
            AI-Powered Bootstrap Finance Copilot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="signup">
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={signupForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleGoogleSignIn} type="button">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16L15 12L11 8V16Z" fill="currentColor"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" onClick={handleLinkedInSignIn} type="button">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S0.02 4.881 0.02 3.5C0.02 2.12 1.13 1 2.5 1S4.98 2.12 4.98 3.5ZM5 8H0V21H5V8ZM12.982 8C9.547 8 8.952 9.883 8.952 11.96V21H13.984V12.365C13.984 10.996 14.778 9.9 16.3 9.9C17.822 9.9 18.616 10.996 18.616 12.365V21H23.648V12.717C23.648 7.777 20.198 7.198 18.616 7.198C17.033 7.198 15.888 7.663 15.276 8.507H15.2L14.932 8H9.92V21H14.953V11.96C14.953 10.903 15.507 10.195 16.623 10.195C17.746 10.195 18.3 10.903 18.3 11.96V21H23.332V11.951C23.332 7.133 19.898 6.5 18.3 6.5C16.703 6.5 15.534 7.012 14.916 7.895H14.839L14.56 7.385H9.5V21H14.532V11.96C14.532 10.903 15.086 10.195 16.202 10.195C17.318 10.195 17.872 10.903 17.872, 11.96V21H22.904V11.951C22.904 7.133 19.47 6.5 17.872 6.5C16.274 6.5 15.105 7.012 14.487 7.895H14.41L14.131 7.385H8.772V21H13.803V11.96C13.803 9.722 14.487 8 17.033 8C19.579 8 21.96 9.5 21.96 11.96V21H26.991V11.951C26.991 6.118 21.96 6 19.579 6C16.625 6 15.336 7.058 14.651 8H14.573L14.293 7.385H9.5V21H14.525V11.96C14.525 9.722 15.207 8 17.753 8C20.299 8 21.96 9.5 21.96 11.96V21H26.991V11.951C26.991 6.118 21.96 6 19.579 6C16.625 6 15.336 7.058 14.651 8H14.573L14.293 7.385H9V21H14.025V11.96C14.025 9.722 14.709 8 17.255 8C19.802 8 21.462 9.5 21.462 11.96V21H26.493V11.951C26.493 6.118 21.462 6 19.081 6C16.127 6 14.839 7.058 14.154 8H14.076L13.797 7.385H8.504V21H13.53V11.96C13.53 9.722 14.214 8 16.76 8C19.306 8 20.966 9.5 20.966 11.96V21H25.997V11.951C25.997 6.118 20.966 6 18.585 6C15.631 6 14.342 7.058 13.658 8H13.58L13.301 7.385H8.008V21H13.034V11.96C13.034 9.722 13.715 8 16.262 8C18.808 8 20.47 9.5 20.47 11.96V21H25.501V11.951C25.501 6.118 20.47 6 18.089 6C15.134 6 13.846 7.058 13.162 8H13.084L12.805 7.385H7.512V21H12.537V11.96C12.537 9.722 13.219 8 15.765 8C18.312 8 19.973 9.5 19.973 11.96V21H25.005V11.951C25.005 6.118 19.973 6 17.592 6C14.638 6 13.349 7.058 12.665 8H12.587L12.308 7.385H7.015V21H12.041V11.96C12.041 9.722 12.722 8 15.269 8C17.815 8 19.477 9.5 19.477 11.96V21H24.508V11.951C24.508 6.118 19.477 6 17.096 6C14.142 6 12.853 7.058 12.169 8H12.091L11.812 7.385H6.519V21H11.545V11.96C11.545 9.722 12.226 8 14.773 8C17.319 8 18.981 9.5 18.981 11.96V21H24.012V11.951C24.012 6.118 18.981 6 16.6 6C13.646 6 12.357 7.058 11.673 8H11.595L11.316 7.385H6.023V21H11.049V11.96C11.049 9.722 11.73 8 14.277 8C16.823 8 18.485 9.5 18.485 11.96V21H23.516V11.951C23.516 6.118 18.485 6 16.104 6C13.15 6 11.861 7.058 11.177 8H11.099L10.82 7.385H5.527V21H10.553V11.96C10.553 9.722 11.234 8 13.781 8C16.327 8 17.987 9.5 17.987 11.96V21H23.02V11.951C23.02 6.118 17.987 6 15.608 6C12.654 6 11.365 7.058 10.681 8H10.603L10.324 7.385H5.031V21H10.057V11.96C10.057 9.722 10.738 8 13.285 8C15.831 8 17.491 9.5 17.491 11.96V21H22.524V11.951C22.524 6.118 17.491 6 15.111 6C12.157 6 10.868 7.058 10.184 8H10.106L9.827 7.385H4.535V21H9.561V11.96C9.561 9.722 10.242 8 12.788 8C15.334 8 16.996 9.5 16.996 11.96V21H22.027V11.951C22.027 6.118 16.996 6 14.615 6C11.661 6 10.372 7.058 9.688 8H9.61L9.331 7.385H4.038V21H9.064V11.96C9.064 9.722 9.747 8 12.293 8C14.839 8 16.5 9.5 16.5 11.96V21H21.531V11.951C21.531 6.118 16.5 6 14.119 6C11.165 6 9.876 7.058 9.192 8H9.114L8.835 7.385H3.542V21H8.568V11.96C8.568 9.722 9.25 8 11.796 8C14.342 8 16.004 9.5 16.004 11.96V21H21.035V11.951C21.035 6.118 16.004 6 13.623 6C10.669 6 9.38 7.058 8.696 8H8.618L8.339 7.385H3.046V21H8.072V11.96C8.072 9.722 8.753 8 11.3 8C13.846 8 15.508 9.5 15.508 11.96V21H20.539V11.951C20.539 6.118 15.508 6 13.127 6C10.173 6 8.884 7.058 8.2 8H8.122L7.843 7.385H2.55V21H7.576V11.96C7.576 9.722 8.257 8 10.804 8C13.35 8 15.012 9.5 15.012 11.96V21H20.043V11.951C20.043 6.118 15.012 6 12.631 6C9.677 6 8.388 7.058 7.704 8H7.626L7.347 7.385H2.054V21H7.079V11.96C7.079 9.722 7.762 8 10.308 8C12.854 8 14.516 9.5 14.516 11.96V21H19.547V11.951C19.547 6.118 14.516 6 12.135 6C9.181 6 7.892 7.058 7.208 8H7.13L6.851 7.385H1.558V21H6.583V11.96C6.583 9.722 7.266 8 9.812 8C12.358 8 14.02 9.5 14.02 11.96V21H19.051V11.951C19.051 6.118 14.02 6 11.639 6C8.685 6 7.396 7.058 6.712 8H6.634L6.355 7.385H1.062V21H6.087V11.96C6.087 9.722 6.769 8 9.315 8C11.862 8 13.524 9.5 13.524 11.96V21H18.555V11.951C18.555 6.118 13.524 6 11.143 6C8.189 6 6.9 7.058 6.216 8H6.138L5.859 7.385H0.566V21H5.591V11.96C5.591 9.722 6.273 8 8.819 8C11.365 8 13.028 9.5 13.028 11.96V21H18.059V11.951C18.059 6.118 13.028 6 10.647 6C7.693 6 6.404 7.058 5.72 8H5.642L5.363 7.385H0.07V21H5.095V11.96C5.095 9.722 5.777 8 8.323 8C10.87 8 12.531 9.5 12.531 11.96V21H17.563V11.951C17.563 6.118 12.531 6 10.15 6C7.197 6 5.91 7.058 5.224 8H5.146L4.867 7.385H0V8H13C13 13 11.595 16 8.954 16V21H13.986V12.717C13.986 7.777 10.536 7.198 8.954 7.198C7.371 7.198 6.226 7.663 5.614 8.507H5.538L5.27 8H0.258V21H5.29V11.96C5.29 10.903 5.844 10.195 6.961 10.195C8.077 10.195 8.631 10.903 8.631 11.96V21H13.663V11.951C13.663 7.133 10.229 6.5 8.631 6.5C7.034 6.5 5.865 7.012 5.247 7.895H5.17L4.891 7.385H0V21H5V8Z" fill="currentColor"/>
              </svg>
              LinkedIn
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-center text-sm text-muted-foreground">
            By continuing, you agree to Nexo's Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
