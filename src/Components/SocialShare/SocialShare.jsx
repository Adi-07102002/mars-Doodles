import React from 'react'
import{FacebookShareButton,WhatsappShareButton} from 'react-share'
import {FacebookIcon,WhatsappIcon} from 'react-share'
import {Container,Segment} from "semantic-ui-react"
function SocialShare(){
  return (
    <div>
      <Container>
        <Segment>
            <FacebookShareButton url="www.google.com" 
            quote={"hello"}
            hashtag="#react">
                <FacebookIcon logoFillColor="white" round={true}/>
            </FacebookShareButton>

            <WhatsappShareButton title="shaingcontent"
            url="www.yahoo.com">
                <WhatsappIcon logoFillColor="white" round={true}/>
            </WhatsappShareButton>
        </Segment>
      </Container>
    </div>
  )
}

export default SocialShare
