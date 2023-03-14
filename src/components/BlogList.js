import { Link, useHistory } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import './BlogList.css'
import DeleteIcon from "../assets/deleteIcon.svg"
import UpdateIcon from "../assets/updateIcon.svg"
import {db} from "../firebase/config"
import {  deleteDoc, doc } from 'firebase/firestore' 
import { useState } from 'react'

export default function BlogList({bloglar}) {
    const {mode}=useTheme();
    const [hata, setHata] = useState(false)
    const history=useHistory();

    const handleDelete = async (id) => {
        console.log(id);
        const ref = doc(db, "bloglar", id);
      
        try {
          await deleteDoc(ref);
          window.location.reload();
        } catch (err) {
          setHata(err.message)
        }
    };

    const handleUpdate = async (id) => {
        history.push(`/update/${id}`)
    };

    if (bloglar.length === 0) {
        return <div className="error">Aranan yazı bulunamadı</div>
    }
    
    return (
        <div className="blog-list">
            {bloglar.map(blog => (
                <div key={blog.id} className={`card ${mode}`}>
                <h3>{blog.baslik}</h3>
                <p>{blog.okunmaSuresi}</p>
                <div>{blog.icerik.substring(0, 100)}...</div>
                <Link to={`/blog/${blog.id}`}>Daha Fazla Oku</Link>
                <img className='update' src={UpdateIcon} onClick={()=>handleUpdate(blog.id)} alt="Yazı güncelle" />
                <img className='delete' onClick={()=>handleDelete(blog.id)}
                src={DeleteIcon} alt="Yazı sil" />
                </div>
            ))}
            
        </div>
        
    )
}
