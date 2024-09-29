'use client';

import { ClientLayout } from '../theme/mainTheme';

export default function ClientWrapper({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}