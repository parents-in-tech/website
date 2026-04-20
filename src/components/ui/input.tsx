import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      'flex h-12 w-full rounded-2xl border border-input bg-background/80 px-4 py-2 text-base text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring placeholder:text-muted-foreground',
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
