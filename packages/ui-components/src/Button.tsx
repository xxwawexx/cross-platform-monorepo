"use client";

import React from 'react';

import { Button as MuiButton } from '@mui/material';
import NextLink from 'next/link';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import type { LinkProps as NextLinkProps } from 'next/link';

interface MedflowButtonCustomProps {
  children?: React.ReactNode;
  nextLinkProps?: Omit<NextLinkProps, 'href' | 'as'>;
}

type LinkProps = MedflowButtonCustomProps & {
  href: string;
} & Omit<MuiButtonProps<'a'>, keyof MedflowButtonCustomProps>;

type StandardButtonProps = MedflowButtonCustomProps & {
  href?: never;
} & Omit<MuiButtonProps<'button'>, keyof MedflowButtonCustomProps>;

type MedflowButtonProps = LinkProps | StandardButtonProps;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, MedflowButtonProps>(
  (props, ref) => {
    if ('href' in props && props.href !== undefined) {
      const { children, nextLinkProps, ...rest } = props;
      const isNextLink = props.href.startsWith('/') || props.href.startsWith('#');

      if (isNextLink) {
        return (
          <MuiButton
            component={NextLink}
            ref={ref as React.ForwardedRef<HTMLAnchorElement>}
            {...rest}
            {...nextLinkProps}
          >
            {children}
          </MuiButton>
        );
      }

      return (
        <MuiButton component="a" ref={ref as React.ForwardedRef<HTMLAnchorElement>} {...rest}>
          {children}
        </MuiButton>
      );
    }

    const { children, nextLinkProps, ...rest } = props;
    
    return (
      <MuiButton ref={ref as React.ForwardedRef<HTMLButtonElement>} {...rest}>
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = 'Button';