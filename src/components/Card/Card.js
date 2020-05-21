import React from 'react'
import { ThemeProvider } from 'styled-components'

import { getDreamJob, getIDE, getIdent, getLanguage, getTheme } from '../../helpers/cardHelper'
import {
  Border, InnerCard, Langauge, LangaugeBackground, Name, Image, Stats,
  IDE, Stat, Title, Bg, BgForReal, StatText, StatSmol, DreamJob, StatIcon, Footer
} from './Card.style'

const Card = ({ character }) => {

  const profileImage = 'https://avatars2.githubusercontent.com/u/2009724?s=460&u=979eae3bae81ddde1d3f14739b75e8eca7de91b0&v=4'
  const ide = getIDE(character.ide)
  const indent = getIdent(character.indentWidth)
  const dreamJob = getDreamJob(character.dreamTitle)

  return (
    <ThemeProvider theme={getTheme(character.theme)}>
      <Border>
        <InnerCard>
          <LangaugeBackground />
          <Langauge icon={getLanguage(character.language)} />

          <Image img={profileImage}>
            <Name>{character.username}</Name>
          </Image>

          <Bg>
            <BgForReal />
            <Title>{character.jobLevel}</Title>

            <Stats>
              <IDE icon={ide.icon} />
              <StatText>
                <StatSmol>Element</StatSmol>
                <span>{ide.text}</span>
              </StatText>
              <Stat type={ide.type} points={ide.points}>{ide.points}</Stat>

              <StatIcon>{indent.icon}</StatIcon>
              <StatText>
                <StatSmol>Personal space</StatSmol>
                <span>{character.indentWidth}</span>
              </StatText>
              <Stat type={indent.type} points={indent.points}>{indent.points}</Stat>

              <DreamJob src={dreamJob.icon} />
              <StatText>
                <StatSmol>Final evolution</StatSmol>
                <span>{dreamJob.text}</span>
              </StatText>
              <Stat type={dreamJob.type} points={dreamJob.points}>{dreamJob.points}</Stat>
            </Stats>

            <Footer>https://joniscool.com</Footer>
          </Bg>

        </InnerCard>
      </Border>
    </ThemeProvider>
  )
}

export default Card
