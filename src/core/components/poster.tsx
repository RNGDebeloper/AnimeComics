import { memo } from 'react'

import Link from 'next/link'

import { BookOpenIcon } from '@heroicons/react/24/outline'

import { ImageBlur } from './imageBlur'
import { filterTagByType } from '../services/filterTagByType'
import { getImageUrl } from '../services/getImageUrl'
import { tags } from '../constants/tags'

import { Hentai } from '../@types/Hentai'

interface IProps {
  hentai: Hentai
}

const availableFlags = ['english', 'japanese', 'chinese']

export const Poster = memo<IProps>(props => {
  const { hentai } = props

  return (
    <div className="bg-gray-200 overflow-hidden rounded-xl relative">
      <Link href={`/g/${hentai.id}`} scroll>
        <a>
          <div className="absolute top-0 bottom-0 left-0 right-0 w-full bg-black-overlay z-10 transition ease-in-out duration-200 opacity-0 hover:opacity-100 text-white flex flex-col justify-between px-4 py-8 md:px-5 lg:px-6 md:py-9 lg:py-10">
            <div>
              <div className="flex">
                {filterTagByType(hentai.tags, 'language').map(lang =>
                  availableFlags.includes(lang.name) ? (
                    <div
                      className="pb-2 pr-2 w-10"
                      key={`poster-${hentai.id}-language-${lang.name}`}
                    >
                      <img
                        src={`/static/img/flags/${lang.name}.png`}
                        alt={lang.name}
                      />
                    </div>
                  ) : null
                )}
              </div>
              <p className="font-semibold truncate text-md sm:text-lg md:text-xl">
                {hentai.title.pretty}
              </p>
              <div className="pt-2 sm:pt-4 md:pt-6 flex justify-evenly text-center text-xs sm:text-sm md:text-md">
                {tags.map(tag => {
                  const amount = filterTagByType(hentai.tags, tag.name).length

                  if (amount === 0) {
                    return null
                  } else {
                    return (
                      <div key={`poster-${hentai.id}-tag-${tag.name}`}>
                        <div
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full ${tag.color} mx-auto`}
                        />
                        <p className="pt-0.5 md:pt-1">{amount}</p>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
            <div className="pt-1 flex">
              <div className="flex items-center pr-2">
                <BookOpenIcon className="w-8 h-8 pr-2" />{' '}
                {hentai.num_pages ?? 0}
              </div>
            </div>
          </div>
          <ImageBlur
            src={getImageUrl({
              image: hentai.images.cover,
              type: 'cover',
              mediaId: hentai.media_id,
            })}
            alt={hentai.title.pretty}
            width={hentai.images.cover.w}
            height={hentai.images.cover.h}
          />
        </a>
      </Link>
    </div>
  )
})
