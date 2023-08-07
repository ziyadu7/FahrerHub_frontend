import React from 'react'

function SearchBox(props) {

  const search = props.search
  const setSearch = props.setSearch

  return (

    <div className='flex'>
      <label htmlFor="simple-search" className="sr-only">Search</label>
      <div className="">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required
        />
      </div>
    </div>
  )
}

export default SearchBox