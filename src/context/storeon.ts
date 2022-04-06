import { createStoreon } from 'storeon'

import { persistState } from '@storeon/localstorage'
import { crossTab } from '@storeon/crosstab'

import { collection } from './states/collection'
import { CollectionStore } from './@types/CollectionStore'
import { CollectionEvent } from './@types/CollectionEvent'

import { settings } from './states/settings'
import { SettingsStore } from './@types/SettingsStore'
import { SettingsEvent } from './@types/SettingsEvent'

import { history } from './states/history'
import { HistoryStore } from './@types/HistoryStore'
import { HistoryEvent } from './@types/HistoryEvent'

import { search } from './states/search'
import { SearchStore } from './@types/SearchStore'
import { SearchEvent } from './@types/SearchEvent'

import { metadata } from './states/metadata'
import { MetadataStore } from './@types/MetadataStore'
import { MetadataEvent } from './@types/MetadataEvent'

export type Store = CollectionStore &
  SettingsStore &
  HistoryStore &
  SearchStore &
  MetadataStore
export type Event = CollectionEvent &
  SettingsEvent &
  HistoryEvent &
  SearchEvent &
  MetadataEvent

export const store = createStoreon<Store, Event>([
  settings,
  collection,
  history,
  metadata,
  search,
  ...(typeof window !== 'undefined'
    ? [
        persistState(['settings', 'collection', 'history']),
        persistState(['search'], {
          storage: sessionStorage,
        }),
        crossTab({
          filter: (event, data) => event.toString().startsWith('search/'),
        }),
      ]
    : []),
])
