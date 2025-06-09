export function toBRL(n: number): string{
    const formatted: string = new Intl.NumberFormat(
        'pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(n);

    return formatted;
}

export function currencyFormat(n: number, local: string = 'en-US'): string{
    
    let formatted: string;

    if (local == 'en-US'){
        formatted= new Intl.NumberFormat(
            'en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(n);
    }else{
        formatted = new Intl.NumberFormat(
            'pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(n);
    }
    
    return formatted;
}
