import React, {useEffect, useState, useRef} from 'react'
import './App.css'
import {useDispatch, useSelector} from 'react-redux'
import {connect} from './redux/blockchain/blockchainActions'
import {fetchData} from './redux/data/dataActions'
import * as s from './styles/globalStyles'
import styled from 'styled-components'
import {create} from 'ipfs-http-client'
import SignatureCanvas from 'react-signature-canvas'

// const ipfsClient = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
const ipfsClient = create('https://ipfs.infura.io:5001/api/v0')

export const StyledButton = styled.button`
  padding: 8px;
`

function App() {
  const dispatch = useDispatch()
  const blockchain = useSelector(state => state.blockchain)
  const data = useSelector(state => state.data)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [nfts, setNfts] = useState([])
  const canvasRef = useRef()

  const ipfsBaseURL = 'https://ipfs.infura.io/ipfs/'
  const name = 'NFT name'
  const description = 'IPFS minted nft woooooo.'

  const mint = URI => {
    blockchain.smartContract.methods
      .mint(blockchain.account, URI)
      .send({from: blockchain.account})
      .once('error', error => {
        console.log(error)
        setLoading(false)
        setStatus('Error minting NFT')
      })
      .then(receipt => {
        console.log(receipt)
        setLoading(false)
        setStatus('Minted!')
      })
  }
  const createMetaDataAndMint = async (name, description, imageBuffer) => {
    setLoading(true)
    setStatus('Uploading to IPFS')

    try {
      const addedImage = await ipfsClient.add(imageBuffer)
      console.log({addedImage})
      // cid: CID {code: 112, version: 0, multihash: Digest, bytes: Uint8Array(34), byteOffset: 0, …}
      // path: "QmXrCnmDf95A9HpGzmPJYuhYPtsXLC6XnuPozBLT1SLCqA"
      // size: 6287

      // We can reach out to IPFS and get the image by below URL
      console.log(ipfsBaseURL + addedImage.path)

      const metaData = {
        name,
        description,
        image: ipfsBaseURL + addedImage.path,
      }

      const addedMetaData = await ipfsClient.add(JSON.stringify(metaData))
      console.log(ipfsBaseURL + addedMetaData.path)
      // "https://ipfs.infura.io/ipfs/QmYpndfPszWNgVkNfuQtHH4uyNdvm13fuv92shm5wCZewq"

      mint(ipfsBaseURL + addedMetaData.path)
      setLoading(false)
      clearCanvas()
    } catch (err) {
      console.log(err)
      setLoading(false)
      setStatus('Error uploading to IPFS')
    }
  }

  const startMintingProcess = (name, description) => {
    createMetaDataAndMint(name, description, getImageBuffer())
  }

  const getImageBuffer = () => {
    const imageData = canvasRef.current
    let dataUrl = imageData.toDataURL('image/png')
    const buffer = Buffer(dataUrl.split(',')[1], 'base64')
    // console.log(buffer) // Uint8Array(8635) [137, 80, 78, 71, …]
    return buffer
  }

  const fetchMetaDataForNFTs = async () => {
    setNfts([])
    data.allTokens.forEach(nft => {
      fetch(nft.uri)
        .then(res => res.json())
        .then(data => {
          setNfts(prev => [...prev, {id: nft.id, data}])
        })
        .catch(err => {
          console.log(err)
        })
    })
  }

  const clearCanvas = () => {
    canvasRef.current.clear()
  }

  useEffect(() => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account))
    }
  }, [blockchain.smartContract, dispatch])

  useEffect(() => {
    fetchMetaDataForNFTs()
  }, [data.allTokens])

  return (
    <s.Screen>
      {blockchain.account === '' || blockchain.smartContract === null ? (
        <s.Container flex={1} ai={'center'} jc={'center'}>
          <s.TextTitle>Connect to the Blockchain</s.TextTitle>
          <s.SpacerSmall />
          <StyledButton
            onClick={e => {
              e.preventDefault()
              dispatch(connect())
            }}
          >
            CONNECT
          </StyledButton>
          <s.SpacerSmall />
          {blockchain.errorMsg !== '' ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <s.Container flex={1} ai={'center'} style={{padding: 24}}>
          <s.TextTitle style={{textAlign: 'center'}}>
            Welcome mint yout signature
          </s.TextTitle>
          {loading && (
            <>
              <s.SpacerSmall />
              <s.TextDescription style={{textAlign: 'center'}}>
                Loading...
              </s.TextDescription>
            </>
          )}
          {status !== '' && (
            <>
              <s.SpacerSmall />
              <s.TextDescription style={{textAlign: 'center'}}>
                {status}
              </s.TextDescription>
            </>
          )}
          <s.SpacerLarge />
          <s.Container fd="row" jc="center" style={{backgroundColor: 'pink'}}>
            <StyledButton
              onClick={e => {
                e.preventDefault()
                startMintingProcess()
              }}
            >
              MINT
            </StyledButton>
            <s.SpacerXSmall />
            <StyledButton
              onClick={e => {
                e.preventDefault()
                clearCanvas()
              }}
            >
              CLEAR
            </StyledButton>
          </s.Container>
          <s.SpacerXSmall />
          <SignatureCanvas
            ref={canvasRef}
            canvasProps={{width: 350, height: 350}}
            backgroundColor="#3271bf"
          />
          <s.SpacerLarge />
          {data.loading && (
            <>
              <s.SpacerSmall />
              <s.TextDescription style={{textAlign: 'center'}}>
                Loading...
              </s.TextDescription>
            </>
          )}
          {nfts.map(nft => (
            <s.Container key={nft.id} style={{padding: 16}}>
              <s.TextTitle>{nft.data.name}</s.TextTitle>
              <img src={nft.data.image} alt={nft.data.name} width={150} />
            </s.Container>
          ))}
        </s.Container>
      )}
    </s.Screen>
  )
}

export default App
