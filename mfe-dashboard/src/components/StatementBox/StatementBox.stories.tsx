import type { Meta, StoryObj } from '@storybook/react';
import { StatementBox } from './StatementBox';

const meta: Meta<typeof StatementBox> = {
  title: 'Components/StatementBox',
  component: StatementBox,
};

export default meta;

type Story = StoryObj<typeof StatementBox>;

export const Default: Story = {
  args: {
    title: 'Extrato',
    items: [
      {
        mesAno: 'Maio',
        transacoes: [
          {
            id: 1,
            usuarioId: 1,
            tipo: 'Depósito',
            valor: 2500,
            data: '2025-05-20',
          },
          {
            id: 2,
            usuarioId: 1,
            tipo: 'Transferência',
            valor: 500,
            data: '2025-05-22',
          },
        ],
      },
      {
        mesAno: 'Abril',
        transacoes: [
          {
            id: 3,
            usuarioId: 1,
            tipo: 'Depósito',
            valor: 1200,
            data: '2025-04-15',
          },
        ],
      },
    ],
    onUpdate: () => console.log('Atualizado!'),
    onBalanceUpdate: () => console.log('Saldo atualizado!'),
  },
};
