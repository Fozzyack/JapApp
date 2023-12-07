import React from 'react'

interface navlinks {
    links : {
        name: string,
        href: string
    }[]

    device: string
    gap: number
}
const NavLinks = ({links, device, gap} : navlinks) => {
  return (
    <div className={`flex flex-${device === 'mobile' ? 'col' : 'row'} gap-${gap} pr-5`}>
        {
            links.map((link, index) => (
                <a className='hover:text-purple-500 hover:border-b border-purple-500' key={index} href={link.href}> {link.name} </a>
            ))
        }
    </div>
  )
}

export default NavLinks