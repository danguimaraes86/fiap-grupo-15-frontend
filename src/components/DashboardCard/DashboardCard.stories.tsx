import type { Meta, StoryObj } from '@storybook/react';
import { DashboardCard } from './DashboardCard';

const meta: Meta<typeof DashboardCard> = {
  component: DashboardCard,
  title: 'Components/DashboardCard',
};

export default meta;
type Story = StoryObj<typeof DashboardCard>;

export const Default: Story = {
  args: {
    name: 'Joana',
    date: 'Quinta-feira, 08/08/2024',
    accountType: 'Conta Corrente',
    balance: 'R$ 2.520,00',
  },
};
