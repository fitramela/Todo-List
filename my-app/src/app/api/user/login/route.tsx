export async function GET(req:Request){
    return Response.json({
        message : 'masukLogin'
    },{
        status : 200
    })
}

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        // Connect to MongoDB
        const client = new MongoClient(process.env.URI as string);
        await client.connect();

        const db = client.db(process.env.DATABASE);
        const users = db.collection('users');

        // Find user in database
        let user = await users.findOne({ username });

        if (user) {
            // User exists, check password
            if (user.password === password) {
                await client.close();
                return Response.json({ message: 'Login successful' }, { status: 200 });
            } else {
                await client.close();
                return Response.json({ message: 'Invalid password' }, { status: 401 });
            }
        } else {
            // User doesn't exist, register new user
            const newUser = { username, password };
            await users.insertOne(newUser);
            await client.close();
            return Response.json({ message: 'User registered and logged in successfully' }, { status: 201 });
        }
    } catch (error) {
        console.error('Error during login/registration:', error);
        return Response.json({ message: 'An error occurred during login/registration' }, { status: 500 });
    }
}