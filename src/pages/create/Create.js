import { useState, useRef, useEffect  } from 'react'
import './Create.css'
import { useFetch } from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'

export default function Create() {  
  const [baslik, setBaslik] = useState('')
  const [icerik, setIcerik] = useState('')
  const [okunmaSuresi, setOkunmaSuresi] = useState('')
  const [yeniKategori, setYeniKategori] = useState('')
  const [kategoriler, setKategoriler] = useState([])
  const kategoriInput = useRef(null)
	const { postData, data, error } = useFetch('http://localhost:8000/bloglar', 'POST')
  const history = useHistory()
  
  useEffect(() => {
    if (data) {
      history.push('/')
    }
  }, [data, history])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(baslik, icerik, okunmaSuresi)
    console.log(...kategoriler)
    postData({ baslik, kategoriler, icerik, okunmaSuresi: okunmaSuresi + ' dakika' })

  }

  const handleAdd = (e) => {
    e.preventDefault()
    const yKat = yeniKategori.trim()

    if (yKat && !kategoriler.includes(yKat)) {
      setKategoriler(oKat => [...oKat, yeniKategori])
    }
    setYeniKategori('')
    kategoriInput.current.focus()
  }


  return (
    <div className="create">
      <h2 className="page-title">Yeni Yazı</h2>
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
            <button onClick={handleAdd} className="btnAdd btn">ekle</button>
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

        {/* recipe ingredients here */}

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

        <button className="btn">Oluştur</button>
      </form>
    </div>
  )
}