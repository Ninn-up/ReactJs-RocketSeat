import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useState } from 'react'
import styles from './Post.module.css'
import { Comment } from './Comment'
import { Avatar } from './Avatar'

// author: { avatar_url: "", name: "", role: ""}
// publishedAt
// content: String

export function Post({ author, content, publishedAt }) {
    const [comments, setComments] = useState([
        "Post muito bacana, hein?"
    ]);

     const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });

    function handleCreateNewComment() { /* Usar "handle" para indicar que depende da interação do usuário  */
        event.preventDefault();

        setComments([...comments, newCommentText]);  /* Spread Operator: "..." lê todos os valores no array. Além de ler os valores no array, essa linha permite adicionar novos comentários - observe que isso é feito dizendo como deve ser o novo array, não passando o array anterior apenas/  */
        setNewCommentText('');
    };

    function handleNewCommentChange() {
        event.target.setCustomValidity('');  /* Verifica se algo já foi digitado */
        setNewCommentText(event.target.value);
    };

    function deleteComment(commentToDelete) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })

        setComments(commentsWithoutDeletedOne);  /* Retorna os comentários que não foram deletados */

    };

    function handleNewCommentInvalid() {
        event.target.setCustomValidity('Esse campo é obrigatório')
    };

    const isNewCommentEmpty = newCommentText.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />

                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title="11 de março às 10:38" dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
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
