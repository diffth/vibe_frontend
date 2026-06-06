import styled from 'styled-components'

const FooterWrapper = styled.footer`
  width: 100%;
  background: #111827;
  padding: 60px 32px 40px;
  margin-top: 100px;
`

const FooterInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
`

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 280px;
`

const FooterLogo = styled.span`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 700;
  font-size: 24px;
  color: #f9fafb;
`

const FooterDesc = styled.p`
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
`

const FooterLinks = styled.div`
  display: flex;
  gap: 80px;
`

const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FooterColTitle = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #f9fafb;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const FooterLink = styled.a`
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #f9fafb;
  }
`

const FooterBottom = styled.div`
  max-width: 1440px;
  margin: 40px auto 0;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FooterCopy = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>
        <FooterBrand>
          <FooterLogo>Flawless</FooterLogo>
          <FooterDesc>
            Most trustworthy web3 Fine Jewelry market. Discover, collect, and sell extraordinary NFTs.
          </FooterDesc>
        </FooterBrand>
        <FooterLinks>
          <FooterCol>
            <FooterColTitle>Marketplace</FooterColTitle>
            <FooterLink href="#">Discover</FooterLink>
            <FooterLink href="#">Live Auction</FooterLink>
            <FooterLink href="#">Collections</FooterLink>
            <FooterLink href="#">Upcoming</FooterLink>
          </FooterCol>
          <FooterCol>
            <FooterColTitle>Account</FooterColTitle>
            <FooterLink href="#">Connect Wallet</FooterLink>
            <FooterLink href="#">Profile</FooterLink>
            <FooterLink href="#">My Collection</FooterLink>
            <FooterLink href="#">Settings</FooterLink>
          </FooterCol>
          <FooterCol>
            <FooterColTitle>Company</FooterColTitle>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterCol>
        </FooterLinks>
      </FooterInner>
      <FooterBottom>
        <FooterCopy>© 2024 Flawless. All rights reserved.</FooterCopy>
        <FooterCopy>Privacy Policy · Terms of Service</FooterCopy>
      </FooterBottom>
    </FooterWrapper>
  )
}
