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

const CollectorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const CollectorRow = styled.div`
  width: 308px;
  display: flex;
  align-items: center;
  gap: 12px;
`

const RankNum = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #111827;
  width: 16px;
  text-align: center;
  flex-shrink: 0;
`

const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`

const CollectorInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const Username = styled.span`
  font-family: 'Public Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #111827;
`

const WalletAddr = styled.span`
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

const collectors = [
  { username: '@nfildesq', wallet: '0x4265...6015', eth: '142.9 ETH', usd: '$ 55.2M', img: '/images/collector1.png' },
  { username: '@apedrazzik', wallet: '0x4265...6015', eth: '28.58 ETH', usd: '$ 51.5M', img: '/images/collector2.png' },
  { username: '@tdessantd', wallet: '0x4265...6015', eth: '60.3 ETH', usd: '$ 35.92K', img: '/images/collector3.png' },
  { username: '@kbetjesb', wallet: '0x4265...6015', eth: '25 ETH', usd: '$ 33.29K', img: '/images/collector4.png' },
  { username: '@acauldfieldw', wallet: '0x4265...6015', eth: '76 ETH', usd: '$ 57.67K', img: '/images/collector5.png' },
]

export default function TopCollectors() {
  const [activeTime, setActiveTime] = useState<'1d' | '7d' | '30d'>('7d')

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Top Collectors</SectionTitle>
        <TimeTabs>
          <TimeTab $active={activeTime === '1d'} onClick={() => setActiveTime('1d')}>1 day</TimeTab>
          <TimeTab $active={activeTime === '7d'} onClick={() => setActiveTime('7d')}>7 days</TimeTab>
          <TimeTab $active={activeTime === '30d'} onClick={() => setActiveTime('30d')}>30 days</TimeTab>
        </TimeTabs>
      </SectionHeader>

      <CollectorList>
        {collectors.map((col, i) => (
          <CollectorRow key={i}>
            <RankNum>{i + 1}</RankNum>
            <Avatar src={col.img} alt={col.username} />
            <CollectorInfo>
              <Username>{col.username}</Username>
              <WalletAddr>{col.wallet}</WalletAddr>
            </CollectorInfo>
            <VolumeInfo>
              <VolumeEth>{col.eth}</VolumeEth>
              <VolumeUsd>{col.usd}</VolumeUsd>
            </VolumeInfo>
          </CollectorRow>
        ))}
      </CollectorList>

      <ViewMoreButton>View more</ViewMoreButton>
    </Section>
  )
}
