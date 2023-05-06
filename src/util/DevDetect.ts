const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const production: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'prod';
const staging: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'staging';

// prod | staging | development
export function isDev(): boolean {
    return development;
}

export function isProduction(): boolean {
    return production;
}

export function isStaging(): boolean {
    return staging;
}