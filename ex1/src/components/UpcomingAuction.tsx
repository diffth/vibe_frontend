import styled from 'styled-components'

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #111827;
`

const CardsOuter = styled.div`
  position: relative;
  width: 320px;
`

const CardsWrapper = styled.div`
  position: relative;
  width: 320px;
  overflow: hidden;
`

const CardScroll = styled.div`
  display: flex;
  gap: 8px;
`

const Card = styled.div`
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  background: #ffffff;
  padding: 8px 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
  width: 240px;
`

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: 8px;
  overflow: hidden;
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const TimerBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  border-radius: 6px;
  padding: 4px 10px;
  font-family: 'Public Sans', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #ffffff;
`

const ItemTitle = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #111827;
  line-height: 1.4;
`

const RemindButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  background: #004ffd;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;

  &:hover {
    background: #0040d0;
  }
`

const BellIcon = styled.svg`
  width: 14px;
  height: 14px;
`

const NavButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  background: #ffffff;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  }
`

const FadeOverlay = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 80px;
  height: 100%;
  background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
  z-index: 1;
`

const upcomingItems = [
  { title: 'White Gold, Spinel and Diamond Earrings', image: '/images/upcoming1.png' },
  { title: 'White Gold, Spinel and Diamond Earrings', image: '/images/upcoming1.png' },
  { title: 'White Gold, Spinel and Diamond Earrings', image: '/images/upcoming1.png' },
]

export default function UpcomingAuction() {
  return (
    <Section>
      <SectionTitle>Upcomming Auction</SectionTitle>
      <CardsOuter>
        <CardsWrapper>
          <CardScroll>
            {upcomingItems.map((item, i) => (
              <Card key={i}>
                <CardImageWrapper>
                  <CardImage src={item.image} alt={item.title} />
                  <TimerBadge>2D&nbsp;&nbsp;1H&nbsp;&nbsp;30M Left</TimerBadge>
                </CardImageWrapper>
                <ItemTitle>{item.title}</ItemTitle>
                <RemindButton>
                  <BellIcon viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 1.167A3.5 3.5 0 0 0 3.5 4.667v.875c0 .35-.124.687-.35.953L2.1 7.7a.583.583 0 0 0 .45.967h8.9a.583.583 0 0 0 .45-.967L10.85 5.495a1.458 1.458 0 0 1-.35-.953v-.875A3.5 3.5 0 0 0 7 1.167ZM5.833 11.667a1.167 1.167 0 0 0 2.334 0"
                      stroke="#fff"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </BellIcon>
                  Remind me
                </RemindButton>
              </Card>
            ))}
          </CardScroll>
        </CardsWrapper>
        <FadeOverlay />
        <NavButton aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3.333 10.667 8 6 12.667" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </NavButton>
      </CardsOuter>
    </Section>
  )
}
