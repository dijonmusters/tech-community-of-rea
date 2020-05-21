import React from 'react'

import {
  Border, InnerCard, Langauge, LangaugeBackground, Name, Image, Stats,
  IDE, Stat, Title,
} from './Card.style'

const Card = ({ character }) => {

  const profileImage = 'https://avatars2.githubusercontent.com/u/2009724?s=460&u=979eae3bae81ddde1d3f14739b75e8eca7de91b0&v=4'

  return (
    <Border>
      <InnerCard>
        <LangaugeBackground />
        <Langauge icon="/static/Languages/Low-res/js.png" />
        <Image img={profileImage}>
          <Name>{character.username}</Name>
        </Image>

        <Title>{character.jobLevel}</Title>

        <Stats>
          <IDE icon="/static/IDEs/Low-res/jetbrains.png" />
          <div>Weapon of choice</div>
          <Stat neg>-4pt</Stat>

          <div>|_| |_|</div>
          <div>2 spaces</div>
          <Stat>+2pt</Stat>

          <div>CTO</div>
          <div>Dream job</div>
          <Stat>+$$$</Stat>
        </Stats>

      </InnerCard>
    </Border>
  )
}

export default Card
