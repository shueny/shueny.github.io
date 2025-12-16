/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="simple-stack-form/types" />

// Extend React types to support Astro client directives
import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicAttributes {
      'client:load'?: boolean;
      'client:idle'?: boolean;
      'client:visible'?: boolean;
      'client:media'?: string;
      'client:only'?: string | boolean;
    }
  }
}
