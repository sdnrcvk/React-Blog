import {useParams} from 'react-router-dom';
import {useFetch} from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc,getDoc } from 'firebase/firestore';
import './Blog.css'

export default function Blog() {

    const {id}=useParams()
    //const url='http://localhost:8000/bloglar/'+id;
    const {mode}=useTheme();

    //const {hata,yukleniyor,data:blog}=useFetch(url);

    const [blog,setBlog]=useState();
    const [yukleniyor, setYukleniyor] = useState(false)
    const [hata, setHata] = useState(false)

    useEffect(()=>{
      setYukleniyor(true);

      const ref=doc(db,"bloglar",id);

      getDoc(ref).then(doc=>{
        //console.log(doc.data());
        if (doc.exists){
          setYukleniyor(false);
          setBlog(doc.data())
        }else{
          setYukleniyor(false);
          setHata("Veriye erişilemedi")
        }
      })

    },[id])

    return (
        <div className={`blog ${mode}`}>
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