import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {connect} from './store/blockchain/blockchainActions'
import {fetchData} from './store/data/dataActions'
import * as S from './styles/globalStyles'

import {Lip} from './view/components'
import _color from './assets/images/bg/_color.png'

function App() {
  const dispatch = useDispatch()
  const blockchain = useSelector(state => state.blockchain)
  const data = useSelector(state => state.data)

  useEffect(() => {
    if (blockchain.account && blockchain.lipToken) {
      dispatch(fetchData(blockchain.account))
    }
  }, [dispatch, blockchain.account, blockchain.lipToken])

  const mintRandomNFT = (account, name) => {
    blockchain.lipToken.methods
      .createRandomLip(name)
      .send({
        from: account,
        // 100000000000000 = 0.0001 ether
        value: 10000000000000000,
      })
      .once('Error', err => console.log(err))
      .then(receipt => {
        console.log(receipt)
        dispatch(fetchData(account))
      })
  }

  const levelUpLip = id => {
    blockchain.lipToken.methods
      .levelUp(id)
      .send({
        from: blockchain.account,
      })
      .once('Error', err => console.log(err))
      .then(receipt => {
        console.log(receipt)
        dispatch(fetchData(blockchain.account))
      })
  }

  return (
    <S.Screen image={_color}>
      {!blockchain.account && !blockchain.lipToken ? (
        <S.Container flex={1} ai="center" jc="center">
          <S.TextTitle>Connect to the Game</S.TextTitle>
          <S.SpacerSmall />
          <button onClick={() => dispatch(connect())}>Connect</button>
          <h1>{blockchain.account}</h1>
          <S.SpacerSmall />
          {blockchain.errorMsg && (
            <S.TextTitle>blockchain.errorMsg</S.TextTitle>
          )}
        </S.Container>
      ) : (
        <S.Container ai="center" style={{padding: 24}}>
          <S.TextTitle>Welcome to the Game</S.TextTitle>
          <S.SpacerSmall />
          <S.TextDescription>Account: {blockchain.account}</S.TextDescription>
          <S.SpacerSmall />
          <button onClick={() => mintRandomNFT(blockchain.account, 'Daniel')}>
            Create Random NFT
          </button>

          <S.SpacerMedium />
          <S.Container fd="row" jc="center" style={{flexWrap: 'wrap'}}>
            {data.allLips.map(item => (
              <S.Container style={{padding: '15px'}} key={JSON.stringify(item)}>
                <Lip lip={item} />
                <S.SpacerXSmall />
                <S.Container>
                  <S.TextDescription>ID: {item.id}</S.TextDescription>
                  <S.TextDescription>DNA: {item.dna}</S.TextDescription>
                  <S.TextDescription>LEVEL: {item.level}</S.TextDescription>
                  <S.TextDescription>NAME: {item.name}</S.TextDescription>
                  <S.TextDescription>RARITY: {item.rarity}</S.TextDescription>
                </S.Container>
                <button onClick={() => levelUpLip(item.id)}>Level Up</button>
              </S.Container>
            ))}
          </S.Container>
        </S.Container>
      )}
    </S.Screen>
  )
}

export default App
