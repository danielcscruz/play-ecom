import * as Yup from 'yup'
import InputMask from 'react-input-mask'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'

import Button from '../../components/Button'
import Card from '../../components/Card'
import barCode from '../../assets/images/boleto.png'
import card from '../../assets/images/cartao.png'

import { usePurchaseMutation } from '../../services/api'
import { RootReducer } from '../../store'
import { clear } from '../../store/reducers/cart'

import * as S from './styles'
import { Navigate } from 'react-router-dom'
import { getTotalPrice, parseToBrl } from '../../utils'

type Installment = {
  quantity: number
  amount: number
  formattedAmount: string
}

const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const [installments, setInstallments] = useState<Installment[]>([])
  const dispatch = useDispatch()

  const totalPrice = getTotalPrice(items)

  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors
    const hasError = isTouched && isInvalid

    return hasError
  }

  useEffect(() => {
    const calculateInstallments = () => {
      const installmentsArray: Installment[] = []
      for (let i = 1; i <= 6; i++) {
        installmentsArray.push({
          quantity: i,
          amount: totalPrice / i,
          formattedAmount: parseToBrl(totalPrice / i)
        })
      }
      return installmentsArray
    }
    if (totalPrice > 0) {
      setInstallments(calculateInstallments())
    }
  }, [totalPrice])

  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      cpf: '',
      deliveryEmail: '',
      confirmDeliveryEmail: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expireMonth: '',
      expireYear: '',
      cardCode: '',
      installments: 1
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'O nome precisa te pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      email: Yup.string()
        .email('e-mail inválido')
        .required('O campo é obrigatório'),
      cpf: Yup.string()
        .min(14, 'e-mail inválido')
        .min(14, 'O campo precisa ter 14 carcteres')
        .max(14, 'O campo precisa ter 14 carcteres')
        .required('O campo é obrigatório'),
      deliveryEmail: Yup.string()
        .email('e-mail inválido')
        .required('O campo é obrigatório'),
      confirmDeliveryEmail: Yup.string()
        .oneOf([Yup.ref('deliveryEmail')], 'Os e-mails são diferentes')
        .required('O campo é obrigatório'),

      cardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),

      cpfCardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardDisplayName: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expireMonth: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expireYear: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardCode: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      installments: Yup.number().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      )
    }),
    onSubmit: (values) => {
      purchase({
        billing: {
          document: values.cpf,
          email: values.email,
          name: values.fullName
        },
        delivery: {
          email: values.deliveryEmail
        },
        payment: {
          installments: values.installments,
          card: {
            active: payWithCard,
            code: Number(values.cardCode),
            name: values.cardDisplayName,
            number: values.cardNumber,
            owner: {
              document: values.cpfCardOwner,
              name: values.cardOwner
            },
            expires: {
              month: Number(values.expireMonth),
              year: Number(values.expireYear)
            }
          }
        },
        products: items.map((item) => ({
          id: item.id,
          price: item.prices.current as number
        }))
      })
    }
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(clear())
    }
  }, [isSuccess, dispatch])

  if (items.length === 0 && isSuccess === false) {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      {isSuccess && data ? (
        <Card title="Muito obrigado">
          <>
            <p>
              Abaixo estão os detalhes da sua compra: Número do pedido:
              {data.orderId}
              <br />
              Forma de pagamento:{' '}
              {payWithCard ? 'Cartão de Crédito' : 'Boleto Bancário'} Boleto
              Bancário
              <br />
            </p>
            <p className="margin-top">
              Caso tenha optado pelo pagamento via boleto bancário, lembre-se de
              que a confirmação pode levar até 3 dias úteis. <br /> Após a
              aprovação do pagamento, enviaremos um e-mail contendo o código de
              ativação do jogo
              <br />
            </p>
            <p className="margin-top">
              Se você optou pelo pagamento com cartão de crédito, a liberação do
              código de ativação ocorrerá após a aprovação da transação pela
              operadora do cartão. <br />
              Você receberá o código no e-mail cadastrado em nossa loja
              <br />
            </p>
            <p className="margin-top">
              Pedimos que verifique sua caixa de entrada e a pasta de spam para
              garantir que receba nossa comunicação. <br />
              Caso tenha alguma dúvida ou necessite de mais informações, por
              favor, entre em contato conosco através dos nossos canais de
              atendimento ao cliente.
              <br />
            </p>
            <p className="margin-top">
              Agradecemos por escolher a EPLAY e esperamos que desfrute do seu
              jogo!
              <br />
            </p>
          </>
        </Card>
      ) : (
        <form onSubmit={form.handleSubmit}>
          <Card title="Dados de Cobrança">
            <>
              <S.Row>
                <S.InputGroup>
                  <label htmlFor="fullName">Nome Completo</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={form.values.fullName}
                    onChange={form.handleChange}
                    className={checkInputHasError('fullName') ? 'error' : ''}
                  ></input>
                </S.InputGroup>
                <S.InputGroup>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    className={checkInputHasError('email') ? 'error' : ''}
                  ></input>
                </S.InputGroup>
                <S.InputGroup>
                  <label htmlFor="cpf">CPF</label>
                  <InputMask
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={form.values.cpf}
                    onChange={form.handleChange}
                    className={checkInputHasError('cpf') ? 'error' : ''}
                    mask="999.999.999-99"
                  ></InputMask>
                </S.InputGroup>
              </S.Row>
              <h3 className="margin-top">
                Dados de entrega - conteúdo digital
              </h3>
              <S.Row>
                <S.InputGroup>
                  <label htmlFor="deliveryEmail">Email</label>
                  <input
                    type="text"
                    id="deliveryEmail"
                    name="deliveryEmail"
                    value={form.values.deliveryEmail}
                    onChange={form.handleChange}
                    className={
                      checkInputHasError('deliveryEmail') ? 'error' : ''
                    }
                  ></input>
                  <small></small>
                </S.InputGroup>
                <S.InputGroup>
                  <label htmlFor="confirmDeliveryEmail">Confirme o Email</label>
                  <input
                    type="text"
                    id="confirmDeliveryEmail"
                    name="confirmDeliveryEmail"
                    value={form.values.confirmDeliveryEmail}
                    onChange={form.handleChange}
                    className={
                      checkInputHasError('confirmDeliveryEmail') ? 'error' : ''
                    }
                  ></input>
                </S.InputGroup>
              </S.Row>
            </>
          </Card>
          <Card title="Pagamento">
            <>
              <S.TabButton
                isActive={!payWithCard}
                onClick={() => setPayWithCard(false)}
                type="button"
              >
                <img src={barCode} alt="Boleto" />
                Boleto Bancário
              </S.TabButton>
              <S.TabButton
                isActive={payWithCard}
                onClick={() => setPayWithCard(true)}
                type="button"
              >
                <img src={card} alt="Cartão de Crédito" />
                Cartão de Crédito
              </S.TabButton>
              <div className="margin-top">
                {payWithCard ? (
                  <>
                    <S.Row>
                      <S.InputGroup>
                        <label htmlFor="cardOwner">
                          Nome do titular do cartão
                        </label>
                        <input
                          type="text"
                          id="cardOwner"
                          name="cardOwner"
                          value={form.values.cardOwner}
                          onChange={form.handleChange}
                          className={
                            checkInputHasError('cardOwner') ? 'error' : ''
                          }
                        ></input>
                      </S.InputGroup>
                      <S.InputGroup>
                        <label htmlFor="cpfCardOwner">
                          CPF do titular do cartão
                        </label>
                        <InputMask
                          type="text"
                          id="cpfCardOwner"
                          name="cpfCardOwner"
                          value={form.values.cpfCardOwner}
                          onChange={form.handleChange}
                          className={
                            checkInputHasError('cpfCardOwner') ? 'error' : ''
                          }
                          mask="999.999.999-99"
                        ></InputMask>
                      </S.InputGroup>
                    </S.Row>
                    <S.Row marginTop="24px">
                      <S.InputGroup>
                        <label htmlFor="cardDisplayName">Nome no cartão</label>
                        <input
                          type="text"
                          id="cardDisplayName"
                          name="cardDisplayName"
                          value={form.values.cardDisplayName}
                          onChange={form.handleChange}
                          className={
                            checkInputHasError('cardDisplayName') ? 'error' : ''
                          }
                        ></input>
                      </S.InputGroup>
                      <S.InputGroup>
                        <label htmlFor="cardNumber">Número do cartão</label>
                        <InputMask
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={form.values.cardNumber}
                          onChange={form.handleChange}
                          className={
                            checkInputHasError('cardNumber') ? 'error' : ''
                          }
                          mask="9999 9999 9999 9999"
                        ></InputMask>
                      </S.InputGroup>
                      <S.InputGroup maxWidth="123px">
                        <label htmlFor="expireMonth">Mês do vencimento</label>
                        <InputMask
                          type="text"
                          id="expireMonth"
                          name="expireMonth"
                          value={form.values.expireMonth}
                          onChange={form.handleChange}
                          className={
                            checkInputHasError('expireMonth') ? 'error' : ''
                          }
                          mask="99"
                        ></InputMask>
                      </S.InputGroup>
                      <S.InputGroup maxWidth="123px">
                        <label htmlFor="expireYear">Ano do vencimento</label>
                        <InputMask
                          type="text"
                          id="expireYear"
                          name="expireYear"
                          value={form.values.expireYear}
                          onChange={form.handleChange}
                          className={
                            checkInputHasError('expireYear') ? 'error' : ''
                          }
                          mask="99"
                        ></InputMask>
                      </S.InputGroup>
                      <S.InputGroup maxWidth="48px">
                        <label htmlFor="cardCode">CVV</label>
                        <InputMask
                          type="text"
                          id="cardCode"
                          name="cardCode"
                          value={form.values.cardCode}
                          onChange={form.handleChange}
                          className={
                            checkInputHasError('cardCode') ? 'error' : ''
                          }
                          mask="999"
                        ></InputMask>
                      </S.InputGroup>
                    </S.Row>
                    <S.Row marginTop="24px">
                      <S.InputGroup maxWidth="150px">
                        <label htmlFor="installments">Parcelamento</label>
                        <select
                          name="installments"
                          value={form.values.installments}
                          onChange={form.handleChange}
                          id="installments"
                          className={
                            checkInputHasError('installments') ? 'error' : ''
                          }
                        >
                          {installments.map((installment) => (
                            <option
                              value={installment.quantity}
                              key={installment.quantity}
                            >
                              {installment.quantity} de{' '}
                              {installment.formattedAmount}{' '}
                            </option>
                          ))}
                        </select>
                      </S.InputGroup>
                    </S.Row>
                  </>
                ) : (
                  <>
                    <p>
                      Ao optar por essa forma de pagamento, é importante lembrar
                      que a confirmação pode levar até 3 dias úteis, devido aos
                      prazos estabelecidos pelas instituições financeiras.
                      Portanto, a liberação do código de ativação do jogo
                      adquirido ocorrerá somente após a aprovação do pagamento
                      do boleto.
                    </p>
                  </>
                )}
              </div>
            </>
          </Card>
          <Button
            type="submit"
            title="Clique aqui para concluir a compra"
            disabled={isLoading}
          >
            {isLoading ? 'Finalizando copra...' : 'Finalizar Compra'}
          </Button>
        </form>
      )}
    </div>
  )
}

export default Checkout
