"use client";

import React from 'react';

type FormProps =
  | (Omit<React.ComponentPropsWithoutRef<'form'>, 'action'> & { action: (formData: FormData) => void; onSubmit?: never; })
  | (Omit<React.ComponentPropsWithoutRef<'form'>, 'onSubmit'> & { onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; action?: never; });

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (props, ref) => {
    return <form ref={ref} {...props} />;
  }
);

Form.displayName = 'Form';