import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9.5V5.75C6 5.33579 6.33579 5 6.75 5H9.5" />
      <path d="M6 14.5v3.75C6 18.6642 6.33579 19 6.75 19H9.5" />
      <path d="M14.5 9.5V5.75C14.5 5.33579 14.8358 5 15.25 5H18" />
      <path d="M14.5 14.5v3.75c0 .4142.3358.75.75.75H18" />
      <path d="M9.5 5H14.5" />
      <path d="M9.5 19H14.5" />
      <path d="M5 9.5H6" />
      <path d="M5 14.5H6" />
      <path d="M18 9.5h1" />
      <path d="M18 14.5h1" />
      <path d="M10 12.5v-1" />
      <path d="M14 12.5v-1" />
      <path d="M10 11.5L12 9.5l2 2" />
    </svg>
  );
}
