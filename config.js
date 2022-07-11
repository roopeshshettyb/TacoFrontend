const prod = {
    "NEXT_PUBLIC_API": "https://taco-nw-backend.herokuapp.com/api",
    "SOCKETIO_CONNECTION_URL": "https://taco-nw-backend.herokuapp.com",
};
const dev = {
    "NEXT_PUBLIC_API": "http://localhost:8000/api",
    "SOCKETIO_CONNECTION_URL": "http://localhost:8000",
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;