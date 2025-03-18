export const createTerminationHandler = (server, options = { coredump: false, timeout: 500 }) => {
    const exitCallback = (exitCode) => {
        options.coredump ? process.abort() : process.exit(exitCode);
    };

    return (exitCode, reason) => (error, promise) => {
        if ((error && error instanceof Error) || reason.indexOf('Unexpected Error') != -1) {
            console.error(`Exited with code ${exitCode}: ${error.message}\n`, error.stack);
        }

        if (reason.indexOf('Unhandled Promise') != -1) {
            // TODO
            Promise.resolve(promise).then((result) => {
                console.error(`Exited with code ${exitCode}: Unhandled Promise\n`, error.stack, result);
            });
        }

        server.close(exitCallback);
        setTimeout(exitCallback, options.timeout);
        // .unref();
    };
};

/**
 *
 * @param fn
 * @returns Resolved return value from `fn`
 */
export const asyncWrapper = (fn) => {
    return (...args) => {
        const next = args[args.length - 1];
        return Promise.resolve(fn(...args)).catch(next);
    };
};