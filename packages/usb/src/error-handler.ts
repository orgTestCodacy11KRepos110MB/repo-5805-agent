import { InvalidArgumentError } from './invalid-argument-error.js';

export function errorHandler(error) {
    if (error instanceof InvalidArgumentError) {
        console.error(error.message);
    } else {
        console.error(error);
    }

    process.exit(1);
}
