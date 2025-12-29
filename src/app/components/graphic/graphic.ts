import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ITransaction } from './interfaces/transaction.interface';

Chart.register(...registerables);

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [],
  templateUrl: './graphic.html',
  styleUrl: './graphic.css',
})
export class Graphic implements OnInit, OnChanges, AfterViewInit {
  @Input() transactions: ITransaction[] = [];
  
  @ViewChild('pieChartCanvas', { static: false }) pieChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChartCanvas', { static: false }) barChartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private pieChart?: Chart;
  private barChart?: Chart;

  ngOnInit() {}

  ngAfterViewInit() {
    this.createCharts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactions'] && !changes['transactions'].firstChange) {
      this.updateCharts();
    }
  }

  private createCharts() {
    if (this.transactions.length > 0) {
      this.createPieChart();
      this.createBarChart();
    }
  }

  private updateCharts() {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    if (this.barChart) {
      this.barChart.destroy();
    }
    this.createCharts();
  }

  private createPieChart() {
    const totalReceitas = this.transactions
      .filter(t => t.tipo === 'Receita')
      .reduce((sum, t) => sum + Number(t.valor), 0);

    const totalDespesas = this.transactions
      .filter(t => t.tipo === 'Despesa')
      .reduce((sum, t) => sum + Number(t.valor), 0);

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: ['Receitas', 'Despesas'],
        datasets: [{
          data: [totalReceitas, totalDespesas],
          backgroundColor: [
            'rgba(76, 175, 80, 0.8)',
            'rgba(244, 67, 54, 0.8)'
          ],
          borderColor: [
            'rgba(76, 175, 80, 1)',
            'rgba(244, 67, 54, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 12
              }
            }
          },
          title: {
            display: true,
            text: 'Receitas vs Despesas',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const formatted = new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(value);
                return `${label}: ${formatted}`;
              }
            }
          }
        }
      }
    };

    this.pieChart = new Chart(this.pieChartCanvas.nativeElement, config);
  }

  private createBarChart() {
    // Agrupa por categoria
    const categoriaMap = new Map<string, { receitas: number; despesas: number }>();
    
    this.transactions.forEach(t => {
      if (!categoriaMap.has(t.categoria)) {
        categoriaMap.set(t.categoria, { receitas: 0, despesas: 0 });
      }
      const categoria = categoriaMap.get(t.categoria)!;
      if (t.tipo === 'Receita') {
        categoria.receitas += Number(t.valor);
      } else {
        categoria.despesas += Number(t.valor);
      }
    });

    const categorias = Array.from(categoriaMap.keys());
    const receitas = categorias.map(c => categoriaMap.get(c)!.receitas);
    const despesas = categorias.map(c => categoriaMap.get(c)!.despesas);

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: categorias,
        datasets: [
          {
            label: 'Receitas',
            data: receitas,
            backgroundColor: 'rgba(76, 175, 80, 0.8)',
            borderColor: 'rgba(76, 175, 80, 1)',
            borderWidth: 2
          },
          {
            label: 'Despesas',
            data: despesas,
            backgroundColor: 'rgba(244, 67, 54, 0.8)',
            borderColor: 'rgba(244, 67, 54, 1)',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 12
              }
            }
          },
          title: {
            display: true,
            text: 'Receitas e Despesas por Categoria',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                const value = context.parsed.y || 0;
                const formatted = new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(value);
                return `${label}: ${formatted}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0
                }).format(Number(value));
              }
            }
          }
        }
      }
    };

    this.barChart = new Chart(this.barChartCanvas.nativeElement, config);
  }
}
