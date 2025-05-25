import type { Meta, StoryObj } from '@storybook/react';
import { StatementBox } from './StatementBox';

const meta: Meta<typeof StatementBox> = {
  component: StatementBox,
  title: 'Components/StatementBox',
};

export default meta;
type Story = StoryObj<typeof StatementBox>;

export const Default: Story = {
  args: {
    title: 'Extrato',
    items: [
      {
        month: 'Setembro',
        transactions: ['Transferência - R$ 38,00', 'Transferência - R$ 58,00'],
      },
      {
        month: 'Agosto',
        transactions: ['Depósito - R$ 120,00'],
      },
    ],
  },
};
