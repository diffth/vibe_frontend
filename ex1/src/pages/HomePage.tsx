import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import BannerSection from '../components/BannerSection'
import LiveAuctionSection from '../components/LiveAuctionSection'
import TrendingCollections from '../components/TrendingCollections'
import TopCollectors from '../components/TopCollectors'
import UpcomingAuction from '../components/UpcomingAuction'

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  overflow-x: hidden;
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  padding-top: 40px;
`

const ContentContainer = styled.div`
  width: 981px;
  max-width: 100%;
`

const MainGrid = styled.div`
  width: 981px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`

export default function HomePage() {
  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <ContentContainer>
          <HeroSection />
        </ContentContainer>

        <BannerSection />

        <MainGrid>
          <LiveAuctionSection />
          <RightColumn>
            <TrendingCollections />
            <TopCollectors />
            <UpcomingAuction />
          </RightColumn>
        </MainGrid>
      </MainContent>

      <Footer />
    </PageWrapper>
  )
}
