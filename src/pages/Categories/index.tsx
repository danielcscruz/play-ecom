import ProductsList from '../../components/ProductsList'

import resident from '../../assets/images/resident.png'
import diablo from '../../assets/images/diablo.png'
import zelda from '../../assets/images/zelda.png'
import starwars from '../../assets/images/star_wars.png'
import Game from '../../models/Games'

const promocoes: Game[] = [
  {
    id: 1,
    category: 'Ação',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, consectetur tenetur vero soluta expedita aliquid aspernatur dolore libero cupiditate eos esse quas asperiores iure animi obcaecati quam distinctio? Officia, ducimus.',
    title: 'Resident Evil 4',
    system: 'Windows',
    infos: ['10%', 'R$150,00'],
    image: resident
  },
  {
    id: 2,
    category: 'Aventura',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, consectetur tenetur vero soluta expedita aliquid aspernatur dolore libero cupiditate eos esse quas asperiores iure animi obcaecati quam distinctio? Officia, ducimus.',
    title: 'Diablo',
    system: 'Windows',
    infos: ['5%', 'R$50,00'],
    image: diablo
  },
  {
    id: 3,
    category: 'Ação',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, consectetur tenetur vero soluta expedita aliquid aspernatur dolore libero cupiditate eos esse quas asperiores iure animi obcaecati quam distinctio? Officia, ducimus.',
    title: 'Star Wars',
    system: 'Linux',
    infos: ['10%', 'R$1.150,00'],
    image: starwars
  },
  {
    id: 4,
    category: 'Aventura',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, consectetur tenetur vero soluta expedita aliquid aspernatur dolore libero cupiditate eos esse quas asperiores iure animi obcaecati quam distinctio? Officia, ducimus.',
    title: 'Zelda',
    system: 'MacOS',
    infos: ['20%', 'R$250,00'],
    image: zelda
  }
]

const em_breve: Game[] = [
  {
    id: 5,
    category: 'RPG',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut sunt temporibus id nam enim aspernatur facilis, molestias commodi possimus est laudantium repudiandae perferendis corrupti, magni nisi, quam excepturi ad nulla?',
    title: 'Diablo 4',
    system: 'Windows',
    infos: ['17/05'],
    image: diablo
  },
  {
    id: 6,
    category: 'RPG',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut sunt temporibus id nam enim aspernatur facilis, molestias commodi possimus est laudantium repudiandae perferendis corrupti, magni nisi, quam excepturi ad nulla?',
    title: 'Diablo 4',
    system: 'Windows',
    infos: ['17/05'],
    image: diablo
  },
  {
    id: 7,
    category: 'RPG',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut sunt temporibus id nam enim aspernatur facilis, molestias commodi possimus est laudantium repudiandae perferendis corrupti, magni nisi, quam excepturi ad nulla?',
    title: 'Diablo 4',
    system: 'Windows',
    infos: ['17/05'],
    image: diablo
  },
  {
    id: 8,
    category: 'RPG',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut sunt temporibus id nam enim aspernatur facilis, molestias commodi possimus est laudantium repudiandae perferendis corrupti, magni nisi, quam excepturi ad nulla?',
    title: 'Diablo 4',
    system: 'Windows',
    infos: ['17/05'],
    image: diablo
  }
]

const Home = () => (
  <>
    <ProductsList games={promocoes} title="RPG" background="gray" />
    <ProductsList games={em_breve} title="Ação" background="black" />
    <ProductsList games={promocoes} title="Aventura" background="gray" />
    <ProductsList games={em_breve} title="FPS" background="black" />
  </>
)

export default Home
