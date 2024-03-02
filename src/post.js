import React from 'react'
import TimeAgo from 'timeago-react'; 
function Post({title,summary,content,createdAt,author}) {
  return (
    
    <div className="entry">
      
      <h2> {title} </h2>
      <p> {summary}</p>
      <p> {content}</p>
      <TimeAgo
  datetime={createdAt}
  locale='en'
/>
<p>{author.username}</p>
    </div>
  )
}

export default Post