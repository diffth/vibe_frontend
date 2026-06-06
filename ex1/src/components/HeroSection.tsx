import styled from 'styled-components'

const HeroWrapper = styled.section`
  width: 981px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
`

const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 1.15;
  letter-spacing: -0.3px;
  color: #111827;
  white-space: pre-line;
`

const HeroSubtitle = styled.p`
  font-family: 'Public Sans', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: -0.3px;
  color: #4b5563;
`

const ExploreButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Public Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #f9fafb;
  background: #111827;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background: #1f2937;
  }
`

const ArrowIcon = styled.svg`
  width: 16px;
  height: 16px;
`

const HeroRight = styled.div`
  position: relative;
  width: 380px;
  height: 448px;
  flex-shrink: 0;
`

const FeaturedLabel = styled.span`
  position: absolute;
  top: 0;
  left: 5px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 14px;
  color: #111827;
  z-index: 2;
`

const HeroImageWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 380px;
  height: 380px;
  border-radius: 8px;
  overflow: hidden;
`

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const OverlayCard = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
`

const OverlayLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const AvatarImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`

const Username = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #111827;
`

const Price = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #111827;
`

export default function HeroSection() {
  return (
    <HeroWrapper>
      <HeroLeft>
        <HeroTitle>{`NFT Certified\nJewelry Auction`}</HeroTitle>
        <HeroSubtitle>Most trustworthy web3 Fine Jewalry market.</HeroSubtitle>
        <ExploreButton>
          Explore collection
          <ArrowIcon viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.333 8h9.334M8 3.333 12.667 8 8 12.667"
              stroke="#F9FAFB"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </ArrowIcon>
        </ExploreButton>
      </HeroLeft>

      <HeroRight>
        <FeaturedLabel>Featured Collection</FeaturedLabel>
        <HeroImageWrapper>
          <HeroImage src="/images/hero-jewelry.png" alt="Featured jewelry NFT" />
        </HeroImageWrapper>
        <OverlayCard>
          <OverlayLeft>
            <AvatarImg src="/images/hero-avatar.png" alt="user avatar" />
            <Username>@username1234</Username>
          </OverlayLeft>
          <Price>12.394 ETH</Price>
        </OverlayCard>
      </HeroRight>
    </HeroWrapper>
  )
}
