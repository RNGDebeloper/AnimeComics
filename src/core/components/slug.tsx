import React from 'react'

import { Box, Text } from 'rebass'
import styled from 'styled-components'

import TransparentLink from '../../core/components/transparentLink'

import { ISlugProps } from '../@types/ISlugProps'

interface IBorderedSlug {
  border: string
}

const BorderedSlug = styled(Box)<IBorderedSlug>`
  border-radius: 4px;
  border: 1px solid #d9d9d9;

  border-color: ${props => props.border};
`

const SlugComponent: React.FC<ISlugProps> = props => {
  const { border = '#d9d9d9', background = '#fafafa', text = 'rgba(0, 0, 0, 0.65)', link, title } = props
  return (
      <BorderedSlug border={border} backgroundColor={background} m={'2px'}>
        {link ? (
          <TransparentLink to={link}>
            <Text color={text} fontSize={12} px={1} py={`2px`}>{title}</Text>
          </TransparentLink>
        ) : (
          <Text color={text} fontSize={12} px={1} py={`2px`}>{title}</Text>
        )}
      </BorderedSlug>
  )
}

export default SlugComponent
