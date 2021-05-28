import '../styles/globals.css'
import firebase, { FirebaseContext } from '../firebase'
import useAuth from '../firebase/useAuth'
import 'swiper/swiper.scss'
import 'swiper/swiper-bundle.css'
import 'swiper/components/autoplay/package.json'
import 'swiper/components/navigation/package.json'
import 'swiper/components/pagination/package.json'

function MyApp({ Component, pageProps }) {
  const user = useAuth()
  return (
    <FirebaseContext.Provider value={{ firebase, user }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
