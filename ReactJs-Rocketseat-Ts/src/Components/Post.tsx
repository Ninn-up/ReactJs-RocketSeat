import { format, formatDistanceToNow } from 'date-fns' 
import { ptBR } from 'date-fns/locale/pt-BR'

import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import styles from './Post.module.css'
import { Comment } from './Comment'
import { Avatar } from './Avatar'

interface Author { 
    avatarUrl: string;
    name: string; 
    role: string
}

interface Content {
    type: 'paragraph' | 'link';  /* Indica que podemos ter 2 opções de strings para type */
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
    const [comments, setComments] = useState([
        "Post muito bacana, hein?"
    ]);

    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });

    function handleCreateNewComment(event: FormEvent) { /* Usar "handle" para indicar que depende da interação do usuário  */
        event.preventDefault();

        setComments([...comments, newCommentText]);  /* Spread Operator: "..." lê todos os valores no array. Além de ler os valores no array, essa linha permite adicionar novos comentários - observe que isso é feito dizendo como deve ser o novo array, não passando o array anterior apenas/  */
        setNewCommentText('');
    };

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) { /* Os <> indicam em que área do ocorreu a mudança "change" */
        event.target.setCustomValidity('');  /* Verifica se algo já foi digitado */
        setNewCommentText(event.target.value);
    };

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })

        setComments(commentsWithoutDeletedOne);  /* Retorna os comentários que não foram deletados */

    };

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório')
    };

    const isNewCommentEmpty = newCommentText.length === 0

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

                <time title="11 de março às 10:38" dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {post.content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>

                    } else if (line.type === 'link') {
                        return <p key={line.content}> <a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback!</strong>

                <textarea 
                    name="input" 
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    onChange={handleNewCommentChange} 
                    onInvalid={handleNewCommentInvalid} /* É acionado se tentarmos submeter sem preencher a textarea */
                    required 
                />

                <footer>
                    <button 
                        type="submit" 
                        disabled={isNewCommentEmpty}
                    >Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return( 
                        <Comment 
                        key={comment} 
                        content={comment} 
                        onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
            
        </article>
    )
}
