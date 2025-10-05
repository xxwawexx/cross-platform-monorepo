"use client";

import React from 'react';

import NextLink, { type LinkProps as NextLinkProps } from 'next/link';

type LinkProps = Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> & NextLinkProps;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...rest }, ref) => {
    
    const isInternalLink = typeof href === 'string' && (href.startsWith('/') || href.startsWith('#'));
    
    if (isInternalLink) {
      return (
        <NextLink href={href} ref={ref} {...rest}>
          {children}
        </NextLink>
      );
    }
    
    return (
      <a
        href={href as string}
        ref={ref}
        target={rest.target || "_blank"}
        rel={rest.rel || "noopener noreferrer"}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';