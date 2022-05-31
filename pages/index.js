import Head from 'next/head'
import tw from 'tailwind-styled-components/dist/tailwind'
import { Editorspicks, Hero, LatestArticles, Navbar } from '../components'
import { verify, decode } from 'jsonwebtoken'
import {useEffect,useState} from 'react'

const Container = tw.section`
w-[100vw]
h-full
bg-gray-100
overflow-hidden
`

export default function Home({featured}) {
  const [user, setUser] = useState('');
  const [logged, setLogged] = useState(false);
  useEffect(()=>{
    let userJWT = localStorage.getItem('accessToken')
    if(userJWT){
      if(verify(userJWT, 'thisisafakecookie')){
        setUser(decode(userJWT))
        setLogged(true)
      }
    }
  },[])
  return (
    <Container>
      <Navbar signed = {logged} user = {user} page = "home"/>
      <Hero featured = {featured}/>
      {/* <LatestArticles/>
      <Editorspicks/> */}
    </Container>
  )
}

export async function getServerSideProps({req,res}) {
    const blogRes = await fetch(`https://dashboard.heroku.com/blog/38`)
    const blogData = await blogRes.json()
    return{props: {featured: blogData.data}}
}
