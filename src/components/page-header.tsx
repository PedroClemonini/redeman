import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

export function PageHeader({
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className='space-y-1.5'>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
