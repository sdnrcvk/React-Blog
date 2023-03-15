import BlogList from '../../components/BlogList';
import './Home.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useEffect, useState } from 'react';

export default function Home() {

    // const { data, yukleniyor, hata } = useFetch('http://localhost:8000/bloglar')

    // console.log(data);

    const [data, setData] = useState(null)
    const [yukleniyor, setYukleniyor] = useState(false)
    const [hata, setHata] = useState(false)

    useEffect(()=>{
        setYukleniyor(true);
        const ref=collection(db,"bloglar");
        getDocs(ref).then((snap)=>{
            //console.log(snap);
            if(snap.empty){
                setHata("Henüz yazınız yok")
                setYukleniyor(false)
            }else{
                let sonuclar=[];

                snap.forEach(doc=>{
                    sonuclar.push({id:doc.id,...doc.data()})
                })

                setData(sonuclar)
                setYukleniyor(false)
            }
        }).catch(err=>{
            setHata(err.message)
            setYukleniyor(false)
        })
    },[])

    return (
        <div className="home">
            {hata && <p className="error">{hata}</p>}
            {yukleniyor && <p className="loading">Loading...</p>}
			
            {data && <BlogList bloglar={data}/>}
			
      </div>
    )
}