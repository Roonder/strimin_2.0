export function getEnvVariable(key) {
    const value = process.env[key];

    if(!value || value.length === 0) {
        console.log(`
            [${new Date().toISOString()}]: ERROR LOG\n
                The environment variable ${key} is not set.\n
            [END-OF-ERROR-LOG]
            `)
        throw new Error(`The environment variable ${key} is not set.`)
    } 

    return value;
}