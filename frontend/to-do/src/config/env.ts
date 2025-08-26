export const env = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    jwtSecret: process.env.JWT_SECRET || "",
};
