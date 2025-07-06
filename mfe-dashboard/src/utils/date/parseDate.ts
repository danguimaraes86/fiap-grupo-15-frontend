export function parseDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  const formatted = d.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
