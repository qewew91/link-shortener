import React from 'react'

export const LinkCard = ({ link }) => (
  <>
    <h2>Link</h2>

    <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
    <p>To: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
    <p>Clicks on your link: <strong>{link.clicks}</strong></p>
    <p>Date of generating: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
  </>
)
