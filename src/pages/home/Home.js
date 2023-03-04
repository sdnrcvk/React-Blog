import {useFetch} from '../../hooks/useFetch';
import './Home.css'

export default function Home() {

    const { data, yukleniyor, hata } = useFetch('http://localhost:8000/bloglar')

    console.log(data);
    return (
        <div className="home">
            {hata && <p className="error">{hata}</p>}
            {yukleniyor && <p className="loading">Loading...</p>}
			
            {data && data.map(blog => (
				    <h2 key={blog.id}>{blog.baslik}</h2>
            ))}
			
      </div>
    )
}