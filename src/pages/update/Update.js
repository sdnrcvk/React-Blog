import { useState, useRef, useEffect } from 'react'
import './Update.css'
import { useHistory, useParams } from 'react-router-dom'
import { db } from '../../firebase/config'
import { doc, getDoc,updateDoc } from 'firebase/firestore'

export default function Update() {  
  const {id}=useParams()
  const history=useHistory()
  const [baslik, setBaslik] = useState('');
  const [icerik, setIcerik] = useState('');
  const [okunmaSuresi, setOkunmaSuresi] = useState('');
  const [yeniKategori, setYeniKategori] = useState('');
  const [kategoriler, setKategoriler] = useState([]);
  const [data, setData] = useState(null); // Initialize data state to null
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(false);
  const kategoriInput = useRef(null)

  useEffect(() => {
    if (kategoriInput.current) {
      kategoriInput.current.value = kategoriler.join(', ')
    }
  }, [kategoriler])

  useEffect(() => {
    const ref = doc(db, 'bloglar', id);
    getDoc(ref)
      .then((doc) => {
        if (doc.exists()) {
          const { baslik, icerik, okunmaSuresi, kategoriler } = doc.data();
          setBaslik(baslik);
          setIcerik(icerik);
          setOkunmaSuresi(okunmaSuresi);
          setKategoriler(kategoriler);
          setData(doc.data()); // Set the data state to the received data
        } else {
          console.log('Yazı bulunamadı!');
        }
      })
      .catch((err) => {
        setHata(err.message);
      });
  }, [id]);

  const handleKategoriEkle = (e) => {
    e.preventDefault();
    const yeniKategoriAdi = kategoriInput.current.value;
    if (yeniKategoriAdi) {
      const yeniKategoriler = kategoriInput.current.value.split(',').map((kategori) => kategori.trim())
      setKategoriler(yeniKategoriler);
      setYeniKategori('');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setYukleniyor(true);
    const ref = doc(db, 'bloglar', id);
    const newData = {
      baslik,
      icerik,
      okunmaSuresi,
      kategoriler,
    };
    setHata(false);
    setYukleniyor(true);
    setBaslik('');
    setIcerik('');
    setOkunmaSuresi('');
    setYeniKategori('');
    setKategoriler([]);
    updateDoc(ref, newData)
      .then(() => {
        console.log('Yazı başarıyla güncellendi!');
        history.push('/');
      })
      .catch((err) => {
        setHata(err.message);
      })
      .finally(() => {
        setYukleniyor(false);
      });
  };
  
  return (
    <div className="create">
      <h2 className="page-title">Yazıyı Düzenle</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Yazı Kategorileri:</span>
          <div className="categories">
          <input 
            type="text" 
            onChange={(e) => setYeniKategori(e.target.value)}
            value={yeniKategori}
            ref={kategoriInput}
            />
            <button className="btnAdd btn" onClick={handleKategoriEkle} >Değiştir</button>
          </div>
        </label>
        <p>Kategoriler:<span className="list"> {kategoriler.map(i => <em key={i}>{i}, </em>)}</span></p>

        <label>
          <span>Yazı Başlık:</span>
          <input 
            type="text" 
            onChange={(e) => setBaslik(e.target.value)}
            value={baslik}
            required
          />
        </label>

        <label>
          <span>Yazı İçerik:</span>
          <textarea 
            onChange={(e) => setIcerik(e.target.value)}
            value={icerik}
            rows={5}
            required
          />
        </label>

        <label>
          <span>Okunma Süresi:</span>
          <input 
            type="number" 
            onChange={(e) => setOkunmaSuresi(e.target.value)}
            value={okunmaSuresi}
            required 
          />
        </label>

        <button className="btn">Güncelle</button>
      </form>
    </div>
  )
}