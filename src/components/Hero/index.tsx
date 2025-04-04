import { useDispatch } from 'react-redux'

import Button from '../Button'
import Tag from '../Tag'

import { parseToBrl } from '../../utils'
import { add, open } from '../../store/reducers/cart'

import * as S from './styles'

type Props = {
  game: Game
}
const Hero = ({ game }: Props) => {
  const dispatch = useDispatch()

  const addCart = () => {
    dispatch(add(game))
    dispatch(open())
  }

  return (
    <S.Banner style={{ backgroundImage: `url(${game.media.cover})` }}>
      <div className="container">
        <div>
          <Tag>{game.details.category}</Tag>
          <Tag>{game.details.system}</Tag>
        </div>
        <S.Infos>
          <h2>{game.name}</h2>
          <p>
            {game.prices.discount && <span>{parseToBrl(game.prices.old)}</span>}
            {game.prices.current && <>por {parseToBrl(game.prices.current)}</>}
          </p>
          {game.prices.current && (
            <Button
              type="button"
              title="Click aqui para adicionar este jogo ao carrinho"
              variant="primary"
              onClick={addCart}
            >
              Adicionar ao carrinho
            </Button>
          )}
        </S.Infos>
      </div>
    </S.Banner>
  )
}

export default Hero
