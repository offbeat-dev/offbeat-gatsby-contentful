import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// import * as sections from "../components/sections"
// import Fallback from "../components/fallback"
import SEOHead from "../components/head"
// import {
//   GoogleReCaptchaProvider,
//   GoogleReCaptcha,
// } from "react-google-recaptcha-v3"
import GoogleRecaptcha from "react-google-recaptcha"

export default function Homepage(props) {
  // const { homepage } = props.data
  const recaptchaRef = React.useRef(null)

  const submitForm = async () => {
    if (recaptchaRef.current === null) {
      throw new Error(
        "reCAPTCHA is enabled but reference not found, make sure you render the reCAPTCHA-component somewhere."
      )
    }
    const isRecaptchaInvisible = recaptchaRef.current.props.size === "invisible"
    const recaptchaValue = isRecaptchaInvisible
      ? await recaptchaRef.current.executeAsync()
      : recaptchaRef.current.getValue()

    if (recaptchaValue) {
      console.log("sending", recaptchaValue)
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    submitForm()
  }

  // React.useEffect(() => {
  //   console.log("Token", token)
  // }, [token])

  return (
    <Layout>
      <form onSubmit={handleOnSubmit}>
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="name" placeholder="Your Name" />
        <input type="text" name="message" placeholder="Your Message" />
        <button type="submit">Send</button>
        {process.env.GATSBY_RECAPTCHA_V3_SITE_KEY && (
          <GoogleRecaptcha
            sitekey={process.env.GATSBY_RECAPTCHA_V3_SITE_KEY}
            ref={recaptchaRef}
            size="invisible"
          />
        )}
      </form>
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
