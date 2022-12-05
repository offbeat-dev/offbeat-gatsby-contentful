import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// import * as sections from "../components/sections"
// import Fallback from "../components/fallback"
import SEOHead from "../components/head"
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3"

export default function Homepage(props) {
  // const { homepage } = props.data
  const [token, setToken] = React.useState()

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log("Submitted", e, token)
  }

  // React.useEffect(() => {
  //   console.log("Token", token)
  // }, [token])

  return (
    <Layout>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.GATSBY_RECAPTCHA_V3_SITE_KEY}
      >
        <form onSubmit={handleOnSubmit}>
          <input type="email" name="email" placeholder="Your Email" />
          <input type="text" name="name" placeholder="Your Name" />
          <input type="text" name="message" placeholder="Your Message" />
          <button type="submit">Send</button>
          <GoogleReCaptcha
            onVerify={(token) => {
              setToken(token)
            }}
          />
        </form>
      </GoogleReCaptchaProvider>
      {/* {homepage.blocks.map((block) => {
        const { id, blocktype, ...componentProps } = block
        const Component = sections[blocktype] || Fallback
        return <Component key={id} {...componentProps} />
      })} */}
    </Layout>
  )
}
export const Head = (props) => {
  const { homepage } = props.data
  return <SEOHead {...homepage} />
}
export const query = graphql`
  {
    homepage {
      id
      title
      description
      image {
        id
        url
      }
      blocks: content {
        id
        blocktype
        ...HomepageHeroContent
        ...HomepageFeatureListContent
        ...HomepageCtaContent
        ...HomepageLogoListContent
        ...HomepageTestimonialListContent
        ...HomepageBenefitListContent
        ...HomepageStatListContent
        ...HomepageProductListContent
      }
    }
  }
`
