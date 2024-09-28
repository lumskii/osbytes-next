import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendSignInLinkToEmail, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { authen, googleProvider } from '@/lib/firebase';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup' | 'passwordless'>('signin');
  const router = useRouter();

  const handleClose = () => {
    onClose();
    setError(null);
    setEmail('');
    setPassword('');
    setMode('signin');
  };

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'signin') {
        await signInWithEmailAndPassword(authen, email, password);
      } else {
        await createUserWithEmailAndPassword(authen, email, password);
      }
      handleClose();
      onLoginSuccess();
    } catch (error) {
      setError('Failed to sign in. Please check your credentials and try again.');
    }
  };

  const handlePasswordlessLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/new-project`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(authen, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setError('Check your email for the login link.');
    } catch (error) {
      setError('Failed to send login link. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(authen, googleProvider);
      handleClose();
      onLoginSuccess();
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Passwordless Sign In'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={mode === 'passwordless' ? handlePasswordlessLogin : handleEmailPasswordLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {mode !== 'passwordless' && (
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
          <Button type="submit" className="w-full">
            {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Login Link'}
          </Button>
        </form>
        <div className="flex justify-between mt-4">
          <Button variant="link" onClick={() => setMode('signin')}>Sign In</Button>
          <Button variant="link" onClick={() => setMode('signup')}>Sign Up</Button>
          <Button variant="link" onClick={() => setMode('passwordless')}>Passwordless</Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        
        <div className="mt-6 text-center">
          <p className="font-bold">Or</p>
        </div>
        
        <Button onClick={handleGoogleSignIn} className="w-full mt-2">
          Sign in with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;