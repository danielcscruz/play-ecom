import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashLink } from 'react-router-hash-link'

import logo from '../../assets/images/logo.svg'
import carrinho from '../../assets/images/cart.svg'

import { Link } from 'react-router-dom'
import { open } from '../../store/reducers/cart'
import { RootReducer } from '../../store'

import * as S from './styles'

const Header = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openCart = () => {
    dispatch(open())
  }

  return (
    <S.HeaderBar>
      <S.HeaderRow>
        <div>
          <S.Hamburguer onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span />
            <span />
            <span />
          </S.Hamburguer>
          <Link to="/">
            <h1>
              <img src={logo} alt="efood" />
            </h1>
          </Link>
          <nav>
            <S.Links>
              <S.LinkItem>
                <Link
                  title="Clique aqui para acessar a página de Categorias"
                  to="/categories"
                >
                  Categorias
                </Link>
              </S.LinkItem>
              <S.LinkItem>
                <HashLink
                  title="Clique aqui para acessar a sessão de Em Breve"
                  to="#coming-soon"
                >
                  Novidades
                </HashLink>
              </S.LinkItem>
              <S.LinkItem>
                <HashLink
                  title="Clique aqui para acessar a sessão de Promoções"
                  to="#on-sale"
                >
                  Promoções
                </HashLink>
              </S.LinkItem>
            </S.Links>
          </nav>
        </div>

        <S.CartButton role="button" onClick={openCart}>
          {items.length} <span> - produto(s)</span>
          <img src={carrinho} alt="carrinho" />
        </S.CartButton>
      </S.HeaderRow>
      <S.NavMobile className={isMenuOpen ? 'is-open' : ''}>
        <S.Links>
          <S.LinkItem>
            <Link
              title="Clique aqui para acessar a página de Categorias"
              to="/categories"
              onClick={() => setIsMenuOpen(false)}
            >
              Categorias
            </Link>
          </S.LinkItem>
          <S.LinkItem>
            <HashLink
              title="Clique aqui para acessar a sessão de Em Breve"
              to="#coming-soon"
              onClick={() => setIsMenuOpen(false)}
            >
              Novidades
            </HashLink>
          </S.LinkItem>
          <S.LinkItem>
            <HashLink
              title="Clique aqui para acessar a sessão de Promoções"
              to="#on-sale"
              onClick={() => setIsMenuOpen(false)}
            >
              Promoções
            </HashLink>
          </S.LinkItem>
        </S.Links>
      </S.NavMobile>
    </S.HeaderBar>
  )
}

export default Header
