export function formatNumberWithMetricPrefix(number: number, decimalPlaces: number): string {
    const numberString = String(number);
    const numberLength = numberString.length;
    const power = Math.pow;
    const divisor = power(10, decimalPlaces);
    
    // Округляем длину до ближайшего меньшего кратного 3
    const normalizedLength = numberLength - (numberLength % 3);
    
    // Вычисляем масштабированное и округленное значение
    const scaledValue = Math.round(number * divisor / power(10, normalizedLength)) / divisor;
    
    // Выбираем соответствующий метрический префикс
    const metricPrefixes = " kMGTPE";
    const prefixIndex = normalizedLength / 3;
    const prefix = metricPrefixes[prefixIndex];
    
    return scaledValue + prefix;
}