import styles from './Sidebar.module.css';
import { PencilLine } from 'phosphor-react'
import { Avatar } from './Avatar'

export function Sidebar() {
    return(
        <aside className={styles.sidebar}>
            <img 
            className={styles.cover} 
            src="https://images.unsplash.com/photo-1741091756497-10c964acc4f6?q=50" />

            <div 
            className={styles.profile}>
                <Avatar src={"https://github.com/Ninn-up.png"} />

                <strong>Nicole Ramos</strong>
                <span>Computer Engineer</span>

            </div>

            <footer>
                <a href="#"> 
                    <PencilLine size={20} />
                    Editar Seu Perfil</a>
            </footer>
        </aside>
        
    );
}