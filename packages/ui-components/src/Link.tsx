import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

type LinkProps = React.ComponentPropsWithoutRef<'a'> & {
  href: string;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...rest }, ref) => {
    
    const isNextLink = href.startsWith('/') || href.startsWith('#');
    
    if (isNextLink) {
      return (
        <NextLink href={href} ref={ref} {...rest}>
          {children}
        </NextLink>
      );
    }
    
    return (
      <a href={href} ref={ref} {...rest}>
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';