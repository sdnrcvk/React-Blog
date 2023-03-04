import {useParams} from 'react-router-dom';
import {useFetch} from '../../hooks/useFetch';

import './Blog.css'

export default function Blog() {

    const {id}=useParams()
    const url='http://localhost:8000/bloglar/'+id;

    const {hata,yukleniyor,data:blog}=useFetch(url);

    return (
        <div className="blog">
            {hata && <p className="error">{hata}</p>}
            {yukleniyor && <p className="loading">{yukleniyor}</p>}
            {blog && (
              <>
                <h2 className="page-title">{blog.baslik}</h2>
                <p className="time">{blog.okunmaSuresi} okuma süresi</p>
                <ul>
                  {blog.kategoriler.map(kat => <li key={kat}>{kat}</li>)}
                </ul>
                <p className="info">{blog.icerik}</p>
              </>
            )}           
        </div>
    )
}