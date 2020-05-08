import styled from 'styled-components'
import CardEntry from '../components/CardEntry'
import CardGrid from '../components/CardGrid'
import btoa from '../utils/btoa'

const fishSVG = color => btoa('<svg width="79" height="46" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clipRule="evenodd" d="M31.5 46C48.897 46 63 33.203 63 20.5S48.897.5 31.5.5s-31 7.297-31 20S14.103 46 31.5 46zM12.43 24.213c3 .48 5.857-1.782 6.38-5.054.525-3.272-1.402-6.808-4.401-7.289-3-.48-5.935 2.276-6.46 5.548-.524 3.272 1.482 6.314 4.482 6.795z" fill="'+ color +'"/><path d="M73 23c0 10.493 10.68 19 3.5 19s-17-8.507-17-19 9.82-17 17-17S73 12.507 73 23z" fill="'+ color +'"/></svg>')

function Card(props) {
  return (
    <CardEntry fallback={fishSVG} />
  )
}

const fishCollection = Array.from(Array(100)).map((item, index) => <Card key={index} />)

function Fish(props) {

  return (
    <CardGrid>
      {fishCollection}
    </CardGrid>
  )
}

export default Fish