import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'Components/Sidebar',
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Início', href: '#' },
      { label: 'Transferências', href: '#' },
      { label: 'Investimentos', href: '#' },
      { label: 'Outros serviços', href: '#' },
    ],
    active: 'Início',
  },
};
