import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

// --- Type Definitions ---
interface ButtonCustomProps {
  children?: React.ReactNode;
  nextLinkProps?: Omit<NextLinkProps, 'href' | 'as'>;
}

type LinkProps = ButtonCustomProps & {
  href: string;
} & Omit<MuiButtonProps<'a'>, keyof ButtonCustomProps>;

type ButtonProps = ButtonCustomProps & {
  href?: never;
} & Omit<MuiButtonProps<'button'>, keyof ButtonCustomProps>;

type ButtonProps = LinkProps | ButtonProps;


// --- The Component Implementation ---

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
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