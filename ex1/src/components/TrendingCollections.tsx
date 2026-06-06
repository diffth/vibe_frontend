import { useState } from 'react'
import styled from 'styled-components'

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #111827;
`

const TimeTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 4px;
  width: 320px;
  box-sizing: border-box;
`

const TimeTab = styled.button<{ $active?: boolean }>`
  flex: 1;
  font-family: 'Public Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? '#111827' : '#6b7280')};
  background: ${({ $active }) => ($active ? '#ffffff' : 'transparent')};
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  text-align: center;
`

const CollectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const CollectionRow = styled.div`
  width: 308px;
  display: flex;
  align-items: center;
  gap: 14px;
`

const RankNum = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #111827;
  width: 16px;
  text-align: center;
  flex-shrink: 0;
`

const Thumbnail = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`

const CollectionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const CollectionName = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #111827;
`

const FloorPrice = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #6b7280;
`

const VolumeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`

const VolumeEth = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #111827;
`

const VolumeUsd = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #6b7280;
`

const ViewMoreButton = styled.button`
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #f9fafb;
  background: #111827;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background: #1f2937;
  }
`

const collections = [
  { name: 'Binford Ltd.', floor: '0.57 ETH', volume: '74.2 ETH', usd: '$ 33.1K', img: '/images/trending1.png' },
  { name: 'Big Kahuna Ltd.', floor: '0.57 ETH', volume: '15.39 ETH', usd: '$ 46.2K', img: '/images/trending2.png' },
  { name: 'Acme Co.', floor: '0.57 ETH', volume: '13 ETH', usd: '$ 29.21K', img: '/images/trending3.png' },
  { name: 'Barone LLC.', floor: '0.57 ETH', volume: '25.5 ETH', usd: '$ 32.9K', img: '/images/trending4.png' },
]

export default function TrendingCollections() {
  const [activeTime, setActiveTime] = useState<'1d' | '7d' | '30d'>('1d')

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Trending Collections</SectionTitle>
        <TimeTabs>
          <TimeTab $active={activeTime === '1d'} onClick={() => setActiveTime('1d')}>1 day</TimeTab>
          <TimeTab $active={activeTime === '7d'} onClick={() => setActiveTime('7d')}>7 days</TimeTab>
          <TimeTab $active={activeTime === '30d'} onClick={() => setActiveTime('30d')}>30 days</TimeTab>
        </TimeTabs>
      </SectionHeader>

      <CollectionList>
        {collections.map((col, i) => (
          <CollectionRow key={i}>
            <RankNum>{i + 1}</RankNum>
            <Thumbnail src={col.img} alt={col.name} />
            <CollectionInfo>
              <CollectionName>{col.name}</CollectionName>
              <FloorPrice>Floor: {col.floor}</FloorPrice>
            </CollectionInfo>
            <VolumeInfo>
              <VolumeEth>{col.volume}</VolumeEth>
              <VolumeUsd>{col.usd}</VolumeUsd>
            </VolumeInfo>
          </CollectionRow>
        ))}
      </CollectionList>

      <ViewMoreButton>View more</ViewMoreButton>
    </Section>
  )
}
