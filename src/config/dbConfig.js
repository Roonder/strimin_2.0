import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log(`
            [${new Date().toISOString()}]: SUCCESS LOG\n
                MongoDB connected successfully\n
            [END-OF-SUCCESS-LOG]
            `)
        });

        connection.on('error', error => {
            console.log(`
            [${new Date().toISOString()}]: ERROR LOG\n
               MongoDB connection error. Please make sure MongoDB is running. - ${error}\n
            [END-OF-ERROR-LOG]
            `);
            process.exit();
        })
    } catch (error) {
        console.log(`
        [${new Date().toISOString()}]: ERROR LOG\n
            ${error}\n
        [END-OF-ERROR-LOG]
        `)
    }
}