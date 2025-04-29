import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

/* Informações necessárias para o Post
author: {avatar_url: "", name: ", role: ""}
publishedAt: Date
content: ""
*/

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  //Formatação de datas com Intl
  /*  const publishedDateFormatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(publishedAt); */

  /* O useState retorna duas posições, a primeiro posição é o estado que está criando 
  e a segunda posição função para alterar estado. No caso abaixo utilizamos 
  desestruturação */
  const [comments, setComments] = useState(["Post Muito Bacana hein?!"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    //evita o comportamento padrão do formulário de enviar usuário para outro lugar
    event.preventDefault();

    /* IMUTABILIDADE - No setComments, não passamos somente o que eu quero inserir,
passamos o novo valor, inclusive com os valores que ja tinham no array
*/
    setComments([...comments, newCommentText]);
    /* comments.push(3) -  até insere no array, mas um novo comentário não é renderizado 
    porque o react não vai ficar monitorando o valor da variavel comments 
    para que quando ela mudar, mostrar os novos comentários em tela.  */

    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Este campo é obrigatório!");
  }

  function deleteComment(commentToDelete: string) {
    /* Imutabilidade - As variáveis não sofrem mutação, nós criamos um novo valor (um novo espaço na memória) 
    A imutabilidade permite ser mais performático */

    /* filter - true continua, mantém o item da lista, false sai, remove da lista
    Por isso utilizo o !== */
    const commentsWithoutDeleteOne = comments.filter((comment) => {
      return comment !== commentToDelete;
      /* comment é diferente do comentário que quero excluir? Ok, então ele permanece na lista */
    });

    setComments(commentsWithoutDeleteOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((item) =>
          item.type === "paragraph" ? (
            <p key={item.content}>{item.content}</p>
          ) : (
            item.type === "link" && (
              <p key={item.content}>
                👉 <a href="">{item.content}</a>
              </p>
            )
          )
        )}
        <p>
          <a href=""> #novoprojeto </a>
          <a href="">#nlw </a>
          <a href="">#rocketseat</a>
        </p>
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          value={newCommentText}
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid} //é chamada quando quero fazer um submiti no form mas tem algo invalido
          required
        />
        <footer>
          {/* botão fica desabilitado quando o newCommetn está vazio = isNewCommentEmpty */}
          <button type="submit" disabled={isNewCommentEmpty}>
            Comentar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
