import { useState } from 'react';

export function StateFuncionDate(date: Date) {
    const [selected, setSelected] = useState(date);

    return selected;
}

export function convertHours(time: string) {
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = hour * 60 + minutes;
    return timeInMinutes;
}
