import * as RadixAvatar from '@radix-ui/react-avatar';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Root> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export const Avatar = forwardRef<React.ElementRef<typeof RadixAvatar.Root>, AvatarProps>(
  ({ src, alt, fallback, size = 'md', className, ...props }, ref) => (
    <RadixAvatar.Root
      ref={ref}
      className={cn('rounded-full overflow-hidden bg-muted/20 flex items-center justify-center', sizeClasses[size], className)}
      {...props}
    >
      <RadixAvatar.Image src={src} alt={alt} className="w-full h-full object-cover" />
      <RadixAvatar.Fallback className="text-xs font-semibold text-primary">
        {fallback || alt?.slice(0, 2).toUpperCase()}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
);

Avatar.displayName = 'Avatar';
