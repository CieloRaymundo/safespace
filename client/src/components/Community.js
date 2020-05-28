import React, { useState, useEffect } from 'react'
import NewPostModal from './NewPostModal'
import { Jumbotron, Tabs, Tab } from 'react-bootstrap'
import Post from './NewPost'
import { useParams } from 'react-router-dom'
import { Item, Card } from 'semantic-ui-react'

const Community = () => {
  const [posts, setPosts] = useState([])
  const [community, setCommunity] = useState({})
  const [newPost, setNewPost] = useState(false)
  const { type, id } = useParams()
  useEffect(() => {
    const getPosts = async () => {
      if (type === 'member') {
        const req = await fetch(`/posts-community/${id}`)
        const response = await req.json()
        setPosts(response)
      } else {
        const req = await fetch(`/posts-community/visiter/${id}`)
        const response = await req.json()
        setPosts(response)
      }
    }
    const getCommunity = async () => {
      const req = await fetch(`/communities/${id}`)
      const res = await req.json()
      console.log(res)
      setCommunity(res)
    }

    getCommunity()
    getPosts()
  }, [id])
  console.log(posts)
  return (
    <div>
      <Jumbotron>
        <h1>{community.name}</h1>
        <p>
          {community.description}
        </p>
      </Jumbotron>
      <Tabs defaultActiveKey='newsfeed' transition={false} id='noanim-tab-example'>
        <Tab eventKey='newsfeed' title='Newsfeed'>
          <br />
          <div style={{ width: '65%', margin: '0 auto' }}>
            <Card.Group>
              <NewPostModal setNewPost={setNewPost} id={id} />
              {posts.map((res, i) => {
                return (
                  <Post key={i} data={res} />
                )
              })}
            </Card.Group>
          </div>
        </Tab>
        <Tab eventKey='about' title='About'>
          <h1>About Us</h1>
        </Tab>
        <Tab eventKey='admins' title='Admins'>
          <h1>List of admins here</h1>
        </Tab>
      </Tabs>

    </div>
  )
}

export default Community
