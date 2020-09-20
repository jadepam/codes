import QRCode from 'qrcode'
import fetch from 'isomorphic-unfetch'
import {api} from '../config'

  // With promises



const Home=({data})=> {
  return <div>
    <p>微信扫码登入</p>
    <img alt="" src={data}/>
    <style jsx>{`
        p {
          color: blue;
          font-size:24px
        }
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      `}</style>
  </div>
}
Home.getInitialProps = async ({ req }) => {
  const res = await fetch(`${api}/login/ercode`)
  const json = await res.json()
  const surl =await QRCode.toDataURL(json.data)
  return {data: surl}
}

  
export default Home