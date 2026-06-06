import { useState } from 'react'
import styled from 'styled-components'

const Section = styled.div`
  width: 580px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const Tabs = styled.div`
  display: flex;
  gap: 24px;
`

const Tab = styled.button<{ $active?: boolean }>`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 24px;
  color: #111827;
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? '#111827' : '#e5e7eb')};
  padding-bottom: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`

const LiveDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  display: inline-block;
`

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const CardTitle = styled.h3`
  font-family: 'Public Sans', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: #111827;
  width: 540px;
  margin-bottom: 0;
`

const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 559px;
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const TimeTag = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  padding: 6px 12px;
  font-family: 'Public Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
`

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const AvatarImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`

const UserName = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #111827;
`

const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`

const BidLabel = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #6b7280;
`

const BidValue = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #111827;
`

const PlaceBidButton = styled.button`
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  background: #004ffd;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  margin: 0 16px 16px;

  &:hover {
    background: #0040d0;
  }
`

const auctionItems = [
  {
    title: 'FORTUNA® Ends the Year Strong with Important Estate Diamonds',
    image: '/images/auction-card1.png',
    avatar: '/images/auction-avatar1.png',
    username: '@username1234',
    bid: '1.394 ETH',
  },
  {
    title: 'White Gold, Diamond and Sapphire Stud ring',
    image: '/images/auction-card2.png',
    avatar: '/images/auction-avatar2.png',
    username: '@username1234',
    bid: '1.394 ETH',
  },
]

export default function LiveAuctionSection() {
  const [activeTab, setActiveTab] = useState<'live' | 'buy'>('live')

  return (
    <Section>
      <Tabs>
        <Tab $active={activeTab === 'live'} onClick={() => setActiveTab('live')}>
          <LiveDot />
          Live Auction
        </Tab>
        <Tab $active={activeTab === 'buy'} onClick={() => setActiveTab('buy')}>
          Buy Now
        </Tab>
      </Tabs>

      <CardList>
        {auctionItems.map((item, i) => (
          <div key={i}>
            <CardTitle>{item.title}</CardTitle>
            <Card style={{ marginTop: 16 }}>
              <CardImageWrapper>
                <CardImage src={item.image} alt={item.title} />
                <TimeTag>2D&nbsp;&nbsp;1H&nbsp;&nbsp;30M</TimeTag>
              </CardImageWrapper>
              <CardBody>
                <CardLeft>
                  <AvatarImg src={item.avatar} alt={item.username} />
                  <UserName>{item.username}</UserName>
                </CardLeft>
                <CardRight>
                  <BidLabel>Current bid</BidLabel>
                  <BidValue>{item.bid}</BidValue>
                </CardRight>
              </CardBody>
              <PlaceBidButton>Place a bid</PlaceBidButton>
            </Card>
          </div>
        ))}
      </CardList>
    </Section>
  )
}
