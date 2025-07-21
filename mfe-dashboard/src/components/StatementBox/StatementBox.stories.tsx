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
            categoria: "Não Classificado",
          },
          {
            id: 2,
            usuarioId: 1,
            tipo: 'Transferência',
            valor: 500,
            data: '2025-05-22',
            categoria: "Não Classificado",
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
            categoria: "Não Classificado",
          },
        ],
      },
    ],
    onUpdate: () => console.log('Atualizado!'),
    onBalanceUpdate: () => console.log('Saldo atualizado!'),
  },
};
