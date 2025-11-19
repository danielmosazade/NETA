# TODO: Connect Client to Server for Authentication Requests

## Tasks
- [x] Update client/src/pages/Login.tsx: Import axios, modify handleSubmit to make POST request to /api/auth/login, handle success (store token, redirect) and errors
- [x] Update client/src/pages/Register.tsx: Remove name field, import axios, modify handleSubmit to make POST request to /api/auth/register, handle success and errors
- [x] Run server (npm run dev in server directory)
- [x] Run client (npm run dev in client directory)
- [ ] Test login and register functionality in the browser
