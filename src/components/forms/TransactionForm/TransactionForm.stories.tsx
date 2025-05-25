import type { Meta, StoryObj } from '@storybook/react';
import { TransactionForm } from './TransactionForm';

const meta: Meta<typeof TransactionForm> = {
  component: TransactionForm,
  title: 'Components/TransactionForm',
};

export default meta;
type Story = StoryObj<typeof TransactionForm>;

export const Default: Story = {
  args: {
    title: 'Nova transação',
    options: ['Transferência', 'Depósito'],
    selectedOption: '',
    value: '',
    onChangeOption: () => {},
    onChangeValue: () => {},
    onSubmit: () => {},
  },
};
