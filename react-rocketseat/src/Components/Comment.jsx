import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react';
import styles from './Comment.module.css'
import { Avatar } from './Avatar'

export function Comment({ content, onDeleteComment }) {
    function handleDeleteComment() {

        onDeleteComment(content);
    }

    const [likeCount, setLikeCount] = useState(0);

    function handleLikeCount() {
        setLikeCount((state) => {
            return state + 1;
        });
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src={"https://github.com/Ninn-up.png"} />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Diego Fernandes</strong>
                            <time title="11 de Março às 11:49" dateTime="2025-03-11 11:49:23"> Cerca de 1h atrás</time>
                        </div>
                        <button 
                            onClick={handleDeleteComment}
                            title="Deletar comentário">
                            <Trash size={24}/>
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeCount} >
                        <ThumbsUp size={20}/> Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
                
            </div>
        </div>
    )
}