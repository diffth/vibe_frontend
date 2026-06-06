import styled from 'styled-components'

const BannerWrapper = styled.section`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 226px;
  background: #000000;
  position: relative;
  overflow: hidden;
`

const BannerImage = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  width: 580px;
  height: 226px;
  object-fit: cover;
`

const FadeLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 280px;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  z-index: 1;
`

const FadeRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 400px;
  height: 100%;
  background: linear-gradient(-90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  z-index: 1;
`

const BannerContent = styled.div`
  position: absolute;
  left: 230px;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  gap: 8px;
`

const BannerTitle = styled.h2`
  font-family: 'Public Sans', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  color: #f9fafb;
  margin-bottom: 4px;
`

const StatsRow = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 8px;
`

const StatCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const StatLabel = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
`

const StatValue = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;

  span {
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
  }
`

const ViewDropButton = styled.button`
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #f9fafb;
  background: transparent;
  border: 1px solid #f9fafb;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

export default function BannerSection() {
  return (
    <BannerWrapper>
      <BannerImage src="/images/banner-bg.png" alt="Historical Diamonds NFTs" />
      <FadeLeft />
      <FadeRight />
      <BannerContent>
        <BannerTitle>Historical Diamonds NFTs</BannerTitle>
        <StatsRow>
          <StatCol>
            <StatLabel>Available NFTs</StatLabel>
            <StatValue>1/70</StatValue>
          </StatCol>
          <StatCol>
            <StatLabel>Price</StatLabel>
            <StatValue>2.5 ETH <span>($5,003.80)</span></StatValue>
          </StatCol>
          <StatCol>
            <StatLabel>Owners</StatLabel>
            <StatValue>49</StatValue>
          </StatCol>
          <StatCol>
            <StatLabel>Total sales</StatLabel>
            <StatValue>100 ETH <span>($199,491.00)</span></StatValue>
          </StatCol>
        </StatsRow>
        <ViewDropButton>View drop</ViewDropButton>
      </BannerContent>
    </BannerWrapper>
  )
}
