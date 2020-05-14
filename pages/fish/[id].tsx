import { useRouter } from 'next/router'

const Insect = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Post: {id}</p>
}

export default Insect
