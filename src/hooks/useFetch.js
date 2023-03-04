import { useState, useEffect } from "react"

export const useFetch = (url) => {
    
  const [data, setData] = useState(null)
  const [yukleniyor, setYukleniyor] = useState(false)
  const [hata, setHata] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
        setYukleniyor(true)
      
      try {
        const res = await fetch(url, { signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setYukleniyor(false)
        setData(data)
        setHata(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("veri çekme işlemi iptal edildi")
        } else {
          setYukleniyor(false)
          setHata('veriler çekilemedi')
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }

  }, [url])

  return { data, yukleniyor, hata }
}