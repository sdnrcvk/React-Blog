import { Link } from 'react-router-dom'
import './BlogList.css'

export default function BlogList({bloglar}) {
    return (
        <div className="blog-list">
            {bloglar.map(blog => (
                <div key={blog.id} className="card">
                <h3>{blog.baslik}</h3>
                <p>{blog.okunmaSuresi}</p>
                <div>{blog.icerik.substring(0, 100)}...</div>
                <Link to={`/blog/${blog.id}`}>Daha Fazla Oku</Link>
                </div>
            ))}
        </div>
    )
}
