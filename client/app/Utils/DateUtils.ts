export function formatDate(dateInput: string | Date): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) {
        return 'Unknown';
    }

    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}