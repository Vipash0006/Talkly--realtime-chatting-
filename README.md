# Talkly - Real-time Language Exchange Platform

<div align="center">
  <img src="frontend/public/favicon_io/android-chrome-512x512.png" alt="Talkly Logo" width="200"/>
  
  <p>
    <strong>Connect with language partners worldwide. Chat, video call, and practice speaking with native speakers.</strong>
  </p>

  <div>
    <a href="https://talkly-chat.vercel.app">
      <img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge" alt="Deployed on Vercel"/>
    </a>
    <a href="https://talkly.onrender.com">
      <img src="https://img.shields.io/badge/Backend%20on-Render-blue?style=for-the-badge" alt="Backend on Render"/>
    </a>
  </div>
</div>

## 🌟 Features

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://img.icons8.com/color/48/000000/chat.png" width="40"/>
        <br/>
        Real-time Chat
      </td>
      <td align="center">
        <img src="https://img.icons8.com/color/48/000000/video-call.png" width="40"/>
        <br/>
        Video Calls
      </td>
      <td align="center">
        <img src="https://img.icons8.com/color/48/000000/user-male-circle.png" width="40"/>
        <br/>
        User Auth
      </td>
      <td align="center">
        <img src="https://img.icons8.com/color/48/000000/group.png" width="40"/>
        <br/>
        Partner Matching
      </td>
    </tr>
  </table>
</div>

## 🏗️ Project Structure

### Frontend Architecture
```mermaid
graph TD
    A[Frontend] --> B[public]
    A --> C[src]
    B --> B1[favicon_io]
    C --> D[components]
    C --> E[pages]
    C --> F[hooks]
    C --> G[lib]
    C --> H[App.jsx]
    D --> D1[Reusable Components]
    E --> E1[Page Components]
    F --> F1[Custom Hooks]
    G --> G1[API & Utils]
```

### Backend Architecture
```mermaid
graph TD
    A[Backend] --> B[src]
    B --> C[controllers]
    B --> D[middleware]
    B --> E[models]
    B --> F[routes]
    B --> G[lib]
    C --> C1[Route Handlers]
    D --> D1[Auth & Validation]
    E --> E1[Database Models]
    F --> F1[API Routes]
    G --> G1[Utilities]
```

### System Architecture
```mermaid
graph LR
    A[Client] --> B[Vercel]
    B --> C[Stream Services]
    B --> D[Render]
    D --> E[MongoDB]
    C --> C1[Stream Chat]
    C --> C2[Stream Video]
```

## 🚀 Deployment

<details>
<summary><b>Frontend (Vercel)</b></summary>

1. Push your code to GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure environment variables:
   ```env
   VITE_STREAM_API_KEY=your_stream_api_key
   VITE_API_URL=your_backend_url
   ```
5. Deploy
</details>

<details>
<summary><b>Backend (Render)</b></summary>

1. Push your code to GitHub repository
2. Go to [Render](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Configure environment variables:
   ```env
   PORT=10000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   ```
6. Deploy
</details>

## 🛠️ Local Development

<details>
<summary><b>Frontend Setup</b></summary>

```bash
cd frontend
npm install
npm run dev
```
</details>

<details>
<summary><b>Backend Setup</b></summary>

```bash
cd backend
npm install
npm run dev
```
</details>

## 🔧 Environment Variables

<details>
<summary><b>Frontend (.env)</b></summary>

```env
VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_URL=http://localhost:10000
```
</details>

<details>
<summary><b>Backend (.env)</b></summary>

```env
PORT=10000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```
</details>

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

<div align="center">
  <img src="https://img.icons8.com/color/48/000000/git.png" width="20"/>
  <img src="https://img.icons8.com/color/48/000000/github.png" width="20"/>
  <img src="https://img.icons8.com/color/48/000000/gitlab.png" width="20"/>
</div>

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔗 Links

<div align="center">
  <a href="https://talkly-chat.vercel.app">
    <img src="https://img.icons8.com/color/48/000000/globe.png" width="20"/>
    Live Demo
  </a>
  •
  <a href="https://github.com/Vipash0006/Talkly--realtime-chatting-">
    <img src="https://img.icons8.com/color/48/000000/github.png" width="20"/>
    GitHub Repository
  </a>
  •
  <a href="https://talkly-backend.onrender.com">
    <img src="https://img.icons8.com/color/48/000000/api.png" width="20"/>
    Backend API
  </a>
</div>

## 🙏 Acknowledgments

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://getstream.io/chat/">
          <img src="https://img.icons8.com/color/48/000000/chat.png" width="40"/>
          <br/>
          Stream Chat
        </a>
      </td>
      <td align="center">
        <a href="https://getstream.io/video/">
          <img src="https://img.icons8.com/color/48/000000/video-call.png" width="40"/>
          <br/>
          Stream Video
        </a>
      </td>
      <td align="center">
        <a href="https://vercel.com">
          <img src="https://img.icons8.com/color/48/000000/cloud.png" width="40"/>
          <br/>
          Vercel
        </a>
      </td>
      <td align="center">
        <a href="https://render.com">
          <img src="https://img.icons8.com/color/48/000000/server.png" width="40"/>
          <br/>
          Render
        </a>
      </td>
    </tr>
  </table>
</div> 