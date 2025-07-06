import type { Meta, StoryObj } from '@storybook/react';
import { TabletMenu } from './TabletMenu';

const meta: Meta<typeof TabletMenu> = {
  component: TabletMenu,
  title: 'Components/TabletMenu',
};

export default meta;
type Story = StoryObj<typeof TabletMenu>;

export const Default: Story = {
  args: {
    forceVisible: true, // 👈 força exibição mesmo fora do breakpoint
    items: [
      { label: 'Início', href: '#' },
      { label: 'Transferências', href: '#' },
      { label: 'Investimentos', href: '#' },
      { label: 'Outros serviços', href: '#' },
    ],
  },
};
