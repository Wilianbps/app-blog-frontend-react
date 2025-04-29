import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post, PostType } from "./components/Post";
import "./global.css";
import styles from "./App.module.css";

/* Informações necessárias para o Post
author: {avatar_url: "", name: ", role: ""}
publishedAt: Date
content: ""
*/
const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/wilianbps.png",
      name: "Wilian Brito",
      role: "CEO BeitSoft",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          " Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design / doctorcare" },
    ],
    publishedAt: new Date("2023-08-01 20:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO Rocketseat",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          " Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design / doctorcare " },
    ],
    publishedAt: new Date("2023-08-09 12:18:00"),
  },
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </main>
      </div>
    </div>
  );
}
