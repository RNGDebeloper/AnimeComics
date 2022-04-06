import { Fragment, useState } from 'react'

import { NextPage } from 'next'
import Link from 'next/link'

import { CheckIcon, DuplicateIcon } from '@heroicons/react/outline'

import copy from 'copy-to-clipboard'

import { Step } from '../../core/components/step'
import { HeadTitle } from '../../core/components/headTitle'
import { useStoreon } from '../../context'
import { APIResponse } from '../../core/@types/APIResponse'

const Page: NextPage = props => {
  const { collection } = useStoreon('collection')

  const [error, setError] = useState<boolean>(false)
  const [status, setStatus] = useState<number>(0)
  const [code, setCode] = useState<string>('')

  const exportHandler = async () => {
    setStatus(1)
    setError(false)

    try {
      const res: APIResponse<string> = await fetch(`/api/collection/export`, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({
          collection,
        }),
        headers: { 'Content-Type': 'application/json' },
      }).then(o => o.json())

      setCode(res.response.data)
      setStatus(2)
    } catch {
      setError(true)
      setStatus(0)
    }
  }

  return (
    <Fragment>
      <HeadTitle />
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6 pt-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <Step current={status + 1} total={3} />
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="pb-5 border-b border-gray-200 space-y-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Export
                </h3>
                <p className="max-w-4xl text-sm leading-5 text-gray-500">
                  {error
                    ? "Sorry, there's some problem during request to server. Please wait for a few minutes and try again. Sorry... (*_ _)人"
                    : 'Transfer your collection to another device by obtaining a transfer key'}
                </p>
              </div>
              <div className="pt-4">
                {status === 0 ? (
                  <Fragment>
                    <div className="text-gray-900 text-sm">
                      Following data will be exported from this device
                    </div>
                    <div className="py-4">
                      <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-900 px-12">
                        <ul className="list-disc">
                          <li>
                            Collections:{' '}
                            {collection.data.length.toLocaleString()} galleries
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="">
                      <span className="inline-flex rounded-md shadow-sm mr-4">
                        <Link href="/collection">
                          <a>
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Back
                            </button>
                          </a>
                        </Link>
                      </span>
                      <span className="inline-flex rounded-md shadow-sm">
                        <button
                          type="button"
                          onClick={() => exportHandler()}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Export
                        </button>
                      </span>
                    </div>
                  </Fragment>
                ) : status === 1 ? (
                  <div className="pt-4 pb-2">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 spinner border-2" />
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-lg text-gray-800 text-center">
                        In progress...
                      </p>
                      <p className="text-sm text-gray-800 text-center">
                        Requesting transfer key from server...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 pb-2">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <CheckIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-lg text-gray-800 text-center">
                        Completed!
                      </p>
                      <p className="text-sm text-gray-800 text-center">
                        Operation successful! Your transfer key is
                      </p>
                      <div className="py-4 flex justify-center">
                        <div className="bg-gray-100 text-xl font-mono text-gray-900 px-6 py-4 rounded-md flex items-center">
                          {code}
                          <button
                            className="ml-2 hover:text-gray-700 active:text-gray-700"
                            onClick={() => copy(code)}
                          >
                            <DuplicateIcon className="w-8 h-8" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-800 text-center">
                        Type following transfer key into <b>Import</b> section
                        in another device.
                      </p>
                    </div>
                    <div className="flex justify-center pt-4">
                      <span className="inline-flex rounded-md shadow-sm">
                        <Link href="/collection">
                          <a>
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Back
                            </button>
                          </a>
                        </Link>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Page
