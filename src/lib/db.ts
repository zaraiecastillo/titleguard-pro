import fs from 'fs';
import path from 'path';

// Define the shape of our mock User
export type UserTier = 'free' | 'one_time' | 'pro';

export interface User {
    id: string;
    email: string;
    tier: UserTier;
}

// In a real app, this would be a Postgres connection.
// Here we use a local JSON file to persist state across API calls.
const DB_PATH = path.join(process.cwd(), 'database.json');

// The hardcoded session ID representing our current logged-in user
export const MOCK_USER_ID = "user_123_test";

const initializeDB = () => {
    if (!fs.existsSync(DB_PATH)) {
        const initialData = {
            users: [
                {
                    id: MOCK_USER_ID,
                    email: "test@titleguard.ai",
                    tier: "free"
                }
            ]
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    }
};

export const getUser = (userId: string): User | null => {
    initializeDB();
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    return data.users.find((u: User) => u.id === userId) || null;
};

export const updateUserTier = (userId: string, newTier: UserTier) => {
    initializeDB();
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    const userIndex = data.users.findIndex((u: User) => u.id === userId);

    if (userIndex !== -1) {
        data.users[userIndex].tier = newTier;
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
        console.log(`Updated user ${userId} to tier: ${newTier}`);
        return true;
    }
    return false;
};
