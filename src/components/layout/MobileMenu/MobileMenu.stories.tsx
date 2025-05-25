import type { Meta, StoryObj } from '@storybook/react';
import { MobileMenu } from './MobileMenu';

const meta: Meta<typeof MobileMenu> = {
  title: 'Components/MobileMenu',
  component: MobileMenu,
};

export default meta; // ✅ Storybook exige isso!

type Story = StoryObj<typeof MobileMenu>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Início', href: '#' },
      { label: 'Transferências', href: '#' },
      { label: 'Investimentos', href: '#' },
      { label: 'Outros serviços', href: '#' }
    ],
    active: 'Início',
    forceVisible: true, // 👈 importante para exibir sem JS
  },
};
